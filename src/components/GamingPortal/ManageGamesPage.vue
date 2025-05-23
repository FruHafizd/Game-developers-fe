<template>
  <div>
    <!-- Navbar dll tetap sama -->
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
              <tr v-for="game in games" :key="game.slug">
                <td>
                  <img
                    :src="game.thumbnail ? `http://localhost:8000/storage/${game.thumbnail}` : '../../example_game/v1/thumbnail.png'"
                    :alt="game.title + ' Logo'" style="width: 100%"
                  >
                </td>
                <td>{{ game.title }}</td>
                <td>{{ game.description }}</td>
                <td>
                  <router-link :to="'/detail-games/' + game.slug" class="btn btn-sm btn-primary">Detail</router-link>
                  <button @click="tryUpdateGame(game)" class="btn btn-sm btn-secondary">Update</button>
                  <button @click="deleteGame(game)" class="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination Controls -->
          <nav v-if="totalPages > 1" aria-label="Page navigation example">
            <ul class="pagination justify-content-center mt-4">
              <li :class="['page-item', { disabled: page <= 1 }]" >
                <button class="page-link" @click="changePage(page - 1)" :disabled="page <= 1">Previous</button>
              </li>

              <li
                v-for="p in totalPages"
                :key="p"
                :class="['page-item', { active: p === page }]"
              >
                <button class="page-link" @click="changePage(p)">{{ p }}</button>
              </li>

              <li :class="['page-item', { disabled: page >= totalPages }]">
                <button class="page-link" @click="changePage(page + 1)" :disabled="page >= totalPages">Next</button>
              </li>
            </ul>
          </nav>

        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import { logoutUser } from '../../js/utils/auth.js'

export default {
  name: 'ListGame',
  data() {
    return {
      games: [],
      loading: false,
      error: null,
      username: null,
      page: 1,
      size: 10,
      totalElements: 0,
    }
  },
  async mounted() {
    try {
      const userObj = JSON.parse(localStorage.getItem('username'));
      this.username = userObj?.username || null;
    } catch {
      this.username = null;
    }
    await this.fetchGames(this.page);
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalElements / this.size);
    }
  },
  methods: {
    async fetchGames(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        // Ingat backend pagination mulai dari page 0
        const response = await axios.get('http://localhost:8000/api/v1/games', {
          params: {
            page: page - 1, // frontend page 1-based, backend 0-based
            size: this.size,
          }
        });
        this.games = response.data.content;
        this.page = response.data.page + 1; // sesuaikan kembali ke 1-based
        this.size = response.data.size;
        this.totalElements = response.data.totalElements;
      } catch (error) {
        this.error = 'Failed to load games. Please try again later.';
        console.error('Error fetching games:', error);
      } finally {
        this.loading = false;
      }
    },

    changePage(newPage) {
      if (newPage < 1 || newPage > this.totalPages) return;
      this.fetchGames(newPage);
    },

    tryUpdateGame(game) {
      if (game.author === this.username) {
        this.$router.push(`/manage-games-form-update/${game.slug}`);
      } else {
        alert("You can only update your own games. Redirecting to game details.");
        this.$router.push(`/detail-games/${game.slug}`);
      }
    },

    async deleteGame(game) {
      const userObj = JSON.parse(localStorage.getItem('username'));
      const currentUsername = userObj?.username;
      const authorUsername = typeof game.author === 'string' ? game.author : game.author?.username;

      if (authorUsername !== currentUsername) {
        alert("You can only delete your own games.");
        return;
      }

      if (confirm('Are you sure you want to delete this game?')) {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:8000/api/v1/games/${game.slug}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.fetchGames(this.page); // Refresh current page
        } catch (error) {
          alert('Failed to delete game');
          console.error('Error deleting game:', error);
        }
      }
    },

    logout() {
      logoutUser();
    }
  }
}
</script>
