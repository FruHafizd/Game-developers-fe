<template>
    <section class="login">
         <div class="container">
            <div class="row justify-content-center">
               <div class="col-lg-5 col-md-6">
                  <h1 class="text-center mb-4">Gaming Portal</h1>
                  <div class="card card-default">
                     <div class="card-body">
                        <h3 class="mb-3">Sign In</h3>
                        
                        <!-- Ganti form untuk menggunakan @submit.prevent -->
                        <form @submit.prevent="handleLogin"> 
                           <!-- s: input -->
                           <div class="form-group my-3">
                              <label for="username" class="mb-1 text-muted">Username</label>
                              <input 
                                type="text" 
                                id="username" 
                                v-model="form.username" 
                                class="form-control" 
                                autofocus 
                                required
                              />
                           </div> 

                           <!-- s: input -->
                           <div class="form-group my-3">
                              <label for="password" class="mb-1 text-muted">Password</label>
                              <input 
                                type="password" 
                                id="password" 
                                v-model="form.password" 
                                class="form-control" 
                                required
                              />
                           </div>
                           
                           <!-- Tampilkan error jika ada -->
                           <div v-if="error" class="alert alert-danger">
                              {{ error }}
                           </div>
                           
                           <div class="mt-4 row">
                              <div class="col">
                                 <button type="submit" class="btn btn-primary w-100">Sign In</button>
                              </div>
                              <div class="col">
                                 <router-link to="/signup" class="btn btn-danger w-100">Sign up</router-link>
                              </div>
                           </div>
                        </form>

                     </div>
                  </div> 
               </div>
            </div>
         </div>
      </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      error: '',
    }
  },
  methods: {
    async handleLogin() {
      this.error = ''
      try {
        const response = await axios.post(
          'http://localhost:8000/api/v1/auth/signin', 
          this.form
        )
        
        // console.log("Response dari backend:", response.data) // Debug
        
        // ✅ Ambil token dari response.data.data.token (sesuai struktur backend)
        const token = response.data?.data?.token
        
        if (!token) {
          throw new Error("Token tidak ditemukan dalam response")
        }
        
        // Simpan token dan user data ke localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('username', JSON.stringify({
          username: response.data.data.username
        }))
        
        // Redirect ke dashboard
        const userData = localStorage.getItem('username')
        const userObj = userData ? JSON.parse(userData) : null
        const username = userObj?.username || userData
        if (username === 'admin1' || username === 'admin2' ) {
          this.$router.push('/admin/dashboard')
        }else{
          this.$router.push('/dashboard')
        }
            
        
      } catch (err) {
        console.error("Error saat login:", err)
        this.error = err.response?.data?.message || err.message || "Login gagal"
      }
    }
  },
}
</script>