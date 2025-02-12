import isObject from '../../../utils/ts/typeGuards/isObject';
import type { IDigmaOutgoingMessageData } from '../types';
import { DigmaJSONRPCRequest } from './types';

const convertToDigmaJsonRpcRequest = (data: IDigmaOutgoingMessageData<unknown>): DigmaJSONRPCRequest => ({
  meta: {
    channel: 'digma',
  },
  jsonrpc: '2.0',
  method: data.action,
  ...(isObject(data.payload) ? { params: data.payload } : {}),
});

export default convertToDigmaJsonRpcRequest;
