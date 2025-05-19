<template>
    <nav class="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/dashboard">Administrator Portal</router-link>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          
         <li><router-link to="/admin/list-admin" class="nav-link px-2 text-white">List Admins</router-link></li>
         <li><router-link to="/admin/list-user" class="nav-link px-2 text-white">List Users</router-link></li>
         <li class="nav-item">
           <a class="nav-link active bg-dark" href="#">Welcome, Administrator</a>
         </li> 
         <li class="nav-item">
          <button @click="logout" class="btn bg-white text-primary ms-4">Sign Out</button>
         </li>
       </ul> 
      </div>
    </nav>

    <main>

      <div class="list-form py-5">
         <div class="container">
            <h6 class="mb-3">List Admin Users</h6>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Created at</th>
                        <th>Last login</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="admin in admins" :key="admin.username">
                      <td>{{ admin.username }}</td>
                      <td>{{ formatDate(admin.created_at) }}</td>
                      <td>{{ formatDate(admin.last_login_at) }}</td>
                  </tr>
                </tbody>
            </table>

         </div>
      </div>
      
    </main>
</template>

<script>
import axios from 'axios';
import { logoutUser } from '../../js/utils/auth.js'

export default {
  name: 'ListAdmin',
  data() {
    return {
      admins: [], //Data dari api
    }
  },

  async mounted() {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8000/api/v1/admins',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      this.admins = response.data.content
    } catch (error) {
       console.error('Gagal mengambil data admin:', error.response?.data || error.message)
      if (error.response && error.response.status === 403) {
        alert('Kamu tidak punya izin untuk mengakses halaman ini.')
        this.$router.push('/forbidden') // Redirect jika bukan admin1/admin2
      } else {
        alert('Terjadi kesalahan saat mengambil data.')
      }
    } 
  },
  methods: {
    formatDate(dateTime) {
      return dateTime ? new Date(dateTime).toLocaleString() : '-'
    },
    logout() {
      logoutUser()
    }
  }
}


</script>