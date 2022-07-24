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
            <IndexLayout active={path == "/"} />
            <ContactLayout active={path.includes("/contact")} />
        <IndexLayout />
        </>
    )
}
