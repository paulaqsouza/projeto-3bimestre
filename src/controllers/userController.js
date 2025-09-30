import prisma from "../db.js";

// GET /api/users - Listar todos os usuários
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        store: true // Incluir dados da loja (relacionamento 1-1)
      },
      orderBy: { id: "asc" }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar usuários", details: error.message });
  }
};

// GET /api/users/:id - Buscar usuário por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        store: {
          include: {
            products: true // Incluir produtos da loja
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário", details: error.message });
  }
};

// POST /api/users - Criar novo usuário
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validação básica
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
    }

    const newUser = await prisma.user.create({
      data: { name, email, password },
      include: {
        store: true
      }
    });

    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "E-mail já cadastrado" });
    }
    res.status(500).json({ error: "Erro ao criar usuário", details: error.message });
  }
};

// PUT /api/users/:id - Atualizar usuário
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email, password },
      include: {
        store: true
      }
    });

    res.json(updatedUser);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    if (error.code === "P2002") {
      return res.status(409).json({ error: "E-mail já cadastrado" });
    }
    res.status(500).json({ error: "Erro ao atualizar usuário", details: error.message });
  }
};

// DELETE /api/users/:id - Deletar usuário
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(500).json({ error: "Erro ao deletar usuário", details: error.message });
  }
};