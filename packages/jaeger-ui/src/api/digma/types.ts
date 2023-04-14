export type ActionListener = (data: unknown) => void;

export interface IDigmaIncomingMessageData {
  type: "digma";
  action: string;
  payload?: unknown;
}

export interface IDigmaOutgoingMessageData {
  action: string;
  payload?: Record<string, unknown>;
}

export type DigmaMessageEvent = MessageEvent<IDigmaIncomingMessageData>;

interface ISpanInfo {
  importance?: number
}

export type SetSpansWithResolvedLocationsData = Record<string, ISpanInfo>