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
            <a class="nav-link active bg-dark" href="#">Welcome, {{ currentUsername }}</a>
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
              <li :class="['page-item', { disabled: currentPage <= 1 }]" >
                <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage <= 1">Previous</button>
              </li>

              <!-- Show page numbers with smart truncation -->
              <template v-if="totalPages <= 7">
                <li
                  v-for="p in totalPages"
                  :key="p"
                  :class="['page-item', { active: p === currentPage }]"
                >
                  <button class="page-link" @click="changePage(p)">{{ p }}</button>
                </li>
              </template>
              
              <template v-else>
                <!-- First page -->
                <li :class="['page-item', { active: 1 === currentPage }]">
                  <button class="page-link" @click="changePage(1)">1</button>
                </li>
                
                <!-- Dots if needed -->
                <li v-if="currentPage > 3" class="page-item disabled">
                  <span class="page-link">...</span>
                </li>
                
                <!-- Current page area -->
                <li 
                  v-for="p in visiblePages" 
                  :key="p"
                  :class="['page-item', { active: p === currentPage }]"
                >
                  <button class="page-link" @click="changePage(p)">{{ p }}</button>
                </li>
                
                <!-- Dots if needed -->
                <li v-if="currentPage < totalPages - 2" class="page-item disabled">
                  <span class="page-link">...</span>
                </li>
                
                <!-- Last page -->
                <li v-if="totalPages > 1" :class="['page-item', { active: totalPages === currentPage }]">
                  <button class="page-link" @click="changePage(totalPages)">{{ totalPages }}</button>
                </li>
              </template>

              <li :class="['page-item', { disabled: currentPage >= totalPages }]">
                <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">Next</button>
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
      currentPage: 1, // Ubah dari 'page' ke 'currentPage'
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
    
    // Initialize from URL query if exists
    const urlPage = parseInt(this.$route.query.page) || 1;
    this.currentPage = urlPage;
    
    await this.fetchGames(this.currentPage);
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalElements / this.size);
    },
    currentUsername() {
      const userData = localStorage.getItem('username')
      return userData ? JSON.parse(userData).username : 'Guest'
    },
    visiblePages() {
      // For smart pagination display
      if (this.totalPages <= 7) return [];
      
      const pages = [];
      const start = Math.max(2, this.currentPage - 1);
      const end = Math.min(this.totalPages - 1, this.currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== this.totalPages) {
          pages.push(i);
        }
      }
      return pages;
    }
  },
  methods: {
    async fetchGames(page = 1) {
      // Prevent invalid page numbers
      if (page < 1) page = 1;
      
      this.loading = true;
      this.error = null;
      
      try {
        // Backend pagination mulai dari page 0
        const response = await axios.get('http://localhost:8000/api/v1/games', {
          params: {
            page: page - 1, // Convert to 0-based for backend
            size: this.size,
          }
        });
        
        // Update data
        this.games = response.data.content || [];
        this.totalElements = response.data.totalElements || 0;
        
        // Validasi size dari backend - gunakan yang kita kirim jika backend return size aneh
        const backendSize = response.data.size;
        if (backendSize !== this.size) {
          console.warn(`Backend returned different size: ${backendSize}, keeping frontend size: ${this.size}`);
        }
        // Tetap gunakan size yang kita set di frontend
        
        // Update URL without triggering navigation
        if (this.$route.query.page != page) {
          this.$router.replace({ 
            query: { ...this.$route.query, page: page.toString() } 
          }).catch(() => {}); // Ignore navigation duplicated error
        }
        
      } catch (error) {
        this.error = 'Failed to load games. Please try again later.';
        console.error('Error fetching games:', error);
      } finally {
        this.loading = false;
      }
    },

    async changePage(newPage) {
      // Validate page number
      if (newPage < 1 || newPage > this.totalPages) {
        return;
      }
      
      // Prevent unnecessary requests
      if (newPage === this.currentPage) {
        return;
      }
      
      // Update current page first
      this.currentPage = newPage;
      
      // Then fetch data
      await this.fetchGames(newPage);
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
          
          // After deletion, check if current page is still valid
          const newTotalElements = this.totalElements - 1;
          const newTotalPages = Math.ceil(newTotalElements / this.size);
          
          // If current page becomes invalid, go to last valid page
          if (this.currentPage > newTotalPages && newTotalPages > 0) {
            this.currentPage = newTotalPages;
          }
          
          await this.fetchGames(this.currentPage);
          
        } catch (error) {
          alert('Failed to delete game');
          console.error('Error deleting game:', error);
        }
      }
    },

    logout() {
      logoutUser();
    }
  },
  
  // Watch for route changes (if user navigates via URL)
  watch: {
    '$route.query.page'(newPage) {
      const page = parseInt(newPage) || 1;
      if (page !== this.currentPage) {
        this.currentPage = page;
        this.fetchGames(page);
      }
    }
  }
}
</script>