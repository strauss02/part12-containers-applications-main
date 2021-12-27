FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

RUN npm i -g serve

CMD ["serve", "build"]

FROM nginx:1.20-alpine

COPY --from=build-stage  /usr/src/app/build /usr/share/nginx/html