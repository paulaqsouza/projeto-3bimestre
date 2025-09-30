# Projeto 3º Bimestre

API Express + Prisma + MySQL.

## Requisitos
- Node.js (>= 18)
- npm
- Docker + Docker Compose (opcional, recomendado)

## Configuração
1. Copie o arquivo `.env.example` para `.env` e ajuste se necessário:
```
cp .env.example .env
```
(Windows PowerShell)
```
Copy-Item .env.example .env
```

2. (Opcional) Suba o banco via Docker:
```
docker compose up -d
```
Isso iniciará um MySQL acessível em `localhost:3306` com user `root` e senha `root`.

3. Instale dependências:
```
npm install
```

4. Gere o client Prisma e aplique migrations em desenvolvimento:
```
npm run migrate
```
Isso criará/aplicará as migrations ao banco definido em `DATABASE_URL`.

5. Rode em modo desenvolvimento:
```
npm run dev
```
Ou produção simples:
```
npm start
```

## Scripts
- `npm run dev` - inicia com nodemon
- `npm start` - inicia a aplicação
- `npm run migrate` - executa `prisma migrate dev`
- `npm run deploy:migrations` - aplica migrations em ambiente produtivo (CI/CD)
- `npm run studio` - abre interface do Prisma Studio

## Endpoints
- `GET /` Healthcheck `{ ok: true }`
- `GET /status` Teste simples
- `POST /usuarios` Cria usuário `{ name, email, password }`
- `GET /usuarios` Lista usuários

## Estrutura
```
prisma/
  schema.prisma
  migrations/
src/
  index.js
  db.js
```

## Notas
- Ajuste a senha do banco para produção.
- Implemente hashing de senha (ex: bcrypt) antes de uso real.
- Adicione validação de entrada e testes.

## Próximos Passos Sugestões
- Middleware de erro centralizado
- Logger (pino/winston)
- Hash de senha (bcrypt) + autenticação JWT
- Testes (Jest ou Vitest)
- Dockerfile para deployment

---
Gerado automaticamente.
