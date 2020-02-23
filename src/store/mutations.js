import * as mutationTypes from './mutation-types'

export default {
  [mutationTypes.SET_USER_TOKEN] (state, token) {
    state.token = token
  }
}
