<template>
  <div
    style="height: 87vh"
    class="d-flex align-items-center p-2 flex-column justify-content-center"
  >
    <h1 class="fw-bolder">Workout streak</h1>
    <VCalendar
      expanded
      :attributes="attributes"
      :initial-page="{ month: new Date().getMonth() + 1, year: new Date().getFullYear() }"
    ></VCalendar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      todos: [
        {
          dates: ['2025-08-03'],
        },
        {
          dates: ['2025-09-15'],
        },
      ],
    }
  },
  computed: {
    attributes() {
      const todoAttributes = this.todos
        .filter((todo) => !!todo.dates)
        .map((todo) => ({
          dates: todo.dates,
          highlight: {
            color: 'red',
            fillMode: 'solid', // 🔥 FULL FILL
          },
        }))

      const highlightAttribute = this.selectedDate
        ? [
            {
              dates: this.selectedDate,
              highlight: {
                color: 'red',
                fillMode: 'solid',
              },
            },
          ]
        : []

      return [...todoAttributes, ...highlightAttribute]
    },
  },
  mounted() {
    this.streaksAllData()
  },
  methods: {
    async streaksAllData() {
      const email = localStorage.getItem('TrackerEmail')
      const params = {
        email: email,
      }
      const dailyReports = await this.$axios.post('api/tracker/streaksAllData', params)
      console.log(dailyReports.data.data)
      const dates = dailyReports.data.data.map((item) => ({
        dates: [item.date],
      }))
      this.todos = dates
      console.log(dates)
    },
  },
}
</script>
