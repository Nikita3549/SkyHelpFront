FROM node:20-alpine AS builder
WORKDIR opt/app
COPY ./ ./
RUN npm install
RUN npm run build

FROM node:22 as build
RUN npm install -g serve
WORKDIR opt/app
COPY --from=builder /opt/app/dist ./dist
