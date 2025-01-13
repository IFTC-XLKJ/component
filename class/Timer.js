class aTimer {
    #timeStart = 0;
    #time = 0;
    #marked = []
    _isTiming = false
    get isTiming() {
        this._isTiming = !!this.#timeStart
        return this._isTiming
    }
    constructor() { }
    start() {
        this.#timeStart = Date.now()
    }
    get() {
        if (!this.#timeStart) {
            console.error("计时器还未开始计时")
            return null
        }
        this.#time = Date.now() - this.#timeStart
        return this.#time
    }
    mark() {
        this.#marked.push(this.get())
    }
    getMark() {
        return this.#marked
    }
    markCount() {
        return this.#marked.length
    }
    clear() {
        this.#timeStart = Date.now();
        this.#marked = []
    }
    stop() {
        this.#time = 0
        this.#timeStart = 0
    }
    isTiming() {
        return !!this.#timeStart
    }
}
window.Timer = aTimer