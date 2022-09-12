<template>
  <div class="notif">
    <div class="notif__box">
      <ul class="notif__list">
        <li
          class="notif__list-item is-active"
          v-for="(notif, index) in this.queue"
          :key="index"
        >{{ notif }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("notification", ["getNotification"]),
  },
  data() {
    return {
      queue: [],
      isNotiEnabled: false,
    };
  },

  watch: {
    getNotification: function () {
      if (this.getNotification) {
        this.addQueue(this.getNotification);
        this.setNotification(null);
      }

      if (this.isNotiEnabled == false) {
        let that = this;
        let switchNoti;

        if (this.queue.length > 0) {
          let switchNoti = setInterval(function (test) {
            if (that.queue.length > 0) {
              that.queue.pop();
            } else {
              clearInterval(switchNoti);
              switchNoti = null;
              that.isNotiEnabled = false;
            }
          }, 3000);
          that.isNotiEnabled = false;
        }
        this.isNotiEnabled = true;
      }
    },
  },

  methods: {
    ...mapMutations("notification", ["setNotification"]),

    addQueue(data) {
      this.queue.unshift(data);
    },
  }
}
</script>