<template>
  <div class="loader-overlay" v-if="loading">
    <div class="loader"></div>
  </div>
  <div class="container my-4 diet">
    <h2 class="fw-bold mb-3">{{ dietName }}</h2>

    <div class="mb-3">
      <label class="form-label">Current Phase Name</label>
      <input type="text" class="form-control" v-model="dietName" placeholder="Current Phase Name" />
      <small class="text-danger" v-if="errors">{{ errors }}</small>
    </div>

    <!-- ERROR -->
    <div v-if="formError" ref="errorBox" class="alert alert-danger">
      {{ formError }}
    </div>

    <!-- MEALS -->
    <div class="d-flex gap-2 flex-wrap mb-4">
      <button
        v-for="meal in meals"
        :key="meal"
        class="btn position-relative"
        :class="mealButtonClass(meal)"
        @click="onMealChange(meal)"
      >
        <span class="me-1">{{ mealIcon(meal) }}</span>
        {{ meal }}
      </button>
    </div>

    <!-- DAY TOTAL -->
    <div class="mt-4 p-3 border rounded bg-success text-white">
      <strong>Daily Total:</strong>
      {{ dayTotals.protein }} g protein | {{ dayTotals.calories }} kcal
    </div>

    <!-- FOOD FORM -->
    <div v-if="activeMeal" class="mt-3">
      <h4 class="fw-bold mb-3">
        {{ activeMeal }}
        <span v-if="mealStatus(activeMeal) === 'complete'" class="badge bg-success ms-2">
          Completed
        </span>
        <span v-else-if="mealStatus(activeMeal) === 'partial'" class="badge bg-warning ms-2">
          Incomplete
        </span>
      </h4>

      <div
        v-for="(item, index) in diet[activeMeal]"
        :key="index"
        class="row mb-2 align-items-center"
      >
        <div class="col-4">
          <input
            class="form-control"
            placeholder="Food item"
            v-model="item.name"
            :class="foodClass(item)"
          />
        </div>

        <div class="col-3 ps-0">
          <input
            type="number"
            class="form-control"
            placeholder="Protein (g)"
            v-model.number="item.protein"
            :class="foodClass(item)"
          />
        </div>

        <div class="col-3 ps-0">
          <input
            type="number"
            class="form-control"
            placeholder="Calories"
            v-model.number="item.calories"
            :class="foodClass(item)"
          />
        </div>

        <div class="col-2 ps-0">
          <button class="btn btn-danger w-100" @click="removeFood(activeMeal, index)">✕</button>
        </div>
      </div>

      <!-- ADD FOOD -->
      <button class="btn btn-outline-primary mt-2" @click="addFood(activeMeal)">➕ Add Food</button>

      <!-- MEAL TOTAL -->
      <div class="mt-3 p-2 border rounded bg-light">
        <strong>Meal Total:</strong>
        {{ mealTotals(activeMeal).protein }} g protein | {{ mealTotals(activeMeal).calories }} kcal
      </div>
    </div>

    <!-- SUBMIT -->
    <button class="btn btn-primary mt-4 w-100" @click="addDiet">Add Diet</button>

    <!-- DEBUG -->
  </div>
</template>

<script>
export default {
  name: 'DietPlanner',

  data() {
    return {
      loading: false,
      dietName: '',
      errors: '',
      meals: [
        'Morning',
        'Mid Morning',
        'Afternoon',
        'Pre Workout',
        'Post Workout',
        'Evening Snack',
        'Night',
      ],

      activeMeal: null,
      formError: '',

      diet: {
        Morning: [],
        'Mid Morning': [],
        Afternoon: [],
        'Pre Workout': [],
        'Post Workout': [],
        'Evening Snack': [],
        Night: [],
      },
    }
  },

  computed: {
    dayTotals() {
      let protein = 0
      let calories = 0

      Object.values(this.diet).forEach((meal) => {
        meal.forEach((item) => {
          protein += Number(item.protein) || 0
          calories += Number(item.calories) || 0
        })
      })

      return { protein, calories }
    },
  },

  methods: {
    /* ---------- SCROLL ---------- */
    scrollToError() {
      this.$nextTick(() => {
        if (this.$refs.errorBox) {
          this.$refs.errorBox.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      })
    },

    /* ---------- UI ---------- */
    mealIcon(meal) {
      const status = this.mealStatus(meal)
      if (status === 'complete') return '✅'
      if (status === 'partial') return '⚠️'
      return '⭕'
    },

    /* ---------- VALIDATION ---------- */
    isFoodComplete(item) {
      return item.name && item.protein && item.calories
    },

    foodClass(item) {
      if (!item.name && !item.protein && !item.calories) return ''
      return this.isFoodComplete(item) ? 'is-valid' : 'is-invalid'
    },

    mealStatus(meal) {
      const items = this.diet[meal]
      if (!items.length) return 'empty'

      const completed = items.filter(this.isFoodComplete).length
      return completed === items.length ? 'complete' : 'partial'
    },

    mealButtonClass(meal) {
      if (this.activeMeal === meal) return 'btn-dark'

      const status = this.mealStatus(meal)
      if (status === 'complete') return 'btn-success'
      if (status === 'partial') return 'btn-warning'
      return 'btn-outline-dark'
    },

    hasEmptyFood(meal) {
      return this.diet[meal].some((i) => !this.isFoodComplete(i))
    },

    /* ---------- ACTIONS ---------- */
    onMealChange(meal) {
      if (this.activeMeal && this.hasEmptyFood(this.activeMeal)) {
        this.formError = `Fill or delete incomplete food items in ${this.activeMeal}`
        this.scrollToError()
        return
      }

      this.formError = ''
      this.activeMeal = meal

      if (!this.diet[meal].length) {
        this.addFood(meal)
      }
    },

    addFood(meal) {
      if (this.hasEmptyFood(meal)) {
        this.formError = 'Complete the previous food item first'
        this.scrollToError()
        return
      }

      this.formError = ''
      this.diet[meal].push({
        name: '',
        protein: '',
        calories: '',
      })
    },

    removeFood(meal, index) {
      this.diet[meal].splice(index, 1)
      this.formError = ''
    },

    mealTotals(meal) {
      let protein = 0
      let calories = 0

      this.diet[meal].forEach((item) => {
        protein += Number(item.protein) || 0
        calories += Number(item.calories) || 0
      })

      return { protein, calories }
    },

    async addDiet() {
      const isValid = Object.values(this.diet).every(
        (items) => items.length && items.every(this.isFoodComplete),
      )
      if (!this.dietName) {
        this.formError = 'Enter Phase Name'
        this.scrollToError()
        return
      }
      if (!isValid) {
        this.formError = 'Please complete all meals before submitting'
        this.scrollToError()
        return
      }
      this.loading = true
      this.formError = ''
      console.log('Diet ready to submit', this.diet)
      var params = {
        email: 'johnweslythoram@gmail.com',
        diet_name: 'Bulking diet',
        diet: this.diet,
        is_current: true,
        protein: this.dayTotals.protein,
        calories: this.dayTotals.calories,
        currentDiet: this.dietName,
      }

      const addPhase = await this.$axios.post('api/tracker/addDiet', params)
      console.log(addPhase)
      this.loading = false
      if (this.next) {
        this.$router.push({
          path: `/${this.next}`,
          query: {
            from: true,
          },
        })
      }
      this.$router.push('/diet')
    },
    async getLoggedIndata() {
      const email = localStorage.getItem('TrackerEmail')
      const params = {
        email: email,
      }
      const getLoggedIndata = await this.$axios.post('api/tracker/getLoggedIndata', params)
      console.log(getLoggedIndata.data.data.currentDiet)
      this.height = getLoggedIndata.data.data.height
      this.weight = getLoggedIndata.data.data.weight
      this.target = getLoggedIndata.data.data.targetWeight
      this.current = this.weight
      if (getLoggedIndata.data.data.currentWorkout === null) {
        this.next = 'addworkouts'
      }
      // this.next =
    },
  },

  mounted() {
    this.getLoggedIndata()
    this.activeMeal = this.meals[0]
    this.addFood(this.activeMeal)
  },
}
</script>

<style scoped>
.diet {
  max-width: 900px;
  margin: auto;
}
</style>
