export const cmdToEvent = (cmd, mappings) => {
  if( !( cmd.command in mappings ))
    return;
  const evt = {
    ...cmd,
    payload :{
      ...cmd.payload,
      itemId: (cmd.payload.itemId ? cmd.payload.itemId : cmd.aggId)
    },
    event : mappings[cmd.command],
    causationId : cmd.id
  };
  delete evt.command;
  return evt;
}
