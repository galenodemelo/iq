import { Component, ReactNode } from "react"
import styles from "./GradientLettering.module.sass"

export default class GradientLettering extends Component<any, any> {
    render(): ReactNode {
        return (
            <span className={styles.gradientLettering}>
                {this.props.children}
            </span>
        )
    }
}
