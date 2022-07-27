import MailService, { MailDataRequired } from "@sendgrid/mail"

class SendGridManager {

    public static async send(subject: string, body: string, replyTo?: string, cc?: string): Promise<boolean> {
        MailService.setApiKey(process.env.SENDGRID_API_KEY ?? "")

        const message: MailDataRequired = this.buildMessage(subject, body, replyTo, cc)

        return await MailService.sendMultiple(message).then(() => {
            return true
        }).catch((error) => {
            console.log(error)
            return false
        })
    }

    private static buildMessage(subject: string, body: string, replyTo?: string, cc?: string): MailDataRequired {
        return {
            to: process.env.CONTACT_FORM_RECEIVER,
            cc: cc,
            replyTo: replyTo,
            from: {
                email: process.env.SENDGRID_FROM_EMAIL ?? "",
                name: process.env.SENDGRID_FROM_NAME
            },
            subject: subject,
            html: body
        }
    }
}

export default SendGridManager
