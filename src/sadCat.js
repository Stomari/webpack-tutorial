import Heading from './components/heading/heading';
import CatImage from './components/catImage/catImage';
import _ from 'lodash';

const heading = new Heading();
heading.render(_.upperFirst('sad cat'));
const catImage = new CatImage();
catImage.render();