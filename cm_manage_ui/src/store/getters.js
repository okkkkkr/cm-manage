const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // token: state => state.user.token,
  avatar: state => state.user.avatar,
  // role: state => state.global.role
  // name: state => state.user.name
  baseAction: state => state.settings.baseAction,
  unitInfo: state => state.global.unitInfo
}
export default getters
