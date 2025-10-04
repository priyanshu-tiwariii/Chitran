import { Router } from "express";
import healthCheckRouter from "./health.routes.ts";
import authRouter from "./auth.routes.ts";
const router:Router = Router();

router.use("/v1/health",healthCheckRouter);
router.use("/v1/auth",authRouter);
export default router;