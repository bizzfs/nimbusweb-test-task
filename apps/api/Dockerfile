FROM node:lts-alpine as deps-resolver

WORKDIR /app/builder

COPY package.json yarn.lock decorate-angular-cli.js ./
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn --frozen-lockfile

FROM node:lts-alpine as builder

ARG BUILD_FLAG

WORKDIR /app/builder

COPY --from=deps-resolver /app/builder ./
COPY . .
RUN npx nx build api ${BUILD_FLAG}

FROM node:lts-alpine as runner

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

COPY --from=builder /app/builder/dist/apps/api ./
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn


ENTRYPOINT ["node", "main.js"]
