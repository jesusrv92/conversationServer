FROM node:12

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN node run build

EXPOSE 3003

CMD [ "node", "dist/server.js" ]