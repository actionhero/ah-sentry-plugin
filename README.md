## AH-SENTRY-PLUGIN

A Plugin to report your Actionhero errors to Sentry.io

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

A `./src/config/sentry.ts` will need to be created for your project. This will source the `SENTRY_DSN` environment variable into `config.sentry.dsn`.

```ts
export const DEFAULT = {
  sentry: (config) => {
    return {
      dsn: process.env.SENTRY_DSN,
    };
  },
};
```
