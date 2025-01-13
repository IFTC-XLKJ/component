# Timer.js(计时器) 文档

## 预览
`Timer.js` 用于在应用程序中实现定时功能。可精确到毫秒。

## 引入
要使用 `Timer.js`，请确保从正确的路径导入它以包含在您的项目中：
```html
<script src="your/path/to/Timer.js"></script>
```
注：如有需要，也可以使用ES6模块导入：
```javascript
import Timer from 'your/path/to/Timer.js';
```

## 用法

以下是一个简单的使用示例：

```javascript
const timer = new Timer(); // 创建一个计时器实例
timer.start(); // 启动计时器
timer.get(); // 获取当前时间
timer.stop(); // 停止计时器
```

## 属性

### `isTiming` `只读` `Boolean`
获取计时器是否正在计时。

## 方法

### `start()` `void 0`
启动计时器。

### `stop()` `void 0`
停止计时器。

### `get()` `Number`
获取当前时间（以毫秒为单位）。

### `clear()` `void 0`
清除计时器。

### `mark()` `void 0`
标记当前时间。

### `getMark()` `Array<Number>`
获取标记的时间（以毫秒为单位）。

### `markCount()` `Number`
获取标记的次数。

### `formatTime(milliseconds)` `String`
格式化时间，格式为：`HH:MM:SS.ms`，例如：`00:00:00.000`。
 - milliseconds - 以毫秒为单位的时间。

## 贡献

欢迎提交问题和贡献代码。请参阅贡献指南以了解更多信息。

## 许可证

此项目使用 MIT 许可证。