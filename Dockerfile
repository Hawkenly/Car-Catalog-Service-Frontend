# Этап сборки
FROM node:18-alpine AS build

# Аргумент для передачи переменной окружения
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package.json package-lock.json* ./

# Устанавливаем зависимости
RUN npm ci

# Копируем все файлы проекта и выполняем сборку
COPY . .

RUN npm run build

# Этап запуска
FROM nginx:alpine

# Копируем собранные файлы из предыдущего этапа
COPY --from=build /app/build /usr/share/nginx/html

# Открываем порт 3000 для входящих соединений
EXPOSE 3000

# Настраиваем NGINX на использование порта 3000
RUN sed -i 's/80/3000/g' /etc/nginx/conf.d/default.conf

# Запускаем NGINX
CMD ["nginx", "-g", "daemon off;"]