<template>
  <div>
    <nav class="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/">Administrator Portal</router-link>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li><router-link to="/admin/list-admin" class="nav-link px-2 text-white">List Admins</router-link></li>
          <li><router-link to="/admin/list-user" class="nav-link px-2 text-white">List Users</router-link></li>
          <li class="nav-item">
            <span class="nav-link active bg-dark">Welcome, Administrator</span>
          </li>
          <li class="nav-item">
            <button @click="logout" class="btn bg-white text-primary ms-4">Sign Out</button>
          </li>
        </ul>
      </div>
    </nav>

    <div class="hero py-5 bg-light">
      <div class="container">
        <router-link to="/admin/add-user" class="btn btn-primary">
          Add User
        </router-link>
      </div>
    </div>

    <div class="list-form py-5">
      <div class="container">
        <h6 class="mb-3">List Users</h6>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Created at</th>
              <th>Last login</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.username">
              <td>
                <a href="/profile/player1" target="_blank">{{ user.username }}</a>
              </td>
              <td>{{ formatDate(user.created_at) }}</td>
              <td>{{ formatDate(user.last_login_at) }}</td>
              <td>
                <span class="bg-success text-white p-1 d-inline-block">Active</span>
              </td>
              <td>
                <div class="btn-group" role="group">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Lock
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <button class="dropdown-item" @click="lockUser('player1', 'spamming')">Spamming</button>
                    </li>
                    <li>
                      <button class="dropdown-item" @click="lockUser('player1', 'cheating')">Cheating</button>
                    </li>
                    <li>
                      <button class="dropdown-item" @click="lockUser('player1', 'other')">Other</button>
                    </li>
                  </ul>
                </div>
                <router-link to="/admin/update-user/player1" class="btn btn-sm btn-secondary">Update</router-link>
                <button class="btn btn-sm btn-danger" @click="deleteUser('player1')">Delete</button>
              </td>
            </tr>

            <!-- <tr>
              <td>
                <a href="/profile/player2" target="_blank">player2</a>
              </td>
              <td>2024-04-13 20:55:40</td>
              <td>2024-04-28 20:55:40</td>
              <td>
                <span class="bg-danger text-white p-1 d-inline-block">Blocked</span>
              </td>
              <td>
                <button class="btn btn-primary btn-sm" @click="unlockUser('player2')">Unlock</button>
                <router-link to="/admin/update-user/player2" class="btn btn-sm btn-secondary">Update</router-link>
                <button class="btn btn-sm btn-danger" @click="deleteUser('player2')">Delete</button>
              </td>
            </tr> -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {logoutUser} from '../../js/utils/auth'

export default {
  name: 'ListUser',
  data(){
    return {
      users: [],
    }
  },

  async mounted() {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:8000/api/v1/users',{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.users = response.data.content
      } catch (error) {
        
      }
  },
  methods: {
    formatDate(dateTime) {
      return dateTime ? new Date(dateTime).toLocaleString() : '-'
    },
    logout(){
      logoutUser()
    }
  }


}


</script>
