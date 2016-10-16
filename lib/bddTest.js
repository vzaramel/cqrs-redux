var _ = require('lodash');
var assert = require('assert');

module.exports = {
  setup : (reducer, handlers) => {
    return (given, when, then) => {
        then(when(handlers,given(reducer)));
    }
  },
  given : (...events) => {
    return (reducer) => {
      return events.reduce(reducer, {});
    }
  },
  when : (cmd) => {
    return (handlers, aggregate) => {
      if( !( cmd.command in handlers ) )
        return new Error("Aggregate dos not know how to handle command " + cmd.command+  " yet");
      try{
        return handlers[cmd.command](aggregate, cmd);
      }catch(exception){
        return exception;
      }
    }
  },
  then : (...expectedEvents) => {
    return (got) => {
      if( !_.isNil(got) && _.isArray(got) && got.length > 0){
         const gotEvents = got;
         if( gotEvents.length === expectedEvents.length){
           for ( var i =0 ; i < gotEvents.length; i++)
                if( gotEvents[i].event === expectedEvents[i].event){
                  assert.deepEqual(
                    gotEvents[i].payload,
                    expectedEvents[i].payload,
                    'Events payload does not match'
                  );
                }else{
                  assert.fail(
                    gotEvents[i].event,
                    expectedEvents[i].event,
                    "Incorrect event in results"
                  );
                }
         }else if (gotEvents.length < expectedEvents.length){
              assert.fail(
                gotEvents.map((ev)=> ev.event),
                expectedEvents.map((ev)=> ev.event) ,
                "Expected event(s) missing:",
                "###"
              );
         }else{
              assert.fail(
                gotEvents.map((ev)=> ev.event),
                expectedEvents.map((ev)=> ev.event),
                "Unexpected event(s) emitted",
                "###"
              );
         }
      }else if ( _.isError(got) && got.name === 'Error'){
        throw got;
      }else{
        const eventsName =  expectedEvents.map((ev)=> ev.event);
        assert.fail(got,eventsName, "Expected events ["+eventsName+"], but got exception " + got.name, "###");
      }
    }
  },
  thenFailWith : (expectedError) => {
    return (got) => {
        if(got.name === expectedError.name){
            assert.ok("Got correct exception type");
        }
        else if ( _.isArray(got) && got.length === 0){
            throw new Error("Aggregate does not yet handle command");
        }
        else if ( _.isError(got)){
          assert.fail(
            got.name,
            expectedError.name,
            "Got wrong exception",
            "###"
          );
        }
        else{
            throw new Error(
              "Expected exception "+
              expectedError.name +
              ", but got event result: " +
              got.map((ev)=> ev.event).toString()
            );
        }
    }
  }
}
