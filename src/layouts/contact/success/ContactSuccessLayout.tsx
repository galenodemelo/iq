import GradientLettering from "@components/gradientlettering/GradientLettering"
import MenuContact from "@components/menu/contact/MenuContact"
import Image from "next/image"
import { Component, ReactNode } from "react"
import styles from "./ContactSuccessLayout.module.sass"

export default class ContactSuccessLayout extends Component<any, any> {
    render(): ReactNode {
        return (
            <main className={styles.contactSuccess}>
                <MenuContact />

                <div className={styles.content}>
                        <span className={styles.small}>You chose</span><br />
                        <big className={styles.big}>
                            wisely!
                        </big>
                    </h1>

                    <p className={styles.paragraph}>
                        Thanks!<br />
                        Our team will contact you shortly.
                    </p>

                    <p className={[styles.paragraph, styles.playlist].join(" ")}>
                        in the meantime, enjoy what we're listening on <b>Spotify!</b>
                        <a className={styles.icon}>
                            <Image src="/img/ico-spotify.svg" width={48} height={48} alt="Spotify logo" />
                        </a>
                    </p>
                </div>
            </main>
        )
    }
}
