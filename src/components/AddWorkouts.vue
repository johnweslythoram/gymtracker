<template>
  <div class="loader-overlay" v-if="loading">
    <div class="loader"></div>
  </div>
  <div class="container my-4 workout-page">
    <h2 class="fw-bold mb-3">Workout Planner</h2>

    <div class="mb-3">
      <label class="form-label">Current Workout Name</label>
      <input
        type="text"
        class="form-control"
        v-model="workoutName"
        placeholder="Current Workout Name"
        :class="{ 'is-invalid': !workoutName && formError }"
      />
      <!-- <small class="text-danger" v-if="errors">{{ errors }}</small> -->
    </div>

    <!-- WORKOUT MODEL -->
    <div class="mb-3">
      <label class="fw-bold">Workout Model (optional)</label>
      <select class="form-select" v-model="selectedModel" @change="onModelChange">
        <option value="">Select Workout Model</option>
        <option v-for="(model, key) in WORKOUT_MODELS" :key="key" :value="key">
          {{ model.name }}
        </option>
      </select>
    </div>

    <!-- ERROR -->
    <div v-if="formError" ref="errorBox" class="alert alert-danger">
      {{ formError }}
    </div>

    <!-- WORKOUTS LIST -->
    <div class="mb-3">
      <label class="fw-bold">Workouts</label>
      <div class="d-flex gap-2 flex-wrap mb-2">
        <button
          v-for="(w, index) in workouts"
          :key="index"
          class="btn"
          :class="workoutButtonClass(w)"
          @click="switchWorkout(index)"
        >
          {{ workoutIcon(w) }} {{ w.name || 'Unnamed' }}
        </button>
        <button class="btn btn-outline-primary" @click="addWorkout">➕ Add Workout</button>
      </div>
    </div>

    <!-- ACTIVE WORKOUT -->
    <div v-if="activeWorkout">
      <input
        class="form-control mb-2"
        placeholder="Workout name (user-defined)"
        v-model="activeWorkout.name"
        :class="{ 'is-invalid': !activeWorkout.name && formError }"
      />

      <!-- EXERCISES -->
      <div
        v-for="(exercise, index) in activeWorkout.exercises"
        :key="index"
        class="row mb-2 align-items-center"
      >
        <div class="col-10 position-relative">
          <input
            type="text"
            class="form-control"
            v-model="exercise.name"
            placeholder="Select or type exercise"
            :class="{ 'is-invalid': !exercise.name && formError }"
            @focus="openDropdown(index)"
            @input="filterExercises(exercise.name, index)"
            @blur="closeDropdown"
          />

          <ul
            v-if="dropdownIndex === index && filteredExercises.length"
            class="dropdown-menu show w-100"
            style="max-height: 200px; overflow-y: auto"
          >
            <li v-for="option in filteredExercises" :key="option">
              <button
                class="dropdown-item"
                type="button"
                @mousedown.prevent="selectExercise(option, index)"
              >
                {{ option }}
              </button>
            </li>
          </ul>
        </div>
        <div class="col-2 ps-0">
          <button class="btn btn-danger w-100" @click="removeExercise(index)">✕</button>
        </div>
      </div>

      <button class="btn btn-outline-primary mt-2" @click="addExercise">➕ Add Exercise</button>
    </div>

    <!-- SUBMIT -->
    <button class="btn btn-primary mt-4 w-100" @click="submitWorkouts">Submit Workouts</button>

    <!-- DEBUG -->
    <pre class="mt-4 bg-light p-2 rounded">{{ workouts }}</pre>
  </div>
</template>

<script>
const WORKOUT_MODELS = {
  PPL: { name: 'Push Pull Legs', exercises: ['Push', 'Pull', 'Legs'] },
  UPPER_LOWER: { name: 'Upper Lower', exercises: ['Upper', 'Lower'] },
  FULL_BODY: { name: 'Full Body', exercises: ['Full Body'] },
  BRO_SPLIT: { name: 'Bro Split', exercises: ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs'] },
}

const ALL_EXERCISES = [
  'Bench Press',
  'Incline Bench Press',
  'Pull Ups',
  'Lat Pulldown',
  'Barbell Row',
  'Deadlift',
  'Overhead Press',
  'Lateral Raise',
  'Bicep Curl',
  'Tricep Pushdown',
  'Squat',
  'Leg Press',
  'Calf Raise',
]

export default {
  name: 'WorkoutPlanner',
  data() {
    return {
      loading: false,
      workoutName: '',
      WORKOUT_MODELS,
      ALL_EXERCISES,
      selectedModel: '',
      workouts: [],
      activeWorkoutIndex: null,
      dropdownIndex: null,
      filteredExercises: [],
      formError: '',
    }
  },
  computed: {
    activeWorkout() {
      return this.workouts[this.activeWorkoutIndex] || null
    },
    usedExercises() {
      return new Set(this.activeWorkout?.exercises.map((e) => e.name).filter(Boolean))
    },
  },
  methods: {
    scrollToError() {
      this.$nextTick(() => this.$refs.errorBox?.scrollIntoView({ behavior: 'smooth' }))
    },
    workoutIcon(workout) {
      if (!workout.exercises.length) return '⭕'
      if (workout.name && workout.exercises.every((e) => e.name)) return '✅'
      return '⚠️'
    },
    workoutButtonClass(workout) {
      if (this.activeWorkout === workout) return 'btn-dark'
      const icon = this.workoutIcon(workout)
      if (icon === '✅') return 'btn-success'
      if (icon === '⚠️') return 'btn-warning'
      return 'btn-outline-dark'
    },
    addWorkout() {
      this.workouts.push({ name: '', exercises: [] })
      this.activeWorkoutIndex = this.workouts.length - 1
    },
    addExercise() {
      if (!this.activeWorkout) return
      if (this.activeWorkout.exercises.some((e) => !e.name)) {
        this.formError = 'Complete previous exercise first'
        this.scrollToError()
        return
      }
      this.formError = ''
      this.activeWorkout.exercises.push({ name: '' })
    },
    removeExercise(index) {
      this.activeWorkout.exercises.splice(index, 1)
    },
    openDropdown(index) {
      const current = this.activeWorkout.exercises[index].name
      this.dropdownIndex = index
      this.filteredExercises = this.ALL_EXERCISES.filter(
        (ex) => !this.usedExercises.has(ex) || ex === current,
      )
    },
    filterExercises(value, index) {
      const v = value.toLowerCase()
      const current = this.activeWorkout.exercises[index].name
      this.dropdownIndex = index
      this.filteredExercises = this.ALL_EXERCISES.filter(
        (ex) => ex.toLowerCase().includes(v) && (!this.usedExercises.has(ex) || ex === current),
      )
    },
    closeDropdown() {
      setTimeout(() => {
        this.dropdownIndex = null
      }, 150)
    },
    selectExercise(option, index) {
      this.activeWorkout.exercises[index].name = option
      this.dropdownIndex = null
    },
    switchWorkout(index) {
      if (this.activeWorkout && !this.workoutComplete(this.activeWorkout)) {
        this.formError = 'Complete current workout before switching'
        this.scrollToError()
        return
      }
      this.formError = ''
      this.activeWorkoutIndex = index
    },
    workoutComplete(workout) {
      return workout.name && workout.exercises.length && workout.exercises.every((e) => e.name)
    },
    async submitWorkouts() {
      const incomplete = this.workouts.find((w) => !this.workoutComplete(w))
      if (!this.workoutName) {
        this.formError = 'Please enter Wokout Name'
        this.scrollToError()
        return
      }
      if (incomplete) {
        this.formError = 'Please complete all workouts before submitting'
        this.scrollToError()
        return
      }
      this.formError = ''
      this.loading = true
      const email = localStorage.getItem('TrackerEmail')
      const payload = {
        email: email,
        workout_name: this.workoutName,
        workouts: this.workouts,
      }

      console.log('All workouts ready to submit', payload)
      const addPhase = await this.$axios.post('api/tracker/addWorkout', payload)
      if (this.$route.query.from) {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/workout')
      }
    },
    onModelChange() {
      if (!this.selectedModel) return
      const model = this.WORKOUT_MODELS[this.selectedModel]
      this.workouts = model.exercises.map((e) => ({ name: e, exercises: [] }))
      this.activeWorkoutIndex = 0
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
    this.addWorkout()
  },
}
</script>

<style scoped>
.workout-page {
  max-width: 900px;
  margin: auto;
}
</style>
