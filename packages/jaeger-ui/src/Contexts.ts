import { createContext } from 'react';
import ZoomManager from './utils/ZoomManager';

export const ZoomContext = createContext<null | ZoomManager>(null);
