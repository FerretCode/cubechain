# syntax=docker/dockerfile:1
FROM node:17-alpine
COPY . .
RUN npm install
CMD ["node", "index.js"]