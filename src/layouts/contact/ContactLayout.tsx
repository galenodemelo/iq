import MenuContact from "@components/menu/contact/MenuContact"
import { Component, ReactNode } from "react"
import styles from "./ContactLayout.module.sass"

export default class ContactLayout extends Component {

    render(): ReactNode {
        return (
            <main className={styles.contact}>
                <MenuContact />

                <div className={styles.content}>
                    <h1 className={styles.lettering}>
                        <span>We are</span><br />
                        <GradientLettering>
                            the engine<br />
                            of the<br />
                            future.
                        </GradientLettering>
                    </h1>
                </div>
            </main>
        )
    }
}
