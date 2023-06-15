import { Span } from '../types/trace';

interface IDigmaSpanData {
  id: string;
  name: string;
  serviceName: string;
  instrumentationLibrary?: string;
  function?: string;
  namespace?: string;
  spanCodeObjectId?: string;
  methodCodeObjectId?: string;
}

const getSpanDataForDigma = (span: Span): IDigmaSpanData => {
  const tagsToGet: Omit<IDigmaSpanData, 'id' | 'name' | 'serviceName'> = {
    instrumentationLibrary: 'otel.library.name',
    function: 'code.function',
    namespace: 'code.namespace',
    spanCodeObjectId: 'digma.span.code.object.id',
    methodCodeObjectId: 'digma.method.code.object.id',
  };

  const tagsValues = Object.entries(tagsToGet).reduce((acc, [key, value]) => {
    const tag = span.tags.find((x: any) => x.key === value);
    return tag ? { ...acc, [key]: tag.value } : acc;
  }, {});

  return {
    ...tagsValues,
    id: span.spanID,
    name: span.operationName,
    serviceName: span.process.serviceName,
  };
};

export default getSpanDataForDigma;
