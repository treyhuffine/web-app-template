// @ts-nocheck TODO: Decide if I want to use react-query
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import {
  MutationFunction,
  MutationKey,
  QueryClient,
  QueryFunction,
  QueryKey,
  Updater,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { Persister, persistQueryClient } from '@tanstack/react-query-persist-client';
import { MAX_CACHE_TIME } from 'constants/api';
import { compress, decompress } from 'lz-string';

interface TUseApiProps<TResult, TError> {
  queryKey: QueryKey;
  fetchFn: Promise<any>;
  options?: UseQueryOptions<TResult, TError>;
}

interface TUseMutationApiProps<TResult, TError, TVariables, TContext> {
  mutationKey: MutationKey;
  fetchFn: Promise<TResult>;
  options?: UseMutationOptions<TResult, TError, TVariables, TContext>;
}

/**
 * @todo add persist & broadast queryClient
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: MAX_CACHE_TIME,
    },
  },
});

export const persister: Persister = createSyncStoragePersister({
  key: 'rq-cache',
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  serialize: (data) => compress(JSON.stringify(data)),
  deserialize: (data) => JSON.parse(decompress(data)),
});

// const doNotPersistQueries: QueryKey[] = [];

// persistQueryClient({
//   queryClient,
//   /**
//    * @todo native: revisit later
//    */
//   // persister: getIsNativePlatform() ? nativePersister : persister,
//   persister,
//   maxAge: MAX_CACHE_TIME,
//   dehydrateOptions: {
//     shouldDehydrateQuery: ({ queryKey }) => {
//       return !doNotPersistQueries.includes(queryKey);
//     },
//   },
// });

export const getFetchQuery = <Data>(queryKey: QueryKey) => {
  return queryClient.getQueryData<Data>(queryKey);
};

export const setFetchQuery = (queryKey: QueryKey, updater) => {
  return queryClient.setQueryData(queryKey, updater);
};

export const useApi = <TResult, TError>({
  queryKey,
  fetchFn,
  options,
}: TUseApiProps<TResult, TError>): UseQueryResult<TResult, TError> => {
  const queryFn: QueryFunction<TResult, QueryKey> = async () => {
    const res = await fetchFn;
    return res;
  };

  return useQuery({ queryKey, queryFn, ...options });
};

export const useMutationApi = <TResult, TError, TVariables, TContext>({
  mutationKey,
  fetchFn,
  options,
}: TUseMutationApiProps<TResult, TError, TVariables, TContext>): UseMutationResult<
  TResult,
  TError,
  TVariables,
  TContext
> => {
  const mutationFn: MutationFunction<TResult, TVariables> = async () => {
    const res = await fetchFn;
    return res;
  };

  return useMutation({ mutationKey, mutationFn, ...options });
};
