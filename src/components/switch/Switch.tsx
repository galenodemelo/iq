import React, { Component } from "react"
import styles from "./Switch.module.sass"

interface State {
    distanceToDrag: number
    progress: number
    switchPadding: number
}

declare global {
    interface Window {
        switchComponent: Switch
    }
}

export default class Switch extends Component<any, State> {

    handlerRef
    minDistanceToDragInPercentage: number = 75
    switchRef

    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.handlerRef = React.createRef<HTMLDivElement>()
        this.switchRef = React.createRef<HTMLDivElement>()

        this.state = {
            distanceToDrag: 0,
            progress: 0,
            switchPadding: 0
        }
    }

    get switchObject(): HTMLDivElement | null { return this.switchRef.current }
    get handlerObject(): HTMLDivElement | null { return this.handlerRef.current }
    get progressInPercentage(): number {
        return this.state.progress / this.state.distanceToDrag * 100
    }

    componentDidMount(): void {
        if (!this.switchObject || !this.handlerObject) return

        this.setState({
            switchPadding: parseFloat(window.getComputedStyle(this.switchObject, null).getPropertyValue("padding-left"))
        })

        window.switchComponent = this
        this.bind()
    }

    bind(): void {
        document.addEventListener("mousedown", () => {
            document.addEventListener("mousemove", this.moveHandler, { passive: true })
            document.addEventListener("mouseup", this.stopHandler, { passive: true })
        }, { passive: true })
    }

    moveHandler(event: MouseEvent): void {
        const _this: Switch = window.switchComponent
        if (!_this.switchObject || !_this.handlerObject) return

        const handlerWidth: number = _this.handlerObject.offsetWidth
        const switchWidth: number = _this.switchObject.offsetWidth
        const padding: number = _this.state.switchPadding

        const initialPosition: number = _this.switchObject.offsetLeft + padding
        const distanceToDrag: number = switchWidth - padding * 2 - handlerWidth

        let progress: number = event.clientX - initialPosition - handlerWidth / 2
        if (progress < 0) progress = 0
        else if (progress > distanceToDrag) progress = distanceToDrag

        _this.setState({
            distanceToDrag: distanceToDrag,
            progress: progress
        })

        _this.handlerObject.style.left = `${_this.state.progress}px`
    }

    stopHandler(): void {
        const _this: Switch = window.switchComponent
        document.removeEventListener("mousemove", _this.moveHandler)

        const reachedMinimumDistance: boolean = _this.progressInPercentage >= _this.minDistanceToDragInPercentage
        if (!reachedMinimumDistance) {
            _this.moveHandlerToStart()
        } else {
            _this.moveHandlerToEnd()
        }

        document.removeEventListener("mouseup", _this.stopHandler)
    }

    moveHandlerToStart(): void {
        if (!this.handlerObject) return

        const animationDurationInMilliseconds: number = 500
        const animationDurationInSeconds: number = 500 / 1000

        this.handlerObject.style.transition = `left ${animationDurationInSeconds}s ease`
        this.handlerObject.style.left = "0px"

        setTimeout(() => {
            if (!this.handlerObject) return
            this.handlerObject.style.transition = ""
        }, animationDurationInMilliseconds)
    }

    moveHandlerToEnd(): void {
        if (!this.handlerObject) return

        const animationDurationInMilliseconds: number = 500
        const animationDurationInSeconds: number = 500 / 1000

        this.handlerObject.style.transition = `left ${animationDurationInSeconds}s ease`
        this.handlerObject.style.left = `${this.state.distanceToDrag}px`

        setTimeout(() => {
            if (!this.handlerObject) return
            this.handlerObject.style.transition = ""
        }, animationDurationInMilliseconds)
    }

    render(): React.ReactNode {
        return (
            <div className={styles.switch} ref={this.switchRef}>
                <div className={styles.handler} ref={this.handlerRef}></div>
            </div>
        )
    }
}
