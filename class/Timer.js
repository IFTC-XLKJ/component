class aTimer {
    #timeStart = 0;
    #time = 0;
    #marked = [];
    _isTiming = false;
    get isTiming() {
        this._isTiming = !!this.#timeStart;
        return this._isTiming;
    }
    constructor() { }
    start() {
        this.#timeStart = Date.now();
    }
    get() {
        if (!this.#timeStart) {
            console.error("计时器还未开始计时");
            return null;
        }
        this.#time = Date.now() - this.#timeStart;
        return this.#time;
    }
    mark() {
        this.#marked.push(this.get());
    }
    getMark() {
        return this.#marked;
    }
    markCount() {
        return this.#marked.length;
    }
    clear() {
        this.#timeStart = Date.now();
        this.#marked = [];
    }
    stop() {
        this.#time = 0;
        this.#timeStart = 0;
    }

    formatTime(milliseconds) {
        let hours = Math.floor(milliseconds / 3600000);
        let minutes = Math.floor((milliseconds % 3600000) / 60000);
        let seconds = Math.floor((milliseconds % 60000) / 1000);
        let ms = milliseconds % 1000;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
    }

    toString() {
        return this.formatTime(this.#time);
    }
}
window.Timer = aTimer;
console.log("Timer.js已加载");
console.log("文档：/docs/Timer.md");