<template>
  <main>
    <Job/>
  </main>
</template>

<script>
import Job from '../../components/Job.vue';
import { mapMutations } from 'vuex'

export default {
    components: { Job },
    middleware: 'selectedJob',

    methods: {
    ...mapMutations('jobs', ['setSelectedJob'])
    },

    beforeRouteLeave: function(to, from, next) {
      this.setSelectedJob([]);
    next();
  }
}
</script>
