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

    animationDurationInMilliseconds: number = 500
    animationDurationInSeconds: number = this.animationDurationInMilliseconds / 1000
    minDistanceToDragInPercentage: number = 75

    activeBackgroundRef
    handlerRef
    poweredOnRef
    poweredOffRef
    switchRef

    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.activeBackgroundRef = React.createRef<HTMLDivElement>()
        this.handlerRef = React.createRef<HTMLDivElement>()
        this.poweredOnRef = React.createRef<HTMLDivElement>()
        this.poweredOffRef = React.createRef<HTMLDivElement>()
        this.switchRef = React.createRef<HTMLDivElement>()

        this.state = {
            distanceToDrag: 0,
            progress: 0,
            switchPadding: 0
        }
    }

    get activeBackgroundObject(): HTMLDivElement | null { return this.activeBackgroundRef.current }
    get handlerObject(): HTMLDivElement | null { return this.handlerRef.current }
    get poweredOnObject(): HTMLDivElement | null { return this.poweredOnRef.current }
    get poweredOffObject(): HTMLDivElement | null { return this.poweredOffRef.current }
    get switchObject(): HTMLDivElement | null { return this.switchRef.current }
    get progressInPercentage(): number {
        return this.state.progress / this.state.distanceToDrag * 100
    }

    componentDidMount(): void {
        if (!this.switchObject || !this.handlerObject) return

        this.setState({ switchPadding: parseFloat(window.getComputedStyle(this.switchObject, null).getPropertyValue("padding-right")) }, () => {
            if (!this.switchObject || !this.handlerObject) return

            const handlerWidth: number = this.handlerObject.offsetWidth
            const switchWidth: number = this.switchObject.offsetWidth
            const padding: number = this.state.switchPadding
            this.setState({distanceToDrag: switchWidth - padding * 2 - handlerWidth})
        })

        window.switchComponent = this
        this.bind()
    }

    bind(): void {
        this.switchObject?.addEventListener("mousedown", (event: MouseEvent) => {
            this.followMouseMoving(event)
            document.addEventListener("mousemove", this.followMouseMoving, { passive: true })
            document.addEventListener("mouseup", this.stopMouseMoving, { passive: true })
        }, { passive: true })
    }

    moveHandler(): void {
        const _this: Switch = window.switchComponent
        if (!_this.switchObject || !_this.handlerObject) return

        if (_this.state.progress < 0) {
            _this.setState({ progress: 0 })
        } else if (_this.state.progress > _this.state.distanceToDrag) {
            _this.setState({ progress: _this.state.distanceToDrag })
        }

        _this.handlerObject.style.left = `${_this.state.progress}px`
        _this.updateActiveTransparency()
        _this.updatePoweredBoxes()
    }

    followMouseMoving(event: MouseEvent):void {
        const _this: Switch = window.switchComponent
        if (!_this.switchObject || !_this.handlerObject) return

        const handlerWidth: number = _this.handlerObject.offsetWidth
        const padding: number = _this.state.switchPadding

        const initialPosition: number = _this.switchObject.offsetLeft + padding
        let progress: number = event.clientX - initialPosition - handlerWidth / 2
        _this.setState({progress: progress})
        _this.moveHandler()
    }

    stopMouseMoving(): void {
        const _this: Switch = window.switchComponent
        document.removeEventListener("mousemove", _this.followMouseMoving)
        document.removeEventListener("mouseup", _this.stopMouseMoving)

        const reachedMinimumDistance: boolean = _this.progressInPercentage >= _this.minDistanceToDragInPercentage
        if (!reachedMinimumDistance) {
            _this.moveHandlerToStart()
        } else {
            _this.moveHandlerToEnd()
        }
    }

    moveHandlerToStart(): void {
        this.dropHandlerAnimation()
        this.setState({progress: 0})
        this.moveHandler()
    }

    moveHandlerToEnd(): void {
        this.dropHandlerAnimation()
        this.setState({progress: this.state.distanceToDrag})
        this.moveHandler()
    }

    dropHandlerAnimation() {
        if (this.handlerObject) this.handlerObject.style.transition = `left ${this.animationDurationInSeconds}s ease`
        if (this.activeBackgroundObject) this.activeBackgroundObject.style.transition = `opacity ${this.animationDurationInSeconds}s ease`
        if (this.poweredOnObject) this.poweredOnObject.style.transition = `width ${this.animationDurationInSeconds}s ease`
        if (this.poweredOffObject) this.poweredOffObject.style.transition = `width ${this.animationDurationInSeconds}s ease`

        setTimeout(() => {
            if (this.handlerObject) this.handlerObject.style.transition = ""
            if (this.activeBackgroundObject) this.activeBackgroundObject.style.transition = ""
            if (this.poweredOnObject) this.poweredOnObject.style.transition = ""
            if (this.poweredOffObject) this.poweredOffObject.style.transition = ""
        }, this.animationDurationInMilliseconds)
    }

    updateActiveTransparency(): void {
        const _this: Switch = window.switchComponent
        if (!_this.activeBackgroundObject) return

        _this.activeBackgroundObject.style.opacity = `${_this.progressInPercentage / 100}`
    }

    updatePoweredBoxes(): void {
        const _this: Switch = window.switchComponent
        if (!_this.poweredOnObject || !_this.poweredOffObject) return

        const poweredOnWidth: number = _this.progressInPercentage
        const poweredOffWidth: number = 100 - _this.progressInPercentage

        _this.poweredOnObject.style.width = `${poweredOnWidth}%`
        _this.poweredOffObject.style.width = `${poweredOffWidth}%`
    }

    render(): React.ReactNode {
        return (
            <div className={styles.switch} ref={this.switchRef}>
                <div className={styles.activeBackground} ref={this.activeBackgroundRef}></div>
                <div className={styles.poweredOn} ref={this.poweredOnRef}>Powered on</div>
                <div className={styles.poweredOff} ref={this.poweredOffRef}>Powered off</div>
                <div className={styles.handler} ref={this.handlerRef}></div>
            </div>
        )
    }
}
