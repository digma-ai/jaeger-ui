import { isObject } from "../../utils/ts/typeGuards/isObject";
import { ActionDispatcher } from "./ActionDispatcher";
import { updateState } from "./state";
import { DigmaMessageEvent, IDigmaOutgoingMessageData } from "./types";

const isDigmaMessageEvent = (e: MessageEvent): e is DigmaMessageEvent =>
  isObject(e.data) && e.data.type === "digma";

export const initializeDigmaMessageListener = (
  dispatcher: ActionDispatcher
) => {
  window.addEventListener("message", e => {
    if (isDigmaMessageEvent(e)) {
      console.info("Digma message received: ", e);

      updateState(e.data.action, e.data.payload);

      dispatcher.dispatch(e.data.action, e.data.payload);
    }
  });
};

export const sendMessage = (
  message: IDigmaOutgoingMessageData
): string | undefined => {
  updateState(message.action, message.payload);

  if (window.sendMessageToVSCode) {
    window.sendMessageToVSCode(message);
    console.info("Message has been sent to VS Code: ", message);
  }

  if (window.cefQuery) {
    return window.cefQuery({
      request: JSON.stringify(message),
      onSuccess (response) {
        console.info("cefQuery has been successfully sent: %s", response);
      },
      onFailure (errorCode, errorMessage) {
        console.error(
          "Failed to send cefQuery: %d, %s",
          errorCode,
          errorMessage
        );
      }
    });
  }

  return undefined;
};

export const cancelMessage = (messageId: string) => {
  if (window.cefQueryCancel) {
    window.cefQueryCancel(messageId);
  }
};
