const SETTINGS = {
    isRecaptchaActive: !!JSON.parse(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_ACTIVE ?? "true"),
    isMailSenderActive: !!JSON.parse(process.env.MAIL_SENDER_ACTIVE ?? "true"),
    isSupabaseActive: !!JSON.parse(process.env.SUPABASE_ACTIVE ?? "true")
}

export default SETTINGS
