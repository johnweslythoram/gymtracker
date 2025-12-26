<template>
  <div class="m-2">
    <div>
      <h1 class="fw-bolder">Body Measurements</h1>
    </div>
    <div>
      <div v-for="value in bodyparts" class="bodyparts">
        <p class="m-0">{{ value }}</p>
        <p class="m-0">53.8cm</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bodyparts: [
        'Chest',
        'Waist',
        'Right Bicep',
        'Left Bicep',
        'Right Forearm',
        'Left Forearm',
        'Right Thigh',
        'left Thigh',
      ],
    }
  },
}
</script>
<style>
.bodyparts {
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
