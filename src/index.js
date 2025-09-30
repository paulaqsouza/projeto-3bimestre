// Importar as bibliotecas necessárias
import express from "express";
import dotenv from "dotenv";
import prisma from "./db.js"; // Importar nossa conexão com o banco

// Importar rotas
import userRoutes from "./routes/userRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Criar aplicação Express
const app = express();

// Middleware para processar JSON nas requisições
app.use(express.json());

// Healthcheck
app.get("/", (_req, res) => res.json({ 
  ok: true, 
  service: "API 3º Bimestre - Node.js, Express, Prisma e MySQL",
  endpoints: {
    users: "/api/users",
    stores: "/api/stores", 
    products: "/api/products"
  }
}));

// Usar as rotas
app.use("/api/users", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/products", productRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo deu errado!" });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Documentação: http://localhost:${PORT}`);
});
