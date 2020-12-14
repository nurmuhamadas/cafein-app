const assert = require('assert');

Feature('Liking restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('Liking a restaurant', async ({ I }) => {
  I.seeElement('.not__found');

  I.amOnPage('/');

  I.seeElement('.card__wrap:not(.skeleton)');

  const firstRestaurant = locate('.card__title').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

  I.click(locate('.card__action').first());

  I.seeElement('favorite-button');
  I.click('favorite-button');

  I.amOnPage('/#/favorite');
  I.seeElement('.card__title');
  const likedRestaurantTitle = await I.grabTextFrom('.card__title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});
