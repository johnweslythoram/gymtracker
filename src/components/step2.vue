<template>
  <div style="background-color: #cccccc8c; min-height: 100vh" class="d-flex flex-column">
    <div class="p-3"> <div> <h2 class="fw-bold">Upload Details</h2> </div> <div class="row pt-3"> <div class="col-6"> <div class="d-inline-block"> <p class="m-0">Personal Details</p> <div style="border-bottom: 5px solid #ccc; border-radius: 5px"></div> </div> </div> <div class="col-6"> <div class="d-inline-block"> <p class="m-0" style="color: #1d61e7">Fitness Profile</p> <div style="border-bottom: 4px solid #1d61e7; border-radius: 5px"></div> </div> </div> </div> </div> <div
    <div
      style="background-color: #fff; border-radius: 20px 20px 0 0"
      class="p-3 d-flex flex-column flex-grow-1"
    >
      <div class="flex-grow-1">
        <h2 class="fw-bold">Enter your Fitness Details</h2>

        <!-- Gender + Weight -->
        <div class="row">
          <div class="col-6">
            <div class="mb-3">
              <label class="form-label">Gender</label>
              <select class="form-select" v-model="gender">
                <option disabled value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <small class="text-danger" v-if="errors.gender">{{ errors.gender }}</small>
            </div>
          </div>

          <div class="col-6">
            <div class="mb-3">
              <label class="form-label">Current Weight (kg)</label>
              <input type="number" class="form-control" v-model="weight" placeholder="Current Weight"/>
              <small class="text-danger" v-if="errors.weight">{{ errors.weight }}</small>
            </div>
          </div>
        </div>

        <!-- Calories -->
        <div class="mb-3">
          <label class="form-label">Estimated Calories</label>
          <input type="number" class="form-control" v-model="calories" />
          <small class="text-danger" v-if="errors.calories">{{ errors.calories }}</small>
        </div>

        <!-- Target Weight -->
        <div class="mb-3">
          <label class="form-label">Target Weight (kg)</label>
          <input type="number" class="form-control" v-model="targetWeight" />
          <small class="text-danger" v-if="errors.targetWeight">{{ errors.targetWeight }}</small>
        </div>

        <!-- Training Frequency -->
        <div class="mb-3">
          <label class="form-label">Training Frequency</label>
          <select class="form-select" v-model="trainingFrequency">
            <option disabled value="">Select Frequency</option>
            <option value="2">2–3 days</option>
            <option value="3">3–4 days</option>
            <option value="4">4–5 days</option>
            <option value="5">5–6 days</option>
          </select>
          <small class="text-danger" v-if="errors.trainingFrequency">
            {{ errors.trainingFrequency }}
          </small>
        </div>
      </div>

      <!-- Submit -->
      <div class="mt-auto">
        <button class="btn w-100" style="background-color: #1d61e7; color: #fff" @click="submit">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FitnessProfile',

  data() {
    return {
      gender: '',
      weight: '',
      calories: '',
      targetWeight: '',
      trainingFrequency: '',

      errors: {
        gender: '',
        weight: '',
        calories: '',
        targetWeight: '',
        trainingFrequency: '',
      },
    }
  },

  methods: {
    validate() {
      this.errors = {
        gender: '',
        weight: '',
        calories: '',
        targetWeight: '',
        trainingFrequency: '',
      }

      let valid = true

      if (!this.gender) {
        this.errors.gender = 'Gender is required'
        valid = false
      }

      if (!this.weight || this.weight <= 0) {
        this.errors.weight = 'Valid weight is required'
        valid = false
      }

      if (!this.calories || this.calories <= 0) {
        this.errors.calories = 'Calories are required'
        valid = false
      }

      if (!this.targetWeight || this.targetWeight <= 0) {
        this.errors.targetWeight = 'Target weight is required'
        valid = false
      }

      if (!this.trainingFrequency) {
        this.errors.trainingFrequency = 'Training frequency is required'
        valid = false
      }

      return valid
    },

    async submit() {
      if (!this.validate()) return
      try{
      const email = localStorage.getItem("TrackerEmail")

      // ✅ FINAL API PAYLOAD
      const payload = {
        email:email,
        gender: this.gender,
        weight: Number(this.weight),
        estimatedCalories: Number(this.calories),
        targetWeight: Number(this.targetWeight),
      }
      const payload1 = {
        user_email:email,
        weekly_goal : Number(this.trainingFrequency)
      }
      console.log(payload,payload1)


      const response = await this.$axios.post('api/tracker/fitnessDetails', payload)

      console.log(response.data)
      console.log(response.data.data)
      console.log(response.data.data[0])
      if(response.data.data[0].currentDiet === null){
        this.$router.push('/weight')
      }
      if(response.data.data[0].currentphaseName === null){
        this.$router.push({
          path: '/weight',
          query: {
            add : true
          }
        })
        return
      }
      if(response.data.data[0].currentDiet === null){
        this.$router.push('/adddiet')
      }
      

      console.log('API Payload:', payload)
    }
    catch(e){

    }

      // Example API call
      // this.$axios.post('/api/fitness', payload)
    },
  },
}
</script>

<style scoped>
.text-danger {
  font-size: 13px;
}
</style>
