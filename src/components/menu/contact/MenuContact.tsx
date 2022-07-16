import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"
import Menu, { MenuLogoType } from "../Menu"

export default class MenuContact extends Menu {

    constructor(props: {}) {
        super(props, MenuLogoType.STATIC)
    }

    renderNavigation(): ReactNode {
        return (
            <Link href="/">
                <a>
                    <Image src="/img/ico-close.svg" width={24} height={24} layout="fixed" />
                </a>
            </Link>
        )
    }
}
