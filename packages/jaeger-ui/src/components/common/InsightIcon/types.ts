export interface IInsightIconProps {
  insight: {
    type: InsightType;
    importance: number;
  };
  size?: number;
}

export enum InsightType {
  TopErrorFlows = 'TopErrorFlows',
  HotSpot = 'HotSpot',
  Errors = 'Errors',
  SlowEndpoint = 'SlowEndpoint',
  LowUsage = 'LowUsage',
  NormalUsage = 'NormalUsage',
  HighUsage = 'HighUsage',
  EndpointBottleneck = 'EndpointBottleneck',
  EndpointSpanNPlusOne = 'EndpointSpanNPlusOne',
  SpanUsages = 'SpanUsages',
  SpanNPlusOne = 'SpaNPlusOne',
  SpanEndpointBottleneck = 'SpanEndpointBottleneck',
  SpanDurations = 'SpanDurations',
  SpanScalingBadly = 'SpanScaling',
  SpanDurationBreakdown = 'SpanDurationBreakdown',
  EndpointBreakdown = 'EndpointBreakdown',
  EndpointSessionInView = 'EndpointSessionInView',
  EndpointChattyApi = 'EndpointChattyApi',
  EndpointChattyApiV2 = 'EndpointChattyApiV2',
  EndpointHighNumberOfQueries = 'EndpointHighNumberOfQueries',
  SpanNexus = 'SpanNexus',
  SpanQueryOptimization = 'SpanQueryOptimization',
  EndpointQueryOptimization = 'EndpointQueryOptimization',
  EndpointQueryOptimizationV2 = 'EndpointQueryOptimizationV2',
  EndpointSlowdownSource = 'EndpointSlowdownSource',
}
