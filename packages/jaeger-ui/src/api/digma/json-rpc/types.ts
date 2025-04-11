export type JSONRPCID = string | number | null;

export interface IJSONRPCRequest {
  jsonrpc: '2.0';
  method: string;
  params?: unknown[] | Record<string, unknown>;
  id?: JSONRPCID;
}

export interface IJSONRPCSuccessResponse {
  jsonrpc: '2.0';
  result: unknown;
  id: JSONRPCID;
}

export interface IJSONRPCError {
  code: number;
  message: string;
  data?: unknown;
}

export interface IJSONRPCErrorResponse {
  jsonrpc: '2.0';
  error: IJSONRPCError;
  id: JSONRPCID;
}

export interface IDigmaJSONRPCExtension {
  meta: {
    channel: 'digma';
  };
}

export type DigmaJSONRPCRequest = IJSONRPCRequest & IDigmaJSONRPCExtension;

export type DigmaJSONRPCErrorResponse = IJSONRPCErrorResponse & IDigmaJSONRPCExtension;

export type DigmaJSONRPCSuccessResponse = IJSONRPCSuccessResponse & IDigmaJSONRPCExtension;
