FROM node:16.20.0 AS build

WORKDIR /app

#Copy files with dependency metadata first
#to check them for changes and invalidate the Docker cache
COPY package.json ./
COPY yarn.lock ./
COPY packages/jaeger-ui/package.json ./packages/jaeger-ui/

COPY . .
RUN yarn install --frozen-lockfile
# RUN yarn prettier-lint
# RUN yarn eslint 

WORKDIR /app/packages/jaeger-ui

# RUN yarn test
RUN yarn build

FROM nginx:1.25.0

COPY --from=build /app/packages/jaeger-ui/build/ /usr/share/nginx/html/
COPY ./nginx.conf.template /etc/nginx/conf.d/default.conf.template

CMD ["/bin/sh" , "-c" , "envsubst '${JAEGER_QUERY_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]