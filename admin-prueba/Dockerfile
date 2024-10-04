# Stage 1: Build
FROM node:latest AS build

WORKDIR /app

COPY ./ /app/
# Instala las dependencias locales, incluido Angular CLI
RUN npm install --legacy-peer-deps
RUN npm i --legacy-peer-deps -g @angular/cli

ARG configuration=production
# Ejecuta el comando de construcción de Angular CLI
RUN ng build --configuration $configuration
# Stage 2: Nginx para producción
FROM nginx:alpine
## From 'builder' copy published folder
COPY --from=build /app/dist/test /usr/share/nginx/html
COPY ./config/nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

