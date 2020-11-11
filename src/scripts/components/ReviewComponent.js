/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
import '../../styles/sass/ReviewComponent.scss';
import './ReviewItem';
import RestaurantApi from '../data/restaurant-api';
import parseUrl from '../routes/url-parser';

class ReviewComponent extends HTMLElement {
  constructor() {
    super();

    this._months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this._userInput = {
      id: parseUrl.parseUrl().id,
      name: '',
      review: '',
    };
  }

  _formatDay(day) {
    if (day < 10) return `0${day}`;
    return day;
  }

  _formatMonth(month) {
    return this._months[month];
  }

  _getDateNow() {
    const date = new Date();
    return `${this._formatDay(date.getDay())} ${this._formatMonth(date.getMonth())} ${date.getFullYear()}`;
  }

  _insertReview(review) {
    const wrapper = this.querySelector('.review__items');
    const reviewItem = document.createElement('review-item');
    reviewItem.review = review;
    wrapper.appendChild(reviewItem);
  }

  _handleFocusIn(event) {
    event.target.parentElement.classList.add('focus');
  }

  _handleFocusOut(event) {
    if (this._userInput[event.target.name] === '') {
      event.target.parentElement.classList.remove('focus');
    }
  }

  _hanldelInputChange(event) {
    this._userInput = {
      ...this._userInput,
      [event.target.name]: event.target.value,
    };
  }

  _clearInput() {
    this.querySelector('textarea').value = '';
    this.querySelector('input').value = '';
  }

  async _handleSubmit(event) {
    try {
      event.preventDefault();
      await RestaurantApi.addReview({ ...this._userInput, date: this._getDateNow() });
      this._insertReview({ ...this._userInput, date: this._getDateNow() });
      this._clearInput();
    } catch (error) {
      console.log(error);
    }
  }

  set data(reviews) {
    this._reviews = reviews;
  }

  connectedCallback() {
    this.render();

    this.querySelector('input').addEventListener('focusin', (event) => this._handleFocusIn(event));
    this.querySelector('input').addEventListener('focusout', (event) => this._handleFocusOut(event));

    this.querySelector('textarea').addEventListener('focusin', (event) => this._handleFocusIn(event));
    this.querySelector('textarea').addEventListener('focusout', (event) => this._handleFocusOut(event));

    this.querySelector('input').addEventListener('change', (event) => this._hanldelInputChange(event));
    this.querySelector('textarea').addEventListener('change', (event) => this._hanldelInputChange(event));

    this.querySelector('button').addEventListener('click', (event) => this._handleSubmit(event));

    this._reviews.forEach((review) => this._insertReview(review));
  }

  render() {
    this.innerHTML = `
      <h2 class="review__title">Reviews</h2>
      <div class="review__items"></div>
      <hr />
      <form>
        <div class="form-element">
            <label for="name">Write your name</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div class="form-element">
            <label for="review">Write your review</label>
            <textarea name="review" id="review" cols="30" rows="10" required></textarea>
        </div>
          <button aria-label="submit button">Kirim</button>
      </form>
    `;
  }
}

customElements.define('review-component', ReviewComponent);
