import { Router } from "express";
import * as roleController from "../../controllers/admin/role.controller";
import multer from "multer";
import * as roleValidate from "../../validates/admin/role.validate";
import { checkPermission } from "../../middlewares/admin/auth.middleware";

const router = Router();

const upload = multer();

router.get("/create", roleController.create);

router.post(
  "/create",
  checkPermission("role-create"),
  upload.none(),
  roleValidate.createPost,
  roleController.createPost
);

router.get("/list", roleController.list);

router.get("/edit/:id", roleController.edit);

router.patch(
  "/edit/:id",
  checkPermission("role-edit"),
  upload.none(),
  roleValidate.createPost,
  roleController.editPatch
);

router.patch(
  "/delete/:id",
  checkPermission("role-delete"),
  roleController.deletePatch
);

router.get("/trash", roleController.trash);

router.patch("/undo/:id", roleController.undoPatch);

router.delete("/destroy/:id", roleController.destroyDelete);

export default router;
