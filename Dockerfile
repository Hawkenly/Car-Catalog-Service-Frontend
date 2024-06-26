FROM node:18-alpine as build

#ARG REACT_APP_API_URL
#ENV REACT_APP_API_URL=$REACT_APP_API_URL

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]