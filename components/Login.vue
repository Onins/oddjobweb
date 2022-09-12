<template>
  <div>
    <div class="login">
      <p v-if="getLogin == 'true'" class="login_user">Hello! </br> <span>{{ this.getUserName }}</span></p>
      <button @click="toggleModal()" class="login-link" v-if="getLogin == 'false'">{{ modalText }}</button>

      <button @click="logout()" class="login-link" v-if="getLogin == 'true'">LOGOUT</button>
    </div>
    <div class="login-modal" :class="{'open': getModalOpen}">
      <!-- Login -->
      <div class="login-modal__wrapper" v-if="formSelected == 'login'">
        <p class="login-modal__header">LOGIN</p>
        <span class="login-modal__error">{{ loginError }}</span>
        <form ref="login" @submit.prevent="onSubmit" id="login" class="login-modal__form">
          <label for="login-email" class="login__label">Email</label>
          <input type="email" id="login-email" v-model="loginEmail" class="login__input">
          <label for="login-pass" class="login__label">Password</label>
          <input type="password" id="login-pass" v-model="loginPass" class="login__input">
          <input type="button" @click="submitLogin" class="login__button" value="LOGIN">
          <p class="login__text">No account yet? 
            <span class="login__link" @click="switchForm('register')">REGISTER HERE</span>
          </p>
        </form>
      </div>
      <!-- Register -->
      <div class="login-modal__wrapper" v-if="formSelected == 'register'">
        <p class="login-modal__header">REGISTER</p>
        <span class="login-modal__error">{{ regError }}</span>
        <form ref="register" @submit.prevent="onSubmit" id="reg" class="login-modal__form">
          <label for="reg-name" class="login__label">Name</label>
          <input type="input" id="reg-name" v-model="regName" class="login__input">
          <label for="reg-email" class="login__label">Email</label>
          <input type="email" id="reg-email" v-model="regEmail" class="login__input">
          <label for="reg-pass" class="login__label">Password</label>
          <input type="password" id="reg-pass" v-model="regPass" class="login__input">
          <label for="reg-confirm" class="login__label">Confirm Password</label>
          <input type="password" id="reg-confirm" v-model="regConfirm" class="login__input">
          <input type="button" @click="submitRegister" class="login__button" value="REGISTER">
          <p class="login__text">Already have an account? 
            <span class="login__link" @click="switchForm('login')">LOGIN HERE</span>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {  
  data() {
    return {
      modalText: 'LOGIN',
      formSelected: 'login',
      loginError: '',
      loginEmail: '',
      loginPass: '',
      regError: '',
      regName: '',
      regEmail: '',
      regPass: '',
      regConfirm: ''
    }
  },

  computed: {
    ...mapGetters('user', ['getAuth', 'getUserID', 'getUserName', 'getRegStat', 'getLogin', 'getModalOpen', 'getRegMsg', 'getLoginStat'])
  },

  watch: {
    getLoginStat: function () {
      if (this.getLoginStat == true) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('auth', this.getAuth);
        localStorage.setItem('userid', this.getUserID);
        this.setLogin("true");
        this.setNotification('User logged in.');   
        this.resetFields();
        this.toggleModal();
        this.setLoginStat(null);  
        this.updateMyJobPage({
          auth: this.getAuth,
          userID: this.getUserID
        });
        this.userInfo({
          userID: this.getUserID
        })
      }

      else if (this.getLoginStat == false) {
        localStorage.setItem('isLoggedIn', false);
        localStorage.setItem('auth', "");
        localStorage.setItem('userid', "");
        this.setLogin("false");
        this.setNotification('Login Failed!');
        this.setLoginStat(null);
      }
    },

    getRegStat: function() {
      if(this.getRegStat == true) {
        this.setNotification('Registered successfully.');
        this.resetFields();
        this.setRegStat(null);
        this.switchForm('login');
        this.setRegStat(null);
      }
      else if(this.getRegStat == false) {
        this.setNotification(this.getRegMsg);
        this.setRegStat(null);
      }
    }
  },

  methods: {
    ...mapMutations('user', ['setAuth', 'setUserID', 'setLogin', 'setModalOpen', 'setRegStat', 'setLoginStat']),
    ...mapMutations('notification', ['setNotification']), 
    ...mapActions('user', ['userRegister', 'userLogin', 'userInfo']),
    ...mapActions('jobs', ['updateMyJobPage']),

    toggleModal() {
      if (this.getModalOpen) {
        this.setModalOpen(false);
        this.modalText = "LOGIN"
      }
      else {
        this.formSelected = 'login'
        this.setModalOpen(true);
        this.modalText = "CLOSE"
      }

      this.resetFields();
    },

    switchForm(data) {
      this.resetFields();
      this.formSelected = data;
    },

    submitLogin() {
      let notEmpty;

      if(this.loginEmail != "" && this.loginPass != "") {        
        this.loginError = "";
        notEmpty = true;
      }
      else {
        this.loginError = "Input email and password.";
        return false;
      }


      if(notEmpty) {
        this.userLogin({
          email: this.loginEmail,
          pass: this.loginPass
        })
      }
    },
    submitRegister() {
      let notEmpty;
      let matchPass;

      if(this.regName != "" && this.regEmail != "" && this.regPass != "" && this.regConfirm != "") {        
        this.regError = "";
        notEmpty = true;
      }
      else {
        this.regError = "Please fill in all fields.";
        return false;
      }

      if (this.validateEmail(this.regEmail) != 1) {
        this.regError = "Please use valid email format";
        return false;
      }

      if (this.regPass == this.regConfirm) {
        this.regError = "";
        matchPass = true;
      }
      else{
        this.regError = "Passwords must match!";
        matchPass = false;
      }


      if(notEmpty && matchPass) {
        this.userRegister({
          email: this.regEmail.toString(),
          pass: this.regPass.toString(),
          name: this.regName.toString(),
        })        
      }
    },

    validateEmail(input) {
      var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
      if (regex.test(input)) {
          return 1;
      } else {
          return -1;
      }    
    },

    logout(){      
      localStorage.setItem('isLoggedIn', false);
      localStorage.setItem('auth', "");
      localStorage.setItem('userid', "");
      this.setAuth("");
      this.setUserID("");
      this.setLogin("false");
      this.$router.push('/');
      this.setNotification('User logged out.');      
      this.updateMyJobPage({
        auth: this.getAuth,
        userID: this.getUserID
      });
    },

    resetFields() {
      this.regError = "";
      this.regName = "";
      this.regEmail = "";
      this.regPass = "";
      this.regConfirm = "";
      this.loginError = "";
      this.loginEmail = "";
      this.loginPass = "";
    }
  }
}
</script>

