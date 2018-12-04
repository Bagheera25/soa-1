FROM node:8

RUN npm install -g @angular/cli

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

RUN npm install -g @angular/cli

CMD ["npm", "start"]
EXPOSE 4200