/* eslint-disable class-methods-use-this */
import '../../styles/sass/ExploreComponent.scss';
import './CardComponent';
import RestaurantApi from '../data/restaurant-api';
import searchIcon from '../../public/icons/search-24px.svg';

class ExploreComponent extends HTMLElement {
  constructor(props) {
    super(props);

    this._input = '';
  }

  _mapData(data) {
    data.forEach((restaurant) => this._insertElement('card-component', { ...restaurant, pictureUrl: RestaurantApi.getPictureUrl(restaurant.pictureId, 'small') }));
  }

  _insertSkeleton(count) {
    for (let index = 0; index < count; index++) {
      this._insertElement('card-component');
    }
  }

  _insertElement(element, data) {
    const wrapper = this.querySelector('.wrap');
    const childElement = document.createElement(element);
    childElement.isLoading = this._isLoading;
    childElement.restaurant = data;
    wrapper.appendChild(childElement);
  }

  _handleRequestSuccess(restaurants) {
    if (this._isLoading) {
      this._insertSkeleton(20);
    } else {
      this._mapData(restaurants);
    }
  }

  _handleError() {
    const wrapError = document.querySelector('.error');
    import('../../public/illustration/notFound')
      .then((module) => {
        const notFound = module.default;
        wrapError.innerHTML = notFound;
      });
  }

  _handleFocusIn() {
    this.querySelector('label').classList.add('focus');
  }

  _handleFocusOut() {
    if (this._input === '') {
      this.querySelector('label').classList.remove('focus');
    }
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

  set isLoading(isLoading) {
    this._isLoading = isLoading;
  }

  async connectedCallback() {
    this.render();

    this.querySelector('input').addEventListener('focusin', () => this._handleFocusIn());
    this.querySelector('input').addEventListener('focusout', () => this._handleFocusOut());

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
                    <input id="search" type="text" value="">
                    <label for="search">Masukkan nama restoran, kota...</label>
                    <button class="btn__search"><img width="24" height="24" class="material-icons" src="${searchIcon}" alt="search icon" /></button>
                </div>
                <div class="error"></div>
                <div class="wrap"></div>
            </div>
        `;
  }
}

customElements.define('explore-component', ExploreComponent);
