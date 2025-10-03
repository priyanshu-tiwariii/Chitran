import { Router } from "express";

import { databaseHealthCheckController, serverHealthCheckController } from "../controllers/health.controllers.ts";

const healthCheckRouter:Router = Router();
healthCheckRouter.get("/health/server",serverHealthCheckController);
healthCheckRouter.get("/health/database",databaseHealthCheckController);
export default healthCheckRouter;