'use strict';

import { inherits } from 'util';

const Errors = {
  ItemNaoExisteError: function (){
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = "Item não existe";
  }
}
inherits(Errors.ItemNaoExisteError,Error);

export default Errors;
