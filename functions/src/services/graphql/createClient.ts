import { GraphQLClient } from 'graphql-request';

const createClient = () => {
  const client = new GraphQLClient(process.env.GRAPHQL_URL!, {
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET!,
    },
  });

  return client;
};

export default createClient;
