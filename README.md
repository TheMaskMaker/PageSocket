# A simple psuedo-microservice

## Explanation
A node server sets up a simple html page with just a button and a script.
It will mock up some cookie data based on a name you can input, some id, and the
number of times you views the page. Then it opens a web socket with the gateway, and passes the info.
The gateway makes a RESTquest to another server which counts the page views and servers up some text. The gateway sends the response
back to the page over the websocket, and the page updates itself.
Everything logs way too much information, mostly for debugging reasons and tracking the data exchange.
Enjoy.

## Setup
1. get docker and docker compose
2. from the root of this run:
'''
docker-compose build
docker-compose up
'''
3. head to localhost:3000 on your favorite browser (chrome)
4. Click the button


## Issues
### no docker compose
Well, this will be annoying. You need to manually run each container, and do service BEFORE gateway so you can link them.
Don't forget to -e the environment variables.

###My audience id cookie is like getting overidden during session swapping?
set your hosts file to use www.pagesocket.com or something. Chrome play weirdly with localhost cookies sometimes.