import '../../components/HeroComponent';
import '../../components/TopRestaurantComponent';
import '../../components/ExploreComponent';
import RestaurantApi from '../../data/restaurant-api';
import LoaderInitiator from '../../utils/loader-initiator';

const homePage = {
  insertElement(component, data) {
    const container = document.querySelector('#home-page');
    const child = document.createElement(component);
    child.data = data;
    container.appendChild(child);
  },

  async afterRender() {
    const container = document.querySelector('#home-page');
    LoaderInitiator.init(container);
    try {
      const response = await RestaurantApi.getAllRestaurants();
      LoaderInitiator.clear(container);
      this.insertElement('hero-component', {});
      this.insertElement('toprestaurant-component', response.data.restaurants);
      this.insertElement('explore-component', response.data.restaurants);
    } catch (error) {
      window.location.hash = '/error';
    }
  },

  render() {
    return `
      <div id="home-page"></div>
    `;
  },
};

export default homePage;
