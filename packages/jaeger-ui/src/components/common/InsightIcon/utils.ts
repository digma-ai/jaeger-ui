import * as React from 'react';
import AlarmClockIcon from '../icons/AlarmClockIcon';
import BottleneckIcon from '../icons/BottleneckIcon';
import MeterHighIcon from '../icons/MeterHighIcon';
import MeterLowIcon from '../icons/MeterLowIcon';
import MeterMediumIcon from '../icons/MeterMediumIcon';
import SQLDatabaseIcon from '../icons/SQLDatabaseIcon';
import ScalesIcon from '../icons/ScalesIcon';
import SineIcon from '../icons/SineIcon';
import SnailIcon from '../icons/SnailIcon';
import SpotIcon from '../icons/SpotIcon';
import WarningCircleIcon from '../icons/WarningCircleIcon';
import { IIconProps } from '../icons/types';
import { InsightType } from './types';
import ClockWithTicksIcon from '../icons/ClockWithTicksIcon';
import PieChartIcon from '../icons/PieChartIcon';
import PulseIcon from '../icons/PulseIcon';
import SoundWaveIcon from '../icons/SoundWaveIcon';

export const getInsightTypeInfo = (
  type: InsightType
):
  | {
      icon: React.MemoExoticComponent<(props: IIconProps) => React.ReactElement>;
      label: string;
    }
  | undefined => {
  const insightInfoMap: Record<
    string,
    {
      icon: React.MemoExoticComponent<(props: IIconProps) => React.ReactElement>;
      label: string;
    }
  > = {
    [InsightType.Errors]: {
      icon: WarningCircleIcon,
      label: 'Errors',
    },
    [InsightType.HotSpot]: {
      icon: SpotIcon,
      label: 'Error Hotspot',
    },
    [InsightType.SlowEndpoint]: {
      icon: SnailIcon,
      label: 'Slow Endpoint',
    },
    [InsightType.LowUsage]: {
      icon: MeterLowIcon,
      label: 'Endpoint Low Traffic',
    },
    [InsightType.NormalUsage]: {
      icon: MeterMediumIcon,
      label: 'Endpoint Normal Level of Traffic',
    },
    [InsightType.HighUsage]: {
      icon: MeterHighIcon,
      label: 'Endpoint High Traffic',
    },
    [InsightType.EndpointBottleneck]: {
      icon: BottleneckIcon,
      label: 'Bottleneck',
    },
    [InsightType.EndpointSpanNPlusOne]: {
      icon: SQLDatabaseIcon,
      label: 'Repeated Query',
    },
    [InsightType.SpaNPlusOne]: {
      icon: SQLDatabaseIcon,
      label: 'Repeated Query',
    },
    [InsightType.SpanEndpointBottleneck]: {
      icon: BottleneckIcon,
      label: 'Bottleneck',
    },
    [InsightType.SpanScaling]: {
      icon: ScalesIcon,
      label: 'Scaling Issue Found',
    },
    [InsightType.EndpointScaling]: {
      icon: ScalesIcon,
      label: 'Scaling Issue Found',
    },
    [InsightType.SpanUsages]: {
      icon: SineIcon,
      label: 'Top Usage',
    },
    [InsightType.SpanDurations]: {
      icon: AlarmClockIcon,
      label: 'Duration',
    },
    [InsightType.SpanDurationBreakdown]: {
      icon: ClockWithTicksIcon,
      label: 'Duration Breakdown',
    },
    [InsightType.EndpointSlowdownSource]: {
      icon: SnailIcon,
      label: 'Duration Slowdown Source Detected',
    },
    [InsightType.EndpointBreakdown]: {
      icon: PieChartIcon,
      label: 'Request Breakdown',
    },
    [InsightType.EndpointSessionInView]: {
      icon: SQLDatabaseIcon,
      label: 'Session in View Query Detected',
    },
    [InsightType.EndpointChattyApiV2]: {
      icon: SoundWaveIcon,
      label: 'Excessive API Calls Detected',
    },
    [InsightType.EndpointHighNumberOfQueries]: {
      icon: SQLDatabaseIcon,
      label: 'High number of queries',
    },
    [InsightType.SpanNexus]: {
      icon: BottleneckIcon,
      label: 'Code Nexus Point',
    },
    [InsightType.SpanQueryOptimization]: {
      icon: SQLDatabaseIcon,
      label: 'Inefficient Query',
    },
    [InsightType.EndpointQueryOptimizationV2]: {
      icon: SQLDatabaseIcon,
      label: 'Inefficient Query',
    },
    [InsightType.SpanPerformanceAnomaly]: {
      icon: PulseIcon,
      label: 'Performance Anomaly',
    },
  };

  return insightInfoMap[type];
};

export const getInsightImportanceColor = (importance: number): string | undefined => {
  if (importance === 0) {
    return undefined;
  }
  if (importance < 3) {
    return '#e00036';
  }
  if (importance < 5) {
    return '#e06c00';
  }
  if (importance < 7) {
    return '#e8b500';
  }

  return '#1dc693';
};

export const getInsightTypeOrderPriority = (type: string): number => {
  const insightOrderPriorityMap: Record<string, number> = {
    [InsightType.HotSpot]: 1,
    [InsightType.Errors]: 2,
    [InsightType.TopErrorFlows]: 3,

    // Endpoint insights
    [InsightType.EndpointBreakdown]: 5,
    [InsightType.HighUsage]: 10,
    [InsightType.SlowEndpoint]: 20,
    [InsightType.EndpointSlowdownSource]: 25,
    [InsightType.LowUsage]: 30,
    [InsightType.EndpointBottleneck]: 40,
    [InsightType.NormalUsage]: 50,
    [InsightType.EndpointSpanNPlusOne]: 55,
    [InsightType.EndpointSessionInView]: 56,
    [InsightType.EndpointChattyApiV2]: 57,
    [InsightType.EndpointHighNumberOfQueries]: 58,
    [InsightType.EndpointQueryOptimizationV2]: 59,

    // Span insights
    [InsightType.SpanDurations]: 60,
    [InsightType.SpanUsages]: 61,
    [InsightType.SpanScaling]: 63,
    [InsightType.SpaNPlusOne]: 65,
    [InsightType.SpanEndpointBottleneck]: 67,
    [InsightType.SpanDurationBreakdown]: 68,
    [InsightType.SpanNexus]: 69,
    [InsightType.SpanQueryOptimization]: 70,
  };

  return insightOrderPriorityMap[type] || Infinity;
};
