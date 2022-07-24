import Image from "next/image"
import Link from "next/link"
import { LegacyRef, ReactNode, RefObject } from "react"
import Menu, { MenuLogoType } from "../Menu"

interface Props {
    closeButtonRef: RefObject<HTMLAnchorElement> | undefined
}

export default class MenuContact extends Menu {

    closeButtonRef

    constructor(props: Props) {
        super(props, MenuLogoType.STATIC)
        this.closeButtonRef = props.closeButtonRef
    }

    renderNavigation(): ReactNode {
        return (
            <Link href="/">
                <a ref={this.closeButtonRef}>
                    <Image src="/img/ico-close.svg" width={24} height={24} layout="fixed" />
                </a>
            </Link>
        )
    }
}
