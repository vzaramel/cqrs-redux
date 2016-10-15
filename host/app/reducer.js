export default function reducer(state = {items : {}}, action) {
  switch (action.type) {
    case 'itemCreated':
      const newState = {
        ...state,
        items: [
          ...state.items,
          action.payload.payload
        ],
      };
      return newState;
    default:
      return state;
    }
}
