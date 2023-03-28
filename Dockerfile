FROM node:18-alpine
WORKDIR /app/order
COPY package.json ./
RUN npm install
COPY . ./
ENTRYPOINT npm start