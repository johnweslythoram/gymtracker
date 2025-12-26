<template>
  <div class="loader-overlay" v-if="loading">
    <div class="loader"></div>
  </div>
  <div class="m-2">
    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
      <h1 class="fw-bolder m-0">{{ currentDiet }}</h1>
      <p
        class="m-0 btn btn-warning"
        v-if="currentDiet !== actualDiet"
        @click="markAsCurrent(currentDiet)"
      >
        Mark as Current
      </p>
    </div>

    <div v-for="(items, meal, idx) in dummy.diet" :key="meal" class="mt-3">
      <div v-if="items.length" class="p-2" :class="idx % 2 === 0 ? 'whiteclass' : 'blackclass'">
        <h3 class="m-0 fw-bolder">{{ meal }}</h3>

        <ul class="m-0 ps-3">
          <li v-for="item in items" :key="item.name">
            {{ item.name }}
          </li>
        </ul>

        <div
          class="d-inline-block mt-2"
          :class="idx % 2 === 0 ? 'caloriesprotien' : 'caloriesprotien1'"
        >
          🔥 {{ totals(items).calories }} kcal | 💪 {{ totals(items).protein }} g protein
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.getLoggedIndata()
    await this.getSingleDiets()
    this.loading = false
  },
  data() {
    return {
      loading: true,
      dummy: {},
      currentDiet: null,
      actualDiet: null,
    }
  },

  methods: {
    async markAsCurrent(name) {
      this.loading = true
      const email = localStorage.getItem('TrackerEmail')
      const params = {
        email: email,
        currentDiet: name,
      }
      const getLoggedIndata = await this.$axios.post('api/tracker/updateDietName', params)
      if (getLoggedIndata.data) {
        await this.getLoggedIndata()
        await this.getSingleDiets()
      }
      this.loading = false
    },
    async getSingleDiets() {
      const id = this.$route.query.id
      const email = localStorage.getItem('TrackerEmail')
      const params = {
        email: email,
        id: id,
      }
      const getLoggedIndata = await this.$axios.post('api/tracker/getSingleDiets', params)
      console.log()
      this.currentDiet = getLoggedIndata.data.diets[0].diet_name
      this.dummy = getLoggedIndata.data.diets[0]
      // this.currentDiet = getLoggedIndata.data.data
    },
    async getLoggedIndata() {
      const email = localStorage.getItem('TrackerEmail')
      const params = {
        email: email,
      }
      const getLoggedIndata = await this.$axios.post('api/tracker/getLoggedIndata', params)
      console.log(getLoggedIndata.data.data)
      this.actualDiet = getLoggedIndata.data.data.currentDiet
    },
    totals(items) {
      return items.reduce(
        (acc, item) => {
          acc.protein += Number(item.protein) || 0
          acc.calories += Number(item.calories) || 0
          return acc
        },
        { protein: 0, calories: 0 },
      )
    },
  },
}
</script>

<style>
.whiteclass {
  border: 1px solid #000;
  border-radius: 10px;
}

.blackclass {
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #000;
  color: #fff;
}

.caloriesprotien {
  background-color: #ccc;
  border-radius: 10px;
  padding: 4px 8px;
}

.caloriesprotien1 {
  background-color: rgba(204, 204, 204, 0.2);
  border-radius: 10px;
  padding: 4px 8px;
}
</style>
