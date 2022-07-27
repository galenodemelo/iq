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
