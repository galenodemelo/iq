import Image from "next/image"
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
                <Image src="/img/iq-logo-animated.gif" key={1} width={300} height={108} layout="fixed" alt="IQ - Powered by people" />
            </header>
        )
    }
}
