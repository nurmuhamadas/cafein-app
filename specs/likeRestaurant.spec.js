import FavoriteRestaurantIdb from '../src/scripts/data/idb';
import '../src/scripts/components/FavoriteButton';

describe('Liking a Restaurant', () => {
  beforeEach(async () => {
    document.body.innerHTML = '<div id="detail-page"></div>';
    const container = document.querySelector('#detail-page');
    const likeButton = document.createElement('favorite-button');
    likeButton.data = { id: 1 };
    container.appendChild(likeButton);
  });

  it('Should show like button when the restaurant has not been liked before', async () => {
    await FavoriteRestaurantIdb.getAllRestaurants();
    const favButton = document.querySelector('favorite-button button');

    expect(favButton.getAttribute('aria-label')).toEqual('like this restaurant');
  });

  it('Should not show delete button when the restaurant has not been liked before', async () => {
    const favButton = document.querySelector('[aria-label="unlike this restaurant"]');

    expect(favButton).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await FavoriteRestaurantIdb.getAllRestaurants();
    const favButton = document.querySelector('favorite-button button');
    favButton.dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });
  });

  it('should not add a restaurant again when its already saved', async () => {
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    const favButton = document.querySelector('favorite-button button');
    favButton.dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurant).toEqual([{ id: 1 }]);
  });

  afterEach(async () => {
    FavoriteRestaurantIdb.deleteRestaurant(1);
  });
});
