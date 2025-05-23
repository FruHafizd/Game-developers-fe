<template>
  <main>
    <div class="hero py-5 bg-light">
      <div class="container text-center">
        <h2 class="mb-1">
          {{ game.title || 'Not Found' }}
        </h2>

        <router-link to="/profile" class="btn btn-success">By {{ game.author }}</router-link>
        <div class="text-muted">
          {{ game.description }}
        </div>
        <h5 class="mt-2" v-if="game.version">
          Last Version {{ game.version }} ({{ formatDate(game.updated_at) }})
        </h5>
      </div>
    </div>

    <div class="py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-6">
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <div class="row">
              <div class="col">
                <div class="card mb-3">
                  <div class="card-body">
                    <h5>Top 10 Leaderboard</h5>
                    <ol v-if="scores.length">
                      <li
                        v-for="(player, index) in topScores"
                        :key="index"
                        :class="{ 'fw-bold': player.username === currentUsername }"
                      >
                        {{ player.username }} ({{ player.score }})
                      </li>
                    </ol>
                    <div v-else>
                      No leaderboard data available
                    </div>

                    <div v-if="userScoreNotInTop">
                      <hr />
                      <p><strong>Your Score:</strong> {{ userScore.username }} ({{ userScore.score }})</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col">
                <img 
                  :src="thumbnailUrl" 
                  :alt="game.title + ' Logo'" 
                  style="width: 100%"
                  @error="handleImageError"
                  class="game-thumbnail"
                >
                <a 
                  :href="downloadUrl" 
                  class="btn btn-primary w-100 mb-2 mt-2"
                  :class="{ 'disabled': !downloadAvailable }"
                >
                  Download Game
                </a>
              </div>
            </div>

            <router-link to="/manage-games" class="btn btn-danger w-100">Back</router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DetailGame',
  data() {
    const savedUser = JSON.parse(localStorage.getItem('username') || '{}');
    return {
      game: {},
      scores: [],
      loading: false,
      error: null,
      currentUsername: savedUser.username || '',
      userScore: null,
      thumbnailUrl: '',
      downloadUrl: '#',
      downloadAvailable: false
    };
  },
  computed: {
    topScores() {
      return this.scores.slice(0, 10);
    },
    userScoreNotInTop() {
      return (
        this.userScore &&
        !this.topScores.some(score => score.username === this.currentUsername)
      );
    }
  },
  mounted() {
    this.fetchDetailGame();
    this.fetchScores();
  },
  methods: {
    async fetchDetailGame() {
      this.loading = true;
      this.error = null;

      try {
        const slug = this.$route.params.slug;
        const response = await axios.get(`http://localhost:8000/api/v1/games/${slug}`);
        this.game = response.data.content || response.data;
        
        // Set thumbnail URL
        this.setThumbnailUrl();
        
        // Set download URL
        this.setDownloadUrl();
        
      } catch (error) {
        this.error = 'Failed to load game details. Please try again later.';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    
    setThumbnailUrl() {
      if (this.game.thumbnail) {
        // Remove leading slash if exists
        const cleanPath = this.game.thumbnail;
        this.thumbnailUrl = `http://localhost:8000/storage/${cleanPath}`;
      } else {
        this.thumbnailUrl = '../../example_game/v1/thumbnail.png';
      }
    },
    
    setDownloadUrl() {
      if (this.game.slug) {
        this.downloadUrl = `http://localhost:8000/storage/games/${this.game.slug}/v1/game.zip`;
        this.downloadAvailable = true;
      } else {
        this.downloadUrl = '#';
        this.downloadAvailable = false;
      }
    },
    
    handleImageError(event) {
      console.error('Failed to load thumbnail:', event.target.src);
      this.thumbnailUrl = '../../example_game/v1/thumbnail.png';
    },

    async fetchScores() {
      try {
        const slug = this.$route.params.slug;
        const response = await axios.get(`http://localhost:8000/api/v1/games/${slug}/scores`);
        this.scores = response.data.scores || [];
        
        this.scores.sort((a, b) => b.score - a.score);
        this.userScore = this.scores.find(score => score.username === this.currentUsername);
      } catch (error) {
        console.error('Failed to load scores:', error);
      }
    },
    
    formatDate(dateTime) {
      if (!dateTime) return '';
      const date = new Date(dateTime);
      return date.toLocaleString();
    }
  }
};
</script>
