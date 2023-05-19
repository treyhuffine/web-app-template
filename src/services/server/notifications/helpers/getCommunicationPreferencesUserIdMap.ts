// @ts-nocheck
import { getUserCommunicationPreferences } from 'services/server/graphql/queries/getUserCommunicationPreferences';
import { CommunicationPreferencesUserIdMap } from './types';

export const getCommunicationPreferencesUserIdMap = async (ids: string[]) => {
  const userIdList = ids.map((id) => ({ id: { _eq: id } }));
  const communicationPrefernces = await getUserCommunicationPreferences({
    userIdList,
  });
  const preferencesByIdMap: CommunicationPreferencesUserIdMap = {};
  communicationPrefernces.userCommunicationPreferences.forEach((preferences) => {
    preferencesByIdMap[preferences.id] = preferences;
  });

  return preferencesByIdMap;
};

export type CommunicationPreferencesUserMap = Awaited<
  ReturnType<typeof getCommunicationPreferencesUserIdMap>
>;
