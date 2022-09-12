import axios from 'axios'


export const state = () => ({
  isLoggedIn: false,
  loginSuccess: null,
  isRegistered: null,
  regMessage: "",
  isModalOpen: false,
  authCode: "",
  userID: "",
  userName: "",
  userEmail: ""
  
})

export const getters = {
  getLogin: (state) => state.isLoggedIn, 
  getAuth: (state) => state.authCode,
  getUserID: (state) => state.userID,
  getUserName: (state) => state.userName,
  getUserEmail: (state) => state.userEmail,
  getRegStat: (state) => state.isRegistered,
  getLoginStat: (state) => state.loginSuccess,
  getRegMsg: (state) => state.regMessage,
  getModalOpen: (state) => state.isModalOpen,
}

export const mutations = {
  setLogin: (state, getLogin) => (state.isLoggedIn = getLogin),
  setAuth: (state, getAuth) => (state.authCode = getAuth),
  setUserID: (state, getUserID) => (state.userID = getUserID),
  setUserName: (state, getUserName) => (state.userName = getUserName),
  setUserEmail: (state, getUserEmail) => (state.userEmail = getUserEmail),
  setRegStat: (state, getRegStat) => (state.isRegistered = getRegStat),
  setLoginStat: (state, getLoginStat) => (state.loginSuccess = getLoginStat),
  setRegMsg: (state, getRegMsg) => (state.regMessage = getRegMsg),
  setModalOpen: (state, getModalOpen) => (state.isModalOpen = getModalOpen)
}

export const actions = {
  async userLogin({commit}, data) {
    let jsonData = JSON.stringify({
      "email": data.email,
      "password": data.pass
    });
  
    let config = {
      method: 'post',
      url: 'http://localhost:3080/user/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : jsonData
    };
  
    axios(config).then((response)=> {
      

      console.log(response);
      if (response.status == 200) {
        commit('setAuth', response.data.token);
        commit('setUserID', response.data.userId);
        commit('setLoginStat', true);        
      }
    })
    .catch((error)=> {
      console.log(error);
      commit('setAuth', "");
      commit('setLoginStat', false);
    });
  },
  async userRegister({commit}, data) {
    let jsonData = JSON.stringify({
      "email": data.email,
      "password": data.pass,
      "name": data.name
    });

    let config = {
      method: 'post',
      url: 'http://localhost:3080/user/signup',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : jsonData
    };

    axios(config)
    .then((response)=> {
      if(response.status == 201) {
        commit('setRegMsg', "");
        commit('setRegStat', true);
      }      
    }).catch((error)=> {
      commit('setRegStat', false);
      commit('setRegMsg', error.response.data.message);              
    });
  },

  async userInfo({commit}, data) {
    if (data.userID != ""){
      let config = {
        method: 'get',
        url: 'http://localhost:3080/user/'+data.userID,        
      };
  
      axios(config)
      .then((response)=>{    
        commit("setUserName", response.data.name);    
        commit("setUserEmail", response.data.email); 
      }).catch((error)=> {
        console.log(error);          
      });
    }    
  }
}