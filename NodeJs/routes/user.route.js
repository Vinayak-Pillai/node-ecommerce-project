import express from "express";
import { insertAdmin, login, myprofile } from "../controller/user.controller";
import {
  setSession,
  getSession,
  destroySession,
  checkSession,
} from "../controller/session.controller";

const router = express.Router();

router.post("/add-user", insertAdmin); //api to insert admin.
router.post("/login", login); //api to login as admin. email and password passed inside body.
router.post("/my-profile", myprofile);

export default router;
