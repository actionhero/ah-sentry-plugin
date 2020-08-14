export const DEFAULT = {
  sentry: (config) => {
    return {
      dsn: process.env.SENTRY_DSN,
    };
  },
};
