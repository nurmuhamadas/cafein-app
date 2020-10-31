import CONFIG from './config';

const API_ENDPOINT = {
  LIST: `${CONFIG.BASE_URL_RESTAURANT_API}/list`,
  DETAIL: (id) => `${CONFIG.BASE_URL_RESTAURANT_API}/detail/${id}`,
  SEARCH: (queryParam) => `${CONFIG.BASE_URL_RESTAURANT_API}/search?q=${queryParam}`,
  ADD_REVIEW: `${CONFIG.BASE_URL_RESTAURANT_API}/review`,
  GET_PICTURE: (pictureId, resolusi) => `${CONFIG.BASE_URL_RESTAURANT_API}/images/${resolusi}/${pictureId}`,
};

export default API_ENDPOINT;
