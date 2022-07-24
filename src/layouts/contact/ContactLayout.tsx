import ContactForm from "@components/form/ContactForm"
import MenuContact from "@components/menu/contact/MenuContact"
import React, { Component, ReactNode } from "react"
import PoppingLetteringAnimation from "src/animations/PoppingLetteringAnimation"
import styles from "./ContactLayout.module.sass"

interface Props {
    active: boolean
}

export default class ContactLayout extends Component<Props, any> {

    closeRef
    containerRef
    letteringRef

    constructor(props: Props) {
        super(props)
        this.closeRef = React.createRef<HTMLAnchorElement>()
        this.containerRef = React.createRef<HTMLElement>()
        this.letteringRef = React.createRef<HTMLHeadingElement>()
    }

    componentDidMount(): void {
        const letteringAnimation: PoppingLetteringAnimation = new PoppingLetteringAnimation(this.letteringRef.current)
        letteringAnimation.fixGradientLettering(styles.gradient)
        letteringAnimation.run()

        this.buildClipPath()
    }

    componentDidUpdate(): void {
        this.buildClipPath()
    }

    render(): ReactNode {
        return (
            <main className={styles.contact} data-active={this.props.active} ref={this.containerRef}>
                <MenuContact closeButtonRef={this.closeRef} />

                <div className={styles.content}>
                    <h1 className={styles.lettering} ref={this.letteringRef}>
                        <span>We are</span><br />
                        <div className={styles.gradient}>the engine</div>
                        <div className={styles.gradient}>of the</div>
                        <div className={styles.gradient}>future</div>
                    </h1>

                    <div className={styles.form}>
                        <ContactForm />

                        <footer className={styles.footer}>
                            &copy; iQ - Powered by People LLC.
                        </footer>
                    </div>
                </div>
            </main>
        )
    }

    private buildClipPath(): void {
        if (this.props.active) {
            this.containerRef.current!.style.clipPath = "circle(100%)"
            return
        }

        const closeButtonPosition = this.closeRef.current!.getBoundingClientRect()
        const xPosition: number = closeButtonPosition.x + closeButtonPosition.width
        const yPosition: number = closeButtonPosition.y + closeButtonPosition.height
        this.containerRef.current!.style.clipPath = `circle(0% at ${xPosition}px ${yPosition}px)`
    }
}
