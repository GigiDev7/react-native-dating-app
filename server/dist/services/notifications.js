"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushNotifications = void 0;
const expo_server_sdk_1 = require("expo-server-sdk");
const pushNotifications = (messages) => __awaiter(void 0, void 0, void 0, function* () {
    const expo = new expo_server_sdk_1.Expo();
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    for (let chunk of chunks) {
        try {
            let ticketChunk = yield expo.sendPushNotificationsAsync(chunk);
            tickets.push(ticketChunk);
        }
        catch (error) {
            console.log(error);
        }
    }
    let receiptIds = [];
    for (let ticket of tickets) {
        if (ticket.id) {
            receiptIds.push(ticket.id);
        }
    }
    let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    for (let chunk of receiptIdChunks) {
        try {
            let receipts = yield expo.getPushNotificationReceiptsAsync(chunk);
            for (let id in receipts) {
                let { status } = receipts[id];
                if (status === "ok") {
                    continue;
                }
                else if (status === "error") {
                    console.log("error");
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
});
exports.pushNotifications = pushNotifications;
