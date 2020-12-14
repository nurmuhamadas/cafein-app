import FavoriteRestaurantIdb from '../src/scripts/data/idb';

describe('Unliking a Restaurant', () => {
  beforeEach(async () => {
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    document.body.innerHTML = '<div id="detail-page"></div>';
    const container = document.querySelector('#detail-page');
    const likeButton = document.createElement('favorite-button');
    likeButton.data = { id: 1 };
    container.appendChild(likeButton);
  });

  it('Should show delete button when the restaurant has been saved before', async () => {
    await FavoriteRestaurantIdb.getAllRestaurants();
    const favButton = document.querySelector('favorite-button button');

    expect(favButton.getAttribute('aria-label')).toEqual('unlike this restaurant');
  });

  it('Should not show save button when the restaurant has not been saved before', async () => {
    await FavoriteRestaurantIdb.getAllRestaurants();
    const favButton = document.querySelector('[aria-label="like this restaurant"]');

    expect(favButton).toBeFalsy();
  });

  it('should be able to unlike the restaurant', async () => {
    await FavoriteRestaurantIdb.getAllRestaurants();
    const favButton = document.querySelector('favorite-button button');
    favButton.dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toBeFalsy();
  });

  it('should not delete a restaurant again when its already deleted', async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);

    const favButton = document.querySelector('favorite-button button');
    favButton.dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurant).toEqual([]);
  });

  afterEach(async () => {
    FavoriteRestaurantIdb.deleteRestaurant(1);
  });
});
