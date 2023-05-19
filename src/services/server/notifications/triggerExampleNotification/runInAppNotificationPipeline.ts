// @ts-nocheck
import { insertInAppUserNotificationEntityWithReceivers } from 'services/server/graphql/mutations/insertInAppUserNotificationEntityWithReceivers';
import { CommunicationParams } from './params';
import { transformInputToInAppNotification } from './transformers';
import { InAppNotificationTemplate } from '../helpers/types';

const filterActiveSubscribers = async (notificationData: InAppNotificationTemplate[]) => {
  return notificationData;
};
const send = async (notificationData: InAppNotificationTemplate[]) => {
  if (!notificationData) {
    return;
  }

  for (let i = 0; i < notificationData.length; i++) {
    const itemsToInsert = notificationData[i];
    await insertInAppUserNotificationEntityWithReceivers(itemsToInsert.payload);
  }

  return;
};

export const runInAppNotificationPipeline = async (params: CommunicationParams) => {
  const payload = await transformInputToInAppNotification(params);
  const notificationsToSend = await filterActiveSubscribers(payload);
  console.log('----', notificationsToSend);
  if (notificationsToSend?.length > 0) {
    await send(notificationsToSend);
  }

  return;
};
