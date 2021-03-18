FROM node:15

# create application directory
WORKDIR /usr/src/app

# install packages
COPY src/app/package.json ./
RUN npm install

# copy source codes
COPY src/app/. .

# run web server
CMD [ "node", "server.js" ]
