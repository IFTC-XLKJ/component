# VideoPlayer.js(视频播放器) 文档

## 预览
`VideoPlayer.js` 是一个简易的视频播放器，用于在网页中播放视频。

## 引入
要使用 `VideoPlayer.js`，请确保从正确的路径导入它以包含在您的项目中：
```html
<script src="your/path/to/VideoPlayer.js"></script>
```
注：如有需要，也可以使用ES6模块导入：
```javascript
import Timer from 'your/path/to/VideoPlayer.js';
```

## 用法

以下是一个简单的使用示例：

```javascript
const config = {
    src: 'your/path/to/video.mp4',
    cover: 'your/path/to/cover.jpg',
}
const videoPlayer = new VideoPlayer(playerElement, config);
```

## 属性

### `isPlay` `只读` `Boolean`
播放器是否正在播放。

## 方法

### `play()`
播放视频。

### `pause()`
暂停视频。

### `load()`
重新加载视频。

### `getDuration()` `Number`
获取视频的总时长。

### `getProgress()` `Number`
获取当前播放进度。

### `setProgress(progress)`
设置当前播放进度。
 - `progress`: 进度值 `Number`

### `setUrl(url)`
设置视频的URL。
 - `url`: 视频URL `String`

### `getSize(callback)`
获取视频的尺寸。
 - `callback`: 回调函数 `Function(width, height)`

### `getReadyState()` `Number`
获取视频的就绪状态。

## 事件

### `play` `Function(event)`
播放事件。

### `pause` `Function(event)`
暂停事件。

### `load` `Function(event)`
加载完成事件。

### `canplay` `Function(event)`
播放器可以播放事件。

### `suspend` `Function(event)`
播放器加载数据事件。

### `cover` `Function(event)`
获取视频第一帧画面完成事件。

## 贡献

欢迎提交问题和贡献代码。请参阅贡献指南以了解更多信息。

## 许可证

此项目使用 MIT 许可证。