<template>
  <main v-if="this.getSelectedJob != ''">
    <div class="myjob__content myjob__job-detail">
      <p class="myjob__label">Job Title</p>
      <p class="myjob__text">{{ this.getSelectedJob.title }}</p>
      <p class="myjob__label">Job Description</p>
      <p class="myjob__text">{{ this.getSelectedJob.description }}</p>
      <p class="myjob__label">Job Requirements</p>
      <p class="myjob__text">{{ this.getSelectedJob.requirements }}</p>
      <p class="myjob__label">Job Stipend</p>
      <p class="myjob__text">{{ this.getSelectedJob.stipend}}</p>

      <p class="myjob__label">Job Author Name</p>            
      <p class="myjob__text" v-if="getSelectedJob.author">{{ this.getSelectedJob.author.name }}</p>
      <p class="myjob__label">Job Author Email</p>
      <p class="myjob__text" v-if="getSelectedJob.author">{{ this.getSelectedJob.author.email }}</p>
    </div>
  </main>
</template>

<script>
import { mapGetters} from 'vuex'

export default {  
  computed: {
    ...mapGetters('jobs', ['getMyJobList', 'getSelectedJob']),
    ...mapGetters('user', ['getLogin'])
  }  

}
</script>

<style>

</style>