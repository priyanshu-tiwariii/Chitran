import { Router } from "express";
import healthCheckRouter from "./health.routes.ts";
const router:Router = Router();

router.use("/v1",healthCheckRouter);
export default router;