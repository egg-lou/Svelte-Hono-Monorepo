# Svelte + Hono Application

---

## Tech Stack

-   Svelte
-   Vite
-   TailwindCSS
-   TypeScript
-   Hono
-   Prisma
-   MySQL

## Getting Started

1. Clone the repository
2. Create a .env file in the root folder and add the following environment variables

```bash
  DATABASE_URL="mysql://<username>:<password>@localhost:3306/<database>"
```

3. Install dependencies

```bash
  npm install
```

4. Run the application

```bash
  npm run dev
```

Note: this is a mono-repo with two packages, `client` and `server`. The client is a Svelte application and the server is a Hono application. Also uses the concurrently npm package to run both of the apps

## How to Migrate the Database

To map your data model to the database, you need to run the following command

```bash
    npm run migrate -- <name-of-migration>
```

## How to prettier format the code

To format the code using prettier, you need to run the following command

```bash
    npm run format
```
