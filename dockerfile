FROM node:alpine

WORKDIR /usr/src/app

# The ./ is required because we're copying more than one file: we need to specify a directory
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]

