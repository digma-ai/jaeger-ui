import { Span } from '../types/trace';

export interface IDigmaSpanData {
  id: string;
  name: string;
  serviceName: string;
  instrumentationLibrary?: string;
  function?: string;
  namespace?: string;
  spanCodeObjectId?: string;
  methodCodeObjectId?: string;
  environment?: string;
  environmentId?: string;
}

const getSpanDataForDigma = (span: Span, withEnvironmentId: boolean | undefined = false): IDigmaSpanData => {
  const tagsToGet = {
    instrumentationLibrary: 'otel.library.name',
    function: 'code.function',
    namespace: 'code.namespace',
    spanCodeObjectId: 'digma.span.code.object.id',
    methodCodeObjectId: 'digma.method.code.object.id',
  };

  const processTagsToGet = {
    environment: 'digma.environment',
    ...(withEnvironmentId ? { environmentId: 'digma.environment.id' } : {}),
  };

  const tagsValues = Object.entries(tagsToGet).reduce((acc, [key, value]) => {
    const tag = span.tags.find((x: any) => x.key === value);
    return tag ? { ...acc, [key]: tag.value } : acc;
  }, {});

  const processTagsValues = Object.entries(processTagsToGet).reduce((acc, [key, value]) => {
    const tag = span.process.tags.find((x: any) => x.key === value);
    return tag ? { ...acc, [key]: tag.value } : acc;
  }, {});

  return {
    ...tagsValues,
    ...processTagsValues,
    id: span.spanID,
    name: span.operationName,
    serviceName: span.process.serviceName,
  };
};

export default getSpanDataForDigma;
