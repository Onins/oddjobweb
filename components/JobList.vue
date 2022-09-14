<template>
  <main>
    <ul class="job__content">
      <li class="job__card" v-for="(jobs, i) in this.getJobList" :key="i">
        <nuxt-link :to="'/jobs/'+jobs._id">
          <h3 class="job__card-item">          
            <div>
              <p class="myjob__label">Job Title</p>
              <p class="myjob__text">{{ jobs.title }}</p>
              <p class="myjob__label">Job Description</p>
              <p class="myjob__text">{{ jobs.description }}</p>
            </div>
            <div>
              <p class="myjob__label">Author Name</p>
              <p class="myjob__text">{{ jobs.author.name  }}</p>
              <p class="myjob__label">Author Email</p>
              <p class="myjob__text">{{ jobs.author.email  }}</p>       
            </div>            
          </h3>        
        </nuxt-link>      
      </li>
    </ul>
  </main>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
   computed: {
    ...mapGetters('jobs', ['getJobList'])
  }
}
</script>

<style>

</style>