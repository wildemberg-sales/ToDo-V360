FROM node:18-alpine

WORKDIR /web

ENV NEXT_PUBLIC_API_URL="http://localhost:3000/api/v1/lists"

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]