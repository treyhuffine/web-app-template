// @ts-nocheck
import {
  EmailParams,
  sendExampleEmail,
} from 'services/server/communications/email/sendExampleEmail';
import { CommunicationParams } from './params';
import { transformInputToEmail } from './transformers';
import { getIsCommunicationEnabled } from '../helpers/getIsCommunicationEnabled';

const PREFERENCE_KEY = 'playSessionReminderEmail';

const filterActiveSubscribers = async (
  items: EmailParams[],
  { communicationPreferences }: CommunicationParams,
) => {
  const communicationPrefrencesByIndex = await Promise.all(
    items.map((item) =>
      getIsCommunicationEnabled({
        userId: item.to.userId,
        preferenceKey: PREFERENCE_KEY,
        communicationPreferences,
      }),
    ),
  );
  return items.filter((_item, index) => communicationPrefrencesByIndex[index]);
};

const send = async (items: EmailParams[]) => {
  const sendPromises = items.map((item) => sendExampleEmail(item));
  await Promise.all(sendPromises);
  return;
};

export const runEmailNotificationPipeline = async (params: CommunicationParams) => {
  console.log(1);
  const payload = await transformInputToEmail(params);
  console.log(2, payload);
  const notificationsToSend = await filterActiveSubscribers(payload, params);
  console.log(3, notificationsToSend);
  if (notificationsToSend?.length > 0) {
    await send(notificationsToSend);
  }

  return;
};
