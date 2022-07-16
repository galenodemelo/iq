import Image from "next/image"
import { Component, ReactNode } from "react"
import styles from "./Menu.module.sass"

export enum MenuLogoType {
    ANIMATED,
    STATIC
}

export default abstract class Menu extends Component<any, any> {

    private logoType: MenuLogoType

    constructor(props: {}, logoType: MenuLogoType) {
        super(props)
        this.logoType = logoType
    }

    render(): ReactNode {
        return (
            <header className={styles.menu}>
                {this.renderLogo(this.logoType)}

                {this.renderNavigation()}
            </header>
        )
    }

    abstract renderNavigation(): ReactNode

    private renderLogo(logoType: MenuLogoType): ReactNode {
        const logoWidth: number = 300
        const logoHeight: number = 108

        switch (logoType) {
            case MenuLogoType.ANIMATED:
                return <Image src="/img/iq-logo-animated.gif" width={logoWidth} height={logoHeight} layout="fixed" alt="IQ - Powered by people" />

            case MenuLogoType.STATIC:
                return <Image src="/img/iq-logo.svg" width={logoWidth} height={logoHeight} layout="fixed" alt="IQ - Powered by people" />

            default:
                throw new Error("Invalid MenuLogoType")
        }
    }
}
