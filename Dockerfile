FROM node:10

WORKDIR /app

ENV MONGO_3 mongodb://localhost:27023/database
ENV MONGO_4 mongodb://localhost:27024/database

ADD . .
RUN yarn --frozen-lockfile

ENTRYPOINT ["node", "test"]