/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
import '../../styles/sass/CardComponent.scss';
import './RatingComponent';

class CardComponent extends HTMLElement {
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
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class="card__wrap">
                <div class="img__wrap">
                    <img class="card__thumbnail" width="328" height="216" src=${this._restaurant.pictureUrl} alt="${this._restaurant.name}">
                </div>
                <div class="card__detail">
                    <div class="card__label">
                        <div class="location"><span class="material-icons">location_on</span> ${this._restaurant.city}</div>
                        <rating-component rating="${this._restaurant.rating}"></rating-component>
                    </div>
                    <h3 class="card__title">${this._restaurant.name}</h3>
                    <p class="card__desc">${this._limitDescription(this._restaurant.description)}</p>
                    <a href="#/detail/${this._restaurant.id}/${this._isSaved ? 'saved' : ''}" class="card__action"><span class="material-icons">visibility</span> Lihat detail</a>
                </div>
            </div>
        `;
  }
}

customElements.define('card-component', CardComponent);
