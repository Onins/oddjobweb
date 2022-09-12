export default function ({store}) {
  if(localStorage.getItem("isLoggedIn") == null) {
    localStorage.setItem("isLoggedIn", false);
  }

  if(localStorage.getItem("auth") == null) {
    localStorage.setItem("auth", "");
  }

  if(localStorage.getItem("userid") == null) {
    localStorage.setItem("userid", "");
  }

  let state = localStorage.getItem("isLoggedIn");
  let auth = localStorage.getItem('auth');
  let userID = localStorage.getItem('userid');
  store.commit("user/setLogin", state);
  store.commit("user/setAuth", auth);
  store.commit("user/setUserID", userID);

}