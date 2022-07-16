import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"
import Menu, { MenuLogoType } from "../Menu"
import styles from "./MenuIndex.module.sass"

interface State {
    showNav: boolean
}

interface Props {
    muted: boolean
    onSoundButtonClick: Function
}

export default class MenuIndex extends Menu {

    constructor(props: Props) {
        super(props, MenuLogoType.ANIMATED)
        this.state = { showNav: false }
    }

    componentDidMount(): void {
        setTimeout(() => this.setState({showNav: true}), 2000)
    }

    renderNavigation(): ReactNode {
        return (
            <nav className={styles.nav} data-show={this.state.showNav}>
                <div className={styles.links}>
                    <Link href="/contact">
                        <a>Be smart!</a>
                    </Link>
                </div>

                <button className={styles.soundButton} onClick={() => this.props.onSoundButtonClick()}>
                    {this.props.muted
                        ? <Image src="/img/ico-sound-off.svg" layout="fill" alt="Turn on video sound" />
                        : <Image src="/img/ico-sound-on.svg" layout="fill" alt="Turn off video sound" />
                    }
                </button>
            </nav>
        )
    }
}
