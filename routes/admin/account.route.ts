import { Router } from "express";
import * as accountController from "../../controllers/admin/account.controller";
import * as accountValidate from "../../validates/admin/account.validate";
import * as accountMiddleware from "../../middlewares/admin/auth.middleware";
import multer from "multer";

const router = Router();

const upload = multer();

router.get("/login", accountController.login);

router.post(
  "/login",
  upload.none(),
  accountValidate.loginPost,
  accountController.loginPost
);

router.get("/logout", accountMiddleware.verifyToken, accountController.logout);

export default router;
