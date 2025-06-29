FROM node:20-alpine

WORKDIR /app

COPY .env* ./
COPY package.json ./
COPY node_modules ./node_modules
COPY dist ./dist

RUN ls -al

CMD ["node", "dist/index.js"]