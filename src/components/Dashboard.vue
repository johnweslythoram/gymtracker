<template>
  <div class="loader-overlay" v-if="loading">
    <div class="loader"></div>
  </div>

  <div class="m-2">
    <div class="p-2" style="background-color: black; border-radius: 10px">
      <div class="d-flex justify-content-between align-items-center" style="background: black; color: #fff">
        <div class="d-flex align-items-center">
        <div class="">
          <div class="fire">🔥</div>
        </div>
        <div class="">{{ streakCount }} days consistency</div>
        </div>
        <div>
          <p class="m-0 btn btn-warning" @click="done" v-if="!check_in">Check-In</p>
        </div>
      </div>
      <div class="p-2 m-2" style="background: #141414; color: white; border-radius: 10px">
        <div class="week">
          <div v-for="d in week" :key="d.name" class="day">
            <div class="dot" :class="{ active: d.done }">
              <span v-if="d.done">✓</span>
            </div>
            <span class="label">{{ d.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-6 pe-0">
          <div style="background-color: #000; border-radius: 10px" class="p-2">
            <p class="m-0" style="color: #fff">Weight ({{ current<target ? 'Bulking' : 'Lossing' }})</p>
            <div class="page p-2">
              <div class="ring-wrapper">
                <svg class="progress-ring" :width="size" :height="size">
                  <!-- Background -->
                  <circle class="ring-bg" :r="radius" :cx="center" :cy="center" />

                  <!-- Progress -->
                  <circle
                    class="ring-progress"
                    :r="radius"
                    :cx="center"
                    :cy="center"
                    :stroke-dasharray="circumference"
                    :stroke-dashoffset="dashOffset"
                  />
                </svg>

                <!-- Center text -->
                <div class="ring-text">
                  <div class="percent">{{ percent }}%</div>
                  <div class="sub">{{ current }} / {{ target }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 d-flex flex-column justify-content-center gap-2">
          <div
            class="border h-100 d-flex flex-column justify-content-center align-items-center"
            style="background-color: #000; border-radius: 10px; color: #fff"
          >
            <p class="m-0">Calories Intake</p>
            <h2>{{ estimatedCalories }} +</h2>
          </div>
          <div
            class="border h-100 d-flex flex-column justify-content-center align-items-center"
            style="background-color: #000; border-radius: 10px; color: #fff"
          >
            <p class="m-0">Protein Intake</p>
            <h2>{{ Protein }}+</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="m-2">
    <HomeView :bmi="bmi"></HomeView>
  </div>
  <!-- <div class="d-flex justify-content-around border events p-3 m-2">
    <div class="">
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
    </div>
    <div class="">
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
      <div class="mt-2" style="border: 1.5px solid black"></div>
    </div>
    <div class="">
      <div>
        <img src="../src/assets/icons8-scale-50.png" alt="" width="24" height="24" />
      </div>
    </div>
    <div class="">
      <div>
        <img src="../src/assets/icons8-workout-50.png" alt="" width="24" height="24" />
      </div>
    </div>
    <div class="">
      <div>
        <img src="../src/assets/icons8-body-24.png" alt="" width="24" height="24" />
      </div>
    </div>
    <div class="">
      <div>
        <img src="../src/assets/icons8-profile-50.png" alt="" width="24" height="24" />
      </div>
    </div>
  </div> -->
</template>

<script>
  import Swal from 'sweetalert2'
// import HomeView from './views/HomeView.vue'
import HomeView from '@/views/HomeView.vue'
export default {
  components: {
    HomeView,
  },
  data() {
    return {
      startWeight: null,
      loading: true,
      steps: 5863,
      goal: 8000,
      days: 142,
      current: 61,
      target: 70,
      size: 120,
      stroke: 12,
      loggedDates: null,
      weight: null,
      height: null,
      estimatedCalories: null,
      Protein: null,
      streakCount : null,
      refreshInterval: null,
      check_in : false,
    }
  },
  async mounted() {
    // await this.refreshData()
    await this.getLoggedIndata()
    await this.streak()
    this.loading = false
    this.refreshInterval = setInterval(async () => {
    await this.refreshData()
  }, 60 * 60 * 1000)

  },
  beforeUnmount() {
  if (this.refreshInterval) {
    clearInterval(this.refreshInterval)
  }
},
  computed: {
    bmi() {
      if (!this.weight || !this.height) return null

      const heightInMeters = this.height / 100
      const bmiValue = this.weight / (heightInMeters * heightInMeters)

      return bmiValue.toFixed(2)
    },
    progress() {
      return Math.min((this.steps / this.goal) * 100, 100)
    },
    percent() {
      if (this.weight > this.target) {
        return Math.min(Math.round((this.target / this.weight) * 100), 100)
      }
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
    week() {
      const today = this.getISTDate()
      const monday = this.getMondayOfWeek(today)

      const days = [
        { name: 'Mon', offset: 0 },
        { name: 'Tue', offset: 1 },
        { name: 'Wed', offset: 2 },
        { name: 'Thu', offset: 3 },
        { name: 'Fri', offset: 4 },
        { name: 'Sat', offset: 5 },
        { name: 'Sun', offset: 6 },
      ]

      const doneSet = new Set(this.loggedDates)
      const todayStr = this.formatISTDate(today)

      return days.map((d) => {
        const date = new Date(monday)
        date.setDate(monday.getDate() + d.offset)

        const dateStr = this.formatISTDate(date)

        return {
          name: d.name,
          date: dateStr,
          done: doneSet.has(dateStr),
          isToday: dateStr === todayStr,
          disabled: dateStr > todayStr,
        }
      })
    },
  },
  methods: {
    async refreshData() {
    alert("fsffa")
  },
    getISTDate() {
      return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
    },

    formatISTDate(date) {
      return date.toLocaleDateString('en-CA', {
        timeZone: 'Asia/Kolkata',
      }) // YYYY-MM-DD
    },

    getMondayOfWeek(date) {
      const d = new Date(date)
      const day = d.getDay() // 0 = Sun
      const diff = day === 0 ? -6 : 1 - day
      d.setDate(d.getDate() + diff)
      d.setHours(0, 0, 0, 0)
      return d
    },

    async streak() {
      const email = localStorage.getItem('TrackerEmail')
      const params = {
        email: email,
      }
      const dailyReports = await this.$axios.post('api/tracker/allStreaks', params)
      const status = await this.$axios.post('api/tracker/streakStatus', params)
      console.log(status.data.data.current_streak)
      this.streakCount = status.data.data.current_streak
      this.loggedDates = dailyReports.data.data
       const todayIST = new Date().toLocaleDateString('en-CA', {
    timeZone: 'Asia/Kolkata'
  })
  if(status.data.data.last_workout === todayIST){
    this.check_in = true
  }
  if(status.data.data.last_workout !== todayIST){
    Swal.fire({
  title: "Haven't Check-in for GYM?",
  showDenyButton: true,
  confirmButtonText: "CHECK-IN",
  denyButtonText: `Later`
}).then((result) => {
  if (result.isConfirmed) {
    this.done()
  } else if (result.isDenied) {
    
  }
});
  }
    },
    async getLoggedIndata() {
      const email = localStorage.getItem('TrackerEmail')
      const params = {
        email: email,
      }
      const getLoggedIndata = await this.$axios.post('api/tracker/getLoggedIndata', params)
      console.log(getLoggedIndata.data.data)
      this.height = getLoggedIndata.data.data.height
      this.weight = getLoggedIndata.data.data.weight
      this.target = getLoggedIndata.data.data.targetWeight
      this.estimatedCalories = getLoggedIndata.data.data.estimatedCalories

      this.Protein = getLoggedIndata.data.data.protien
      this.current = this.weight
    },
    async done() {
      this.loading = true
      const email = localStorage.getItem('TrackerEmail')
      const params = {
        email: email,
      }
      const getLoggedIndata = await this.$axios.post('api/tracker/done', params)

      await this.streak()
      this.loading = false
      
    },
  },
}
</script>

<style scoped>
/* PAGE */

/* .page {
  background: #000;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
} */

/* MAIN CARD */
.card {
  display: flex;
  gap: 24px;
  padding: 24px;
  border-radius: 28px;
  background: radial-gradient(circle at top left, #1a1a1a, #050505);
  width: 760px;
  color: #fff;
}

/* LEFT */
.left {
  width: 170px;
  background: linear-gradient(180deg, #2a0d18, #090909);
  border-radius: 24px;
  padding: 18px;
  text-align: center;
}

.fire-box {
  background: #ff3b6b;
  border-radius: 18px;
  padding: 18px;
  margin-bottom: 14px;
}

.fire {
  font-size: 30px;
}

.days {
  font-size: 22px;
  font-weight: 700;
}

.subtitle {
  font-size: 13px;
  opacity: 0.7;
}

/* RIGHT */
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.steps {
  font-size: 36px;
  font-weight: 700;
}

.total {
  font-size: 18px;
  opacity: 0.4;
  margin-left: 4px;
}

/* PROGRESS */
.progress-track {
  margin: 14px 0 22px;
  height: 14px;
  background: #1a1a1a;
  border-radius: 20px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffffff, #dcdcdc);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
}

/* WEEK */
.week {
  display: flex;
  justify-content: space-between;
}

.day {
  text-align: center;
  width: 40px;
}

.dot {
  width: 20px;
  height: 20px;
  background: #1a1a1a;
  border: 1px solid #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 6px;
  color: transparent;
}

.dot.active {
  background: #ff3b6b;
  color: #fff;
  box-shadow: 0 0 10px rgba(255, 59, 107, 0.7);
}

.label {
  font-size: 12px;
  opacity: 0.6;
}

.page {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring-wrapper {
  position: relative;
}

.progress-ring {
  transform: rotate(-90deg);
}

/* Background ring */
.ring-bg {
  fill: none;
  stroke: #1f1f1f;
  stroke-width: 12;
}

/* Progress ring */
.ring-progress {
  fill: none;
  stroke: #ff3b6b;
  stroke-width: 12;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s ease;
}

/* Center text */
.ring-text {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.percent {
  font-size: 28px;
  font-weight: 700;
}

.sub {
  font-size: 12px;
  opacity: 0.6;
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
.skeleton {
  background: linear-gradient(90deg, #eee, #ccc, #eee);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 6px;
}
.skeleton-text {
  width: 100%;
  height: 14px;
  margin-bottom: 8px;
}

.skeleton-number {
  width: 50px;
  height: 18px;
}

.skeleton-badge {
  width: 60px;
  height: 18px;
}
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}
</style>
