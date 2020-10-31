import FavoritRestaurantIdb from '../../data/idb';
import '../../components/CardComponent';
import '../../../styles/sass/pages/FavoritePage.scss';

const favoritePage = {
  _renderCard(restaurants) {
    const wrapper = document.querySelector('.favorite__wrap');
    restaurants.forEach((restaurant) => {
      const cardElement = document.createElement('card-component');
      cardElement.restaurant = restaurant;
      cardElement.isSaved = true;
      wrapper.appendChild(cardElement);
    });
  },

  async afterRender() {
    const restaurants = await FavoritRestaurantIdb.getAllRestaurants();

    this._renderCard(restaurants);
  },

  render() {
    return `
      <div id="favorite-page">
        <h2 class="title">Favorite Restaurant</h2>
        <div class="favorite__wrap"></div>
        <div class="error__wrap"></div>
      </div>
    `;
  },
};

export default favoritePage;
