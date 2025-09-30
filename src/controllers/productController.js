import prisma from "../db.js";

// GET /api/products - Listar todos os produtos
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        store: {
          include: {
            user: true // Incluir dados do usuário dono da loja
          }
        }
      },
      orderBy: { id: "asc" }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar produtos", details: error.message });
  }
};

// GET /api/products/:id - Buscar produto por ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        store: {
          include: {
            user: true
          }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto", details: error.message });
  }
};

// GET /api/products/store/:storeId - Listar produtos de uma loja específica
export const getProductsByStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const products = await prisma.product.findMany({
      where: { storeId: parseInt(storeId) },
      include: {
        store: {
          include: {
            user: true
          }
        }
      },
      orderBy: { id: "asc" }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar produtos da loja", details: error.message });
  }
};

// POST /api/products - Criar novo produto
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, storeId } = req.body;

    // Validação básica
    if (!name || !price || !storeId) {
      return res.status(400).json({ error: "Nome, preço e storeId são obrigatórios" });
    }

    // Verificar se a loja existe
    const storeExists = await prisma.store.findUnique({
      where: { id: parseInt(storeId) }
    });

    if (!storeExists) {
      return res.status(404).json({ error: "Loja não encontrada" });
    }

    const newProduct = await prisma.product.create({
      data: { 
        name, 
        description, 
        price: parseFloat(price), 
        stock: parseInt(stock) || 0,
        storeId: parseInt(storeId) 
      },
      include: {
        store: {
          include: {
            user: true
          }
        }
      }
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar produto", details: error.message });
  }
};

// PUT /api/products/:id - Atualizar produto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { 
        name, 
        description, 
        price: price ? parseFloat(price) : undefined, 
        stock: stock ? parseInt(stock) : undefined 
      },
      include: {
        store: {
          include: {
            user: true
          }
        }
      }
    });

    res.json(updatedProduct);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.status(500).json({ error: "Erro ao atualizar produto", details: error.message });
  }
};

// DELETE /api/products/:id - Deletar produto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.status(500).json({ error: "Erro ao deletar produto", details: error.message });
  }
};