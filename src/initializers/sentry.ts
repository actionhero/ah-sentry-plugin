import * as Sentry from "@sentry/node";
import { Integrations as ApmIntegrations } from "@sentry/apm";
import { Initializer, config, env, action, task, api } from "actionhero";

export class MyInitializer extends Initializer {
  constructor() {
    super();
    this.name = "sentry";
    this.startPriority = 1;
  }

  async start() {
    if (env === "test") return; // never enable sentry when NODE_ENV=test

    if (config.sentry.dsn) {
      Sentry.init({
        dsn: config.sentry.dsn,
        tracesSampleRate: config.sentry.tracesSampleRate,
        environment: env,
        release:
          process.env.npm_package_name + "@" + process.env.npm_package_version,
        integrations: [new ApmIntegrations.Tracing()],
      });

      // trace actions
      action.addMiddleware({
        name: "Sentry Action Middleware",
        global: true,
        priority: 1,
        preProcessor: (data) => {
          const transaction = Sentry.startTransaction({
            op: "action",
            name: data.actionTemplate.name,
          });
          Sentry.setTag("action", data.actionTemplate.name);
          data.sentryTransaction = transaction;
        },
        postProcessor: (data) => {
          data?.sentryTransaction.finish();
        },
      });

      // trace tasks
      task.addMiddleware({
        name: "Sentry Task Middleware",
        global: true,
        priority: 1,
        preProcessor: function () {
          const worker = this.worker;
          Sentry.setTag("task", worker.job.class);

          const transaction = Sentry.startTransaction({
            op: "task",
            name: worker.job.class,
          });
          Sentry.setTag("task", worker.job.class);
          worker.sentryTransaction = transaction;
        },
        postProcessor: function () {
          const worker = this.worker;
          worker?.sentryTransaction.finish();
        },
      });

      // generally trace exceptions
      api.exceptionHandlers.reporters.push((error: Error) => {
        Sentry.captureException(error);
      });
    }
  }
}
