import { DynamicLoadedContent } from 'https://unpkg.com/@virtualidentity/dynamic-loaded-content@1.0.0/dist/index.js';

(async () => {
  class MyDemoApplication extends DynamicLoadedContent {
    // Dynamic imports
    imports = [
      '/react@17/umd/react.development.js',
      '/react-dom@17/umd/react-dom.development.js',
    ]

    // Initial app HTML
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
})()