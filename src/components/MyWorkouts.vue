<template>
  <div class="loader-overlay" v-if="loading">
    <div class="loader"></div>
  </div>
  <div class="m-2">
    <div class="d-flex justify-content-between align-items-center border-bottom">
      <h1 class="fw-bolder">My Workouts</h1>
      <p class="btn btn-warning" @click="$router.push('/addworkouts')">Add Workout</p>
    </div>
    <div>
      <h3 class="fw-bolder text-danger mt-3">Current Workout</h3>
    </div>
    <div
      class="border"
      style="padding: 10px; border-radius: 10px"
      v-if="current"
      @click="gotoSingleDiet(current[0].id)"
    >
      <h5>{{ current[0].workout_name }}</h5>
    </div>
    <div>
      <h3 class="fw-bolder text-danger mt-3">Other Workouts</h3>
    </div>
    <div
      class="border mt-2"
      style="padding: 10px; border-radius: 10px"
      v-for="value in others"
      @click="gotoSingleDiet(value.id)"
    >
      <h5>{{ value.workout_name }}</h5>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentDiet: null,
      current: null,
      others: null,
      loading: true,
    }
  },
  async mounted() {
    await this.getLoggedIndata()
    await this.getAllDiets()
    this.loading = false
  },
  methods: {
    async getAllDiets() {
      const email = localStorage.getItem('TrackerEmail')
      const params = {
        email: email,
      }
      const dailyReports = await this.$axios.post('api/tracker/getAllWorkouts', params)
      console.log(dailyReports.data.diets)
      this.current = dailyReports.data.diets.filter(
        (item) => item.workout_name === this.currentDiet,
      )
      console.log('sfsdgfsdgdgds', this.current)
      this.others = dailyReports.data.diets.filter((item) => item.workout_name !== this.currentDiet)
      console.log('sfsdgfsdgdgds', this.others)
    },
    async getLoggedIndata() {
      const email = localStorage.getItem('TrackerEmail')
      const params = {
        email: email,
      }
      const getLoggedIndata = await this.$axios.post('api/tracker/getLoggedIndata', params)
      console.log(getLoggedIndata.data.data)
      this.currentDiet = getLoggedIndata.data.data.currentWorkout
      console.log(this.currentDiet)
    },
    gotoSingleDiet(id) {
      this.$router.push({
        path: '/IndividualWorkout',
        query: {
          id: id,
        },
      })
    },
  },
}
</script>
