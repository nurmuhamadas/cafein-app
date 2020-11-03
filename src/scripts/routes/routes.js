const routes = async (url) => {
  let page;
  switch (url) {
    case '/':
      await import('../views/pages/home')
        .then((module) => {
          page = module.default;
        });
      break;
    case '/home':
      await import('../views/pages/home')
        .then((module) => {
          page = module.default;
        });
      break;

    case '/favorite':
      await import('../views/pages/favorite')
        .then((module) => {
          page = module.default;
        });
      break;
    case '/detail/:id':
      await import('../views/pages/detail')
        .then((module) => {
          page = module.default;
        });
      break;
    case '/detail/:id/saved':
      await import('../views/pages/detail')
        .then((module) => {
          page = module.default;
        });
      break;
    case '/error':
      await import('../views/pages/error')
        .then((module) => {
          page = module.default;
        });
      break;
    default:
      await import('../views/pages/error')
        .then((module) => {
          page = module.default;
        });
      break;
  }

  return page;
};

export default routes;
