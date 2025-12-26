<template>
  <div class="page">
    <!-- Middle box -->
    <div class="card">
      <!-- your UI goes here -->
       <div class="text-center mb-2" style=" font-family:Outfit;font-weight: bolder;">
        <h3>Manage your goals efficiently</h3>
       </div>
      <img src="../src/assets/dummy.jpeg" alt="">
      <div class="mt-4 d-flex justify-content-between gap-2">
        <p class="btn btn-warning w-100">Login</p>
        <p class="btn btn-warning w-100">Signup</p>
      </div>
    </div>
  </div>
</template>

<script >
// nothing needed here
</script>

<style scoped>
/* Page container */
.page {
  display: flex;
  justify-content: center; /* horizontal center */
  align-items: center;     /* vertical center */
  min-height: 100vh;       /* full viewport */
}

/* Middle box */
.card {
  border: none !important;
  width: 420px;
  padding: 20px;
}
</style>
