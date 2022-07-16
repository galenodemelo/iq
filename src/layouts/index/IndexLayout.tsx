import MenuIndex from "@components/menu/index/MenuIndex"
import Switch from "@components/switch/Switch"
import React, { Component } from "react"
import styles from "./IndexLayout.module.sass"

interface State {
    backdrop: boolean
    muted: boolean
    showMenu: boolean
}

export default class IndexLayout extends Component<any, State> {

    backdropRef
    videoPlayerRef

    constructor(props: {}) {
        super(props)

        this.backdropRef = React.createRef<HTMLDivElement>()
        this.videoPlayerRef = React.createRef<HTMLVideoElement>()

        this.state = {
            backdrop: true,
            muted: true,
            showMenu: false
        }
    }

    showContent(): void {
        this.videoPlayerRef.current?.play()
        this.setState({
            backdrop: false,
            muted: false
        })

        setTimeout(() => {
            this.backdropRef.current?.remove()
            this.setState({showMenu: true})
        }, 1000)
    }

    toggleMuted = () => this.setState({ muted: !this.state.muted })

    render(): React.ReactNode {
        return (
            <main className={styles.home}>
                <div className={styles.backdrop} data-show={this.state.backdrop} ref={this.backdropRef}>
                    <div className={styles.switchWrapper} data-show={this.state.backdrop}>
                        <Switch onMoveToEnd={() => this.showContent()} />
                    </div>
                </div>

                <div className={styles.content}>
                    <video className={styles.video} controls={false} preload="metadata" muted={this.state.muted} loop={true} ref={this.videoPlayerRef}>
                        <source src="/videos/teaser.webm" type="video/webm" />
                        <source src="/videos/teaser.mp4" type="video/mp4" />
                    </video>

                    {this.state.showMenu &&
                        <MenuIndex muted={this.state.muted} onSoundButtonClick={() => this.toggleMuted()} />
                    }
                </div>
            </main>
        )
    }
}
