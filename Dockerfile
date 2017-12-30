FROM mhart/alpine-node:latest

WORKDIR /app
COPY . .

RUN npm install --production

CMD ["npm", "start"]
