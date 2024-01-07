FROM node:21-alpine

RUN mkdir src

RUN apk update \
    && apk upgrade \
    && apk add git \
    && apk add --no-cache make gcc g++ python3 \
    && npm install pm2 -g
