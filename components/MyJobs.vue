<template>
  <main>
    <div class="myjob__placeholder" v-if="getLogin == 'false'">
      Please login to see your listed jobs applied for.
    </div>
    <div class="myjob__placeholder" v-if="getLogin == 'true' && getMyJobList == ''">
      You have no jobs applied with.
    </div>
    <ul class="myjob__content" v-if="getLogin == 'true'">
      <li class="job__card" v-for="(jobs, i) in this.getMyJobList" :key="i">
        <h3 class="job__card-item">
          Job Title: {{ jobs.title }} <br/>
          Job Description: {{ jobs.description }} <br/>
          Author Name: {{ jobs.author.name }} <br/>
          Author Email: {{ jobs.author.email }}
        </h3>        
      </li>
    </ul>
  </main>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {  
  computed: {
    ...mapGetters('jobs', ['getMyJobList']),
    ...mapGetters('user', ['getLogin'])
  }  

}
</script>

<style>

</style>