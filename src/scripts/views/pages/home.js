import '../../components/TopRestaurantComponent';
import '../../components/ExploreComponent';
import RestaurantApi from '../../data/restaurant-api';

const homePage = {
  insertElement(component, data) {
    const container = document.querySelector('#home-page');
    const child = document.createElement(component);
    child.isLoading = !data;
    child.data = data;
    container.appendChild(child);
  },

  async afterRender() {
    // this.insertElement('hero-component');
    // this.insertElement('toprestaurant-component');
    // this.insertElement('explore-component');
    try {
      const response = await RestaurantApi.getAllRestaurants();
      document.querySelector('#home-page').innerHTML = '';
      this.insertElement('hero-component', {});
      this.insertElement('toprestaurant-component', response.data.restaurants);
      this.insertElement('explore-component', response.data.restaurants);
    } catch (error) {
      window.location.hash = '/error';
    }
  },

  render() {
    return `
      <div id="home-page">
        <hero-component></hero-component>
        <toprestaurant-component></toprestaurant-component>
        <explore-component></explore-component>
      </div>
    `;
  },
};

export default homePage;
