import { SET_ICON_MODAL, SET_INSERT_MODAL } from '../static'

const initialState = {
  icon: false,
  insert: false
}

const modalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ICON_MODAL:
      return { ...state, icon: !state.icon }
    case SET_INSERT_MODAL:
      return { ...state, insert: payload }
    default:
      return state
  }
}

export default modalReducer
