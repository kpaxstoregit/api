# api
api kpaxstore

# Como rodar o projeto

## Passos para rodar o projeto localmente:

```bash
# 1. Rodar o Docker Compose:
docker-compose up -d

# 2. Instalar o Prisma Client:
pnpm add @prisma/client

# 3. Gerar o Prisma Client:
npx prisma generate

# 4. Configurar a variável de ambiente DATABASE_URL no arquivo .env:
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<dbname>?schema=public"

# 5. Configurar o token JWT no arquivo .env:
JWT_SECRET="<seu-token-secreto>"
