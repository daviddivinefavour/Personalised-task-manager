import 'dotenv/config';
import { existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import winston, { transports, format, createLogger } from 'winston';

// Set default NODE_ENV to 'development' if not defined
const env = process.env.NODE_ENV || 'development';

// Ensure the 'logs' directory exists in the /tmp/ directory
const logsDir = resolve('/tmp/logs');
if (!existsSync(logsDir)) {
  mkdirSync(logsDir, { recursive: true });
}

const logger = (env: string): winston.transport[] => {
  const allowedEnvs = ['development', 'production', 'test', 'staging'];
  if (!allowedEnvs.includes(env)) {
    throw new Error('Invalid NODE_ENV');
  }

  const loggerTransports: winston.transport[] = []; // Array to store logger transports

  if (env === 'development') {
    loggerTransports.push(
      new transports.Console({
        level: 'debug',
        format: format.combine(format.colorize(), format.simple()),
      }),
    );
  }

  loggerTransports.push(
    new transports.File({
      level: 'info',
      filename: resolve(logsDir, `${env}.log`),
    }),
    new transports.File({
      level: 'error',
      filename: resolve(logsDir, `${env}-error.log`),
    }),
  );

  return loggerTransports;
};

// Create a logger instance
const instance = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss A' }),
    format.errors({ stack: true }),
    format.colorize({ all: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: `${process.env.APP_NAME}` },
  transports: logger(env),
  exitOnError: false,
});

export default instance;
