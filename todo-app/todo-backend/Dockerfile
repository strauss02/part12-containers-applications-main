FROM node:16

USER root

WORKDIR /.

COPY . .

RUN npm ci

ENV DEBUG=part12-containers-applications-main:* MONGO_URL='mongodb://localhost:3456/the_database' REDIS_URL='//localhost:6378'

CMD  npm start