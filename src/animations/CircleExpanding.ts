import React, { Component } from "react"

export interface CircleExpandingProps {
    active: boolean
}

export default abstract class CircleExpanding<CustomProps extends CircleExpandingProps, State> extends Component<CustomProps, State> {

    protected closeButtonRef: React.RefObject<HTMLAnchorElement> = React.createRef<HTMLAnchorElement>()
    protected containerRef: React.RefObject<HTMLElement> = React.createRef<HTMLElement>()

    constructor(props: CustomProps) {
        super(props)
    }

    componentDidMount(): void {
        this.buildClipPath()

        this.containerRef.current!.style.clipPath = "circle(0%)"
        this.containerRef.current!.style.transition = "clip-path 1.2s cubic-bezier(0.7, 0, 0.8, 1)"
    }

    componentDidUpdate(): void {
        this.buildClipPath()
    }

    protected buildClipPath(): void {
        if (this.props.active) {
            this.containerRef.current!.style.clipPath = "circle(100%)"
            return
        }

        const closeButtonPosition = this.closeButtonRef.current!.getBoundingClientRect()
        const xPosition: number = closeButtonPosition.x + closeButtonPosition.width * 1.2
        const yPosition: number = closeButtonPosition.y
        this.containerRef.current!.style.clipPath = `circle(0% at ${xPosition}px ${yPosition}px)`
    }
}
