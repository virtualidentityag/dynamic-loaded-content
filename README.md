# Dynamic Loaded Content
A simple base component to load content dynamically and react on it.

## Installation
```npm install @virtualidentity/dynamic-loaded-content```

## Usage
To use this base custom element, just import the class, extend it in your script and register it as custom element:
```js
import { DynamicLoadedContent } from '@virtualidentity/dynamic-loaded-content';


class MyDemoApplication extends DynamicLoadedContent {
  // define your dynamic imports
  imports = [
    '/react@17/umd/react.development.js',
    '/react-dom@17/umd/react-dom.development.js',
  ]

  // define your initial app HTML
  html = '<div id="like_button_container"></div>';

  componentDidLoad() {
    // Do anything to initialize the app
    const e = React.createElement;

    class LikeButton extends React.Component {
      constructor(props) {
        super(props);
        this.state = { liked: false };
      }

      render() {
        if (this.state.liked) {
          return 'You liked this.';
        }

        return e(
          'button',
          { onClick: () => this.setState({ liked: true }) },
          'Like'
        );
      }
    }

    const domContainer = this.querySelector('#like_button_container');
    ReactDOM.render(e(LikeButton), domContainer);
  }
}

// Define the custom tag here
window.customElements.define('demo-component', MyDemoApplication);
```

Then after loading the script in the browser, the custom element will be registered and can be used in the DOM:
```html
<script type="module" src="./demo-component.js"></script>

...

<demo-application base-url="https://unpkg.com"></demo-application>
```

Also have a look at the [demo folder](demo)

## Browser Support
The functionality of this package is dependant on many modern JS features like:
- ES Modules
- Dynamic imports
- Custom Elements

Therefore we __WILL NOT__ support older browsers. Currently supported browsers are:

- Chrome
- Firefox
- Safari
- Edge (Chromium)

If you use other browsers, you are gonna have a hard time.
