import { SET_ICON, SET_FORM_DATA } from '../static'

const initialState = {
  icon: null,
  data: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ICON:
      return { ...state, icon: payload }
    case SET_FORM_DATA:
      return { ...state, data: payload }
    default:
      return state
  }
}
