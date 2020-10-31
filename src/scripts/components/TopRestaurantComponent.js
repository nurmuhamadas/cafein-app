/* eslint-disable class-methods-use-this */
import '../../styles/sass/TopRestaurantComponent.scss';
import './CardComponent';
import RestaurantApi from '../data/restaurant-api';

class TopRestaurantComponent extends HTMLElement {
  _sortByRating(data) {
    return data.sort((a, b) => b.rating - a.rating);
  }

  _mapData(data) {
    data.forEach((restaurant, index) => {
      if (index < 3) {
        this._insertElement('card-component', { ...restaurant, pictureUrl: RestaurantApi.getPictureUrl(restaurant.pictureId, 'small') });
      }
    });
  }

  _insertElement(element, data) {
    const wrapper = this.querySelector('.wrap');
    const childElement = document.createElement(element);
    childElement.restaurant = data;
    wrapper.appendChild(childElement);
  }

  set data(restaurants) {
    this._restaurants = [...restaurants];
  }

  async connectedCallback() {
    this.render();

    const sortedRestaurants = this._sortByRating(this._restaurants);
    this._mapData(sortedRestaurants);
  }

  render() {
    this.innerHTML = `
            <section id="top-section">
                <div class="section__title">
                    <h2>Top Restaurants</h2>
                </div>
                <div class="wrap"></div>
            </div>
        `;
  }
}

customElements.define('toprestaurant-component', TopRestaurantComponent);
