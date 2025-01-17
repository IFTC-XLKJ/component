class aAudioPlayer {
    #config = {\
        src: "",
        cover: "",
        loop: false,
        autoplay: false,
        muted: false,
        volume: 1,
        controls: false,
        preload: "auto",
        poster: "",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer",
        playsinline: true,
        autoplay: true,
        muted:true,
    };
    constructor(element, config) {
        this.audio = new Audio();
        this.audio.addEventListener('ended', () => {
            this.audio.currentTime = 0;
            this.audio.play();
        });
    }
}
window.AudioPlayer = aAudioPlayer;