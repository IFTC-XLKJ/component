# Dragger.js(元素拖拽器) 文档

## 预览
`Dragger.js` 是位于 `class` 目录中的一个 JavaScript 类。它提供了在网页中拖动元素的功能。

## 引入
要使用 `Dragger.js`，请确保从正确的路径导入它以包含在您的项目中：
```html
<script src="your/path/to/Dragger.js"></script>
```
注：如有需要，也可以使用ES6模块导入：
```javascript
import Dragger from 'your/path/to/Dragger.js';
```

## 用法
下面是如何使用 `Dragger` 类的一个基本示例：

```javascript
// 创建一个 Dragger 实例
const config = { // 配置
    isToTop: true, // 是否置顶
    range: { // 拖拽范围
        x1: 0,
        y1: 0,
        x2: innerWidth,
        y2: innerHeight
    }, // 该示例拖拽范围为整个页面
    direction: null, // 拖拽方向，二选一："Horizontal" || "Vertical"，null为自由拖拽
};
const dragger = new Dragger(document.getElementById('draggable-element'), config);
```

## 属性

### `VERSION` `只读` `string`
获取 `Dragger` 类的版本号。

### `isDragging` `只读` `boolean`
获取当前是否正在拖动。

## 方法

## 事件

### `onDragStart` `function`
当拖拽开始时调用。
事件参数：
- `event`: 拖拽事件对象。
- - `event.element`: 拖拽目标元素。
- - `event.x`: 拖拽目标元素在 X 轴上的位置。
- - `event.y`: 拖拽目标元素在 Y 轴上的位置。

### `onDrag` `function`
当拖拽进行时调用。
事件参数：
- `event`: 拖拽事件对象。
- - `event.element`: 拖拽目标元素。
- - `event.x`: 拖拽目标元素在 X 轴上的位置。
- - `event.y`: 拖拽目标元素在 Y 轴上的位置。

### `onDragEnd` `function`
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
