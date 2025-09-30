# API do 3º Bimestre - Node.js + Express + Prisma + MySQL

## 🚀 **Configuração**
- **Servidor:** http://localhost:3000
- **Banco:** SQLite (temporário) / MySQL (final)

---

## 📋 **Endpoints Disponíveis**

### **🏠 Health Check**
```
GET http://localhost:3000/
```

---

## 👥 **USERS (Usuários)**

### **GET - Listar todos os usuários**
```
GET http://localhost:3000/api/users
```

### **GET - Buscar usuário por ID**
```
GET http://localhost:3000/api/users/1
```

### **POST - Criar usuário**
```
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "123456"
}
```

### **PUT - Atualizar usuário**
```
PUT http://localhost:3000/api/users/1
Content-Type: application/json

{
  "name": "João Santos",
  "email": "joao.santos@exemplo.com",
  "password": "nova123"
}
```

### **DELETE - Deletar usuário**
```
DELETE http://localhost:3000/api/users/1
```

---

## 🏪 **STORES (Lojas)**

### **GET - Listar todas as lojas**
```
GET http://localhost:3000/api/stores
```

### **GET - Buscar loja por ID**
```
GET http://localhost:3000/api/stores/1
```

### **POST - Criar loja**
```
POST http://localhost:3000/api/stores
Content-Type: application/json

{
  "name": "Loja do João",
  "description": "Loja de eletrônicos",
  "address": "Rua A, 123, Centro",
  "userId": 1
}
```

### **PUT - Atualizar loja**
```
PUT http://localhost:3000/api/stores/1
Content-Type: application/json

{
  "name": "Mega Loja do João",
  "description": "Loja de eletrônicos e informática",
  "address": "Av. Principal, 456, Centro"
}
```

### **DELETE - Deletar loja**
```
DELETE http://localhost:3000/api/stores/1
```

---

## 🛍️ **PRODUCTS (Produtos)**

### **GET - Listar todos os produtos**
```
GET http://localhost:3000/api/products
```

### **GET - Buscar produto por ID**
```
GET http://localhost:3000/api/products/1
```

### **GET - Listar produtos de uma loja**
```
GET http://localhost:3000/api/products/store/1
```

### **POST - Criar produto**
```
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "name": "Smartphone Samsung",
  "description": "Smartphone Android com 128GB",
  "price": 899.99,
  "stock": 10,
  "storeId": 1
}
```

### **PUT - Atualizar produto**
```
PUT http://localhost:3000/api/products/1
Content-Type: application/json

{
  "name": "Smartphone Samsung Galaxy",
  "description": "Smartphone Android com 128GB e câmera 64MP",
  "price": 949.99,
  "stock": 15
}
```

### **DELETE - Deletar produto**
```
DELETE http://localhost:3000/api/products/1
```

---

## 🔄 **Relacionamentos Implementados**

### **1️⃣ Relacionamento 1-1 (User ↔ Store)**
- Um usuário pode ter **apenas uma loja**
- Uma loja pertence a **apenas um usuário**

### **2️⃣ Relacionamento 1-N (Store → Products)**
- Uma loja pode ter **vários produtos**
- Um produto pertence a **apenas uma loja**

---

## 🔍 **Consultas com Include (Prisma)**

Todas as rotas já utilizam `include` para retornar dados relacionados:

- **Users:** Retorna a loja do usuário
- **Stores:** Retorna o usuário dono e todos os produtos
- **Products:** Retorna a loja e o usuário dono da loja

---

## 🧪 **Como Testar no Insomnia**

1. **Crie um usuário primeiro**
2. **Crie uma loja para este usuário**
3. **Crie produtos para esta loja**
4. **Teste as consultas GET para ver os relacionamentos**

### **Exemplo de Fluxo Completo:**

1. **POST /api/users** - Criar usuário
2. **POST /api/stores** - Criar loja (use o ID do usuário criado)
3. **POST /api/products** - Criar produto (use o ID da loja criada)
4. **GET /api/users/1** - Ver usuário com loja e produtos inclusos

---

## ✅ **Status Atual**
- ✅ 3 Tabelas (User, Store, Product)
- ✅ Relacionamentos 1-1 e 1-N
- ✅ CRUD completo para todas as tabelas
- ✅ Consultas com include do Prisma
- ✅ Rotas organizadas
- ✅ API rodando em localhost:3000
- ✅ Pronto para testar no Insomnia