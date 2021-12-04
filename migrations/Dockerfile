FROM node:lts-alpine

ENV DB_HOST rethinkdb
ENV DB_PORT 28015
ENV DB_NAME nimbusweb


WORKDIR /

COPY ./ ./migrations
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn global add rethinkdb-migrate@^1.4.0

RUN chmod +x ./migrations/entrypoint.sh

ENTRYPOINT ["./migrations/entrypoint.sh"]

