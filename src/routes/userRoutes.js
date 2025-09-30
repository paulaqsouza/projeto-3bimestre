import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

const router = express.Router();

// GET /api/users - Listar todos os usuários
router.get("/", getUsers);

// GET /api/users/:id - Buscar usuário por ID
router.get("/:id", getUserById);

// POST /api/users - Criar novo usuário
router.post("/", createUser);

// PUT /api/users/:id - Atualizar usuário
router.put("/:id", updateUser);

// DELETE /api/users/:id - Deletar usuário
router.delete("/:id", deleteUser);

export default router;