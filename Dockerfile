FROM node:12.17.0-alpine
WORKDIR /usr/washman-api
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run build
## run the app
FROM node:12.17.0-alpine
WORKDIR /usr/washman-api
COPY package.json ./
RUN npm install --only=production
COPY --from=0 /usr/washman-api/dist ./dist
RUN npm install pm2 -g
EXPOSE 5050
CMD ["pm2-runtime","dist/Api/v1/app.js"]