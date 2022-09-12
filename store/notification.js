export const state = () => ({
  notification: [],
  alertMsg: "",
  alertOpen: false,
  alertResult: null,
  alertType: ""
})

export const getters = {
  getNotification: (state) => state.notification,
  getAlertOpen: (state) => state.alertOpen,
  getAlertMsg: (state) => state.alertMsg,
  getAlertResult: (state) => state.alertResult,
  getAlertType: (state) => state.alertType,
}

export const mutations = {
  setNotification: (state, getNotification) => (state.notification = getNotification),
  setAlertOpen: (state, getAlertOpen) => (state.alertOpen = getAlertOpen),
  setAlertMsg: (state, getAlertMsg) => (state.alertMsg = getAlertMsg),
  setAlertResult: (state, getAlertResult) => (state.alertResult = getAlertResult),
  setAlertType: (state, getAlertType) => (state.alertType = getAlertType)
}