<template>
    <nav class="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
      <div class="container">
        <router-link to="/dashboard" class="navbar-brand">Gaming Portal</router-link>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
         <li class="nav-item"><router-link to="/discover-games" class="nav-link px-2 text-white">Discover Games</router-link></li>
         <li class="nav-item"><router-link to="/manage-games" class="nav-link px-2 text-white">Manage Games</router-link></li>
         <li class="nav-item"><router-link to="/profile" class="nav-link px-2 text-white">User Profile</router-link></li>
         <li class="nav-item">
           <a class="nav-link active bg-dark" href="#">Welcome, Player1</a>
         </li> 
         <li class="nav-item">
          <button @click="logout" class="btn bg-white text-primary ms-4">Sign Out</button>
         </li>
       </ul> 
      </div>
    </nav>

    <main>
      <div class="hero py-5 bg-light">
         <div class="container">
            <router-link to="/manage-games-form" class="btn btn-primary">
               Add Game
            </router-link>
         </div>
      </div>
      
      <div class="list-form py-5">
        <div class="container">
           <h6 class="mb-3">List Games</h6>

           <div v-if="loading" class="text-center">Loading...</div>
           <div v-if="error" class="alert alert-danger">{{ error }}</div>

           <table v-if="!loading && !error" class="table table-striped">
               <thead>
                   <tr>
                       <th width="100">Thumbnail</th>
                       <th width="200">Title</th>
                       <th width="500">Description</th>
                       <th width="180">Action</th>
                   </tr>
               </thead>
               <tbody>
                 <tr v-for="game in games" :key="game.id">
                     <td><img  :src="game.thumbnail ? `http://localhost:8000/storage/${game.thumbnail}` : '../../example_game/v1/thumbnail.png'" 
                       :alt="game.title + ' Logo'" style="width: 100%"></td>
                     <td>{{ game.title }}</td>
                     <td>{{ game.description }}</td>
                     <td>
                      <router-link :to="'/detail-games/' + game.slug" class="btn btn-sm btn-primary">Detail</router-link>
                      <router-link :to="'/manage-games-form-update/' + game.slug" class="btn btn-sm btn-secondary">Update</router-link>
                      <button @click="deleteGame(game.slug)" class="btn btn-sm btn-danger">Delete</button>
                     </td>
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
      games: [],
      loading: false,
      error: null
    }
  },
  async mounted() {
    await this.fetchGames();
  },
  methods: {
    async fetchGames() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:8000/api/v1/games');
        this.games = response.data.content;
      } catch (error) {
        this.error = 'Failed to load games. Please try again later.';
        console.error('Error fetching games:', error);
      } finally {
        this.loading = false;
      }
    },
    async deleteGame(id) {
      if (confirm('Are you sure you want to delete this game?')) {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:8000/api/v1/games/${id}`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          });
          this.fetchGames(); // Refresh the list
        } catch (error) {
          alert('Failed to delete game');
          console.error('Error deleting game:', error);
        }
      }
    },
    formatDate(dateTime) {
      return dateTime ? new Date(dateTime).toLocaleString() : '-'
    },
    logout() {
      logoutUser();
    }
  }
}
</script>