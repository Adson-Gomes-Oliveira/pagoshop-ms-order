FROM node:18-alpine
WORKDIR /app/order
COPY package*.json ./
# COPY .npmrc ./
RUN npm install
COPY . ./
ENTRYPOINT npm start