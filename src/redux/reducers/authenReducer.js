import { Login, Logout } from '../static'

const initialState = {
  loggedIn: false
}

const authenReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Login:
      return { ...state, loggedIn: true }
    case Logout:
      return { ...state, loggedIn: false }
    default:
      return state
  }
}

export default authenReducer
