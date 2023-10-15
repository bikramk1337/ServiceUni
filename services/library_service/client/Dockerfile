FROM  node:18-alpine

WORKDIR /client

# Copy package json and install dependencies
COPY package.json /client

RUN npm install 

COPY . /client

EXPOSE 3000

CMD ["npm", "start"]

