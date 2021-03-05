FROM node:12

ENV appDir /app/sendEmail-service


RUN npm i -g pm2
RUN npm i  -g typescript
RUN npm i -g ts-node


WORKDIR ${appDir}

COPY package.json ./
COPY tsconfig.json ./

RUN npm install

ADD . /app/sendEmail-service
RUN tsc --build

CMD ["pm2", "start", "dist/index.js", "--no-daemon"]