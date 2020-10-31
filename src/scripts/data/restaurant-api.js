import CONFIG from '../global/config';
import API_ENDPOINT from '../global/restaurant-api-endpoint';

const Axios = require('axios').default;

const axios = Axios.create({
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded | application/json',
      'X-Auth-Token': CONFIG.KEY,
    },
  },
});

class RestaurantApi {
  static async getAllRestaurants() {
    const results = await axios.get(API_ENDPOINT.LIST);
    return results;
  }

  static async getDetailRestaurant(id) {
    const results = await axios.get(API_ENDPOINT.DETAIL(id));
    return results;
  }

  static async searchRestaurants(param) {
    const results = await axios.get(API_ENDPOINT.SEARCH(param));
    return results;
  }

  static async addReview(data) {
    const results = await axios.post(
      API_ENDPOINT.ADD_REVIEW,
      data,
    );
    return results;
  }

  static getPictureUrl(pictureId, resolusi) {
    return API_ENDPOINT.GET_PICTURE(pictureId, resolusi);
  }
}

export default RestaurantApi;
