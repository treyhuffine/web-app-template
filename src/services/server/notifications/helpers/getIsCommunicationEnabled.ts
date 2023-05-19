// @ts-nocheck
import { CommunicationPreferenceStatusesEnum } from 'types/generated/server';
import { CommunicationPreferences, CommunicationPreferencesUserIdMap } from './types';

interface Params {
  userId: string;
  preferenceKey: keyof CommunicationPreferences;
  communicationPreferences: CommunicationPreferencesUserIdMap;
}

export const getIsCommunicationEnabled = async ({
  userId,
  preferenceKey,
  communicationPreferences,
}: Params) => {
  const preference = communicationPreferences[userId];

  if (!preference) {
    return false;
  }

  return (
    !!preference[preferenceKey] &&
    preference[preferenceKey] === CommunicationPreferenceStatusesEnum.Active
  );
};
