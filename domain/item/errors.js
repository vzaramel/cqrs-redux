'use strict';

import { inherits } from 'util';

const Errors = {
  ItemDoesNoteExists: function (){
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = "Item não existe";
  }
}
inherits(Errors.ItemDoesNoteExists,Error);

export default Errors;
