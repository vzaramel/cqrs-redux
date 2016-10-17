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
      const newItems = {
        ...state.items
      };
      delete newItems[action.payload.aggId];
      return {
        ...state,
        items: newItems
      };
    default:
      return state;
  }
}
