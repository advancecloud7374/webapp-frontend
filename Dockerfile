# Stage 1 to build static HTML and JS
FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package*.json /app/
COPY ./ /app/
RUN npm run build
# Stage 2 to copy static HTML and JS from above stage to nginx server directory

FROM node:10
COPY --from=build-stage /app/server/ /app
WORKDIR /app

RUN npm install

RUN npm install
# Copy the default nginx.conf provided by tiangolo/node-frontend
EXPOSE 8080

# Start Nginx server
ENTRYPOINT ["node","server.js" ]