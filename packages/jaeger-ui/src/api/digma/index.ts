import logger from '../../logging';
import { platform } from '../../platform';
import isObject from '../../utils/ts/typeGuards/isObject';
import ActionDispatcher from './ActionDispatcher';
import convertToDigmaJsonRpcRequest from './json-rpc/convertToDigmaJsonRpcRequest';
import convertToDigmaMessageData from './json-rpc/convertToDigmaMessageData';
import isDigmaJsonRpcRequest from './json-rpc/isDigmaJsonRpcRequest';
import { updateState } from './state';
import { DigmaMessageEvent, IDigmaIncomingMessageData, IDigmaOutgoingMessageData } from './types';

const isDigmaMessageEvent = (e: MessageEvent): e is DigmaMessageEvent =>
  isObject(e.data) && e.data.type === 'digma';

const OUTGOING_MESSAGE_ACTION_ID_CONSOLE_STYLE = 'color: blue; font-weight: bold';
const FAILED_OUTGOING_MESSAGE_ACTION_ID_CONSOLE_STYLE = 'color: red; font-weight: bold';
const INCOMING_MESSAGE_ACTION_ID_CONSOLE_STYLE = 'color: green; font-weight: bold';

export const initializeDigmaMessageListener = (dispatcher: ActionDispatcher) => {
  const handleDigmaMessage = (e: MessageEvent) => {
    let data: IDigmaIncomingMessageData | undefined;

    if (isDigmaJsonRpcRequest(e)) {
      data = convertToDigmaMessageData(e.data);
    }

    if (isDigmaMessageEvent(e)) {
      data = e.data;
    }

    if (!data) {
      return;
    }

    logger.debug(
      `Message received: %c${e.data.action}
%cRaw message: %O`,
      INCOMING_MESSAGE_ACTION_ID_CONSOLE_STYLE,
      null,
      e.data
    );

    updateState(e.data.action, e.data.payload);

    dispatcher.dispatch(e.timeStamp, e.data.action, e.data.payload, e.data.error);
  };

  switch (platform) {
    case 'Visual Studio':
      if (window.chrome?.webview) {
        window.chrome.webview.addEventListener('message', handleDigmaMessage);
      }
      break;
    case 'JetBrains':
      window.addEventListener('message', handleDigmaMessage);
      break;
    default:
      break;
  }

  window.addEventListener('message', handleDigmaMessage);

  return () => {
    switch (platform) {
      case 'Visual Studio':
        if (window.chrome?.webview) {
          window.chrome.webview.removeEventListener('message', handleDigmaMessage);
        }
        break;
      case 'JetBrains':
        window.removeEventListener('message', handleDigmaMessage);
        break;
      default:
        break;
    }
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
    case 'Visual Studio': {
      const jsonRpcMessage = convertToDigmaJsonRpcRequest(message);

      if (window.chrome?.webview) {
        window.chrome.webview?.postMessage(jsonRpcMessage);
        logger.debug(
          `Message has been successfully sent to Visual Studio: %c${jsonRpcMessage.method}
%cRaw message: %O`,
          OUTGOING_MESSAGE_ACTION_ID_CONSOLE_STYLE,
          null,
          jsonRpcMessage
        );
      }
      break;
    }
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
