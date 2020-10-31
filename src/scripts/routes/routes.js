import homePage from '../views/pages/home';
import favoritePage from '../views/pages/favorite';
import detailPage from '../views/pages/detail';
import errorPage from '../views/pages/error';

const routes = {
  '/': homePage,
  '/home': homePage,
  '/favorite': favoritePage,
  '/detail/:id': detailPage,
  '/detail/:id/saved': detailPage,
  '/error': errorPage,
};

export default routes;
