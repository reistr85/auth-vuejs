#!/usr/bin/env bash
set -xe

touch .env
echo "VUE_APP_NODE_ENV=development" >> .env
echo "VUE_APP_NAME=Agendamentos" >> .env
echo "VUE_APP_COMPANY=RF Certificadora" >> .env
echo "VUE_APP_URL=http://localhost:8080" >> .env
echo "VUE_APP_URL_API=http://localhost:3000/api/v1" >> .env
echo "VUE_APP_API_KEY=base64:6I1OujF9xO5xqw1msbZozKzwVX64Fh2pp+G7N32D8I8=" >> .env
echo "VUE_APP_I18N_LOCALE=pt-BR" >> .env
echo "VUE_APP_I18N_FALLBACK_LOCALE=pt-BR" >> .env
echo "VUE_APP_TOKEN_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMiwidHlwZSI6ImFkbWluIn0.iQMCNWtwRYnRFKHl5OYBAiNQDPpbCOIqmdSB2jTJUiU" >> .env
