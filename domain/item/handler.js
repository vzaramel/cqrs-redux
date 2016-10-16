import _ from 'lodash';
import errors from './errors';
import { cmdToEvent } from '../../lib/cqrsUtils';

const mappings = {
    createItem: 'itemCreated',
    changeItem: 'itemChanged',
    deleteItem: 'itemDeleted'
};

const handle = (item, cmd) => {
  return [ cmdToEvent(cmd, mappings) ];
};

export default {
  createItem: handle,
  changeItem: (item, cmd) => {
    if( _.isNil(item.id))
    {
      throw new errors.ItemNaoExisteError();
    }
    return handle(item,cmd);
  },
  deleteItem: (item, cmd) =>{
    console.log(item);
    if( _.isNil(item.id))
    {
      throw new errors.ItemNaoExisteError();
    }
    return handle(item,cmd);
  }
};
