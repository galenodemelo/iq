import { Component, ReactNode } from "react"
import styles from "./Menu.module.sass"

interface Props {
    muted: boolean
    onSoundButtonClick: Function
}

export default class Menu extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    }

    render(): ReactNode {
        return (
            <header className={styles.menu}>
            </header>
        )
    }
}
