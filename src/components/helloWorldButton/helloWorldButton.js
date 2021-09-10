import './helloWorldButton.css';
import './helloWorldText.scss';

class HelloWorldButton {
  // Example of why you need babel loader
  // class property is not supported by major browsers yet
  buttonCssClass = 'hello-world-button';

  render() {
    const button = document.createElement('button');
    button.innerHTML = 'Hello World Button';
    button.classList.add(this.buttonCssClass);
    const body = document.querySelector('body');
    button.onclick = () => {
      const p = document.createElement('p');
      p.innerHTML = 'Hello World';
      p.classList.add('hello-world-text');
      body.append(p);
    }
    body.append(button);
  }
};

export default HelloWorldButton;