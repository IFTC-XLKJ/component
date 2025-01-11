class aVideoPlayer {
    #element = null;
    #config = {
        src: null,
        cover: null,
        width: "100%",
        height: "100%",
        loop: false,
    }
    #video = null
    #id = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    #events = {}
    #topBar = null
    #bottomBar = null
    #progressForeground = null
    #progressBackground = null
    #slider = null
    #dragger = null
    #lastPlay = false
    #playBtn = null
    #pauseBtn = null
    #isCtrlShow = true
    #showCtrlTime = Date.now()
    constructor(element, config) {
        this.#element = element;
        if (config) {
            if (config.src) {
                this.#config.src = config.src
            }
            if (config.cover) {
                this.#config.cover = config.cover
            }
            if (config.width) {
                this.#config.width = config.width
            }
            if (config.height) {
                this.#config.height = config.height
            }
        }
        console.log(this.#config)
        const id = `videoplayer_${this.#id}`
        this.setStyle()
        this.#element.innerHTML = mainVideoPlayer(config, this.#element, id)
        const video = this.#element.querySelector("video")
        this.#video = video
        this.#topBar = this.#element.querySelector(".top-bar")
        this.#bottomBar = this.#element.querySelector(".bottom-bar")
        this.#progressForeground = this.#element.querySelector(".progress-foreground")
        this.#progressBackground = this.#element.querySelector(".progress-background")
        this.#slider = this.#element.querySelector(".slider")
        this.#playBtn = this.#element.querySelector(".play")
        this.#pauseBtn = this.#element.querySelector(".pause")
        video.onloadedmetadata = e => {
            this.#emit("load", e)
        }
        video.onplay = e => {
            this.#lastPlay = false
            this.#playBtn.style.display = "flex"
            this.#pauseBtn.style.display = "none"
            this.#emit("play", e)
        }
        video.onpause = e => {
            this.#lastPlay = true
            this.#playBtn.style.display = "none"
            this.#pauseBtn.style.display = "flex"
            this.#emit("pause", e)
        }
        video.oncanplay = e => {
            this.#emit("canplay", e)
        }
        video.onsuspend = e => {
            this.#emit("suspend", e)
        }
        this.#pauseBtn.addEventListener("click", e => {
            this.play()
        })
        this.#playBtn.addEventListener("click", e => {
            this.pause()
        })
        this.#playBtn.style.display = "none"
        this.#element.oncontextmenu = e => {
            const oldmenu = document.body.querySelector(".menu")
            if (oldmenu) {
                oldmenu.remove()
            }
            const menu = document.createElement("div")
            menu.classList.add("menu")
            menu.style.left = e.pageX + "px"
            menu.style.top = e.pageY + "px"
            const version = document.createElement("span")
            version.classList.add("menu-item")
            version.innerText = "播放器版本：" + this.version()
            menu.appendChild(version)
            this.#element.addEventListener("click", e => {
                menu.remove()
            })
            document.body.appendChild(menu)
        }
        try {
            Dragger;
            this.#dragger = new Dragger(this.#slider, {
                direction: "Horizontal",
            })
            this.#dragger.goto(null, -5)
            this.#dragger.onDragStart = e => {
                this.#emit("dragstart", e)
            }
        } catch (e) {
            console.warn("未引入Dragger.js，将无法实现进度条拖动功能")
        }

        setInterval(() => {
            this.#topBar.style.bottom = this.#element.offsetHeight + 2.75 + "px"
            this.#progressForeground.style.width = ((this.getProgress() / this.getDuration()) * 100) + "%"
            if (this.#dragger) {
                if (!this.#dragger.isDragging) {
                    this.#slider.style.left = ((this.getProgress() / this.getDuration()) * this.#element.offsetWidth) - 6 + "px"
                    this.#dragger.goto(((this.getProgress() / this.getDuration()) * this.#element.offsetWidth) - 6, null)
                } else {
                    const draggedPer = this.#dragger.initPosition.x / this.#element.offsetWidth
                    this.#progressForeground.style.width = draggedPer * 100 + "%"
                    console.log(this.getDuration() * draggedPer)
                    video.currentTime = video.duration * draggedPer
                }
            } else {
                this.#slider.style.left = ((this.getProgress() / this.getDuration()) * this.#element.offsetWidth) - 4 + "px"
            }
            if (Date.now() - this.#showCtrlTime > 5000 && this.#isCtrlShow) {
                const target = document.createElement("div")
                haddleCtrl({
                    target: target
                })
            }
        })
        this.#slider.addEventListener("click", e => {
            const draggedPer = e.clientX / this.#element.offsetWidth
            this.#slider.style.left = e.clientX - 6 + "px"
            this.#dragger.goto(e.clientX - 6, null)
            video.currentTime = video.duration * draggedPer
        })
        this.#progressForeground.addEventListener("click", e => {
            const draggedPer = e.clientX / this.#element.offsetWidth
            this.#slider.style.left = e.clientX - 6 + "px"
            this.#dragger.goto(e.clientX - 6, null)
            video.currentTime = video.duration * draggedPer
        })
        this.#progressBackground.addEventListener("click", e => {
            const draggedPer = e.clientX / this.#element.offsetWidth
            this.#slider.style.left = e.clientX - 6 + "px"
            this.#dragger.goto(e.clientX - 6, null)
            video.currentTime = video.duration * draggedPer
        })
        if (isMobileDevice()) {
            this.#element.addEventListener("click", haddleCtrl)
            this.#element.addEventListener("touchstart", haddleSpeedUp)
            document.addEventListener("touchend", haddleSpeedDown)
        } else {

        }
        this.#element.addEventListener("dblclick", haddleDBClick)
        const that = this

        function haddleCtrl(e) {
            const topBar = that.#topBar
            const bottomBar = that.#bottomBar
            const playButton = that.#element.querySelector(".playButton")
            const progressForeground = that.#progressForeground
            const progressBackground = that.#progressBackground
            const slider = that.#slider
            const parentTarget = e.target.parentElement || null
            const parentParentTarget = parentTarget ? parentTarget.parentElement || null : null

            if (
                e.target == playButton ||
                parentTarget == playButton ||
                parentParentTarget == playButton
            ) {
                return void 0
            }
            if (
                e.target == progressForeground ||
                e.target == progressBackground ||
                e.target == slider
            ) {
                return void 0
            }
            if (that.#isCtrlShow) {
                topBar.style.display = "none"
                bottomBar.style.display = "none"
                playButton.style.display = "none"
                that.#isCtrlShow = false
            } else {
                topBar.style.display = "flex"
                bottomBar.style.display = "block"
                playButton.style.display = "flex"
                that.#isCtrlShow = true
                that.#showCtrlTime = Date.now()
            }
        }

        function haddleDBClick(e) {
            if (that.isPlay()) {
                that.pause()
            } else {
                that.play()
            }
        }

        function haddleSpeedUp(e) {
            that.#video.playbackRate = 2
        }

        function haddleSpeedDown(e) {
            that.#video.playbackRate = 1
        }

        function isMobileDevice() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }

        if (isMobileDevice()) {
            console.log('当前设备：移动端');
        } else {
            console.log('当前设备：PC端');
        }
    }
    play() {
        return this.#video.play()
    }
    pause() {
        this.#video.pause()
    }
    load() {
        this.#video.load()
        this.#playBtn.style.display = "none"
        this.#pauseBtn.style.display = "flex"
    }
    isPlay() {
        return !this.#video.paused
    }
    getDuration() {
        return this.#video.duration
    }
    getProgress() {
        return this.#video.currentTime
    }
    setProgress(progress) {
        try {
            this.#video.currentTime = progress
        } catch (e) {
            console.log(e)
        }
    }
    setUrl(src) {
        this.#video.src = src
        this.#playBtn.style.display = "none"
        this.#pauseBtn.style.display = "flex"
    }
    setStyle() {
        const id = `videoplayer_${this.#id}`
        const oldstyle = document.head.querySelector(`[iftc-style=${id}]`)
        if (oldstyle) {
            oldstyle.remove()
        }
        const style = document.createElement('style');
        style.setAttribute("iftc-style", id)
        style.innerHTML = getVideoPlayerStyle(this.#config, this.#video);
        document.head.appendChild(style);
    }
    getSize(callback) {
        const video = document.createElement("video");
        video.src = this.#config.src;
        video.addEventListener('loadedmetadata', function() {
            var width = video.videoWidth;
            var height = video.videoHeight;
            callback(width, height)
        });
    }
    getReadyState() {
        return this.#video.readyState
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
    version() {
        return "1.0.0"
    }
}
window.VideoPlayer = aVideoPlayer

function getVideoPlayerStyle(config) {
    return `.video-player-global {
    position: relative;
}
.menu {
    background-color: #33333388;
    padding: 5px;
    position: fixed;
    border-radius: 7px;
}
.menu-item {
    color: white;
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    font-size: 12px;
}
.playButton {
    background-color: rgba(0,0,0,0);
    border: none;
    bottom: 130px;
}
.slider {
    border-radius: 50%;
    width: 5px;
    height: 5px;
    background-color: lightskyblue;
    box-shadow: 0 0 3px #33333350;
    padding: 5px;
}`
}

function mainVideoPlayer(config, element, id) {
    return `<video id="${id}" class="video-player-global" src="${config.src}" poster="${config.cover}" style="width: 100%;height: 100%;"${config.loop ? " loop" : ""}></video>
<div class="video-player-global top-bar" style="background-image: linear-gradient(to top, rgba(0, 0, 0, 0), #33333380);bottom: ${element.offsetHeight}px;width: 100%;height: 30px;"></div>
<div class="video-player-global bottom-bar" style="background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), #33333380);bottom: 65px;width: 100%;height: 30px;">
    <div class="video-player-global progress-background" style="width: 100%;height: 5px;background-color: lightgrey;bottom: 0px;left: 0px;"></div>
    <div class="video-player-global progress-foreground" style="width: 0%;height: 5px;background-color: lightskyblue;bottom: 5px;left: 0px;"></div>
    <div class="video-player-global slider" style="bottom: 7.25px;left: calc(0% - 2.5px);"></div>
</div>
<button class="video-player-global playButton">
    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="play">
        <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/>
        <path d="M19 18V30" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M29 18V30" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="pause">
        <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/>
        <path d="M20 24V17.0718L26 20.5359L32 24L26 27.4641L20 30.9282V24Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/>
    </svg>
</button>`
}