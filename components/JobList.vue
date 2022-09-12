<template>
  <main>
    <ul>
      <li v-for="(jobs, i) in this.getJobList" :key="i">
        <h3 style="border: 1px solid black; margin: 10px; padding: 20px">
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
    ...mapGetters('jobs', ['getJobList'])
  }
}
</script>

<style>

</style>