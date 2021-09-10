import sadCat from './sad_cat.jpg';
import './catImage.scss';

class CatImage {
  render() {
    const img = document.createElement('img');
    img.src = sadCat;
    img.alt = 'Sad Cat';
    img.classList.add('sad-cat-img');

    const body = document.querySelector('body');
    body.append(img);
  }
}

export default CatImage;