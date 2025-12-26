<template>
  <div class="loader-overlay" v-if="loading">
    <div class="loader"></div>
  </div>
  <div class="m-2">
    <div class="border-bottom d-flex justify-content-between align-items-center">
      <h1 class="fw-bolder">My Diets</h1>
      <p class="btn btn-warning" @click="$router.push('/addDiet')">Add Diet</p>
    </div>
    <div>
      <h3 class="fw-bolder text-danger mt-3">Current Diet</h3>
    </div>
    <div
      class="border"
      style="padding: 10px; border-radius: 10px"
      v-if="current"
      @click="gotoSingleDiet(current[0].id)"
    >
      <h5>{{ current[0].diet_name }}</h5>
      <p class="text-primary m-0">
        {{ current[0].calories }} calories & {{ current[0].protien }}g protien
      </p>
    </div>
    <div>
      <h3 class="fw-bolder text-danger mt-3">Other Diets</h3>
    </div>
    <div
      class="border mt-2"
      style="padding: 10px; border-radius: 10px"
      v-for="value in others"
      @click="gotoSingleDiet(value.id)"
    >
      <h5>{{ value.diet_name }}</h5>
      <p class="text-primary m-0">{{ value.calories }} calories & {{ value.protien }}g protien</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      currentDiet: null,
      current: null,
      others: null,
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
      const dailyReports = await this.$axios.post('api/tracker/getAllDiets', params)
      console.log(dailyReports.data.diets)
      this.current = dailyReports.data.diets.filter((item) => item.diet_name === this.currentDiet)
      //   console.log('sfsdgfsdgdgds', current)
      this.others = dailyReports.data.diets.filter((item) => item.diet_name !== this.currentDiet)
      //   console.log('sfsdgfsdgdgds', others) q
    },
    async getLoggedIndata() {
      const email = localStorage.getItem('TrackerEmail')
      const params = {
        email: email,
      }
      const getLoggedIndata = await this.$axios.post('api/tracker/getLoggedIndata', params)
      console.log(getLoggedIndata.data.data)
      this.currentDiet = getLoggedIndata.data.data.currentDiet
    },
    gotoSingleDiet(id) {
      this.$router.push({
        path: '/indvidualDiet',
        query: {
          id: id,
        },
      })
    },
  },
}
</script>
