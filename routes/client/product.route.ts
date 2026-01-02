import { Router } from "express";
import * as productController from "../../controllers/client/product.controller";

const router = Router();

router.get("/category", productController.category);

router.get("/category/:slug", productController.productByCategory);

router.get("/suggest", productController.suggest);

export default router;
