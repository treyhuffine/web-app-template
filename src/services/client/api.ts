import { API_URL } from 'constants/api';
import APIService from './ApiService';

/**
 * @todo Implement this once we have a GraphQL URL to pull necessary data from
 */
// import { getViewerToken } from 'services/client';

const BASE_URL = API_URL;

const api = new APIService({
  baseUrl: BASE_URL,
  /**
   * @todo Implement this once we have a GraphQL URL to pull necessary data from
   */
  // injectHeaders: async () => {
  //   const token = await getViewerToken();

  //   if (token) {
  //     return { Authorization: `Bearer ${token}` };
  //   } else {
  //     return {};
  //   }
  // },
});

export default api;
