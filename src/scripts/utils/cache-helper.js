/* eslint-disable no-restricted-globals */
import CONFIG from '../global/config';

const CacheHelper = {
  matchOrigin({ url }) {
    return !!(url.origin === location.origin);
  },

  matchApi({ url }) {
    return !!(url.origin === CONFIG.BASE_URL_RESTAURANT_API);
  },

  matchFont({ url }) {
    return !!(url.origin === 'https://fonts.googleapis.com');
  },
};

export default CacheHelper;
