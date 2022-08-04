import anime, { AnimeInstance } from "animejs"
import Animation from "./Animation"

// Source: https://tobiasahlin.com/moving-letters/#9
export default class PoppingLetteringAnimation implements Animation {

    private classToFix: string | null
    private target: React.RefObject<HTMLElement>
    private executed: boolean = false

    letterClass: string = "poppingLetteringLetter"
    targetClass: string = `.${this.letterClass}`
    onUpdate: Function = () => {}

    constructor(target: React.RefObject<HTMLElement>, classToFix: string | null = null) {
        this.target = target
        this.classToFix = classToFix
    }

    fixGradientLettering(): void {
        const elementList: NodeListOf<HTMLElement> = document.querySelectorAll(`.${this.classToFix} ${this.targetClass}`)
        elementList.forEach((element: HTMLElement, index: number) => {
            element.style.color = "#1EBD98"
            element.style.animationPlayState = "paused"
        })

        this.onUpdate = (anime: AnimeInstance) => elementList.forEach(element => {
            if (element.style.transform != "scale(1)") return

            element.style.transform = "none"
            setTimeout(() => element.style.color = "transparent", 50)
        })
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
            update: (anime) => this.onUpdate(anime)
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
