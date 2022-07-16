import MenuContact from "@components/menu/contact/MenuContact"
import { Component, ReactNode } from "react"
import styles from "./ContactLayout.module.sass"

export default class ContactLayout extends Component {

    render(): ReactNode {
        return (
            <main className={styles.contact}>
                <MenuContact />

            </main>
        )
    }
}
