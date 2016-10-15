import socket from 'socket.io';

export function startSocketIO(httpServer, store) {
  const io = socket.listen(httpServer);

  store.subscribe(
    () => io.emit('state', store.getState())
  );

  io.on('connection', (socket) => {
    var conn = socket.handshake.address.address + ":" + socket.handshake.address.port;
    console.log(colors.magenta(conn + ' -- connects to socket.io'));
    console.log(colors.magenta(store.getState()));
    socket.emit('state', store.getState());
    socket.on('action', store.dispatch.bind(store));
  });

}
