<template>
  <div class="page d-flex justify-content-center align-items-center p-2">
    <div class="p-4 shadow login-card">
      <h1 class="text-start mb-2" style="font-size: 30px">Sign Up your Account</h1>
      <p>Enter your Email and password</p>

      <form @submit.prevent="login">
        <!-- Email -->
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="text" class="form-control" placeholder="Enter email" v-model="email" />
          <small class="text-danger" v-if="errors.email">
            {{ errors.email }}
          </small>
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Enter password"
            v-model="password"
          />
          <small class="text-danger" v-if="errors.password">
            {{ errors.password }}
          </small>
        </div>
        <div class="mb-3">
          <label class="form-label">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Enter password"
            v-model="Cpassword"
          />
          <small class="text-danger" v-if="errors.Cpassword">
            {{ errors.Cpassword }}
          </small>
        </div>

        <!-- API Error -->
        <div v-if="apiError" class="alert alert-danger py-2">
          {{ apiError }}
        </div>
        <div class="text-end" @click="$router.push('/')">
          <p class="text-primary">Have Account?</p>
        </div>
        <button
          class="btn w-100"
          style="background-color: #1d61e7; color: #fff"
          type="submit"
          :disabled="loading"
        >
          {{ loading ? 'Creating...' : 'Sign Up' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
      Cpassword: '',
      loading: false,
      apiError: '',
      errors: {
        email: '',
        password: '',
        Cpassword: '',
      },
    }
  },

  mounted() {
    console.log('Login component mounted')
  },

  methods: {
    validate() {
      this.errors.email = ''
      this.errors.password = ''
      this.apiError = ''

      let valid = true
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!this.email) {
        this.errors.email = 'Email is required'
        valid = false
      } else if (!emailRegex.test(this.email)) {
        this.errors.email = 'Invalid email'
        valid = false
      }

      if (!this.password) {
        this.errors.password = 'Password is required'
        valid = false
      } else if (this.password.length < 6) {
        this.errors.password = 'Minimum 6 characters'
        valid = false
      }

      if (!this.Cpassword) {
        this.errors.Cpassword = 'Password is required'
        valid = false
      } else if (this.password !== this.Cpassword) {
        this.errors.Cpassword = 'Password should be equal.'
        valid = false
      }

      return valid
    },

    async login() {
      if (!this.validate()) return

      this.loading = true

      try {
        // ✅ USING PROTOTYPE AXIOS ($axios)
        const response = await this.$axios.post('api/tracker/newAccount', {
          email: this.email,
          password: this.password,
        })
        console.log(response.data)
        // ✅ OPTIONAL CHAINING
        const token = response.data
        const user = response.data.exists

        const email = response.data.data[0].email
        console.log(email)
        const currentStep = response.data.data.email

        if (!token) {
          this.apiError = 'Invalid server response. Try again!'
          return
        }

        localStorage.setItem('TrackerEmail', email)

        console.log('User:', user)
        if (user) {
          this.$router.push('/personalDetails')
        }
      } catch (error) {
        // ✅ OPTIONAL CHAINING ERROR HANDLING
        console.log(error)
        console.log(error.status)
        console.log(error.response)
        if (
          error.status === 400 &&
          error.response.data.error ===
            'duplicate key value violates unique constraint \"TrackerLoginDetails_email_key\"'
        ) {
          this.apiError = 'Email alredy exist.'
          return
        }
        this.apiError = error?.response?.data?.message ?? error?.message ?? 'Something went wrong'
      } finally {
        this.loading = false
      }
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

button:disabled {
  opacity: 0.6;
}
</style>
