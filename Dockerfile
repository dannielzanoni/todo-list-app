FROM node:20 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production 

FROM nginx:alpine

COPY --from=build /app/dist/todo-list-app /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80