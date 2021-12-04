#!/bin/sh

if [[ -z $API_URL ]] ; then
    echo  "[ERROR]: API_URL environment variable is not set. Please verify your environment"
    exit
fi
if [[ -z $WS_URL ]] ; then
    echo  "[ERROR]: WS_URL environment variable is not set. Please verify your environment"
    exit
fi


sed -i "s|window\.__env\.apiUrl.*$|window.__env.apiUrl = '$API_URL';|g" /usr/share/nginx/html/env.js
echo "[INFO]: env.js apiUrl has been set to $API_URL"
sed -i "s|window\.__env\.wsUrl.*$|window.__env.wsUrl = '$WS_URL';|g" /usr/share/nginx/html/env.js
echo "[INFO]: env.js apiUrl has been set to $WS_URL"

exec "$@"
