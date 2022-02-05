export const config_actions = {
  SET_NAVBAR_HEIGHT: 'SET_NAVBAR_HEIGHT',
}
const defaultState = {
  navbar: { height: 0 },
}

export default function config(
  state = defaultState,
  action
): typeof defaultState {
  const { type, payload } = action

  switch (type) {
    case config_actions.SET_NAVBAR_HEIGHT:
      return {
        ...state,
        navbar: { ...state.navbar, height: payload },
      }
    default:
      return state
  }
}
