const initialState = {
    text: '',
    _destroy: false
};

export default (state = initialState, evt) => {
  switch (evt.event){
    case 'itemCreated':
      const { id, text } = evt.payload;
      return {
          ...state,id,text
      };
    case 'itemChanged':
      return {
        ...state,
        text : evt.text
      };//state.map( item => item.text = evt.text);
    case 'itemDeleted':
      return {
        ...state,
        _destroy: true
      }
    default:
      return state;
  }
};
