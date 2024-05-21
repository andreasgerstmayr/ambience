# build
FROM docker.io/library/node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json .
RUN npm ci

COPY . .
ENV NODE_ENV production
RUN npm run build

# runtime
FROM docker.io/library/node:20-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package.json /usr/src/app/package-lock.json .
COPY --from=builder /usr/src/app/build ./build
RUN npm ci --omit=dev

ENV NODE_ENV production
EXPOSE 3000
USER node
CMD ["node", "build/"]
