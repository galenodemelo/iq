import Image from "next/image"
import { Component, ReactNode } from "react"
import styles from "./ContactForm.module.sass"

type State = {
    isSubmiting: boolean
}

export default class ContactForm extends Component<any, State> {

    constructor(props: {}) {
        super(props)
        this.state = { isSubmiting: false }
        this.send = this.send.bind(this)
    }

    async send(): Promise<void> {
        try {
            this.setState({ isSubmiting: true })
    }
        } catch (error) {
            console.error(error)
            alert("An unexpected error ocurred. Please, contact the support")
        } finally {
            this.setState({ isSubmiting: false })
        }
    }

    render(): ReactNode {
        return (
            <form className={styles.contactForm} action="/api/contact/contact" method="POST" autoComplete="off">
                <div className={styles.field}>
                    <input type="text" name="fullName" placeholder="Full Name" aria-label="Full Name" required />
                </div>
                <div className={styles.field}>
                    <input type="email" name="email" placeholder="E-mail" aria-label="E-mail" required />
                </div>
                <div className={styles.field}>
                    <input type="tel" name="phone" placeholder="Phone Number" aria-label="Phone Number" required />
                </div>

                <p className={styles.helperText}>
                    By filling out this form, I give my permission to<br />
                    contact me via e-mail and cell phone.
                </p>

                <button type="button" className={styles.btoSubmit} disabled={this.state.isSubmiting} onClick={this.send}>
                    <Image src="/img/ico-gradient-arrow.svg" layout="fill" alt="Send button" />
                </button>
            </form>
        )
    }
}
