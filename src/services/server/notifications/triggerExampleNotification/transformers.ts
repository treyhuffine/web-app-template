// @ts-nocheck
import { NotificationActionTypesEnum, NotificationStatusesEnum } from 'types/generated/server';
import { EmailParams } from 'services/server/communications/email/sendExampleEmail';
import { getDisplayDateTimeForTimezone } from 'utils/shared/time/getDisplayDateTimeForTimezone';
import { CommunicationParams, PipelineInputParams } from './params';
import { InAppNotificationTemplate } from '../helpers/types';

export const transformInputToEmail = ({ data: { id } }: CommunicationParams) => {
  const notifications: EmailParams[] = [];
  return notifications;
};

export const transformInputToInAppNotification = ({
  data: { id },
}: CommunicationParams): InAppNotificationTemplate[] => {
  const inAppNotifications: InAppNotificationTemplate[] = [];

  inAppNotifications.push({
    payload: {
      id,
    },
  });

  return inAppNotifications;
};

export const adapterForExampleApi = ({ id }: { id: string }): PipelineInputParams => {
  return {
    id,
  };
};
