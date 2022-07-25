import MenuContact from "@components/menu/contact/MenuContact"
import anime from "animejs"
import Image from "next/image"
import React, { Component, ReactNode } from "react"
import PoppingLetteringAnimation from "src/animations/PoppingLetteringAnimation"
import styles from "./ContactSuccessLayout.module.sass"

interface State {
    canSplitLetters: boolean
}

export default class ContactSuccessLayout extends Component<any, State> {

    letteringRef

    constructor(props: {}) {
        super(props)
        this.letteringRef = React.createRef<HTMLHeadingElement>()
        this.state = { canSplitLetters: false }
    }

    componentDidMount(): void {
        const letteringAnimation: PoppingLetteringAnimation = new PoppingLetteringAnimation(this.letteringRef.current)
        letteringAnimation.fixGradientLettering(styles.big)
        letteringAnimation.onEnd(() => {
            anime.timeline().add({
                targets: `.${styles.paragraph}`,
                opacity: [0, 1],
                translateY: [40, 0],
                duration: 1200,
                delay: (el, i) => 400 * (i+1)
            }).finished
        })
        letteringAnimation.run()
    }

    render(): ReactNode {
        return (
            <main className={styles.contactSuccess}>
                <MenuContact />

                <div className={styles.content}>
                    <h1 className={styles.lettering} ref={this.letteringRef}>
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
