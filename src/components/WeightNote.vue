<template>
  <div class="loader-overlay" v-if="loading">
    <div class="loader"></div>
  </div>
  <div class="app">
    <!-- VALUE -->
    <div class="value">{{ (weight + 1.1).toFixed(1) }} <span>kg</span></div>

    <!-- GAUGE -->
    <div class="ruler" ref="ruler" @pointerdown="startDrag">
      <div
        v-for="tick in ticks"
        :key="tick"
        class="tick"
        :class="{ major: tick % 1 === 0 }"
        :style="tickStyle(tick)"
      >
        <span v-if="tick % 1 === 0" class="label">
          {{ tick }}
        </span>
      </div>

      <div class="indicator"></div>
    </div>

    <!-- CHART -->

    <!-- SAVE -->
    <button @click="saveEntry()">Save Entry</button>
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      loading: false,
      weight: 62,
      min: 40,
      max: 120,
      step: 0.1,

      dragging: false,
      startX: 0,
      startValue: 0,
      PX_PER_STEP: 12,
      chart: null,
    }
  },

  computed: {
    ticks() {
      const arr = []
      for (let i = this.min; i <= this.max; i += this.step) {
        arr.push(Number(i.toFixed(1)))
      }
      return arr
    },
  },

  methods: {
    async saveEntry() {
      this.loading = true
      const phase = localStorage.getItem('currentphase')
      var params = {
        email: 'johnweslythoram@gmail.com',
        phase: phase,
        weight: this.weight,
      }

      const addPhase = await this.$axios.post('api/tracker/addPhase', params)
      this.$router.push('/weight')
      console.log(addPhase)
    },
    tickStyle(tick) {
      const pxPerUnit = this.PX_PER_STEP / this.step // 120px per 1kg

      return {
        transform: `translateX(${(tick - this.weight) * pxPerUnit}px)`,
      }
    },

    /* -------- DRAG -------- */
    startDrag(e) {
      this.dragging = true
      this.startX = e.clientX
      this.startValue = this.weight
      this.$refs.ruler.setPointerCapture(e.pointerId)
    },

    onMove(e) {
      if (!this.dragging) return

      const deltaPx = e.clientX - this.startX
      const deltaValue = deltaPx / (this.PX_PER_STEP / this.step)

      let value = this.startValue - deltaValue

      value = Math.round(value / this.step) * this.step
      value = Math.max(this.min, Math.min(this.max, value))

      this.weight = Number(value.toFixed(1))
    },

    stopDrag() {
      this.dragging = false
    },

    /* -------- STORAGE -------- */

    /* -------- CHART -------- */
  },

  mounted() {
    this.weight = parseFloat(localStorage.getItem('currentWeight')) - 1.1
    console.log(this.weight)
    console.log(localStorage.getItem('currentphase'))
    window.addEventListener('pointermove', this.onMove)
    window.addEventListener('pointerup', this.stopDrag)
  },

  beforeUnmount() {
    window.removeEventListener('pointermove', this.onMove)
    window.removeEventListener('pointerup', this.stopDrag)
  },
}
</script>

<style scoped>
.app {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #000;
  padding: 30px;
  max-width: 420px;
  margin: auto;
  border-radius: 20px;
  font-family: system-ui;
}

.value {
  font-size: 56px;
  font-weight: 700;
  text-align: center;
}

.value span {
  font-size: 22px;
  opacity: 0.7;
}

.ruler {
  position: relative;
  height: 70px;
  overflow: hidden;
  margin: 20px 0;
  touch-action: none;
}

.tick {
  position: absolute;
  bottom: 20px;
  width: 2px;
  height: 14px;
  background: #000;
  transition: transform 0.15s ease;
}

.tick.major {
  height: 28px;
  background: #000;
}

.label {
  position: absolute;
  top: 32px;
  font-size: 12px;
  color: #000;
  transform: translateX(-50%);
}

.indicator {
  position: absolute;
  left: 51%;
  top: 10px;
  width: 2px;
  height: 34px;
  background: #3fffdc;
  border-radius: 3px;
  transform: translateX(-50%);
}

canvas {
  margin-top: 20px;
}

button {
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: 600;
}
</style>
