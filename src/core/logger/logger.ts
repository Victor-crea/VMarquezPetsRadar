import * as appInsights from 'applicationinsights';
import winston from 'winston';

const connectionString = process.env.APPINSIGHTS_CONNECTION_STRING;

if (connectionString) {
  appInsights
    .setup(connectionString)
    .setSendLiveMetrics(true)
    .setAutoCollectConsole(false)
    .start();
}

const aiClient = appInsights.defaultClient;

const appInsightsTransport = new winston.transports.Console({
  level: 'info',
  format: winston.format.printf((obj) => {
    const { level, message, timestamp } = obj;
    if (aiClient) {
      aiClient.trackTrace({
        message: `[${level}] ${message} ${timestamp}`,
        properties: { timestamp: String(timestamp) },
      });
    }
    return `[${level}] ${message} ${timestamp}`;
  }),
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    appInsightsTransport,
  ],
});