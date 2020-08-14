export const DEFAULT = {
  sentry: (config) => {
    return {
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: parseFloat(process.env.SENTRY_SAMPLE_RATE),
    };
  },
};
