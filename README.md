# Home app

## Local development

Postgres setup:
- Run: `docker run --name postgres-db -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=default -d postgres`

Prisma setup:
- Copy `.env.local` in `.env`
- Run: `npx prisma migrate dev --name init`