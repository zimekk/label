FROM node:20.10.0-alpine3.17

ENV WORKDIR=/app

WORKDIR $WORKDIR

COPY . ./

RUN yarn && yarn build

EXPOSE 3000 4000

CMD ["yarn", "serve"]
