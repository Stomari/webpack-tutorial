import sadCatImg from './sad_cat.jpg';
import text from './text.txt';

const addImage = () => {
  const img = document.createElement('img');
  img.alt = text;
  img.width = 300;
  img.src = sadCatImg;
  const body = document.querySelector('body');
  body.appendChild(img);
};

export default addImage;