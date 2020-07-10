import { ChangeRoute } from '../static'

const initialState = {
  route: '/'
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ChangeRoute:
      return { ...state, route: payload }
    default:
      return state
  }
}
