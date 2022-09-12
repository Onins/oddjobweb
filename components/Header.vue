<template>
  <div class="header" id="header">
    <div class="header__wrapper">
      <div class="header__links">
        <h1 class="header__logo">ODD JOB</h1>
        <Navigation/>
      </div>      
    </div>
    <div class="header__login">
      <Login />
    </div>      
  </div>    
</template>

<script>
import NuxtLogo from './NuxtLogo.vue';
import Navigation from './Navigation.vue';

export default {
  components: {
    NuxtLogo,
    Navigation
  }
}

</script>

<style lang="sass" scoped>

</style>
