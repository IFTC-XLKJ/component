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
const dragger = new Dragger(document.getElementById('draggable-element'), config);
```

## Methods

### `init()`
Initializes the dragger and sets up the necessary event listeners.

### `destroy()`
Removes the event listeners and cleans up the dragger instance.

## Example
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dragger Example</title>
    <style>
        #draggable-element {
            width: 100px;
            height: 100px;
            background-color: red;
            position: absolute;
        }
    </style>
</head>
<body>
    <div id="draggable-element"></div>
    <script type="module">
        import Dragger from '../class/Dragger.js';

        const dragger = new Dragger(document.getElementById('draggable-element'));
        dragger.init();
    </script>
</body>
</html>
```

## License
This project is licensed under the MIT License.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## 联系方式
如有任何问题或疑虑，请通过 [iftcceo@139.com](mailto:iftcceo@138.com?subject=Dragger.js%20文档反馈&body=请将问题描述清楚，以便于维护者及时处理。) 联系维护者。
