import { createStore, combineReducers } from 'redux'

import authen from './reducers/authenReducer'
import router from './reducers/routerReducer'

export default createStore(combineReducers({
  authen,
  router
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
