## AH-SENTRY-PLUGIN

A Plugin to report your Actionhero errors to Sentry.io

![Sentry Screenshot](https://raw.githubusercontent.com/actionhero/ah-sentry-plugin/master/image.png)

## Setup

1. Install this plugin: `npm install ah-sentry-plugin --save`
2. Add plugin to your project's `./src/config/plugins.ts`:

```ts
import * as path from "path";

export const DEFAULT = {
  plugins: () => {
    return {
      "ah-sentry-plugin": {
        path: path.join(process.cwd(), "node_modules", "ah-sentry-plugin"),
      },
    };
  },
};
```

### Configuration

A `./src/config/sentry.ts` will need to be created for your project. This will source the `SENTRY_DSN` environment variable into `config.sentry.dsn`. If you want to record APM transactions, also set `SENTRY_SAMPLE_RATE`

```ts
export const DEFAULT = {
  sentry: (config) => {
    return {
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: parseFloat(process.env.SENTRY_SAMPLE_RATE),
    };
  },
};
```
