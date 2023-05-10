import { InsightType } from '../../components/common/InsightIcon/types';

export type ActionListener = (data: unknown) => void;

export interface IDigmaIncomingMessageData {
  type: 'digma';
  action: string;
  payload?: unknown;
}

export interface IDigmaOutgoingMessageData {
  action: string;
  payload?: Record<string, unknown>;
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
