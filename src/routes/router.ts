import { Router } from "express";
import { sendemail } from "../controllers/emails.controller";
import { Request, Response } from "express";
const router: Router = Router();

router.get("/send-Email/meeting", async (req, res, next) => {
  sendemail.meeting(req, res, next);
});
router.post("/send-Email", async (req, res, next) => {
  sendemail.sendEmail(req, res, next);
});

export default router;
