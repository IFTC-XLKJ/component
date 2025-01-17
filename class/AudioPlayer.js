class aAudioPlayer {
    #config = {
        src: "",
        loop: false,
        autoplay: false,
        muted: false,
        volume: 1,
    };
    #audio = null;
    #events = {};
    constructor(element, config) {
        this.#audio = new Audio();
        if (config) {
            if (config.src) {
                this.#config.src = config.src;
            }
            if (config.loop) {
                this.audio.loop = config.loop;
            }
            if (config.autoplay) {
                this.audio.autoplay = config.autoplay;
            }
            if (config.muted) {
                this.audio.muted = config.muted;
            }
            if (config.volume) {
                this.audio.volume = config.volume;
            }
        }
        this.#audio.src = this.#config.src;
        this.#audio.onloadedmetadata = e => {
            this.#emit("load", e);
            if (this.#config.loop) {
                this.#audio.loop = true;
            }
            if (this.#config.autoplay) {
                this.#audio.play();
            }
            if (this.#config.muted) {
                this.#audio.muted = true;
            }
        }
    }
    play() {
        return this.#audio.play();
    }
    pause() {
        return this.#audio.pause();
    }
    on(name, callback) {
        if (!this.#events[name]) {
            this.#events[name] = [];
        }
        this.#events[name].push(callback);
    }
    #emit(name, ...args) {
        if (this.#events[name]) {
            this.#events[name].forEach(callback => callback(...args));
        }
    }
}
window.AudioPlayer = aAudioPlayer;