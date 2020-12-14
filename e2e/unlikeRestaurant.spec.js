Feature('Unliking restaurant');

Before(({ I }) => {
  I.amOnPage('/');

  I.seeElement('.card__wrap:not(.skeleton)');

  I.click(locate('.card__action').first());

  I.seeElement('favorite-button');
  I.click('favorite-button');
});

Scenario('Unliking a restaurant', async ({ I }) => {
  I.amOnPage('/#/favorite');

  I.seeElement('.card__wrap:not(.skeleton)');

  I.click(locate('.card__action').first());

  I.seeElement('favorite-button');
  I.click('favorite-button');

  I.amOnPage('/#/favorite');
  I.seeElement('.not__found');
});
