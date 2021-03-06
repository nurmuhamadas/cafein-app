import '../../styles/sass/DetailComponent.scss';
import locationIcon from '../../public/icons/location_on-24px.svg';

class DetailComponent extends HTMLElement {
  constructor() {
    super();

    this._isLoading = true;
  }

  _insertCategory(category) {
    this.querySelector('.restaurant__category').innerHTML += `<p class="restaurant__category-pill">${category.name}</p>`;
  }

  set data(restaurant) {
    this._restaurant = restaurant;

    this._isLoading = !restaurant;
  }

  async connectedCallback() {
    this.render();

    if (!this._isLoading) {
      this._restaurant.categories.forEach((category) => this._insertCategory(category));
    }
  }

  render() {
    this.innerHTML = this._isLoading
      ? `
      <div id="detail-restaurant" class="skeleton">
        <div class="restaurant__img-wrap"></div>
        <div class="restaurant__detail">
          <div class="restaurant__category"></div>
          <div class="restaurant__label"></div>
          <h2 class="restaurant__name"></h2>
          <p class="restaurant__description"></p>
        </div>
      </div>
    `
      : `
      <div id="detail-restaurant">
        <div class="restaurant__img-wrap">
          <img class="restaurant__img-item" src="${this._restaurant.pictureUrl}" alt="${this._restaurant.name}">
          <div class="layer"></div>
        </div>
        <div class="restaurant__detail">
          <div class="restaurant__category"></div>
          <div class="restaurant__label">
            <rating-component rating="${this._restaurant.rating}"></rating-component>
            <p class="restaurant__label-location"><img width="24" height="24" class="material-icons" src="${locationIcon}" alt="location icon" /> ${this._restaurant.address}, ${this._restaurant.city}</p>
          </div>
          <h2 class="restaurant__name">${this._restaurant.name}</h2>
          <p class="restaurant__description">${this._restaurant.description}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('detail-component', DetailComponent);
