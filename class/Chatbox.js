class aChatbox {
    #config = {
        taColor: '#333',
        taBgcolor: 'white',
        ownBgcolor: 'rgb(0, 161, 255)',
        ownColor: 'white',
        initID: 0,
        bgcolor: 'rgb(238, 237, 242)',
    };
    #chatbox = null;
    #id = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    #width = 0;
    #chatID = this.#config.initID;
    #isBottom = true
    #autoScroll = false
    constructor(chatbox, config) {
        this.#chatbox = chatbox;
        this.#chatbox.classList.add('chatbox');
        const id = `chatbox_${this.#id}`
        this.#chatbox.setAttribute("iftc-id", id)
        if (config) {
            if (config.taColor) {
                this.#config.taColor = config.taColor
            }
            if (config.ownColor) {
                this.#config.ownColor = config.ownColor;
            }
            if (config.initID) {
                this.#config.initID = config.initID;
                this.#chatID = this.#config.initID
            }
            if (config.bgcolor) {
                this.#config.bgcolor = config.bgcolor
            }
        }
        this.#width = this.#chatbox.offsetWidth
        this.setStyle()
        addEventListener('resize', e => {
            console.log('resize')
            if (this.#chatbox.offsetWidth != this.#width) {
                this.setStyle()
                if (this.#isBottom) {
                    this.toBottom()
                }
            }
        })
        this.#chatbox.addEventListener("scroll", e => {
            console.log(e, this.#autoScroll)
            if (!this.#autoScroll) {
                return false;
            }
            const top = Number(this.#chatbox.scrollTop.toFixed(0));
            const height = this.#chatbox.scrollHeight - this.#chatbox.offsetHeight
            console.log(top + 10, height)
            if (top + 10 >= height) {
                this.#isBottom = true
            } else {
                this.#isBottom = false
            }
            this.#autoScroll = false
        }, {
            passive: true
        })
    }
    addMessage(options) {
        const {
            type,
            content,
            avatar,
            name,
            title,
            titleType
        } = options
        const id = `chatbox_${this.#id}_${this.#chatID}`
        if (type == "system") {
            this.#chatbox.innerHTML += getSystemHtml(content, id)
            this.#chatID = this.#chatID + 1
        } else if (type == "ta") {
            this.#chatbox.innerHTML += getTaHtml(avatar, name, title, titleType, haddleContent(content), gridCount(content), id, content)
            this.#chatID = this.#chatID + 1
        } else if (type == "own") {
            this.#chatbox.innerHTML += getOwnHtml(avatar, name, title, titleType, haddleContent(content), gridCount(content), id, content)
            this.#chatID = this.#chatID + 1
        }
        setTimeout(() => {
            this.toBottom()
            // this.#autoScroll = true
            document.querySelector(`[iftc-chat-id="${id}"]`).classList.add(type == "own" ? "send-own" : "send")
        }, 50)
    }
    addMessages(msgArr) {
        for (var i = 0; i < msgArr.length; i++) {
            const options = msgArr[i]
            this.addMessage(options)
        }
    }
    getID() {
        return this.#id;
    }
    setStyle() {
        const id = `chatbox_${this.#id}`
        const oldstyle = document.head.querySelector(`[iftc-style=${id}]`)
        if (oldstyle) {
            oldstyle.remove()
        }
        const style = document.createElement('style');
        style.setAttribute("iftc-style", id)
        style.innerHTML = getChatboxStyle(this.#config, this.#chatbox);
        document.head.appendChild(style);
    }
    toBottom() {
        this.#chatbox.scrollTo({
            top: this.#chatbox.scrollHeight,
            behavior: "smooth"
        })
    }
}
window.Chatbox = aChatbox;

function getChatboxStyle(config, chatbox) {
    const msgWidth = chatbox.offsetWidth - 80;
    return `.chatbox {
    overflow-y: auto;
    overflow-x: hidden;
    margin: 0;
    padding: 10px;
    font-family: Arial, sans-serif;
    background-color: ${config.bgcolor};
}
.message-box {
    user-select: none;
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
}
/* 对方发送的消息 */
.message-container {
    display: grid;
    grid-template-columns: 50px auto;
}
.message-container .send {
    animation-name: chatbox-send;
    animation-duration: 100s;
    animation-iteration-count: 1;
    animation-delay: 1s;
    animation-timing-function: ease-in;
}
.message-container .avatar {
    width: 40px;
    height: fit-content;
}
.message-container .avatar img {
    width: 30px;
    height: 30px;
    margin-left: 10px;
    border-radius: 50%;
}
.message-container .main {
    display: grid;
    grid-template-rows: auto auto;
}
.message-container .head {
    display: inline-block;
}
.message-container .name {
    color: #aaa;
    font-weight: light;
    display: inline-block;
}
.message-container .message {
    user-select: text;
    padding: 10px;
    border-radius: 7px;
    color: ${config.taColor};
    background-color: ${config.taBgcolor};
    width: fit-content;
    max-width: ${msgWidth}px;
    word-break: break-all;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    hyphens: auto;
}
.message-container .message .image {
    max-width: 100%;
    max-height: 100%;
    display: flex;
    border-radius: 7px;
}
.message-container .message .content {
    max-width: ${msgWidth}px;
    width: fit-content;
    hyphens: auto;
}
/* 自己发送的消息 */
.message-container-own {
    display: grid;
    grid-template-columns: auto 50px;
    text-align: right;
    animation-name: chatbox-send-own;
    animation-duration: 0.5s;
    animation-iteration-count: 1;
    animation-delay: 1s;
    animation-timing-function: ease-in;
}
.message-container-own .send-own {
    animation-name: chatbox-send-own;
    animation-duration: 0.5s;
    animation-iteration-count: 1;
    animation-delay: 1s;
    animation-timing-function: ease-in;
}
.message-container-own .avatar {
    width: 40px;
    height: fit-content;
}
.message-container-own .avatar img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    margin-left: 10px;
    border-radius: 50%;
}
.message-container-own .main {
    display: grid;
    grid-template-rows: auto auto;
}
.message-container-own .head {
    display: inline-block;
}
.message-container-own .name {
    color: #aaa;
    font-weight: light;
    display: inline-block;
}
.message-container-own .message {
    width: fit-content;
    text-align: left;
    word-break: break-all;
    word-wrap: break-word;
    color: ${config.ownColor};
    background-color: ${config.ownBgcolor};
    display: flex;
    max-width: ${msgWidth}px;
    justify-self: flex-end;
    padding: 10px;
    border-radius: 7px;
    user-select: text;
}
.message-container-own .message .image {
    max-width: 100%;
    max-height: 100%;
    display: flex;
    border-radius: 7px;
}
.message-container-own .message .content {
    max-width: ${msgWidth}px;
    width: fit-content;
    hyphens: auto;
}
/* 系统提示 */
.system-tip {
    width: 100%;
    color: rgb(170, 170, 170);
    text-align: center;
    margin-top: 5px;
    margin-bottom: 5px;
    user-select: none;
}
.system-link {
    color: rgb(56, 127, 230);
    text-decoration: none;
}
/* 头衔色块 */
.message-container .normal,
.message-container-own .normal {
    font-size: 10px;
    display: inline-block;
    background-color: #aaa;
    color: #eee;
    padding: 3px;
    border-radius: 5px;
    margin-bottom: 5px;
}
.message-container .group-admin,
.message-container-own .group-admin {
    font-size: 10px;
    display: inline-block;
    background-color: #00DDE7;
    color: #eee;
    padding: 3px;
    border-radius: 5px;
    margin-bottom: 5px;
}
.message-container .group-owner,
.message-container-own .group-owner {
    font-size: 10px;
    display: inline-block;
    background-color: #FFD31F;
    color: #eee;
    padding: 3px;
    border-radius: 5px;
    margin-bottom: 5px;
}
.message-container .custom,
.message-container-own .custom {
    font-size: 10px;
    display: inline-block;
    background-color: #E192FF;
    color: #eee;
    padding: 3px;
    border-radius: 5px;
    margin-bottom: 5px;
}
.chatbox::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
}
.chatbox::-webkit-scrollbar-thumb {
    background-color: rgb(204, 204, 204);
    border-radius: 5px;
}
.chatbox .user-link {
    color:rgb(56, 127, 230);
    text-decoration: underline;
}
/* 发送动画 */
@keyframe chatbox-send-own {
    from{
        right: -100px;
        opacity: 0;
    }
    to {
        right: 0px;
        opacity: 1;
    }
}
@keyframe chatbox-send {
    from{
        left: -100px;
        opacity: 0;
    }
    to {
        left: 0px;
        opacity: 1;
    }
}`;
}

function getSystemHtml(content, id) {
    const html = `<div class="system-tip" iftc-chat-id="${id}">${content}</div>`
    const e = element(html)
    const as = e.querySelectorAll('a')
    for (var i = 0; i < as.length; i++) {
        const a = as[i]
        a.classList.add("system-link")
    }
    const spans = e.querySelectorAll('span')
    for (var i = 0; i < spans.length; i++) {
        const span = spans[i]
        span.classList.add("system-content")
    }
    var e1 = e
    var serializer = new XMLSerializer();
    var elementAsString = serializer.serializeToString(e1);
    return elementAsString
}

function getTaHtml(avatar, name, title, titleType, content, autos, id, msgs) {
    return `<div class="message-container message-box" iftc-chat-id="${id}">
    <div class="avatar">
        <img src="${avatar}" alt="${name}">
    </div>
    <div class="main">
        <div class="head">
            <div class="title ${titleType}">${title}</div>
            <div class="name">${name}</div>
        </div>
        <div class="message" style="display: grid;grid-template-rows:${autos};${msgs.length == 1 && msgs[0].type == 'img' ? 'background-color: rgba(255, 255, 255, 0);padding: 0;' : ''}">${content}</div>
    </div>
</div>`
}

function getOwnHtml(avatar, name, title, titleType, content, autos, id, msgs) {
    return `<div class="message-container-own message-box" iftc-chat-id="${id}">
    <div class="main">
        <div class="head">
            <div class="title ${titleType}">${title}</div>
            <div class="name">${name}</div>
        </div>
        <div class="message" style="display: grid;grid-template-rows:${autos};${msgs.length == 1 && msgs[0].type == 'img' ? 'background-color: rgba(255, 255, 255, 0);padding: 0;' : ''}">${content}</div>
    </div>
    <div class="avatar">
        <img src="${avatar}" alt="${name}">
    </div>
</div>`
}

function element(html) {
    var range = document.createRange();
    return range.createContextualFragment(html);
}

function haddleContent(content) {
    let html = ""
    const audio = content.filter(a => a.type == "audio")[0]
    if (audio) {
        return false;
    }
    const video = content.filter(a => a.type == "video")[0]
    if (video) {
        return false;
    }
    for (var i = 0; i < content.length; i++) {
        const message = content[i]
        if (message.type == "msg") {
            html += `<span class="content">${haddleUrl(message.msg.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"))}</span>`
        } else if (message.type == "img") {
            let style = ""
            if (content[i + 1]) {
                if (content[i + 1].type == "img") {
                    style += "margin-bottom: 5px;"
                }
            }
            html += `<img class="image" style="${style}" src="${message.url}">`
        }
    }
    return html
}

function gridCount(content) {
    let autos = ""
    for (var i = 0; i < content.length; i++) {
        autos += " auto"
    }
    return autos
}

function haddleUrl(text) {
    const urlPattern = /^( |^$)(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/gi;
    const urls = text.match(urlPattern);
    let newText = text
    if (urls) {
        for (var i = 0; i < urls.length; i++) {
            newText = newText.replace(urls[i], `<a class="user-link" iftc-url="${urls[i]}">${urls[i]}</a>`)
        }
    }
    return newText
}