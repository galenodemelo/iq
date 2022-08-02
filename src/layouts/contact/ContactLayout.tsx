import ContactForm from "@components/form/ContactForm"
import MenuContact from "@components/menu/contact/MenuContact"
import React, { ReactNode } from "react"
import CircleExpanding, { CircleExpandingProps } from "src/animations/CircleExpanding"
import PoppingLetteringAnimation from "src/animations/PoppingLetteringAnimation"
import styles from "./ContactLayout.module.sass"

export default class ContactLayout extends CircleExpanding<CircleExpandingProps, any> {

    letteringRef: React.RefObject<HTMLHeadingElement>
    letteringAnimation: PoppingLetteringAnimation

    constructor(props: CircleExpandingProps) {
        super(props)
        this.letteringRef = React.createRef<HTMLHeadingElement>()
        this.letteringAnimation = new PoppingLetteringAnimation(this.letteringRef, styles.gradient)
    }

    componentDidUpdate(): void {
        super.componentDidUpdate()

        if (!this.props.active) return
        this.letteringAnimation.run()
    }

    render(): ReactNode {
        return (
            <main className={styles.contact} data-active={this.props.active} ref={this.containerRef}>
                <MenuContact closeButtonRef={this.closeButtonRef} />

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
}
