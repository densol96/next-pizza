FROM node:alpine
WORKDIR /next-pizza
COPY package-lock.json .
COPY package.json .
RUN npm i
COPY . .
CMD ["npm", "run", "dev"]