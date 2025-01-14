# Chatbox.js(聊天框) 文档

## 预览
`Chatbox.js` 是一个用于创建聊天框的JavaScript库。此聊天框模仿移动端QQ的聊天框样式。<br>
***注：该组件基本功能还未完成，bug较多，请见谅。***

## 引入
要使用 `Chatbox.js`，请确保从正确的路径导入它以包含在您的项目中：
```html
<script src="your/path/to/Chatbox.js"></script>
```
注：如有需要，也可以使用ES6模块导入：
```javascript
import Chatbox from 'your/path/to/Chatbox.js';
```

## 用法

以下是一个简单的使用示例：

```javascript
const config = {}
const chatbox = new Chabtox('chatbox-element', config); // 创建一个聊天框实例
chatbox.addMessage({
    type: 'system', // 消息类型，该消息类型为系统消息
    content: '欢迎使用Chatbox.js！' // 消息内容，系统消息支持HTML标签
});
```

## 属性

## 方法

### `addMessage(option)` `void 0`
添加消息。
 - option - 消息选项。
 -  - type - 消息类型，可以是 `system`、`ta`、`own`。
 -  - content - 消息内容。
 -  - avatar - 头像。
 -  - name - 昵称。
 -  - title - 头衔内容。
 -  - titleType - 头衔类型，可以是 `normal`、`group-admin`、`group-owner`、 `custom`。

### `addMessages(msgArr)` `void 0`
添加多条消息。
 - msgArr - 消息数组。
 - - option - 消息选项。

### `getID()` `String`
获取聊天框的ID。

### `toBottom()` `void 0`
将聊天框滚动到最底部。

### `getChatCount()` `Number`
获取聊天框中的消息数量。

### `clearChat()` `void 0`
清空聊天框中的所有消息。

### `setConfig(name, value)` `void 0`
设置配置。
- name - 配置名称。
- value - 配置值。

## 贡献

欢迎提交问题和贡献代码。请参阅贡献指南以了解更多信息。

## 许可证

此项目使用 MIT 许可证。