FROM nginx:1.25.0

COPY ./build/ /usr/share/nginx/html/
COPY ./nginx.conf.template /etc/nginx/conf.d/default.conf.template

CMD ["/bin/sh" , "-c" , "envsubst '${JAEGER_QUERY_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]