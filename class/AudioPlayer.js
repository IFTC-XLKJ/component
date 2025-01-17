class aAudioPlayer {
    #config = {
        src: "",
        loop: false,
        autoplay: false,
        muted: false,
        volume: 1,
    };
    constructor(element, config) {
        this.audio = new Audio();
        if (config) {
            if (config.src) {
                this.audio.src = config.src;
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
        this.audio.addEventListener('ended', () => {
            this.audio.currentTime = 0;
            this.audio.play();
        });
    }
}
window.AudioPlayer = aAudioPlayer;