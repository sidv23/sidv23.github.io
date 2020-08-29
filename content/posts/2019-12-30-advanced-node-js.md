---
template: post
title: Advanced Node.js
slug: advanced-node-js
draft: true
date: '2019-12-30T12:00:00.000Z'
description: >
  Summarized list of some good to know Node.js concepts.
category: Back-end
tags:
  - Javascript
  - Node.js
---

Advanced Node.js
Pluralsight, Samer Buna

Table of Contents-

Architecture and dependencies
Require module and its 5 major steps
Event Loop and its concurrency model
Event emitters, callbacks, and promises
TCP, UDP, HTTP and HTTPS
Common built-in libraries
Debugging options
Readable, Writable, and Transform
Child process and load balancing

## Node != JavaScript

- Alternate to V8 is Chakra.
- V8 is single thread.
- libuv for async operations.

### REPL

### Global Object, Process, and Buffer Object

- Process object is an instance of event emitter.
```js
process.env
process.on('exit', (code) => {
  // do one final synchronous operation
  // before the node process terminates
})
process.on('uncaughtException', (err) => {
  // something went unhandled.
  // Do any cleanup and exit anyway!

  process.exit() // Force exit the process
})
process.stdin.on('readable', () => {
  const chunk = process.stdin.read()
})
process.nextTick(()=>{})
```

#### Buffer
- Buffer to work with binary streams of data.
- Buffer is a chunk of memory allocated outside V8 and we can put some data in that memory.
- Once a buffer is allocated it cannot be resized.
- Buffer.allocUnsafe() has performance advantages.

- Require function caches the module it loads.

### Concurrency Model and Event Loop

- Concurrency Model for handling multiple connections.
- For Event Model, Nodejs had libuv, Ruby has Event Machine, Python has Twisted.
- Slow I/O operations are handled with events and callbacks so that they do not block the main single thread execution.
- I/O is any communication that is happening between the process in a CPU and any external entity like memory, network or another CPU.
- Apache is Multi-threaded while Nginx is single-threaded.
- Developers don’t need to deal with concurrency, cross-thread operations, variable locking.
- Every time an I/O happens, a callback is registered on a queue and executed when the I/O is completed.
- non-blocking I/O resolves the performance issues.

#### Event Loop
- A loop that picks events from the event queue and pushes their callbacks to the call stack.

#### Call Stack
- Simple a list of functions. Stack is first in last out kind of data structure.
- If there is something in Event Queue then put that from queue to call stack.

### Node's Event-driven architecture

- Promises and async await an improvement over callbacks.

#### EventEmitter

- Core of Event driven architecture.

```js
const EventEmitter = require('events');
class Logger extends EventEmitter{}
const logger = new Logger();
logger.emit('event');
logger.on('event', listenerFunc);
logger.on('error', errorHandler); // error handling in event driven architecture
process.once('uncaughtException', errHandler);
logger.prependListener('event', someOtherListenerFunc);
```

### Basics

#### Creating server
```js
const http = require('http');

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World');
});
server.listen(8000);
```

#### Serving a static file
```js
const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  fs.readFile('./index.html', (err, file) => {
    response.end(file);
  });
});
server.listen(8000);
```

### Express.js

```js
const express = require('express')
const app = express()

let notes = [
  ...
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/notes', (req, res) => {
  res.json(notes)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

### nodemon

nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.
`node_modules/.bin/nodemon index.js`

#### Fetching a single resource
```js
app.get('/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find(note => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});
```

#### Deleting resources
```js
app.delete('/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})
```

### Receiving data
```js
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/notes', (request, response) => {
  const note = request.body
  console.log(note)

  response.json(note)
})
```

```js
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})
```

#### Quick note on HTTP Request types

GET and HEAD request should be only for data retrieval. These methods ought to be considered safe i.e. executing these request must not cause any side effects in the server. In, other words, the database must not change as a result of the request.

All HTTP requests except POST should be idempotent.
This means that if a request has side-effects, then the result should be same regardless of how many times the request is sent.

When our API adheres to RESTful principles, then GET, HEAD, PUT, and DELETE requests are used in such a way that they are idempotent.

#### Middleware

The body-parser we took into use earlier is a so-called middleware.

Middleware are functions that can be used for handling request and response objects.

#### CORS on server

`npm install cors --save`
```js
const cors = require('cors')
app.use(cors())
```

#### Using express for static content
```js
// To serve the 'build' folder
app.use(express.static('build'))
```

#### Adding MongoDB

Schema tells Mongoose how the objects are to stored in the database.

Mongoose convention is to automatically name collections as the plural when the schema referas to them in the singular.

Document databses like Mongo are schemaless, meaning that the databse itself does not care about the structure of the data that is stored in the database.

Models are so called constructor functions that create new JavaScript objects based on the provided parameters.

##### Saving object to db

```js
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
```
