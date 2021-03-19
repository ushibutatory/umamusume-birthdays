FROM node:15-slim

# copy yaml file
WORKDIR /usr
COPY birthdays.yaml ./

# create application directory
WORKDIR /usr/src/app
RUN mkdir /usr/src/app/data

# install packages
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
