import Image from "next/image"
import { Component, ReactNode } from "react"
import MediaQuery from "react-responsive"
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
        let imageSrc: string
        switch (logoType) {
            case MenuLogoType.ANIMATED:
                imageSrc = "/img/iq-logo-animated.gif"
                break

            case MenuLogoType.STATIC:
                imageSrc = "/img/iq-logo.png"
                break

            default:
                throw new Error("Invalid MenuLogoType")
        }

        return (
            <>
                <MediaQuery orientation="landscape">
                    <Image src={imageSrc} width={300} height={60} alt="IQ - Powered by people" />
                </MediaQuery>

                <MediaQuery orientation="portrait">
                    <Image src={imageSrc} width={150} height={30} alt="IQ - Powered by people" />
                </MediaQuery>
            </>
        )
    }
}
