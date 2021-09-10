import helloWorld from './helloWorld';
import HelloWorldButton from './components/helloWorldButton/helloWorldButton';
import Heading from './components/heading/heading';
import _ from 'lodash';

helloWorld();
const heading = new Heading();
heading.render(_.upperFirst('hello world'));
const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();