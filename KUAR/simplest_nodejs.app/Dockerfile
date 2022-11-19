# An arbitrarily chosen Node.js image: might need to be changed
FROM node:10

#the directory within the image where all commands are gonna go
WORKDIR /usr/src/app

#copy pkg files, install deps
COPY package*.json ./
RUN npm install

#copy app files onto image
COPY . .

#command to run when starting said container
CMD [ "npm", "start" ]