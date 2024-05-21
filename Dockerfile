# build
FROM docker.io/library/node:22-alpine AS builder
ENV NODE_ENV production
WORKDIR /usr/src/app

COPY package.json package-lock.json .
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

# runtime
FROM docker.io/library/node:22-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json /usr/src/app/package-lock.json .
COPY --from=builder /usr/src/app/build ./build
RUN npm ci --omit=dev

EXPOSE 3000
USER node
CMD ["node", "build/"]
