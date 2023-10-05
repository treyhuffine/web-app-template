import { useCallback, useRef, useState } from 'react';
import { API_URL } from 'constants/api';
import { HttpMethods } from 'constants/http';
import {
  RequestStatus,
  /**
   * @todo Introduce FetchStatus? One shows the state of data, and the other shows if it's fetching.
   * Ex. Perhaps I want to fetch again without removing the old data and showing it loading.
   */
  // FetchStatus
} from 'constants/requests';
import { getViewerToken } from 'services/client/auth/token';
import { removeBoundSlash } from 'utils/shared/string/removeBoundSlash';

/**
 * @todo SHOULD I JUST USE REACT QUERY?
 */
/**
 * @todo Should I make a simple version that just returns the response and manages the loading state?
 */

interface Params {
  id?: string;
  baseUrl?: string;
  endpoint?: string;
  injectHeaders?: () => Promise<object>;
}

interface RequestConfig<TRequestPayload> extends RequestInit {
  endpoint?: string;
  payload?: TRequestPayload;
}

type FetchResponse<TRequestPayload> = {
  data?: TRequestPayload | string;
  isStream: boolean;
  error?: string | null;
  isError: boolean;
};

type UseApiReturnType<TRequestPayload, TResponsePayload> = {
  response: Response | null;
  data: TResponsePayload | null;
  stream: string | null;
  isStreamResponse: boolean;
  status: RequestStatus;
  error: string | null;
  fetchData: (config?: RequestConfig<TRequestPayload>) => Promise<FetchResponse<TResponsePayload>>;
  post: (config?: RequestConfig<TRequestPayload>) => Promise<FetchResponse<TResponsePayload>>;
  get: (config?: RequestConfig<TRequestPayload>) => Promise<FetchResponse<TResponsePayload>>;
  put: (config?: RequestConfig<TRequestPayload>) => Promise<FetchResponse<TResponsePayload>>;
  patch: (config?: RequestConfig<TRequestPayload>) => Promise<FetchResponse<TResponsePayload>>;
  delete: (config?: RequestConfig<TRequestPayload>) => Promise<FetchResponse<TResponsePayload>>;
  isCalled: boolean;
  RequestStatus: typeof RequestStatus;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseStatusCode: number | null;
  responseHeaders: Headers | null;
  stopRequest: () => void;
  resetInitialState: () => void;
};

const injectViewerToken = async () => {
  const token = await getViewerToken();

  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

export const useApi = <TRequestPayload = any, TResponsePayload = any>({
  baseUrl,
  endpoint: endpointPrefix,
  injectHeaders,
}: Params): UseApiReturnType<TRequestPayload, TResponsePayload> => {
  const [status, setStatus] = useState(RequestStatus.Idle);
  const [data, setData] = useState<TResponsePayload | null>(null);
  const [stream, setStream] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCalled, setIsCalled] = useState(false);
  const [isStreamResponse, setIsStreamResponse] = useState(false);
  const [responseStatusCode, setResponseStatusCode] = useState<number | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<Headers | null>(null);
  const [response, setResponse] = useState<Response | null>(null);
  const abortController = useRef(new AbortController());

  const resetInitialState = useCallback(() => {
    setResponse(null);
    setData(null);
    setStream(null);
    setError(null);
    setIsStreamResponse(false);
    setResponseStatusCode(null);
    setResponseHeaders(null);
    setStatus(RequestStatus.Idle);
    setIsCalled(false);
  }, []);

  const resetNewRequest = () => {
    setResponse(null);
    setData(null);
    setStream(null);
    setError(null);
    setIsStreamResponse(false);
    setResponseStatusCode(null);
    setResponseHeaders(null);
    setStatus(RequestStatus.Loading);
  };

  // Function to handle the API request
  const fetchData = async ({
    endpoint: fetchEndpoint,
    payload,
    ...customConfig
  }: RequestConfig<TRequestPayload> = {}) => {
    /**
     * @todo Implement some kind of refetching where it doesn't clobber the old data. May need to introduce a FetchStatus.
     */
    resetNewRequest();
    setIsCalled(true);

    try {
      const config: RequestInit = {
        ...customConfig,
        headers: {
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
        if (payload instanceof FormData) {
          config.body = payload;
        } else {
          config.body = JSON.stringify(payload);
          config.headers = { ...config.headers, 'content-type': 'application/json' };
        }
      }

      /**
       * @todo Should I pick between the endpoints or combine them?
       */
      const endpoint = `${endpointPrefix || ''}/${removeBoundSlash(fetchEndpoint || '')}`;
      const requestEndpoint = removeBoundSlash(endpoint);

      const response = await fetch(`${baseUrl}/${requestEndpoint}`, {
        ...config,
        signal: abortController.current.signal,
      });

      setResponse(response);
      setResponseStatusCode(response.status);
      setResponseHeaders(response.headers);

      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }

      const contentType = response.headers.get('Content-Type');
      const isStream = !!contentType && contentType.includes('text/event-stream');
      const isJson = !!contentType && contentType.includes('application/json');

      setIsStreamResponse(isStream);

      if (isStream) {
        const data = response.body;
        const reader = data?.getReader();
        const decoder = new TextDecoder();
        let result = '';
        let done = false;

        if (reader) {
          while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            result += chunkValue;
            // @ts-ignore It will be a string if it's streaming, how do I tell TS that?
            // setData((prev) => prev + chunkValue);
            /**
             * @todo Pass in a handleStream function that handles the stream response? Maybe you need to JSON.parse or something.
             */
            setStream((prev) => (prev || '') + chunkValue);
          }
        }

        setStatus(RequestStatus.Success);

        return { data: result, isStream, isError: false };
      } else if (isJson) {
        const result: TResponsePayload = await response.json();
        setData(result);
        setStatus(RequestStatus.Success);

        return { data: result, isStream, isError: false };
      } else {
        const result = await response.text();
        setStatus(RequestStatus.Success);

        return { data: result, isStream, isError: false };
      }
    } catch (e) {
      const error = e as Error;
      setError(error.message);
      setStatus(RequestStatus.Error);

      return { error: error.message, isStream: false, isError: true };
    }
  };

  const stopRequest = useCallback(() => {
    abortController.current.abort();
    abortController.current = new AbortController();
  }, []);

  return {
    response,
    data,
    stream,
    isStreamResponse,
    status,
    error,
    fetchData,
    post: ({ payload, ...rest }: RequestConfig<TRequestPayload> = {}) =>
      fetchData({ ...rest, method: HttpMethods.Post, payload }),
    get: ({ payload, ...rest }: RequestConfig<TRequestPayload> = {}) =>
      fetchData({ ...rest, method: HttpMethods.Get, payload }),
    put: ({ payload, ...rest }: RequestConfig<TRequestPayload> = {}) =>
      fetchData({ ...rest, method: HttpMethods.Put, payload }),
    patch: ({ payload, ...rest }: RequestConfig<TRequestPayload> = {}) =>
      fetchData({ ...rest, method: HttpMethods.Patch, payload }),
    delete: ({ payload, ...rest }: RequestConfig<TRequestPayload> = {}) =>
      fetchData({ ...rest, method: HttpMethods.Delete, payload }),
    isCalled,
    RequestStatus,
    isLoading: status === RequestStatus.Loading,
    isSuccess: status === RequestStatus.Success,
    isError: status === RequestStatus.Error,
    responseStatusCode,
    responseHeaders,
    stopRequest,
    resetInitialState,
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
