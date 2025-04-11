import Logger from './Logger';
import LogLevel from './types';

const logger = new Logger(window.isLoggingEnabled === true ? LogLevel.Debug : LogLevel.None);

export default logger;
