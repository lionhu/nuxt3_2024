#!/bin/sh

# echo "Check postgres to startup ..."
# while ! nc -z postgres 5432; do sleep 2; done
# echo "postgres port:5432 started!"

# echo "Check Meilisearch to startup ..."
# while ! nc -z meilisearch 7700; do sleep 2; done
# echo "meilisearch port:7700 started!"

# echo "Check Strapi to startup ..."
# while ! nc -z strapi 1337; do sleep 2; done
# echo "strapi port:7700 started!"

# if [ ${START_SERVER} ]; then
  echo "----> Starting Nuxt3 app ..."
  sleep 3;pm2-runtime ./.output/server/index.mjs
# fi

exec "$@"


