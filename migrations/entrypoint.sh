#!/bin/sh

echo "rethinkdb migrate"

while true ; do
  rethinkdb-migrate up -f ./migrations/config.js && break
  echo "Migration failed. Retrying in 5s"
  sleep 5s
done

echo "rethinkdb migrate success"
