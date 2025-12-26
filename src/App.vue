<template>
  <div class="pagemain">
    <div class="contentmain">
      <router-view></router-view>
    </div>

    <div class="d-flex justify-content-around border events p-3 m-2" v-if="display">
      <div class="" @click="GoTo('/dashboard')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-house"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"
          />
        </svg>
        <div class="mt-2" style="border: 1.5px solid black" v-if="isActive('/')"></div>
      </div>
      <div class="" @click="GoTo('diet')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-fork-knife"
          viewBox="0 0 16 16"
        >
          <path
            d="M13 .5c0-.276-.226-.506-.498-.465-1.703.257-2.94 2.012-3 8.462a.5.5 0 0 0 .498.5c.56.01 1 .13 1 1.003v5.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5zM4.25 0a.25.25 0 0 1 .25.25v5.122a.128.128 0 0 0 .256.006l.233-5.14A.25.25 0 0 1 5.24 0h.522a.25.25 0 0 1 .25.238l.233 5.14a.128.128 0 0 0 .256-.006V.25A.25.25 0 0 1 6.75 0h.29a.5.5 0 0 1 .498.458l.423 5.07a1.69 1.69 0 0 1-1.059 1.711l-.053.022a.92.92 0 0 0-.58.884L6.47 15a.971.971 0 1 1-1.942 0l.202-6.855a.92.92 0 0 0-.58-.884l-.053-.022a1.69 1.69 0 0 1-1.059-1.712L3.462.458A.5.5 0 0 1 3.96 0z"
          />
        </svg>
        <div class="mt-2" style="border: 1.5px solid black" v-if="isActive('diet')"></div>
      </div>
      <div class="" @click="GoTo('weight')">
        <div>
          <img src="../src/assets/icons8-scale-50.png" alt="" width="24" height="24" />
        </div>
      </div>
      <div class="" @click="GoTo('workout')">
        <div>
          <img src="../src/assets/icons8-workout-50.png" alt="" width="24" height="24" />
        </div>
      </div>
      <div class="" @click="GoTo('measurements')">
        <div>
          <img src="../src/assets/icons8-body-24.png" alt="" width="24" height="24" />
        </div>
      </div>
      <div class="" @click="GoTo('profile')">
        <div>
          <img src="../src/assets/icons8-profile-50.png" alt="" width="24" height="24" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleBodyMeasurements from './components/SingleBodyMeasurements.vue'
import HomeView from './views/HomeView.vue'
import Bodymeasurements from './components/Bodymeasurements.vue'
import AddDiet from './components/AddDiet.vue'
import WeightNote from './components/WeightNote.vue'
import WeightCom from './components/WeightCom.vue'
import indvidualDiet from './components/indvidualDiet.vue'
import AddWorkouts from './components/AddWorkouts.vue'
export default {
  components: {
    SingleBodyMeasurements,
    AddWorkouts,
    Bodymeasurements,
    HomeView,
    WeightCom,
    WeightNote,
    AddDiet,
    indvidualDiet,
  },
  data() {
    return {
      display: true,
      steps: 5863,
      goal: 8000,
      days: 142,
      week: [
        { name: 'Mon', done: true },
        { name: 'Tue', done: true },
        { name: 'Wed', done: true },
        { name: 'Thu', done: false },
        { name: 'Fri', done: false },
        { name: 'Sat', done: false },
        { name: 'Sun', done: false },
      ],
      current: 5000,
      target: 8000,
      size: 120,
      stroke: 12,
    }
  },
  mounted() {
    console.log(this.$route.path)
    if (this.$route.path === '/signup' || this.$route.path === '/') {
      this.display = false
    }
    console.log(this.display)
  },
  computed: {
    progress() {
      return Math.min((this.steps / this.goal) * 100, 100)
    },
    percent() {
      return Math.min(Math.round((this.current / this.target) * 100), 100)
    },
    radius() {
      return (this.size - this.stroke) / 2
    },
    center() {
      return this.size / 2
    },
    circumference() {
      return 2 * Math.PI * this.radius
    },
    dashOffset() {
      return this.circumference * (1 - this.percent / 100)
    },
  },
  methods: {
    GoTo(path) {
      if (this.$route.path !== path) {
        this.$router.push(path)
      }
    },

    isActive(path) {
      return false
    },
  },
}
</script>

<style>
.pagemain {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.contentmain {
  flex: 1; /* pushes footer to bottom when content is small */
}

.events {
  position: sticky;
  /* top: 0; */
  /* bottom: 150px; */
  bottom: 12px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(10px); /* Safari */
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
.loader-overlay {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.4); /* light background */
  backdrop-filter: blur(5px); /* blur effect */
  -webkit-backdrop-filter: blur(5px); /* Safari */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader {
  width: 30px;
  height: 30px;
  border: 5px solid #ddd;
  border-top: 5px solid black;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
