<template>
  <div style="background-color: #cccccc8c; min-height: 100vh" class="d-flex flex-column">
    <div class="p-3">
      <div><h2 class="fw-bold">Upload Details</h2></div>
      <div class="row pt-3">
        <div class="col-6">
          <div class="d-inline-block">
            <p class="m-0" style="color: #1d61e7">Personal Details</p>
            <div style="border-bottom: 5px solid #1d61e7; border-radius: 5px"></div>
          </div>
        </div>
        <div class="col-6">
          <div class="d-inline-block">
            <p class="m-0">Fitness Profile</p>
            <div style="border-bottom: 4px solid #ccc; border-radius: 5px"></div>
          </div>
        </div>
      </div>
    </div>
    <div
      style="background-color: #fff; border-radius: 20px 20px 0 0"
      class="p-3 d-flex flex-column flex-grow-1"
    >
      <div class="flex-grow-1">
        <h2 class="fw-bold">Enter your Details</h2>

        <!-- Name -->
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input type="text" class="form-control" v-model="name" />
          <small class="text-danger" v-if="errors.name">{{ errors.name }}</small>
        </div>

        <!-- Age -->
        <div class="mb-3">
          <label class="form-label">Age</label>
          <input type="number" class="form-control" v-model="age" />
          <small class="text-danger" v-if="errors.age">{{ errors.age }}</small>
        </div>

        <!-- Height Type -->
        <div class="mb-3">
          <label class="form-label">Height Type</label>
          <select class="form-select" v-model="heightType">
            <option disabled value="">Select</option>
            <option value="Ft">Ft</option>
            <option value="Cm">Cm</option>
          </select>
          <small class="text-danger" v-if="errors.heightType">{{ errors.heightType }}</small>
        </div>

        <!-- Height Ft -->
        <div class="mb-3" v-if="heightType === 'Ft'">
          <label class="form-label">Height (ft.in)</label>
          <select class="form-select" v-model="heightFtValue">
            <option disabled value="">Select height</option>
            <option v-for="h in heightOptions" :key="h" :value="h">
              {{ h }}
            </option>
          </select>
          <small class="text-danger" v-if="errors.height">{{ errors.height }}</small>
        </div>

        <!-- Height Cm -->
        <div class="mb-3" v-if="heightType === 'Cm'">
          <label class="form-label">Height (cm)</label>
          <select class="form-select" v-model="heightCmValue">
            <option disabled value="">Select height</option>
            <option v-for="cm in cmRange" :key="cm" :value="cm">{{ cm }} cm</option>
          </select>
          <small class="text-danger" v-if="errors.height">{{ errors.height }}</small>
        </div>
      </div>

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
  data() {
    return {
      name: '',
      age: '',
      heightType: '',
      heightFtValue: '',
      heightCmValue: '',

      errors: {
        name: '',
        age: '',
        heightType: '',
        height: '',
      },
    }
  },

  computed: {
    cmRange() {
      return Array.from({ length: 121 }, (_, i) => i + 90)
    },
    heightOptions() {
      const list = []
      for (let ft = 3; ft <= 8; ft++) {
        for (let inch = 0; inch <= 11; inch++) {
          list.push(`${ft}.${inch.toString().padStart(2, '0')}`)
        }
      }
      return list
    },
  },

  methods: {
    validate() {
      this.errors = {
        name: '',
        age: '',
        heightType: '',
        height: '',
      }

      let valid = true

      if (!this.name) {
        this.errors.name = 'Name is required'
        valid = false
      }

      if (!this.age || this.age < 1) {
        this.errors.age = 'Valid age is required'
        valid = false
      }

      if (!this.heightType) {
        this.errors.heightType = 'Height type is required'
        valid = false
      }

      if (this.heightType === 'Ft' && !this.heightFtValue) {
        this.errors.height = 'Height in feet is required'
        valid = false
      }

      if (this.heightType === 'Cm' && !this.heightCmValue) {
        this.errors.height = 'Height in cm is required'
        valid = false
      }

      return valid
    },

    // 🔁 Ft → Cm conversion
    convertFtToCm(value) {
      const [ft, inch] = value.split('.')
      const totalInches = Number(ft) * 12 + Number(inch)
      return Math.round(totalInches * 2.54)
    },

    async submit() {
      if (!this.validate()) return

      try {
        let heightInCm = null

        if (this.heightType === 'Ft') {
          heightInCm = this.convertFtToCm(this.heightFtValue)
        } else {
          heightInCm = this.heightCmValue
        }

        var email = localStorage.getItem('TrackerEmail')
        // ✅ FINAL API PAYLOAD
        const payload = {
          email: email,
          name: this.name,
          age: this.age,
          height: heightInCm,
        }

        const response = await this.$axios.post('api/tracker/personalDetails', payload)
        console.log(response.data.exists)
        if (response.data.exists) {
          this.$router.push('/fitnessdetails')
        }
      } catch (e) {}

      // Example API call
      // this.$axios.post('/api/profile', payload)
    },
  },
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f8f9fa;
}

.login-card {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
}
</style>
