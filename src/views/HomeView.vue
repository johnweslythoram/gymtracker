<template>
  <div class="m-2">
    <div class="card">
      <!-- Header -->
      <div class="header">
        <span class="value">{{ bmi }}</span>
        <span class="status">YOU'RE HEALTHY</span>
      </div>

      <!-- SCALE GRID -->
      <div class="scale-grid">
        <!-- Segments -->
        <div v-for="i in columns" :key="'seg-' + i" class="segment" :class="segmentColor(i)" />

        <!-- Indicator -->
        <div class="indicator" :style="{ gridColumn: indicatorColumn }" />
      </div>

      <!-- Labels -->
      <div class="label-grid">
        <span :style="{ gridColumn: valueToColumn(15) }">15</span>
        <span :style="{ gridColumn: valueToColumn(18.5) }">18.5</span>
        <span :style="{ gridColumn: valueToColumn(25) }">25</span>
        <span :style="{ gridColumn: valueToColumn(30) }">30</span>
        <span :style="{ gridColumn: valueToColumn(40) }">40</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HealthScale',

  props: {
    bmi: {
      type: Number,
    },
  },

  data() {
    return {
      min: 15,
      max: 40,
      columns: 80,
    }
  },

  computed: {
    indicatorColumn() {
      return this.valueToColumn(this.bmi)
    },
  },

  methods: {
    valueToColumn(v) {
      const clamped = Math.min(Math.max(v, this.min), this.max)
      return Math.round(((clamped - this.min) / (this.max - this.min)) * this.columns) + 1
    },

    segmentColor(col) {
      const v = this.min + ((col - 1) / this.columns) * (this.max - this.min)

      if (v < 18.5) return 'low'
      if (v < 25) return 'healthy'
      if (v < 30) return 'medium'
      return 'high'
    },
  },
}
</script>

<style scoped>
.card {
  background: #0f1324;
  padding: 10px;
  border-radius: 12px;
  color: white;
  font-family: Inter, sans-serif;
}

/* HEADER */
.header {
  display: flex;
  gap: 12px;
  align-items: baseline;
}

.value {
  font-size: 32px;
  font-weight: 700;
}

.status {
  color: #4ade80;
  font-weight: 600;
}

/* SCALE GRID */
.scale-grid {
  display: grid;
  grid-template-columns: repeat(81, 1fr);
  gap: 3px;
  align-items: end;
  position: relative;
}

.segment {
  height: 20px;
  border-radius: 2px;
}

.low {
  background: #22d3ee;
}
.healthy {
  background: #34d399;
}
.medium {
  background: #facc15;
}
.high {
  background: #fb7185;
}

/* INDICATOR */
.indicator {
  grid-row: 1;
  height: 30px;
  width: 2px;
  background: #22d3ee;
  justify-self: center;
  align-self: start;
}

/* LABEL GRID */
.label-grid {
  margin-top: 8px;
  display: grid;
  grid-template-columns: repeat(81, 1fr);
  font-size: 12px;
  opacity: 0.6;
}

.label-grid span {
  justify-self: center;
}
</style>
