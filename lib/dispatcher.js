var redis = require('redis')
  , colors = require('colors')
  , _ = require('lodash')
  , uuid = require('node-uuid');

const dispatcher = {

    setup: function(es, modules){
      console.log(colors.blue("Registering modules:" + modules.map((m)=>m.NAME)));
      const commandHandlers = modules.reduce(
          (commandHandlers, module) =>
            {
              const {handlers, reducer, NAME} = module;
              return dispatcher._combineHandlers(NAME, commandHandlers, handlers,reducer);
          },{});

      return (cmd, callback) => {
        dispatcher._handle(commandHandlers, es, cmd, callback);
      }
    },
    _combineHandlers: (moduleName, commandHandlers, handlers, reducer) => {
        const commandTypes = Object.keys(handlers);
        const newHandlers = {};
        //for each
        for( var index in commandTypes){
          let cmdType = commandTypes[index];
          if( cmdType in commandHandlers)
            throw new Error('Only one handler per command is possible ' +commandType);

          const handler = handlers[cmdType];
          console.log(moduleName + '.' +cmdType+ ' Handles ---------> [' +cmdType+ ']');
          newHandlers[cmdType] = {
              handler,
              reducer
          };
        }
        return {
          ...commandHandlers,
          ...newHandlers
        };
    },
    _handle: function(commandHandlers, es, cmd, callback) {

        es.getEventStream(cmd.aggId, function(err, stream) {
          if (err){
              console.log(colors.red(err));
              callback(err);
              return;
          }
          console.log(colors.cyan('apply existing events ' + stream.events.length));
          const agg = stream.events.reduce(
            (state, ev) => commandHandlers[cmd.command].reducer(state, ev.payload),
            {}
          );
          try{
              const events = commandHandlers[cmd.command].handler(agg, cmd);
              const modifiedEvents = events.map((event) => {
                return {
                  ...event,
                  id : uuid.v1(),
                  time: new Date()
                };
              })
              console.log(colors.magenta('apply new event ' + JSON.stringify(modifiedEvents, null, 4) + ' to aggregate'));
              stream.addEvents(modifiedEvents);
              stream.commit();
              callback();
          }catch(exception){
            console.log(colors.red(exception));
            callback();
          }
        });
    }
};

exports.setup = dispatcher.setup;
