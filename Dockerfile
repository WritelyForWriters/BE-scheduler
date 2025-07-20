FROM node:20-alpine

WORKDIR /app

ENV TZ=Asia/Seoul
RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

COPY .env* ./
COPY package.json ./
COPY node_modules ./node_modules
COPY dist ./dist

CMD ["node", "dist/index.js"]