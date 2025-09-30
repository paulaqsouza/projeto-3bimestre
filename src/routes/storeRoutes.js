import express from "express";
import {
  getStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore
} from "../controllers/storeController.js";

const router = express.Router();

// GET /api/stores - Listar todas as lojas
router.get("/", getStores);

// GET /api/stores/:id - Buscar loja por ID
router.get("/:id", getStoreById);

// POST /api/stores - Criar nova loja
router.post("/", createStore);

// PUT /api/stores/:id - Atualizar loja
router.put("/:id", updateStore);

// DELETE /api/stores/:id - Deletar loja
router.delete("/:id", deleteStore);

export default router;