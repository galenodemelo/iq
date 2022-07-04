import React, { Component } from "react"
import styles from "./Switch.module.sass"

export default class Switch extends Component<any, State> {

    handlerRef
    switchRef

    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.handlerRef = React.createRef<HTMLDivElement>()
        this.switchRef = React.createRef<HTMLDivElement>()
    }
    render(): React.ReactNode {
        return (
            <div className={styles.switch} ref={this.switchRef}>
                <div className={styles.handler} ref={this.handlerRef}></div>
            </div>
        )
    }
}
