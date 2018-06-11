export function tariffs (state = {}, action) {

  switch (action.type) {
    case 'data_success': {
      state = {
        success: true,
        ...action,
      }
      break
    }
    default:
      break
  }
  return state
}
