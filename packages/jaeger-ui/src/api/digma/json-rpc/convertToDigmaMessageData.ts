import type { IDigmaIncomingMessageData } from '../types';
import type { DigmaJSONRPCRequest } from './types';

const convertToDigmaMessageData = (data: DigmaJSONRPCRequest): IDigmaIncomingMessageData => ({
  type: 'digma',
  action: data.method,
  ...(data.params ? { payload: data.params } : {}),
});

export default convertToDigmaMessageData;
