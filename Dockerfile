# Build frontend
FROM node:20-alpine as frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production image
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=frontend-build /app/build ./build
COPY server ./server

EXPOSE 80
ENV PORT=80
CMD ["node", "server/index.js"]
