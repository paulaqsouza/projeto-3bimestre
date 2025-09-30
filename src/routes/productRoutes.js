import express from "express";
import {
  getProducts,
  getProductById,
  getProductsByStore,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

// GET /api/products - Listar todos os produtos
router.get("/", getProducts);

// GET /api/products/store/:storeId - Listar produtos de uma loja específica
router.get("/store/:storeId", getProductsByStore);

// GET /api/products/:id - Buscar produto por ID
router.get("/:id", getProductById);

// POST /api/products - Criar novo produto
router.post("/", createProduct);

// PUT /api/products/:id - Atualizar produto
router.put("/:id", updateProduct);

// DELETE /api/products/:id - Deletar produto
router.delete("/:id", deleteProduct);

export default router;