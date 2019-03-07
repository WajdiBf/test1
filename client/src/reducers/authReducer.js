import isEmpty from '../validation/is-empty'

import { SET_CURRENT_USER } from '../action/types'
const initialeState = {
  isAuthenticated: false,
  user: {},
}

export default function (state = initialeState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    default:
      return state
  }
}
