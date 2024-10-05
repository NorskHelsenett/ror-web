FROM nginxinc/nginx-unprivileged:alpine
WORKDIR /app

COPY nginx/http_prod.conf /etc/nginx/conf.d/default.conf
COPY dist /app
