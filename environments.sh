#!/usr/bin/env bash
set -xe

touch .env
echo "VUE_APP_NODE_ENV=$VUE_APP_NODE_ENV" >> .env
echo "VUE_APP_NAME=$VUE_APP_NAME" >> .env
echo "VUE_APP_COMPANY=$VUE_APP_COMPANY" >> .env
echo "VUE_APP_URL=$VUE_APP_URL" >> .env
echo "VUE_APP_URL_API=$VUE_APP_URL_API" >> .env
echo "VUE_APP_API_KEY=$VUE_APP_API_KEY" >> .env
echo "VUE_APP_I18N_LOCALE=$VUE_APP_I18N_LOCALE" >> .env
echo "VUE_APP_I18N_FALLBACK_LOCALE=$VUE_APP_I18N_FALLBACK_LOCALE" >> .env
echo "VUE_APP_TOKEN_JWT=$VUE_APP_TOKEN_JWT" >> .env