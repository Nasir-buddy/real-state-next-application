import express from "express";
import { authmiddleware } from '../middleware/authMiddleware';
import {
  createApplication,
  listApplications,
  updateApplicationStatus,
} from "../controllers/applicationController";

const router = express.Router();

router.post("/", authmiddleware(["tenant"]), createApplication);
router.put("/:id/status", authmiddleware(["manager"]), updateApplicationStatus);
router.get("/", authmiddleware(["manager", "tenant"]), listApplications);

export default router;