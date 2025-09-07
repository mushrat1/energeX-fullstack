FROM node:20-alpine

WORKDIR /usr/src/app
COPY package.json package-lock.json* yarn.lock* ./
RUN if [ -f yarn.lock ]; then yarn --frozen-lockfile; elif [ -f package-lock.json ]; then npm ci --include=dev; else npm i; fi
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
