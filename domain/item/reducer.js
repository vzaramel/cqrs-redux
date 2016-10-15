const initialState = {
    text: '',
    _destroy: false
};

export default (state = initialState, evt) => {
  switch (evt.event){
    case 'itemCreated':
      // console.log(evt);
      const { itemId, text } = evt.payload;
      return {
          ...state,itemId,text
      };
    case 'itemChanged':
      return state.map( item => item.text = evt.text);
    case 'itemDeleted':
      return state.map( item => item._destroy = true);
    default:
      return state;
  }
};
