import { Router } from "express";
import * as articleController from "../../controllers/client/article.controller";
import * as articleMiddleware from "../../middlewares/client/article.middleware";

const router = Router();

router.get(
  "/category/:slug",
  articleMiddleware.getPopularBlog,
  articleMiddleware.getPopularCategoryBlog,
  articleController.articleByCategory
);

router.get(
  "/detail/:slug",
  articleMiddleware.getPopularBlog,
  articleMiddleware.getPopularCategoryBlog,
  articleController.detail
);

export default router;
