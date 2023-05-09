import { useCallback, useRef, useState } from 'react';
import { API_URL } from 'constants/api';
import { HttpMethods } from 'constants/http';
import { RequestStatus } from 'constants/requests';

/**
 * @todo Implement this once we have a GraphQL URL to pull necessary data for the getViewerToken
 */
// import { getViewerToken } from 'services/client';

interface Params {
  id?: string;
  baseUrl?: string;
  endpoint?: string;
  injectHeaders?: () => Promise<object>;
}

interface RequestConfig<TRequestPayload> extends RequestInit {
  payload?: TRequestPayload;
}

type UseApiReturnType<TRequestPayload, TResponsePayload> = {
  data: TResponsePayload | null;
  status: RequestStatus;
  error: string | null;
  fetchData: (
    endpiont: string,
    config?: RequestConfig<TRequestPayload>,
  ) => Promise<TResponsePayload>;
  post: (endpiont: string, config?: RequestConfig<TRequestPayload>) => Promise<TResponsePayload>;
  get: (endpiont: string, config?: RequestConfig<TRequestPayload>) => Promise<TResponsePayload>;
  put: (endpiont: string, config?: RequestConfig<TRequestPayload>) => Promise<TResponsePayload>;
  patch: (endpiont: string, config?: RequestConfig<TRequestPayload>) => Promise<TResponsePayload>;
  delete: (endpiont: string, config?: RequestConfig<TRequestPayload>) => Promise<TResponsePayload>;
  RequestStatus: typeof RequestStatus;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseStatusCode: number | null;
  stopRequest: () => void;
};

/**
 * @todo Implement this once we have a GraphQL URL to pull necessary data for the getViewerToken
 */
// const injectViewerToken = async () => {
//   const token = await getViewerToken();
//
//   if (token) {
//     return { Authorization: `Bearer ${token}` };
//   } else {
//     return {};
//   }
// };
const injectViewerToken = async () => ({});

export const useApi = <TRequestPayload = any, TResponsePayload = any>({
  baseUrl,
  endpoint: hookEndpoint,
  injectHeaders,
}: Params): UseApiReturnType<TRequestPayload, TResponsePayload> => {
  // State variables for request status, data, and errors
  const [status, setStatus] = useState(RequestStatus.Idle);
  const [data, setData] = useState<null | TResponsePayload>(null);
  const [error, setError] = useState<null | string>(null);
  const [responseStatusCode, setResponseStatusCode] = useState<null | number>(null);
  const abortController = useRef(new AbortController());

  // Function to handle the API request
  const fetchData = async (
    fetchEndpoint: string,
    { payload, ...customConfig }: RequestConfig<TRequestPayload> = {},
  ) => {
    setData(null);
    setError(null);
    setResponseStatusCode(null);
    setStatus(RequestStatus.InProgress);

    try {
      const headers = { 'content-type': 'application/json' };
      const config: RequestInit = {
        ...customConfig,
        headers: {
          ...headers,
          ...customConfig.headers,
        },
      };

      if (injectHeaders) {
        const injectedHeaders = await injectHeaders();
        config.headers = {
          ...config.headers,
          ...injectedHeaders,
        };
      }

      if (payload) {
        config.body = JSON.stringify(payload);
      }

      const endpoint = fetchEndpoint || hookEndpoint;
      const requestEndpoint = endpoint[0] === '/' ? endpoint.slice(1) : endpoint;
      const response = await fetch(`${baseUrl}/${requestEndpoint}`, {
        ...config,
        signal: abortController.current.signal,
      });

      setResponseStatusCode(response.status);

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      const contentType = response.headers.get('Content-Type');
      const isStreaming = contentType && contentType.includes('text/event-stream');

      if (isStreaming) {
        const data = response.body;

        if (!data) {
          setStatus(RequestStatus.Success);
          return;
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let result = '';
        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          result += chunkValue;
          // @ts-ignore It will be a string if it's streaming, how do I tell TS that?
          setData((prev) => prev + chunkValue);
        }

        setStatus(RequestStatus.Success);

        return result;
      } else {
        const result = await response.json();
        setData(result);
        setStatus(RequestStatus.Success);

        return result;
      }
    } catch (error) {
      setError(error.message);
      setStatus(RequestStatus.Error);
    }
  };

  const stopRequest = useCallback(() => {
    abortController.current.abort();
    abortController.current = new AbortController();
  }, []);

  return {
    data,
    status,
    error,
    fetchData,
    post: (endpoint: string, { payload, ...rest }: RequestConfig<TRequestPayload>) =>
      fetchData(endpoint, { ...rest, method: HttpMethods.Post, payload }),
    get: (endpoint: string, { payload, ...rest }: RequestConfig<TRequestPayload>) =>
      fetchData(endpoint, { ...rest, method: HttpMethods.Get, payload }),
    put: (endpoint: string, { payload, ...rest }: RequestConfig<TRequestPayload>) =>
      fetchData(endpoint, { ...rest, method: HttpMethods.Put, payload }),
    patch: (endpoint: string, { payload, ...rest }: RequestConfig<TRequestPayload>) =>
      fetchData(endpoint, { ...rest, method: HttpMethods.Patch, payload }),
    delete: (endpoint: string, { payload, ...rest }: RequestConfig<TRequestPayload>) =>
      fetchData(endpoint, { ...rest, method: HttpMethods.Delete, payload }),
    RequestStatus,
    isLoading: status === RequestStatus.InProgress,
    isSuccess: status === RequestStatus.Success,
    isError: status === RequestStatus.Error,
    responseStatusCode,
    stopRequest,
  };
};

export const useApiGateway = <TRequestPayload = any, TResponsePayload = any>(
  endpoint?: string,
): UseApiReturnType<TRequestPayload, TResponsePayload> => {
  return useApi<TRequestPayload, TResponsePayload>({
    endpoint,
    baseUrl: API_URL,
    injectHeaders: injectViewerToken,
  });
};
