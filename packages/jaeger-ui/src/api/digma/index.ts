import logger from '../../logging';
import isObject from '../../utils/ts/typeGuards/isObject';
import ActionDispatcher from './ActionDispatcher';
import { updateState } from './state';
import { DigmaMessageEvent, IDigmaOutgoingMessageData } from './types';

const isDigmaMessageEvent = (e: MessageEvent): e is DigmaMessageEvent =>
  isObject(e.data) && e.data.type === 'digma';

const OUTGOING_MESSAGE_ACTION_ID_CONSOLE_STYLE = 'color: blue; font-weight: bold';
const FAILED_OUTGOING_MESSAGE_ACTION_ID_CONSOLE_STYLE = 'color: red; font-weight: bold';
const INCOMING_MESSAGE_ACTION_ID_CONSOLE_STYLE = 'color: green; font-weight: bold';

export const initializeDigmaMessageListener = (dispatcher: ActionDispatcher) => {
  const handleDigmaMessage = (e: MessageEvent) => {
    if (isDigmaMessageEvent(e)) {
      logger.debug(
        `Message received: %c${e.data.action}
%cRaw message: %O`,
        INCOMING_MESSAGE_ACTION_ID_CONSOLE_STYLE,
        null,
        e.data
      );

      updateState(e.data.action, e.data.payload);

      dispatcher.dispatch(e.timeStamp, e.data.action, e.data.payload, e.data.error);
    }
  };

  window.addEventListener('message', handleDigmaMessage);

  return () => {
    window.removeEventListener('message', handleDigmaMessage);
  };
};

export const sendMessage = <T>(message: IDigmaOutgoingMessageData<T>): string | undefined => {
  logger.debug(
    `Message to send: ${message.action}
Raw message: %O`,
    message
  );

  updateState(message.action, message.payload);

  switch (window.platform) {
    case 'VS Code':
      if (window.sendMessageToVSCode) {
        window.sendMessageToVSCode(message);
        logger.debug(
          `Message has been successfully sent to VS Code: %c${message.action}
%cRaw message: %O`,
          OUTGOING_MESSAGE_ACTION_ID_CONSOLE_STYLE,
          null,
          message
        );
      }
      break;
    case 'JetBrains':
      if (window.cefQuery) {
        return window.cefQuery({
          request: JSON.stringify(message),
          onSuccess(response) {
            logger.debug(
              `Message has been successfully handled by JCEF: %c${message.action}
%cRaw message: %O
Response: %O`,
              OUTGOING_MESSAGE_ACTION_ID_CONSOLE_STYLE,
              null,
              message,
              response
            );
          },
          onFailure(errorCode: number, errorMessage: string) {
            logger.error(
              `Failed to handle the message by JCEF: %c${message.action}
%cRaw message: %O
%cError code: %d
Error message: %s`,
              FAILED_OUTGOING_MESSAGE_ACTION_ID_CONSOLE_STYLE,
              null,
              errorCode,
              errorMessage
            );
          },
        });
      }
      break;
    default:
      if (window.parent !== window) {
        window.parent.postMessage(message, '*');
      }
  }

  return undefined;
};

export const cancelMessage = (messageId: string) => {
  if (window.cefQueryCancel) {
    window.cefQueryCancel(messageId);
  }
};
