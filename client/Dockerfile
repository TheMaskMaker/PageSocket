FROM node
EXPOSE 3000
#This is to cache npm install!!!!!
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /
COPY ./app .
CMD [ "node", "index.js" ]