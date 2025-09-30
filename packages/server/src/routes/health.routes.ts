import { Router } from "express";

import { healthCheckController } from "../controllers/health.controllers.ts";

const healthCheckRouter:Router = Router();
healthCheckRouter.get("/health",healthCheckController);
export default healthCheckRouter;