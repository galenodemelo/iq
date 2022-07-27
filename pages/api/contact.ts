import { createClient } from "@supabase/supabase-js"
import { NextApiRequest, NextApiResponse } from "next"

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

    return errorList
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
