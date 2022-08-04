import MenuContact from "@components/menu/contact/MenuContact"
import anime from "animejs"
import Image from "next/image"
import React, { ReactNode } from "react"
import CircleExpanding, { CircleExpandingProps } from "src/animations/CircleExpanding"
import PoppingLetteringAnimation from "src/animations/PoppingLetteringAnimation"
import styles from "./ContactSuccessLayout.module.sass"
interface State {
    canSplitLetters: boolean
}

export default class ContactSuccessLayout extends CircleExpanding<CircleExpandingProps, State> {

    letteringRef: React.RefObject<HTMLHeadingElement>
    letteringAnimation: PoppingLetteringAnimation

    constructor(props: CircleExpandingProps) {
        super(props)
        this.letteringRef = React.createRef<HTMLHeadingElement>()
        this.letteringAnimation = new PoppingLetteringAnimation(this.letteringRef, styles.big)

        this.state = { canSplitLetters: false }
    }

    componentDidUpdate(): void {
        super.componentDidUpdate()

        if (!this.props.active) return
        this.letteringAnimation.run()

        anime.timeline().add({
            targets: `.${styles.paragraph}`,
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 2000,
            delay: (el, i) => 500 * (i + 1) + 600
        })
    }

    render(): ReactNode {
        return (
            <main className={styles.contactSuccess} data-active={this.props.active} ref={this.containerRef}>
                <MenuContact closeButtonRef={this.closeButtonRef} />

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
                        <a href="https://open.spotify.com/playlist/37i9dQZEVXbNG2KDcFcKOF?si=131ea9dd524a4826" className={styles.icon} target="_blank">
                            <Image src="/img/ico-spotify.svg" width={48} height={48} alt="Spotify logo" />
                        </a>
                    </p>
                </div>
            </main>
        )
    }
}
