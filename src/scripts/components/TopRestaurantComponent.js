import '../../styles/sass/TopRestaurantComponent.scss';
import './CardComponent';
import RestaurantApi from '../data/restaurant-api';

class TopRestaurantComponent extends HTMLElement {
  constructor(props) {
    super(props);

    this._isLoading = true;
  }

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

  set data(restaurants) {
    this._isLoading = !restaurants;
    if (!this._isLoading) {
      this._restaurants = [...restaurants];
    }
  }

  async connectedCallback() {
    this.render();

    if (!this._isLoading) {
      const sortedRestaurants = this._sortByRating(this._restaurants);
      this._mapData(sortedRestaurants);
    } else {
      this._insertSkeleton(3);
    }
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
