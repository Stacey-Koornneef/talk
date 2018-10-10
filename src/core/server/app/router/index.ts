import express, { Router } from "express";

import { AppOptions } from "talk-server/app";
import {
  cacheHeadersMiddleware,
  nocacheMiddleware,
} from "talk-server/app/middleware/cacheHeaders";
import { errorHandler } from "talk-server/app/middleware/error";
import { accessLogger, errorLogger } from "talk-server/app/middleware/logging";
import { notFoundMiddleware } from "talk-server/app/middleware/notFound";
import playground from "talk-server/app/middleware/playground";
import serveStatic from "talk-server/app/middleware/serveStatic";
import { RouterOptions } from "talk-server/app/router/types";
import logger from "talk-server/logger";

import { createAPIRouter } from "./api";
import { createClientTargetRouter } from "./client";

export async function createRouter(app: AppOptions, options: RouterOptions) {
  // Create a router.
  const router = express.Router();

  // Logging
  router.use(accessLogger);

  router.use("/api", nocacheMiddleware, await createAPIRouter(app, options));

  // Attach the GraphiQL if enabled.
  if (app.config.get("enable_graphiql")) {
    attachGraphiQL(router, app);
  }

  // Add the client targets.
  router.get("/embed/stream", createClientTargetRouter({ view: "stream" }));
  router.get("/admin", createClientTargetRouter({ view: "admin" }));

  // Static Files
  router.use("/assets", cacheHeadersMiddleware("1w"), serveStatic);

  // Error Handling
  router.use(notFoundMiddleware);
  router.use(errorLogger);
  router.use(errorHandler);

  return router;
}

/**
 * attachGraphiQL will attach the GraphiQL routes to the router.
 *
 * @param router the router to attach the GraphiQL routes to
 * @param app the application to read the configuration from
 */
function attachGraphiQL(router: Router, app: AppOptions) {
  if (app.config.get("env") === "production") {
    logger.warn(
      "enable_graphiql is enabled, but we're in production mode, this is not recommended"
    );
  }

  // Tenant GraphiQL
  router.get(
    "/tenant/graphiql",
    playground({
      endpoint: "/api/tenant/graphql",
      subscriptionEndpoint: "/api/tenant/live",
    })
  );

  // Management GraphiQL
  router.get(
    "/management/graphiql",
    playground({
      endpoint: "/api/management/graphql",
      subscriptionEndpoint: "/api/management/live",
    })
  );
}
