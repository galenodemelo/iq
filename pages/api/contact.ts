import { createClient } from "@supabase/supabase-js"
import { NextApiRequest, NextApiResponse } from "next"
import SendGridManager from "src/libs/SendGridManager"

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        if (req.method !== "POST") {
            res.status(405).json({success: false, errorList: ["Method not allowed"]})
            return
        }

        const requestData: ContactRequestDTO = new ContactRequestDTO(req.body.fullName, req.body.email, req.body.phone, req.body.recaptchaToken)
        const errorList: Array<string> = await validateRequestData(requestData)
        if (errorList.length > 0) {
            res.status(422).json({success: false, errorList: errorList})
            return
        }

        const wasStoredInDatabase: boolean = await storeInDatabase(requestData)
        if (!wasStoredInDatabase) {
            res.status(500).json({success: false, errorList: ["An unexpected error occurred. Please, try again later"]})
            return
        }

        const mailWasSent: boolean = await SendGridManager.send(
            `Site contact form - ${requestData.fullName}`,
            buildMailHtml(requestData),
            requestData.email,
            requestData.email
        )
        if (!mailWasSent && process.env.NODE_ENV != "development") {
            res.status(500).json({success: false, errorList: ["Mail wasn't send. Please try again"]})
            return
        }

        res.status(200).json({success: true, message: "Contact sent successfully"})
    } catch (error) {
        console.error(`api/contact >> ${JSON.stringify(req.body)}`, error)
        res.status(500).json({success: false, errorList: ["Internal server error"]})
    }
}

class ContactRequestDTO {
    fullName: string
    email: string
    phone: string
    recaptchaToken: string

    constructor(fullName: string, email: string, phone: string, recaptchaToken: string) {
        this.fullName = fullName.trim()
        this.email = email.trim()
        this.phone = phone.trim()
        this.recaptchaToken = recaptchaToken.trim()
    }
}

async function validateRequestData(requestData: ContactRequestDTO): Promise<Array<string>> {
    let errorList: Array<string> = []

    if (!requestData.fullName.length) errorList.push("Please inform your name")

    const isValidEmail: boolean = requestData.email.length > 0 && /\S+@\S+\.\S+/.test(requestData.email)
    if (!isValidEmail) errorList.push("Please inform a valid email")

    if (!requestData.phone.length) errorList.push("Please inform your phone number")

    if (!requestData.recaptchaToken.length) errorList.push("Missing ReCAPTCHA Token")

    if (!errorList.length) {
        const isRecaptchaValid: boolean = await validateRecaptchaToken(requestData.recaptchaToken)
        if (!isRecaptchaValid) errorList.push("Invalid ReCAPTCHA. Try again.")
    }

    return errorList
}

async function validateRecaptchaToken(recaptchaToken: string): Promise<boolean> {
    const recaptchaUrl: string = "https://www.google.com/recaptcha/api/siteverify"
    const response: Response = await fetch(recaptchaUrl, {
        method: "POST",
        headers: new Headers({"Content-Type": "application/x-www-form-urlencoded"}),
        body: new URLSearchParams({
            secret: process.env.GOOGLE_RECAPTCHA_SECRET ?? "",
            response: recaptchaToken
        })
    })

    const responseJson: any = await response.json()
    if (!responseJson.success) console.error("")

    return responseJson.success
}

async function storeInDatabase(requestData: ContactRequestDTO): Promise<boolean> {
    if (process.env.NODE_ENV == "development") return true

    const supabaseUrl: string = process.env.SUPABASE_URL ?? ""
    const supabaseApiKey: string = process.env.SUPABASE_API_KEY ?? ""

    const supabase = createClient(supabaseUrl, supabaseApiKey)
    const { data, error } = await supabase
        .from("contact_form")
        .insert([
            { client: "iq", payload: JSON.stringify(requestData) }
        ])


    if (error) {
        console.error(`storeInDatabase >> RequestBody: ${JSON.stringify(requestData)}`, error)
        return false
    }

    return true
}

function buildMailHtml(requestData: ContactRequestDTO): string {
    let fieldList: Array<string> = []
    fieldList.push(`<strong>Full name</strong>: ${requestData.fullName}`)
    fieldList.push(`<strong>E-mail</strong>: ${requestData.email}`)
    fieldList.push(`<strong>Phone Number</strong>: ${requestData.phone}`)

    return `<h1>Contact form</h1>
            ${fieldList.join("<br />")}`
}
