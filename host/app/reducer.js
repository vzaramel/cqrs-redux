export default function reducer(state = {items : {}}, action) {
  switch (action.type) {
    case 'itemCreated':
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.aggId] : action.payload.payload
        },
      };
    case 'itemChanged':
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.aggId] : {
            ...state.items[action.payload.aggId],
            text : action.payload.payload.text
          }
        },
      };
    case 'itemDeleted':
      const newState ={
        ...state
      };
      delete newState.items[action.payload.aggId];
      console.log(newState);
      return newState;
    default:
      return state;
  }
}
