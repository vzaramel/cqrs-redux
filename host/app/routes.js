import uuid from 'node-uuid';
import colors from 'colors';

exports.setup = (sendCommand, store) => {
  return (app) => {

    app.get('/items', function(req, res) {
        res.json(store.getState().items);
    });

    app.post('/items', function(req, res) {
        console.log(req.body);
        sendCommand({
          id: uuid.v4(),
          command: 'createItem',
          aggId : uuid.v4(),
          payload : req.body,
          correlationId: uuid.v4(),
          time : new Date()
        }, (err) =>{
          if (err)
            res.json(err.name);
          else {
            res.json('');
          }
        });
    });
    app.get('/items/:id', (req, res) => {
        const items =
          store.getState()
          .items
          .filter( (item) => item.itemId === req.params.id );
        if ( items.length === 0)
          res.status(404)        // HTTP status 404: NotFound
              .send('Not found');
        else
          res.json(items[0]);
    });
    app.delete('/items/:id', function(req, res) {
        console.log(req.body);
        sendCommand({
          id: uuid.v4(),
          command: 'deleteItem',
          aggId : req.params.id,
          payload : req.body,
          correlationId: uuid.v4(),
          time : new Date()
        }, (err) =>{
          if (err)
            res.json(err.name);
          else {
            res.json('');
          }
        });
    });
  };
};
