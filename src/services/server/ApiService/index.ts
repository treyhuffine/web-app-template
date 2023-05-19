import fetch from 'isomorphic-unfetch';
import { HttpMethods } from 'constants/http';

type HeadersInit =
  | Record<string, string>
  | Iterable<readonly [string, string]>
  | Iterable<Iterable<string>>;

interface ConstructorConfig {
  baseUrl?: string;
  headers?: HeadersInit;
}

export interface RequestConfig extends RequestInit {
  payload?: object;
}

class APIService {
  baseUrl: string;
  headers: HeadersInit;

  constructor({ baseUrl = '', headers = {} }: ConstructorConfig) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  request(endpoint: string, { payload, ...customConfig }: RequestConfig = {}) {
    const headers = { 'content-type': 'application/json', ...this.headers };
    const config: RequestInit = {
      method: payload ? HttpMethods.Post : HttpMethods.Get,
      ...customConfig,
      headers: {
        ...headers,
        ...customConfig.headers,
      },
    };

    if (payload) {
      config.body = JSON.stringify(payload);
    }

    return fetch(`${this.baseUrl}/${endpoint}`, config).then(async (response) => {
      let data;

      try {
        data = await response.json();
      } catch (error) {
        // NOTE: This typically means it was an empty payload which is common when only a success response is sent
        // Should I track this in any way?
      }

      if (response.ok) {
        return data;
      } else {
        // TODO: Log in sentry
        return Promise.reject(data);
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
