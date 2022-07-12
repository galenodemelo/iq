import styles from "./IndexLayout.module.sass"
import Switch from "@components/switch/Switch"

export default function IndexLayout() {
    return (
        <div className={styles.backdrop}>
            <Switch />
        </div>
    )
}
