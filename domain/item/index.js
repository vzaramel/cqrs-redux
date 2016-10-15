
import handlers from './handler'
import reducer from './reducer'
import errors from './errors'
//to reduce the number of bugs, make sure not to export action types.
//action types are internal only and only actions and reducer should access them

export default {
  handlers,
  reducer,
  errors,
  NAME : 'item'
}
