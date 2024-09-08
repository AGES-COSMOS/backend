FROM node:18-alpine3.16 AS builder

WORKDIR /app

RUN npm i -g @nestjs/cli

COPY tsconfig*.json /app
COPY prisma /app/prisma
COPY package*.json /app

RUN npm install

COPY . /app

# Build the app
RUN npm run build
RUN npx prisma generate

WORKDIR /app
EXPOSE 3001
