// server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

//broadcast to all users helper function
const broadcast = object => {
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(object));
    });
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', ws => {
  console.log('Client connected');

  //declare countUsers on connection
  let countUsers = { 
      type: 'countUsers',
      size: wss.clients.size
     };
  broadcast(countUsers);

  //when a message or notification is received by server, parse JSON, and handle by message type
  ws.on('message', function incoming(clientMessage) {
    clientMessage = JSON.parse(clientMessage);
    const { username, content } = clientMessage;

    switch (clientMessage.type) {
      //for messages, change message type to incomingMessage, create UUID for the message and broadcast it to all users
      case 'postMessage':
        const incomingMessage = {
          type: 'incomingMessage',
          id: uuidv4(),
          username,
          content
        };
        broadcast(incomingMessage);
        break;

      //for name changes, change message type to incomingNotification, create UUID for the message and broadcast it to all users
      case 'postNotification':
        const incomingNotification = {
          type: 'incomingNotification',
          id: uuidv4(),
          content
        };
        broadcast(incomingNotification);
        break;

      default:
        console.log('unknown message type');
    }
  });

  // When client closes the socket, update countUsers size and broadcast to all clients
  ws.on('close', () => {
    countUsers.size = wss.clients.size;
    broadcast(countUsers);
    console.log('Client disconnected');
  });
});
