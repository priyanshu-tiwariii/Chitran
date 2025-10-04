import { Router } from "express";

import { databaseHealthCheckController, serverHealthCheckController } from "../controllers/health.controllers.ts";

const healthCheckRouter:Router = Router();
healthCheckRouter.get("/server",serverHealthCheckController);
healthCheckRouter.get("/database",databaseHealthCheckController);
export default healthCheckRouter;