/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import '../../styles/sass/ReviewItem.scss';
import avatar_1 from '../../public/images/avatar_1.png';
import avatar_2 from '../../public/images/avatar_2.png';
import avatar_3 from '../../public/images/avatar_3.png';

class ReviewItem extends HTMLElement {
  constructor() {
    super();

    this._avatar = [avatar_1, avatar_2, avatar_3];
  }

  _randomAvatar() {
    const index = Math.floor(Math.random() * 3);
    return this._avatar[index];
  }

  set review(review) {
    this._review = review;
    this.render();
  }

  render() {
    this.innerHTML = `
      <img class="review__img-outter" src="${this._randomAvatar()}" alt="">
      <div class="review__wrap">
        <div class="review__header">
          <img class="review__img-inner" src="${this._randomAvatar()}" alt="">
          <div class="review__info">
              <p class="review__info-name">${this._review.name}</p>
              <p class="review__info-date">${this._review.date}</p>
          </div>
        </div>
      <p class="review__content">${this._review.review}</p>
    `;
  }
}

customElements.define('review-item', ReviewItem);
