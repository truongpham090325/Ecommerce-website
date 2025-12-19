import { Router } from "express";
import * as articleController from "../../controllers/admin/article.controller";
import multer from "multer";
import * as articleValidate from "../../validates/admin/article.validate";
import { checkPermission } from "../../middlewares/admin/auth.middleware";

const router = Router();

const upload = multer();

router.get("/category", articleController.category);

router.get("/category/trash", articleController.categoryTrash);

router.get("/category/create", articleController.createCategory);

router.post(
  "/category/create",
  checkPermission("article-category-create"),
  upload.none(),
  articleValidate.createCategoryPost,
  articleController.createCategoryPost
);

router.get("/category/edit/:id", articleController.editCategory);

router.patch(
  "/category/edit/:id",
  checkPermission("article-category-edit"),
  upload.none(),
  articleValidate.createCategoryPost,
  articleController.editCategoryPatch
);

router.patch(
  "/category/delete/:id",
  checkPermission("article-category-delete"),
  articleController.deleteCategoryPatch
);

router.patch("/category/undo/:id", articleController.undoCategoryPatch);

router.delete("/category/destroy/:id", articleController.destroyCategoryDelete);

router.get("/create", articleController.create);

router.post(
  "/create",
  checkPermission("article-create"),
  upload.none(),
  articleValidate.createPost,
  articleController.createPost
);

router.get("/list", articleController.list);

router.get("/edit/:id", articleController.edit);

router.patch(
  "/edit/:id",
  checkPermission("article-edit"),
  upload.none(),
  articleValidate.createPost,
  articleController.editPatch
);

router.patch(
  "/delete/:id",
  checkPermission("article-delete"),
  articleController.deletePatch
);

router.get("/trash", articleController.trash);

router.patch("/undo/:id", articleController.undoPatch);

router.delete("/destroy/:id", articleController.destroyDelete);

export default router;
