import { InsightType } from '../../components/common/InsightIcon/types';

export type ActionListener = (data: unknown, timeStamp: number) => void;

export interface IDigmaIncomingMessageData {
  type: 'digma';
  action: string;
  payload?: unknown;
}

export interface IDigmaOutgoingMessageData<T> {
  action: string;
  payload?: T;
}

export type DigmaMessageEvent = MessageEvent<IDigmaIncomingMessageData>;

export interface ISpanInsight {
  type: InsightType;
  importance: number;
}

interface ISpanInfo {
  hasCodeLocation: boolean;
  insights: ISpanInsight[];
}

export type SetSpansDataPayload = Record<string, ISpanInfo>;
