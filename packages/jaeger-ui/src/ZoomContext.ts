import { createContext } from 'react';
import ZoomManager from './utils/ZoomManager';

const ZoomContext = createContext<null | ZoomManager>(null);

export default ZoomContext;
