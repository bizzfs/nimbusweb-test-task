FROM node:lts-alpine as deps-resolver

WORKDIR /app/builder

COPY package.json yarn.lock decorate-angular-cli.js ./
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn --frozen-lockfile

FROM node:lts-alpine as builder

ARG BUILD_FLAG

WORKDIR /app/builder

COPY --from=deps-resolver /app/builder ./
COPY . .
RUN npx nx build webapp ${BUILD_FLAG}

FROM nginx:alpine as runner

WORKDIR /dist

COPY --from=builder /app/builder/apps/webapp/entrypoint.sh ./
COPY --from=builder /app/builder/dist/apps/webapp /usr/share/nginx/html

ARG PORT=80
ENV PORT $PORT

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
