import { SET_CATEGORY, SET_ICONS } from '../static'

const initialState = {
  categories: null,
  icons: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CATEGORY:
      return { ...state, categories: payload }
    case SET_ICONS:
      return { ...state, icons: payload }
    default:
      return state
  }
}
