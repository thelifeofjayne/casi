import { createStore, combineReducers } from 'redux'

import authen from './reducers/authenReducer'
import router from './reducers/routerReducer'
import modal from './reducers/modalReducer'
import fetch from './reducers/fetchReducer'
import form from './reducers/formReducer'
export default createStore(
  combineReducers({
    authen,
    router,
    modal,
    fetch,
    form
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
