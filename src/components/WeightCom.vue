<template>
  <div>
    <div class="loader-overlay" v-if="loading">
      <div class="loader"></div>
    </div>
    <div class="m-2" v-if="addPhase">
      <h1 class="text-center fw-bolder">All Weights</h1>
    </div>
    <div class="row m-1 mt-3" v-if="addPhase">
      <div class="col-12">
        <select class="form-select" v-model="Cgoal" required>
          <option disabled value="">Bulking,Cutting,Weight loss....</option>
          <option v-for="value in phases" :value="value">{{ value }}</option>
        </select>
      </div>
      <div class="col-12 mt-3" @click="phase()">
        <p class="btn w-100" style="background-color: #0f1324; color: #fff">Add phase</p>
      </div>
    </div>

    <div v-if="addPhase">
      <HomeView :bmi="bmi"></HomeView>
    </div>
    <div class="m-2 d-flex justify-content-between fw-bolder" v-if="addPhase">
      <h4>Target : {{ target }}</h4>
      <h4>Current : {{ current }}</h4>
    </div>
    <div class="m-2" v-if="addPhase">
      <h2 class="fw-bolder">History</h2>
      <div style="max-height: 250px; overflow: scroll">
        <div v-for="value in weightsHistory" class="mt-2">
          <div
            style="background: #0f1324; color: white; border-radius: 10px"
            class="d-flex justify-content-between align-items-center pt-2 pb-2 ps-3 pe-3"
          >
            <div class="">
              <h6 class="">{{ value.date }}</h6>
              <div class="d-flex">
                <div class="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="red"
                    class="bi bi-arrow-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
                    />
                  </svg>
                </div>
                <h4 style="color: red" class="m-0">
                  {{ Math.abs((value.weight - value.previous_weight).toFixed(1)) }}
                  <span style="font-size: 12px">from {{ value.previous_weight }}</span>
                </h4>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <h1>{{ value.weight }}</h1>
              Kg
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weightEnter text-center" v-if="addPhase" @click="gotToAddWeight()">
      <p class="btn fw-bolder" style="border-radius: 10px; background-color: #ccc; width: 200px">
        Enter Weight
      </p>
    </div>
    <div v-if="!addPhase" class="m-2 mt-5">
      <div>
        <h1>Enter all Details</h1>
      </div>
      <div class="mb-3">
        <label class="form-label">Current Weight</label>
        <input
          type="text"
          class="form-control"
          placeholder="Current Weight"
          v-model="TodayWeight"
          :disabled="todayDetails"
        />
        <small class="mt-2 text-primary" v-if="todayDetails && !errors.weight"
          >Logged as Today weight</small
        >
        <small class="text-danger" v-if="errors.weight">
          {{ errors.weight }}
        </small>
      </div>
      <div class="mb-3">
        <label class="form-label">Current Goal</label>
        <select class="form-select" v-model="phaseChnage" required>
          <option disabled value="">Bulking,Cutting,Weight loss....</option>
          <option value="bulking">Bulking(Gain muscle & weight)</option>
          <option value="cutting">Cutting(Fat loss)</option>
          <option value="weight_loss">Weight Loss((Lose fat, gain muscle))</option>
          <option value="recomp">Body Recomposition(Fat loss while maintaining muscle)</option>
        </select>
        <small class="text-danger" v-if="errors.goal">
          {{ errors.goal }}
        </small>
      </div>
      <div class="mb-3">
        <label class="form-label">Goal Name(Your Choice)</label>
        <input
          type="text"
          class="form-control"
          placeholder="Goal Name(Your Choice)"
          v-model="currentnewPhasename"
        />
        <small class="text-danger" v-if="errors.currentnewPhasename">
          {{ errors.currentnewPhasename }}
        </small>
      </div>
      <div class="mb-3">
        <label class="form-label">Targeted Weight</label>
        <input type="text" class="form-control" placeholder="Target Weight" v-model="TWeight" />
        <small class="text-danger" v-if="errors.Tweight">
          {{ errors.Tweight }}
        </small>
      </div>
      <div class="d-flex jutify-content-between">
        <p class="m-0 btn btn-danger me-2 w-100" @click="cancel()">Cancel</p>
        <p class="m-0 btn btn-primary w-100" @click="addPhaseDetails()">Add</p>
      </div>
    </div>
  </div>
</template>
<script>
import HomeView from '@/views/HomeView.vue'
import Swal from 'sweetalert2'
export default {
  components: {
    HomeView,
  },
  data() {
    return {
      loading: true,
      next: null,
      currentnewPhasename: null,
      phases: null,
      Cgoal: '',
      height: null,
      weight: null,
      weightHistory: null,
      addPhase: true,
      phaseChnage: '',
      TWeight: null,
      TodayWeight: null,
      cuurentPhaseofDiet: null,
      errors: {
        goal: '',
        weight: '',
        Tweight: '',
        currentnewPhasename: '',
      },
      todayDetails: null,
    }
  },
  computed: {
    // TodayWeight(){
    //   if(this.todayDetails){
    //     return  this.todayDetails.previous_weight
    //   }
    //   else{
    //     return ""
    //   }
    // }
    bmi() {
      if (!this.weight || !this.height) return null

      const heightInMeters = this.height / 100
      const bmiValue = this.weight / (heightInMeters * heightInMeters)

      return bmiValue.toFixed(2)
    },
    weightsHistory() {
      if (!this.weightHistory) {
        return []
      }
      return this.weightHistory.filter((item) => this.Cgoal === item.actual_phase)
    },
  },
  methods: {
    gotToAddWeight() {
      if (!this.cuurentPhaseofDiet) {
        Swal.fire({
          title: 'Add Phase',
          text: 'This will help you to trck weight!',
          icon: 'warning',
        })
        return
      }
      localStorage.setItem('currentphase', this.cuurentPhaseofDiet)
      localStorage.setItem('currentWeight', this.current)
      this.$router.push('/addweight')
    },
    cancel() {
      this.errors.goal = ''
      this.errors.weight = ''
      this.errors.Tweight = ''
      this.TWeight = ''
      this.phaseChnage = ''
      this.addPhase = true
    },
    async addPhaseDetails() {
      const validate = this.validateForm()
      if (validate) {
        this.loading = true
        const email = localStorage.getItem('TrackerEmail')
        var params = {
          email: email,
          phase: this.currentnewPhasename,
          weight: this.TodayWeight,
        }

        const addPhase = await this.$axios.post('api/tracker/addPhase', params)
        if (this.next) {
          this.$router.push(`/${this.next}`)
        }
        this.addPhase = true
        await this.getLoggedIndata()
        await this.getWeightDetails()
        this.loading= false
        console.log(addPhase)
      }
    },
    validateForm() {
      this.errors.goal = ''
      this.errors.weight = ''
      this.errors.Tweight = ''

      // Required goal
      if (!this.phaseChnage) {
        this.errors.goal = 'Please select your goal'
        return false
      }

      if (!this.TodayWeight) {
        this.errors.weight = 'Please enter current weight'
        return false
      }
      if (!this.currentnewPhasename) {
        this.errors.currentnewPhasename = 'Please enter current phase Title'
        return false
      }
      if (!this.TWeight) {
        this.errors.Tweight = 'Please enter target weight'
        return false
      }

      const diff = this.TWeight - this.TodayWeight

      switch (this.phaseChnage) {
        case 'bulking':
          if (diff <= 0) {
            this.errors.Tweight = 'For bulking, target weight must be greater than current weight'
            return false
          }
          break

        case 'cutting':
        case 'weight_loss':
          if (diff >= 0) {
            this.errors.Tweight = 'For fat loss, target weight must be less than current weight'
            return false
          }
          break

        case 'recomp':
          if (Math.abs(diff) > 2) {
            this.errors.Tweight = 'For body recomposition, target weight should be within ±2 kg'
            return false
          }
          break
      }

      return true
    },
    async getWeightDetails() {
      const email = localStorage.getItem('TrackerEmail')
      const params = {
        email: email,
      }
      const getWeightDetails = await this.$axios.post('api/tracker/getWeightDetails', params)
      this.weightHistory = getWeightDetails.data.data
      console.log(this.weightHistory, 'afsfafsafasf')
      if (this.weightHistory.length === 0) {
        this.cuurentPhaseofDiet = null
      }
      const filteredData = getWeightDetails.data.data.filter(
        (item) => item.phase === item.actual_phase,
      )
      if (getWeightDetails.data.data.length > 0) {
        this.Cgoal = getWeightDetails.data.data[0].phase
        this.cuurentPhaseofDiet = this.Cgoal

        const phases = getWeightDetails.data.data.map((item) => item.actual_phase)
        const today = new Date().toLocaleDateString('en-CA', {
          timeZone: 'Asia/Kolkata',
        })
        this.todayDetails = getWeightDetails.data.data.filter((item) => item.date === today)

        console.log('asdsafsafafa', this.todayDetails)
        if (this.todayDetails.length > 0) {
          this.TodayWeight = this.todayDetails[0].previous_weight
        }

        console.log(new Set(phases))
        phases: (null, (this.phases = new Set(phases)))
        console.log(filteredData)
      }
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
      if (getLoggedIndata.data.data.currentDiet === null) {
        this.next = 'addDiet'
      } else if (getLoggedIndata.data.data.currentWorkout === null) {
        this.next = 'addworkouts'
      }
      // this.next =
    },
    phase() {
      this.addPhase = false
    },
  },
  async mounted() {
    if (this.$route.query.add) {
      this.addPhase = false
    }

    await this.getWeightDetails()
    await this.getLoggedIndata()
    this.loading = false
  },
}
</script>
<style>
.weightEnter {
  position: sticky;
  bottom: 80px;
}
</style>

