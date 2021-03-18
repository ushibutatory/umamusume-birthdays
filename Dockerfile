FROM node:15

# create application directory
WORKDIR /usr/src/app

# install packages
COPY src/app/package.json ./
RUN npm install

# copy source codes
COPY src/app/tsconfig.json ./
COPY src/app/ts/. ./ts/

# compile
RUN npm run tsc

# run web server
CMD [ "node", "dist/server.js" ]
