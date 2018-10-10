import express from "express";

import { AppOptions } from "talk-server/app";
import tenantMiddleware from "talk-server/app/middleware/tenant";
import { RouterOptions } from "talk-server/app/router/types";
import tenantGraphMiddleware from "talk-server/graph/tenant/middleware";

import { authenticateMiddleware } from "talk-server/app/middleware/passport";
import { createNewAuthRouter } from "./auth";

export async function createTenantRouter(
  app: AppOptions,
  options: RouterOptions
) {
  const router = express.Router();

  // Tenant identification middleware.
  router.use(tenantMiddleware({ cache: app.tenantCache }));

  // Setup Passport middleware.
  router.use(options.passport.initialize());

  // Setup auth routes.
  router.use("/auth", createNewAuthRouter(app, options));

  // Tenant API
  router.use(
    "/graphql",
    express.json(),
    // Any users may submit their GraphQL requests with authentication, this
    // middleware will unpack their user into the request.
    authenticateMiddleware(options.passport, "jwt"),
    await tenantGraphMiddleware({
      schema: app.schemas.tenant,
      config: app.config,
      mongo: app.mongo,
      redis: app.redis,
      queue: app.queue,
    })
  );

  return router;
}
