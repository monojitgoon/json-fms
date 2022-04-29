FROM node:14

EXPOSE 8080

# Setting Working Directory
WORKDIR /usr/app

RUN npm install i npm@latest -g 

COPY package.json package-lock*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "serve"]
