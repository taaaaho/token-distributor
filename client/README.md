## Token Distributor Client

This folder is client side codes.
Mainly use Typescript and Next.js.

## How to develop

First copy .env.sample, and replace the contents.

```bash
cp .env.sample .env
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Plant Scale Commands

```
# Setup
$ pscale auth login
$ pscale database create [your sandbox name] --region ap-northeast

# Connect (start local db server)
$ pscale connect [your sandbox name] develop --port 3309
$ pscale shell [your sandbox name] main

# Create Deploy Request
$ pscale deploy-request create [your sandbox name] develop
```

## Prisma Commands

```
# Migration (reflect prisma/schema.prisma)
$ npx prisma db push
※you need connect to plant scale at first.

# GUI Client
$ npx prisma studio
```
