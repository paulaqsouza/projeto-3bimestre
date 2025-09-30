import prisma from "../db.js";

// GET /api/stores - Listar todas as lojas
export const getStores = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      include: {
        user: true, // Incluir dados do usuário (relacionamento 1-1)
        products: true // Incluir produtos (relacionamento 1-N)
      },
      orderBy: { id: "asc" }
    });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar lojas", details: error.message });
  }
};

// GET /api/stores/:id - Buscar loja por ID
export const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await prisma.store.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
        products: true
      }
    });

    if (!store) {
      return res.status(404).json({ error: "Loja não encontrada" });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar loja", details: error.message });
  }
};

// POST /api/stores - Criar nova loja
export const createStore = async (req, res) => {
  try {
    const { name, description, address, userId } = req.body;

    // Validação básica
    if (!name || !address || !userId) {
      return res.status(400).json({ error: "Nome, endereço e userId são obrigatórios" });
    }

    // Verificar se o usuário existe
    const userExists = await prisma.user.findUnique({
      where: { id: parseInt(userId) }
    });

    if (!userExists) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const newStore = await prisma.store.create({
      data: { 
        name, 
        description, 
        address, 
        userId: parseInt(userId) 
      },
      include: {
        user: true,
        products: true
      }
    });

    res.status(201).json(newStore);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Usuário já possui uma loja" });
    }
    res.status(500).json({ error: "Erro ao criar loja", details: error.message });
  }
};

// PUT /api/stores/:id - Atualizar loja
export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, address } = req.body;

    const updatedStore = await prisma.store.update({
      where: { id: parseInt(id) },
      data: { name, description, address },
      include: {
        user: true,
        products: true
      }
    });

    res.json(updatedStore);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Loja não encontrada" });
    }
    res.status(500).json({ error: "Erro ao atualizar loja", details: error.message });
  }
};

// DELETE /api/stores/:id - Deletar loja
export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.store.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Loja não encontrada" });
    }
    res.status(500).json({ error: "Erro ao deletar loja", details: error.message });
  }
};