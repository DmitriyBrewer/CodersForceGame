ARG NODE_VERSION=18
FROM node:$NODE_VERSION-buster as base
WORKDIR /app

FROM base as client-builder
RUN yarn config set "strict-ssl" false
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn lerna bootstrap
RUN rm -rf /app/packages/client/dist/ && yarn build --scope=client
RUN cd /app/packages/client && yarn build:ssr

FROM base as server-builder
RUN yarn config set "strict-ssl" false
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --verbose
COPY . .
RUN yarn cache clean
RUN yarn lerna bootstrap
RUN rm -rf /app/packages/server/dist/ && yarn build --scope=server

FROM nginx:latest as shared-files
WORKDIR /app
COPY --from=client-builder /app/packages/client/dist/ /app/client/
COPY --from=client-builder /app/packages/client/ssr-dist/ /app/client/
COPY --from=client-builder /app/packages/client/nginx.conf /etc/nginx/nginx.conf
COPY --from=client-builder /app/packages/client/dist/index.html /usr/share/nginx/html/

FROM nginx:latest as client-production
WORKDIR /app
COPY --from=shared-files /app/client/ /app/
COPY --from=shared-files /etc/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=shared-files /usr/share/nginx/html/ /usr/share/nginx/html/
EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]

FROM node:$NODE_VERSION-buster-slim as server-production
WORKDIR /app
COPY --from=server-builder /app/packages/server/dist/ /app/
COPY --from=server-builder /app/packages/server/package.json /app/package.json
COPY --from=server-builder /app/packages/server/.env /app/
COPY --from=shared-files /app/client/ /app/
RUN yarn install --registry=https://registry.npmjs.org
EXPOSE 3001
CMD ["node", "/app/index.js"]
