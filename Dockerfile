# Etapa 1: build de Next.js
FROM node:23 AS builder

WORKDIR /app

COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Etapa 2: producción
FROM node:23

WORKDIR /app

# Copiar backend
COPY backend ./backend

# Copiar build de Next
COPY --from=builder /app/frontend/out ./frontend/out

# Instalar dependencias del backend
WORKDIR /app/backend
RUN npm install

EXPOSE 3001
CMD ["npm", "start"]
