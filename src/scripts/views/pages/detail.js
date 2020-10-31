import '../../components/DetailComponent';
import '../../components/MenuContainer';
import '../../components/ReviewComponent';
import '../../components/FavoriteButton';
import '../../../styles/sass/pages/DetailPage.scss';
import RestaurantApi from '../../data/restaurant-api';
import urlParser from '../../routes/url-parser';
import FavoritRestaurantIdb from '../../data/idb';

const detailPage = {
  _isSaved() {
    return !!urlParser.parseUrl().verb;
  },

  _insertElement(component, data) {
    const container = document.querySelector('#detail-page');
    const child = document.createElement(component);
    child.data = data;
    container.appendChild(child);
  },

  async afterRender() {
    let restaurant;

    if (await this._isSaved()) {
      restaurant = await FavoritRestaurantIdb.getRestaurant(urlParser.parseUrl().id);
    } else {
      const response = await RestaurantApi.getDetailRestaurant(urlParser.parseUrl().id);
      restaurant = {
        ...response.data.restaurant,
        pictureUrl: RestaurantApi.getPictureUrl(response.data.restaurant.pictureId, 'medium'),
      };
    }

    this._insertElement('detail-component', { ...restaurant });

    this._insertElement('menu-container', restaurant.menus);
    this._insertElement('review-component', restaurant.customerReviews);
    this._insertElement('favorite-button', { ...restaurant });
  },

  async render() {
    return `
      <div id="detail-page"></div>
    `;
  },
};

export default detailPage;
