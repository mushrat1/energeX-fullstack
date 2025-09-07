FROM node:20-alpine

WORKDIR /usr/src/app
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install --include=dev

# Copy source AFTER installing dependencies
COPY . .

# Build TS → dist/
RUN npm run build

EXPOSE 4000
CMD ["node", "dist/index.js"]
