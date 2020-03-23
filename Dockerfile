FROM node:13.10.1-slim

ENV PORT 8080
EXPOSE 8080

WORKDIR /usr/src/app

COPY package.json .
COPY server.js .

RUN npm install

# Add user

CMD ["npm", "start"]