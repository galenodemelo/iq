import ContactLayout from "@layouts/contact/ContactLayout"
import ContactSuccessLayout from "@layouts/contact/success/ContactSuccessLayout"
import CustomHeader from "@layouts/CustomHeader"
import IndexLayout from "@layouts/index/IndexLayout"
import { NextRouter, useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function IndexController(props: any) {
    const router: NextRouter = useRouter()
    const [path, setPath] = useState<string>("/")
    useEffect(() => {
        if (!router.isReady) return
        setPath(router.asPath)
    }, [router])

    return (
        <>
            <CustomHeader>
                {path == "/" && <title>IQ - Powered by people</title>}
                {path == "/contact" && <title>IQ - Contact us</title>}
                {path == "/contact/success" &&
                    <>
                        <title>IQ - Thanks for contactins us</title>
                        <meta name="robots" content="noindex" />
                    </>
                }
            </CustomHeader>

            <IndexLayout active={path == "/"} />
            <ContactLayout active={path == "/contact"} />
            <ContactSuccessLayout active={path == "/contact/success"}  />
        </>
    )
}
