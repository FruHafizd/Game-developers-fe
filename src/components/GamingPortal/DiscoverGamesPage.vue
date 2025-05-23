<template>
  <div>
    <nav class="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
      <div class="container">
        <router-link to="/dashboard" class="navbar-brand">Gaming Portal</router-link>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li><router-link to="/discover-games" class="nav-link px-2 text-white">Discover Games</router-link></li>
          <li><router-link to="/manage-games" class="nav-link px-2 text-white">Manage Games</router-link></li>
          <li><router-link to="/profile" class="nav-link px-2 text-white">User Profile</router-link></li>
          <li class="nav-item">
            <a class="nav-link active bg-dark" href="#">Welcome, Player1</a>
          </li> 
          <li class="nav-item">
            <router-link to="/logout" class="btn bg-white text-primary ms-4">Sign Out</router-link>
          </li>
        </ul> 
      </div>
    </nav>

    <main>
      <div class="hero py-5 bg-light">
        <div class="container text-center">
          <h1>Discover Games</h1>
        </div>
      </div>

      <div class="list-form py-5">
        <div class="container">
          <div class="row">
            <div class="col">
              <h2 class="mb-3">{{ totalGames }} Games Available</h2>
            </div>

            <div class="col-lg-8 text-right">
              <div class="mb-3">
                <div class="btn-group" role="group">
                  <button 
                    type="button" 
                    class="btn" 
                    :class="sortBy === 'popular' ? 'btn-secondary' : 'btn-outline-primary'"
                    @click="changeSort('popular')"
                  >
                    Popularity
                  </button>
                  <button 
                    type="button" 
                    class="btn" 
                    :class="sortBy === 'uploaddate' ? 'btn-secondary' : 'btn-outline-primary'"
                    @click="changeSort('uploaddate')"
                  >
                    Recently Updated
                  </button>
                  <button 
                    type="button" 
                    class="btn" 
                    :class="sortBy === 'title' ? 'btn-secondary' : 'btn-outline-primary'"
                    @click="changeSort('title')"
                  >
                    Alphabetically
                  </button>
                </div>
                
                <!-- Tombol ASC/DESC yang sudah diperbaiki -->
                <div class="btn-group ms-2" role="group">
                  <button 
                    type="button" 
                    class="btn" 
                    :class="sortDir === 'asc' ? 'btn-secondary' : 'btn-outline-primary'"
                    @click="changeSortDir('asc')"
                  >
                    ASC
                  </button>
                  <button 
                    type="button" 
                    class="btn" 
                    :class="sortDir === 'desc' ? 'btn-secondary' : 'btn-outline-primary'"
                    @click="changeSortDir('desc')"
                  >
                    DESC
                  </button>
                </div>
              </div>
            </div>
          </div>
           
          <div class="row">
            <div 
              class="col-md-6" 
              v-for="game in games" 
              :key="game.slug"
            >
              <router-link 
                :to="'/detail-games/' + game.slug" 
                class="card card-default mb-3"
                aria-labelledby="'game-title-' + game.slug"
              >
                <div class="card-body">
                  <div class="row">
                    <div class="col-4">
                      <img 
                        :src="game.thumbnail && game.thumbnail !== 'default.png' ? `http://localhost:8000/storage/${game.thumbnail}` : '../../example_game/v1/thumbnail.png'"
                        :alt="game.title + ' Logo'" 
                        style="width: 100%"
                      >
                    </div>
                    <div class="col">
                      <h5 class="mb-1" :id="'game-title-' + game.slug">
                        {{ game.title }} <small class="text-muted">By {{ game.author }}</small>
                      </h5>
                      <div>{{ game.description }}</div>
                      <hr class="mt-1 mb-1">
                      <div class="text-muted">#scores submitted : {{ game.scoreCount }}</div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>

          <div v-if="loading" class="text-center py-3">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div v-if="!hasMore && games.length > 0" class="text-center py-3 text-muted">
            No more games to load
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const games = ref([]);
    const loading = ref(false);
    const page = ref(0);
    const size = ref(10);
    const totalGames = ref(0);
    const hasMore = ref(true);
    const sortBy = ref('title');
    const sortDir = ref('asc');

    // Fungsi untuk mengubah arah sorting
    const changeSortDir = (dir) => {
      if (sortDir.value === dir) return;
      sortDir.value = dir;
      // Tidak perlu memanggil resetAndLoadGames() di sini
      // Karena sudah dihandle oleh watcher
    };

    // Fungsi untuk memuat game (tetap sama)
    const loadGames = async () => {
      if (loading.value || !hasMore.value) return;
      
      loading.value = true;
      try {
        const response = await axios.get('http://localhost:8000/api/v1/games', {
          params: {
            page: page.value,
            size: size.value,
            sortBy: sortBy.value,
            sortDir: sortDir.value
          }
        });

        // Jika page = 0 (reset), ganti seluruh array
        // Jika page > 0 (load more), gabungkan dengan array existing
        games.value = page.value === 0 
          ? response.data.content 
          : [...games.value, ...response.data.content];
          
        totalGames.value = response.data.totalElements;
        hasMore.value = (page.value + 1) * size.value < totalGames.value;
        if (hasMore.value) page.value++;
      } catch (error) {
        console.error('Error loading games:', error);
      } finally {
        loading.value = false;
      }
    };

    // Fungsi untuk reset dan load ulang
    const resetAndLoadGames = () => {
      page.value = 0;
      hasMore.value = true;
      loadGames();
    };

    // Watcher untuk sortBy dan sortDir
    watch([sortBy, sortDir], () => {
      resetAndLoadGames();
    });

    // Handle scroll (tetap sama)
    const handleScroll = () => {
      const { scrollY, innerHeight } = window;
      const { offsetHeight } = document.documentElement;
      if (offsetHeight - (scrollY + innerHeight) < 200 && !loading.value) {
        loadGames();
      }
    };

    // Lifecycle hooks (tetap sama)
    onMounted(() => {
      loadGames();
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      games,
      loading,
      totalGames,
      hasMore,
      sortBy,
      sortDir,
      changeSort: (newSortBy) => {
        if (sortBy.value !== newSortBy) {
          sortBy.value = newSortBy;
        }
      },
      changeSortDir
    };
  }
};
</script>