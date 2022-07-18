import ContactForm from "@components/form/ContactForm"
import MenuContact from "@components/menu/contact/MenuContact"
import React, { Component, ReactNode } from "react"
import PoppingLetteringAnimation from "src/animations/PoppingLetteringAnimation"
import styles from "./ContactLayout.module.sass"

export default class ContactLayout extends Component {

    letteringRef

    constructor(props: {}) {
        super(props)
        this.letteringRef = React.createRef<HTMLHeadingElement>()
    }

    componentDidMount(): void {
        const letteringAnimation: PoppingLetteringAnimation = new PoppingLetteringAnimation(this.letteringRef.current)
        letteringAnimation.fixGradientLettering(styles.gradient)
        letteringAnimation.run()
    }

    render(): ReactNode {
        return (
            <main className={styles.contact}>
                <MenuContact />

                <div className={styles.content}>
                    <h1 className={styles.lettering} ref={this.letteringRef}>
                        <span>We are</span><br />
                        <div className={styles.gradient}>the engine</div>
                        <div className={styles.gradient}>of the</div>
                        <div className={styles.gradient}>future</div>
                    </h1>

                    <div className={styles.contact}>
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
