<template>
  <div class="loader-overlay" v-if="loading">
    <div class="loader"></div>
  </div>
  <div class="m-2">
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="fw-bolder m-0">{{ workoutname }}</h1>
      <p
        class="btn btn-warning m-0"
        v-if="workoutname !== currentWorkout"
        @click="MarkAscurrentWorkout(workoutname)"
      >
        Mark as current
      </p>
    </div>
    <div class="mt-3">
      <div
        v-for="workout in workout"
        style="border: 1px solid black; border-radius: 10px; padding: 10px"
      >
        <h3 class="fw-bolder">{{ workout.name }}</h3>
        <ol class="m-0">
          <li v-for="(value, index) in workout.exercises" :key="index" class="m-0 p-0">
            {{ value.name }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      workout: null,
      currentWorkout: null,
      workoutname: null,
      loading: true,
    }
  },
  async mounted() {
    await this.getLoggedIndata()
    await this.getSingleWorkout(this.$route.query.id)
    this.loading = false
  },
  methods: {
    async MarkAscurrentWorkout(name) {
      this.loading = true
      const email = localStorage.getItem('TrackerEmail')
      const params = {
        email: email,
        currentWorkout: name,
      }
      const dailyReports = await this.$axios.post('api/tracker/updateWorkoutName', params)
      console.log(dailyReports.data)
      if (dailyReports.data) {
        await this.getLoggedIndata()
        await this.getSingleWorkout(this.$route.query.id)
      }
      this.loading = false
    },
    async getSingleWorkout(id) {
      const email = localStorage.getItem('TrackerEmail')
      const params = {
        email: email,
        id: id,
      }
      const dailyReports = await this.$axios.post('api/tracker/getSingleWorkout', params)
      console.log(dailyReports.data.diets[0])
      this.workout = dailyReports.data.diets[0].workouts
      this.workoutname = dailyReports.data.diets[0].workout_name
    },
    async getLoggedIndata() {
      const email = localStorage.getItem('TrackerEmail')
      const params = {
        email: email,
      }
      const getLoggedIndata = await this.$axios.post('api/tracker/getLoggedIndata', params)
      console.log(getLoggedIndata.data.data)
      this.currentWorkout = getLoggedIndata.data.data.currentWorkout
    },
  },
}
</script>
