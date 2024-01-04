export interface IInsightIconProps {
  insight: {
    type: InsightType;
    importance: number;
  };
  size?: number;
}

export enum InsightType {
  TopErrorFlows = 'TopErrorFlows',
  SpanDurationChange = 'SpanDurationChange',
  SpanUsageStatus = 'SpanUsageStatus',
  HotSpot = 'HotSpot',
  Errors = 'Errors',
  SlowEndpoint = 'SlowEndpoint',
  LowUsage = 'LowUsage',
  NormalUsage = 'NormalUsage',
  HighUsage = 'HighUsage',
  SlowestSpans = 'SlowestSpans',
  EndpointSpanNPlusOne = 'EndpointSpaNPlusOne',
  SpanUsages = 'SpanUsages',
  SpanNPlusOne = 'SpaNPlusOne',
  SpanEndpointBottleneck = 'SpanEndpointBottleneck',
  SpanDurations = 'SpanDurations',
  SpanScalingBadly = 'SpanScaling',
  SpanDurationBreakdown = 'SpanDurationBreakdown',
  EndpointDurationSlowdown = 'EndpointDurationSlowdown',
  EndpointBreakdown = 'EndpointBreakdown',
  EndpointSessionInView = 'EndpointSessionInView',
  EndpointChattyApi = 'EndpointChattyApi',
  EndpointHighNumberOfQueries = 'EndpointHighNumberOfQueries',
}
