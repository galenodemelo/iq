const SETTINGS = {
    isRecaptchaActive: !!JSON.parse(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_ACTIVE ?? "true"),
    isSendgridActive: !!JSON.parse(process.env.SENDGRID_ACTIVE ?? "true"),
}

export default SETTINGS
