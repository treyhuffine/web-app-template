import { CustomClaims, HASURA_CLAIMS_KEY, HasuraClaimKey, HasuraClaims } from 'constants/auth';
import { toPostgresArray } from 'utils/shared/hasura';

const createCustomClaims = ({
  userId,
  firebaseId,
  subscriptions,
}: {
  firebaseId: string;
  userId: string;
  subscriptions: string[];
}): CustomClaims => {
  const hasuraClains: HasuraClaims = {
    [HasuraClaimKey.DefaultRole]: 'user',
    [HasuraClaimKey.AllowedRoles]: ['user', 'anonymous'],
    [HasuraClaimKey.UserID]: userId,
    [HasuraClaimKey.Subscriptions]: toPostgresArray(subscriptions),
  };
  const customClaims = {
    userId,
    [HASURA_CLAIMS_KEY]: hasuraClains,
  };

  return customClaims;
};

export default createCustomClaims;
