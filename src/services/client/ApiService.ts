import { HttpMethods } from 'constants/http';
import { removeLeadingSlash } from 'utils/shared/string/removeLeadingSlash';
import { removeTrailingSlash } from 'utils/shared/string/removeTrailingSlash';

interface ConstructorConfig {
  baseUrl?: string;
  injectHeaders?: () => Promise<object>;
}

interface RequestConfig extends RequestInit {
  payload?: object;
}

class APIService {
  baseUrl: string;
  injectHeaders?: () => Promise<object>;

  constructor({ baseUrl = '', injectHeaders }: ConstructorConfig) {
    this.baseUrl = removeTrailingSlash(baseUrl);
    this.injectHeaders = injectHeaders;
  }

  async request(endpoint: string, { payload, ...customConfig }: RequestConfig = {}) {
    const config: RequestInit = {
      method: payload ? HttpMethods.Post : HttpMethods.Get,
      ...customConfig,
      headers: {
        ...customConfig.headers,
      },
    };

    if (this.injectHeaders) {
      const injectedHeaders = await this.injectHeaders();
      config.headers = {
        ...config.headers,
        ...injectedHeaders,
      };
    }

    if (payload) {
      if (payload instanceof FormData) {
        config.body = payload;
      } else {
        config.body = JSON.stringify(payload);
        config.headers = { ...config.headers, 'content-type': 'application/json' };
      }
    }

    const requestEndpoint = removeLeadingSlash(endpoint);

    return fetch(`${this.baseUrl}/${requestEndpoint}`, config).then(async (response) => {
      const isJson = response.headers.get('content-type')?.includes('application/json');

      if (response.ok) {
        if (isJson) {
          const data = await response.json();
          return data;
        } else {
          return response;
        }
      } else {
        // TODO: Log in sentry
        return Promise.reject(isJson ? await response.json() : await response.text());
      }
    });
  }

  get(endpoint: string, config: RequestConfig = {}) {
    config.method = HttpMethods.Get;
    return this.request(endpoint, config);
  }

  post(endpoint: string, config: RequestConfig = {}) {
    config.method = HttpMethods.Post;
    return this.request(endpoint, config);
  }

  put(endpoint: string, config: RequestConfig = {}) {
    config.method = HttpMethods.Put;
    return this.request(endpoint, config);
  }

  patch(endpoint: string, config: RequestConfig = {}) {
    config.method = HttpMethods.Patch;
    return this.request(endpoint, config);
  }

  delete(endpoint: string, config: RequestConfig = {}) {
    config.method = HttpMethods.Delete;
    return this.request(endpoint, config);
  }
}

export default APIService;
