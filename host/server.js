
// `node server.js`
var express = require('express')
  , colors = require('colors')
  , uuid = require('node-uuid')
  , app = express()
  , http = require('http')
  , server = http.createServer(app);

// import store from './app/storage';
import dispatcher from '../lib/dispatcher';
import eventstore from 'eventstore';
import items from '../domain/item';
import { startSocketIO } from './app/socket';
import makeStore from './app/store';

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express['static'](__dirname + '/public'));
});

export const store = makeStore();
startSocketIO(server, store);

// BOOTSTRAPPING
console.log('\nBOOTSTRAPPING:'.cyan);

const es = eventstore();
es.useEventPublisher( evt => {
      console.log(colors.green('\npublishing event'));
      store.dispatch({ type : evt.event, payload : evt});
});
es.init();
const sendCommand = dispatcher.setup(es, [items]);

console.log('1. -> routes'.cyan);
require('./app/routes').setup(sendCommand,store)(app);

// START LISTENING
var port = 3000;
console.log(colors.cyan('\nStarting server on port ' + port));
server.listen(port);
