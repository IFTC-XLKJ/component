# SHA1.js(SHA1) 文档

## 预览
`SHA1.js` 是一个用于计算SHA1哈希值的JavaScript库。

## 引入
要使用 `SHA1.js`，请确保从正确的路径导入它以包含在您的项目中：
```html
<script src="your/path/to/SHA1.js"></script>
```
注：如有需要，也可以使用ES6模块导入：
```javascript
import SHA1 from 'your/path/to/SHA1.js';
```

## 用法
下面是如何使用 `SHA1` 类的一个基本示例：

```javascript
// 创建一个 SHA1 实例
const sha1 = new SHA1();
console.log(sha1.sha1('Hello World!'));
sha1.isMatching('Hello World!','33a158539c366ae3c0b139c0277c646d27bdebe0');
```

## 属性

### `VERSION` `只读` `string`
获取 `Dragger` 类的版本号。

### `isDragging` `只读` `boolean`
获取当前是否正在拖动。

## 方法

### `setConfig(name, value)` return`void 0`
设置 `Dragger` 类的配置。
- `name`: 配置名称。
- `value`: 配置值。

### `getConfig(name)` return`any`
获取 `Dragger` 类的配置。
- `name`: 配置名称。

### `reset()` return`void 0`
重置 `Dragger` 类的配置。

### `goto(x, y)` return`void 0`
将元素移动到指定位置。
- `x`: 元素的新 X 轴位置。为`null`时为当前 X 轴位置。
- `y`: 元素的新 Y 轴位置。为`null`时为当前 Y 轴位置。

## 事件

### `onDragStart` `function(event)`
当拖拽开始时调用。
事件参数：
- `event`: 拖拽事件对象。
- - `event.element`: 拖拽目标元素。
- - `event.x`: 拖拽目标元素在 X 轴上的位置。
- - `event.y`: 拖拽目标元素在 Y 轴上的位置。

### `onDrag` `function(event)`
当拖拽进行时调用。
事件参数：
- `event`: 拖拽事件对象。
- - `event.element`: 拖拽目标元素。
- - `event.x`: 拖拽目标元素在 X 轴上的位置。
- - `event.y`: 拖拽目标元素在 Y 轴上的位置。

### `onDragEnd` `function(event)`
当拖拽结束时调用。
事件参数：
- `event`: 拖拽事件对象。
- - `event.element`: 拖拽目标元素。
- - `event.x`: 拖拽目标元素在 X 轴上的位置。
- - `event.y`: 拖拽目标元素在 Y 轴上的位置。
- - `event.duration`: 拖拽持续时间。

## 示例
请前往 [Dragger.js 示例](https://github.com/IFTC-XLKJ/component/blob/main/example/Dragger.html) 了解更多示例。

## 许可证
此项目使用 MIT 许可证。

## 贡献
欢迎贡献！请提交拉取请求或打开问题讨论任何更改。

## 联系方式
如有任何问题或疑虑，请通过 [iftcceo@139.com](mailto:iftcceo@138.com?subject=Dragger.js%20文档反馈&body=请将问题描述清楚，以便于维护者及时处理。) 联系维护者。
