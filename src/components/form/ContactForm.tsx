import Image from "next/image"
import React, { Component, ReactNode } from "react"
import styles from "./ContactForm.module.sass"

type State = {
    isSubmiting: boolean
}

export default class ContactForm extends Component<any, State> {

    formReference: React.RefObject<HTMLFormElement>
    constructor(props: {}) {
        super(props)
        this.formReference = React.createRef<HTMLFormElement>()

        this.state = { isSubmiting: false }
        this.send = this.send.bind(this)
    }

    async send(): Promise<void> {
        if (!this.formReference.current) return
        try {
            this.setState({ isSubmiting: true })
            const formData: FormData = new FormData(this.formReference.current)
            const formAction: string = this.formReference.current.getAttribute("action")!.toString()
            const formMethod: string = this.formReference.current.getAttribute("method")!.toString()
            const formDataAsJson: string = JSON.stringify(Object.fromEntries(formData))

            const response: Response = await fetch(formAction, {
                method: formMethod,
                headers: new Headers({"Content-Type": "application/json"}),
                body: formDataAsJson
            })
            const responseJson: { success: boolean, errorList?: Array<string>, message?: string } = await response.json()
            if (!responseJson.success) {
                alert(responseJson.errorList?.join("\n"))
                return
            }

            alert(responseJson.message)
            this.formReference.current.reset()
        } catch (error) {
            console.error(error)
            alert("An unexpected error ocurred. Please, contact the support")
        } finally {
            this.setState({ isSubmiting: false })
        }
    }

    render(): ReactNode {
        return (
            <form className={styles.contactForm} action="/api/contact" method="POST" autoComplete="off" ref={this.formReference}>
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
