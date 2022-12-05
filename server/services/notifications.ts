import { Expo, ExpoPushMessage } from "expo-server-sdk";

const expo = new Expo();

export const pushNotifications = async (messages: ExpoPushMessage[]) => {
  let chunks = expo.chunkPushNotifications(messages);
  let tickets: any = [];

  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(ticketChunk);
    } catch (error) {
      console.log(error);
    }
  }

  let receiptIds: any = [];

  for (let ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }

  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);

  for (let chunk of receiptIdChunks) {
    try {
      let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
      for (let id in receipts) {
        let { status } = receipts[id];
        if (status === "ok") {
          continue;
        } else if (status === "error") {
          console.log("error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};
