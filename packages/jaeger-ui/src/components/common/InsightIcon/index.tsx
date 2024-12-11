import * as React from 'react';
import { IInsightIconProps } from './types';
import { getInsightImportanceColor, getInsightTypeInfo } from './utils';

const InsightIcon = (props: IInsightIconProps) => {
  const insightTypeInfo = getInsightTypeInfo(props.insight.type);
  return insightTypeInfo ? (
    <insightTypeInfo.icon color={getInsightImportanceColor(props.insight.importance)} size={props.size} />
  ) : null;
};

export default InsightIcon;
