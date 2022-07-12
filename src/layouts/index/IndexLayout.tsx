import Switch from "@components/switch/Switch"
import React, { Component } from "react"
import styles from "./IndexLayout.module.sass"

interface State {
}

export default class IndexLayout extends Component<any, State> {

    render(): React.ReactNode {
        return (
            <div className={styles.home}>
            </div>
        )
    }
}
