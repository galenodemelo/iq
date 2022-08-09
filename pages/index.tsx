import ContactLayout from "@layouts/contact/ContactLayout"
import ContactSuccessLayout from "@layouts/contact/success/ContactSuccessLayout"
import CustomHeader from "@layouts/CustomHeader"
import IndexLayout from "@layouts/index/IndexLayout"
import { NextRouter, useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function IndexController() {
    const router: NextRouter = useRouter()
    const [path, setPath] = useState<string>("/")
    const successPageUrl: string = "/contact/success"
    useEffect(() => {
        if (!router.isReady) return
        setPath(router.asPath)
    }, [router])

    const redirectToSuccessPage = () => {
        setPath(successPageUrl)
        router.push(successPageUrl, undefined, { shallow: true })
    }

    return (
        <>
            <CustomHeader>
                {path == "/" && <title>iQ - Powered by people</title>}
                {path == "/contact" && <title>iQ - Contact us</title>}
                {path == successPageUrl &&
                    <>
                        <title>iQ - Thanks for contactins us</title>
                        <meta name="robots" content="noindex" />
                    </>
                }
            </CustomHeader>

            <IndexLayout active={path == "/"} />
            <ContactLayout active={path.startsWith("/contact")} onContactSubmitCallback={redirectToSuccessPage} />
            <ContactSuccessLayout active={path == successPageUrl}  />
        </>
    )
}
