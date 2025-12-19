import { Router } from "express";
import * as accountAdminController from "../../controllers/admin/account-admin.controller";
import multer from "multer";
import * as accountAdminValidate from "../../validates/admin/account-admin.validate";
import { checkPermission } from "../../middlewares/admin/auth.middleware";

const router = Router();

const upload = multer();

router.get("/create", accountAdminController.create);

router.post(
  "/create",
  checkPermission("account-admin-create"),
  upload.none(),
  accountAdminValidate.createPost,
  accountAdminController.createPost
);

router.get("/list", accountAdminController.list);

router.get("/edit/:id", accountAdminController.edit);

router.patch(
  "/edit/:id",
  checkPermission("account-admin-edit"),
  upload.none(),
  accountAdminValidate.editPatch,
  accountAdminController.editPatch
);

router.patch(
  "/delete/:id",
  checkPermission("account-admin-delete"),
  accountAdminController.deletePatch
);

router.get("/trash", accountAdminController.trash);

router.patch("/undo/:id", accountAdminController.undoPatch);

router.delete("/destroy/:id", accountAdminController.destroyDelete);

router.get("/change-password/:id", accountAdminController.changePassword);

router.patch(
  "/change-password/:id",
  checkPermission("account-admin-change-password"),
  upload.none(),
  accountAdminValidate.changePasswordPatch,
  accountAdminController.changePasswordPatch
);

export default router;
