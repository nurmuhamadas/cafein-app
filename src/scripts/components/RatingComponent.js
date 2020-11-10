/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import '../../styles/sass/RatingComponent.scss';
import starIcon from '../../public/icons/star-24px.svg';
import starHalfIcon from '../../public/icons/star_half-24px.svg';
import starBorderIcon from '../../public/icons/star_outline-24px.svg';

class RatingComponent extends HTMLElement {
  constructor() {
    super();

    this._rating = this.getAttribute('rating');
  }

  _splitRating(rating) {
    const splittedRating = rating.toString().split('.');
    return {
      integer: splittedRating[0],
      decimal: splittedRating[1],
    };
  }

  _renderFullFilledStar(rating) {
    let stars = '';
    for (let i = 0; i < rating; i++) {
      stars += `<img class="material-icons" src="${starIcon}" alt="Star icon" />`;
    }
    return stars;
  }

  _renderHalfStar(rating) {
    if (rating.integer === '5') return '';
    if (rating.decimal > 5) return `<img class="material-icons" src="${starHalfIcon}" alt="Star icon" />`;
    return `<img class="material-icons" src="${starBorderIcon}" alt="Star icon" />`;
  }

  _renderOutlinedStar(rating) {
    let stars = '';
    for (let i = 0; i < 4 - rating; i++) {
      stars += `<img class="material-icons" src="${starBorderIcon}" alt="Star icon" />`;
    }
    return stars;
  }

  _renderRating(rating) {
    return `${this._renderFullFilledStar(rating.integer)}${this._renderHalfStar(rating)}${this._renderOutlinedStar(rating.integer)} <span class="value">(${this._rating})</span>`;
  }

  connectedCallback() {
    this.render();

    const wrapRating = this.querySelector('.rating');
    const rating = this._splitRating(this._rating);
    wrapRating.innerHTML = this._renderRating(rating);
  }

  render() {
    this.innerHTML = `
      <div class="rating"></div>
    `;
  }
}

customElements.define('rating-component', RatingComponent);
