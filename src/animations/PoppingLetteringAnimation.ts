import anime, { AnimeInstance } from "animejs"
import Animation from "./Animation"

// Source: https://tobiasahlin.com/moving-letters/#9
export default class PoppingLetteringAnimation implements Animation {

    private classToFix: string | null
    private target: React.RefObject<HTMLElement>
    private executed: boolean = false

    letterClass: string = "poppingLetteringLetter"
    targetClass: string = `.${this.letterClass}`
    onCompleted: Function = () => {}

    constructor(target: React.RefObject<HTMLElement>, classToFix: string | null = null) {
        this.target = target
        this.classToFix = classToFix
    }

    fixGradientLettering(): void {
        const elementWithAnimationList: NodeListOf<HTMLElement> = document.querySelectorAll(`.${this.classToFix}`)
        elementWithAnimationList.forEach((elementWithAnimation: HTMLElement) => {
            elementWithAnimation.style.animationPlayState = "paused"

            const elementList: NodeListOf<HTMLElement> = elementWithAnimation.querySelectorAll(this.targetClass)
            elementList.forEach((element: HTMLElement) => {
                element.style.color = "#ee7752"
            })
        })

        this.onCompleted = (anime: AnimeInstance) => {
            elementWithAnimationList.forEach((elementWithAnimation: HTMLElement, index: number) => {
                const elementList: NodeListOf<HTMLElement> = elementWithAnimation.querySelectorAll(this.targetClass)
                elementList.forEach((element: HTMLElement) => {
                    element.style.transform = "unset"
                    element.style.color = "transparent"
                })

                elementWithAnimation.classList.remove(this.classToFix ?? "")
                elementWithAnimation.classList.add(this.classToFix ?? "")
                setTimeout(() => elementWithAnimation.style.animationPlayState = "running", 150 * index + 100)
            })
        }
    }

    async run(): Promise<void> {
        if (this.executed) return
        this.executed = true

        this.splitLetters(this.target.current)
        if (this.classToFix) this.fixGradientLettering()

        await anime.timeline().add({
            targets: this.targetClass,
            scale: [0, 1],
            duration: 1500,
            delay: (el, i) => 50 * (i+1),
            complete: (anime) => this.onCompleted(anime)
        }).finished
    }

    private splitLetters(target: Element | null): void {
        if (!target?.hasChildNodes()) return

        const childrenList: HTMLCollection = target.children
        for (let i: number = 0; i < childrenList.length; i++) {
            const child: Element = childrenList[i]

            if (child.hasChildNodes() && !child.textContent?.length) {
                this.splitLetters(child)
                continue
            }

            child.innerHTML = child.textContent!.replace(/\S/g, `<span class="${this.letterClass}" style="display: inline-block; transform-origin: 50% 100%;">$&</span>`)
        }
    }
}
