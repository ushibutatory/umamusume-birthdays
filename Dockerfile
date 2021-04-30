FROM node:15-slim

# copy yaml file
WORKDIR /usr/data
COPY data/ ./

# install packages
WORKDIR /usr/src/app
COPY src/app/package.json ./
RUN npm install

# copy source codes
COPY src/app/tsconfig.json ./
COPY src/app/ts/. ./ts/

# generate iCalendar
RUN npm run generate

# compile server application
RUN npm run tsc

# run web server
CMD [ "node", "dist/server.js" ]
