# Dragger.js Documentation

## Overview
`Dragger.js` is a JavaScript class located in the `class` directory. It provides functionality for dragging elements within a web page.

## Installation
To use `Dragger.js`, ensure it is included in your project by importing it from the correct path:

```javascript
import Dragger from '../class/Dragger';
```

## Usage
Here is a basic example of how to use the `Dragger` class:

```javascript
// Create a new instance of Dragger
const dragger = new Dragger(document.getElementById('draggable-element'));

// Initialize the dragger
dragger.init();
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

## Contact
For any questions or issues, please contact the maintainer at [email@example.com](mailto:email@example.com).
