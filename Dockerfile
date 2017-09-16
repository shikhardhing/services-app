FROM node:boron
WORKDIR /usr/src/app
RUN git https://github.com/shikhardhing/services-app
WORKDIR /usr/src/app/services-app
RUN npm install
RUN mkdir data
RUN npm build
EXPOSE 3000
CMD ["npm", "start", "0.0.0.0:3000"]