<template>
  <div class="hero py-5 bg-light">
    <div class="container text-center"> 
      <h2 class="mb-3">Sign Up - Gaming Portal</h2> 
      <div class="text-muted">Buat akun baru untuk mulai bermain.</div>
    </div>
  </div>

  <div class="py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-6">
          <!-- Form Sign Up -->
          <form @submit.prevent="handleSignUp">
            <!-- Username -->
            <div class="form-item card card-default my-4">
              <div class="card-body">
                <div class="form-group">
                  <label for="username" class="mb-1 text-muted">Username <span class="text-danger">*</span></label>
                  <input 
                    id="username" 
                    type="text" 
                    placeholder="Username" 
                    class="form-control" 
                    v-model="form.username"
                    required
                  />
                </div>  
              </div>
            </div>

            <!-- Password -->
            <div class="form-item card card-default my-4">
              <div class="card-body">
                <div class="form-group">
                  <label for="password" class="mb-1 text-muted">Password <span class="text-danger">*</span></label>
                  <input 
                    id="password" 
                    type="password" 
                    placeholder="Password" 
                    class="form-control" 
                    v-model="form.password"
                    required
                  />
                </div>  
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="alert alert-danger">
              {{ error }}
            </div>

            <!-- Success Message -->
            <div v-if="success" class="alert alert-success">
              {{ success }}
            </div>

            <!-- Buttons -->
            <div class="mt-4 row">
              <div class="col">
                <button type="submit" class="btn btn-primary w-100">Sign Up</button>
              </div>
              <div class="col">
                <router-link to="/login" class="btn btn-danger w-100">Sign In</router-link>
              </div>
            </div>
          </form>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignupPage',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      error: '',
      success: '',
    }
  },
  methods: {
    async handleSignUp() {
      this.error = ''
      this.success = ''
      
      try {
        // Kirim data ke API Sign Up
        const response = await axios.post(
          'http://localhost:8000/api/v1/auth/signup', 
          this.form
        )

        // console.log("Response dari backend:", response.data)

        // Jika sukses
        if (response.data.status === 'success') {
          this.success = 'Registrasi berhasil! Silakan login.'
          this.form.username = ''
          this.form.password = ''
          
          // Optional: Auto-redirect ke login setelah 3 detik
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        }

      } catch (err) {
        // console.error("Error saat sign up:", err.response?.data || err.message)
        const responseData = err.response?.data
        if (responseData?.errors) {
          const errorMessages = Object.values(responseData.errors).flat().join(', ')
          this.error = errorMessages || responseData.message || 'Registrasi gagal. Coba lagi.'
        }else{
           this.error = responseData?.message || 'Registrasi gagal. Coba lagi.'
        }
      }
    }
  }
}
</script>