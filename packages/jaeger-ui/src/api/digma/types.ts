import { InsightType } from '../../components/common/InsightIcon/types';
import { IDigmaSpanData } from '../../utils/getSpanDataForDigma';

export type ActionListener = (data: unknown, timeStamp: number, error: DigmaMessageError | undefined) => void;

export type DigmaMessageError = {
  message: string;
};

export interface IDigmaIncomingMessageData {
  type: 'digma';
  action: string;
  payload?: unknown;
  error?: DigmaMessageError;
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

export type GoToSpanPayload = IDigmaSpanData;

export type GoToInsightsPayload = IDigmaSpanData;

export type GetSpansDataPayload = { spans: IDigmaSpanData[] };

export type SetSpansDataPayload = Record<string, ISpanInfo>;

export type ChangeScopePayload = {
  span: {
    spanCodeObjectId: string;
  } | null;
  forceNavigation?: boolean;
  environmentId?: string;
  context?: {
    event: string;
    payload?: Record<string, unknown>;
  };
};

export type OpenURLInDefaultBrowserPayload = {
  url: string;
  title?: string;
};
