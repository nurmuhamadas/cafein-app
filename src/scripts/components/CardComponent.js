import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import '../../styles/sass/CardComponent.scss';
import './RatingComponent';
import locationIcon from '../../public/icons/location_on-24px.svg';
import visibilityIcon from '../../public/icons/visibility-24px.svg';

class CardComponent extends HTMLElement {
  constructor() {
    super();
    this._isLoading = true;
  }

  _limitDescription(description) {
    if (description.length < 100) {
      return description;
    }
    return `${description.substr(0, 100)}...`;
  }

  set isSaved(value) {
    this._isSaved = value;
  }

  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this._isLoading = !restaurant;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = this._isLoading
      ? `
        <div class="skeleton card__wrap">
            <div class="img__wrap"></div>
            <div class="card__detail">
                <div class="card__label"></div>
                <h3 class="card__title"></h3>
                <p class="card__desc"></p>
            </div>
        </div>
    `
      : `
        <div class="${this._isLoading ? 'skeleton' : ''} card__wrap">
            <div class="img__wrap">
                <img class="card__thumbnail lazyload" width="328" height="216" data-src=${this._restaurant.pictureUrl} alt="${this._restaurant.name}">
            </div>
            <div class="card__detail">
                <div class="card__label">
                    <div class="location"><img width="24" height="24" class="material-icons" src="${locationIcon}" alt="location icon" /> ${this._restaurant.city}</div>
                    <rating-component rating="${this._restaurant.rating}"></rating-component>
                </div>
                <h3 class="card__title">${this._restaurant.name}</h3>
                <p class="card__desc">${this._limitDescription(this._restaurant.description)}</p>
                <a href="#/detail/${this._restaurant.id}/${this._isSaved ? 'saved' : ''}" class="card__action"><img width="24" height="24" class="material-icons" src="${visibilityIcon}" alt="visibility icon" /> Lihat detail</a>
            </div>
        </div>
    `;
  }
}

customElements.define('card-component', CardComponent);
