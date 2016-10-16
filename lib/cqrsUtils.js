export const cmdToEvent = (cmd, mappings) => {
  if( !( cmd.command in mappings ))
    return;
  const evt = {
    ...cmd,
    payload :{
      ...cmd.payload,
      id: (cmd.payload.id ? cmd.payload.id : cmd.aggId)
    },
    event : mappings[cmd.command]
  };
  delete evt.command;
  return evt;
}
