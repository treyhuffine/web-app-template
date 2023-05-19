// @ts-nocheck
import { InsertInAppUserNotificationEntityWithReceiversMutationVariables } from 'types/generated/server';
import { getUserCommunicationPreferences } from 'services/server/graphql/queries/getUserCommunicationPreferences';

export interface CommnuncationTemplate<PayloadGeneric> {
  to: {
    userId: string;
    email: string;
    fullName: string;
    preferredName: string;
  };
  payload: PayloadGeneric;
}

export type NotificationPayload = InsertInAppUserNotificationEntityWithReceiversMutationVariables;

export interface InAppNotificationTemplate {
  payload: NotificationPayload;
}

export type CommunicationPreferences = Awaited<
  ReturnType<typeof getUserCommunicationPreferences>
>['userCommunicationPreferences'][0];
export type CommunicationPreferencesUserIdMap = Record<string, CommunicationPreferences>;
