/* eslint-disable class-methods-use-this */
import '../../styles/sass/ExploreComponent.scss';
import './CardComponent';
import RestaurantApi from '../data/restaurant-api';

class ExploreComponent extends HTMLElement {
  constructor(props) {
    super(props);

    this._input = '';
  }

  _mapData(data) {
    data.forEach((restaurant) => this._insertElement('card-component', { ...restaurant, pictureUrl: RestaurantApi.getPictureUrl(restaurant.pictureId, 'small') }));
  }

  _insertElement(element, data) {
    const wrapper = this.querySelector('.wrap');
    const childElement = document.createElement(element);
    childElement.restaurant = data;
    wrapper.appendChild(childElement);
  }

  _handleRequestSuccess(restaurants) {
    this._mapData(restaurants);
  }

  _handleError() {
    const wrapError = document.querySelector('.error');
    import('../../public/illustration/notFound')
      .then((module) => {
        const notFound = module.default;
        wrapError.innerHTML = notFound;
      });
  }

  _handleInputChange(event) {
    this._input = event.target.value;
  }

  async _handleSearchButtonClick() {
    document.querySelector('.error').innerHTML = '';
    document.querySelector('#explore-section .wrap').innerHTML = '';

    try {
      const response = await RestaurantApi.searchRestaurants(this._input);
      if (response.data.restaurants.length < 1) throw new Error('data tidak ditemukan');
      this._handleRequestSuccess(response.data.restaurants);
    } catch (error) {
      this._handleError();
    }
  }

  set data(restaurants) {
    this._restaurants = restaurants;
  }

  async connectedCallback() {
    this.render();

    this._handleRequestSuccess(this._restaurants);

    document.querySelector('input').addEventListener('change', (event) => this._handleInputChange(event));

    this.querySelector('button.btn__search').addEventListener('click', () => this._handleSearchButtonClick());
  }

  render() {
    this.innerHTML = `
            <section id="explore-section">
                <div class="section__title">
                    <h2>Explore Restaurants</h2>
                </div>
                <div class="input-bar">
                    <input id="search" type="text" placeholder="Masukkan nama restoran, kota..." value="">
                    <label for="search">Masukkan nama restoran, kota...</label>
                    <button class="btn__search"><span class="material-icons">search</span></button>
                </div>
                <div class="error"></div>
                <div class="wrap"></div>
            </div>
        `;
  }
}

customElements.define('explore-component', ExploreComponent);
