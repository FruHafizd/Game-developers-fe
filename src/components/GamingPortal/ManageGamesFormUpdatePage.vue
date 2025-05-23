<template>
  <main>
    <div class="hero py-5 bg-light">
      <div class="container text-center"> 
        <h2 class="mb-3">
          Update Game - Gaming Portal
        </h2>
      </div>
    </div>

    <div class="py-5">
      <div class="container"> 
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-6"> 
            <form @submit.prevent="handleSubmit">
              <div class="form-item card card-default my-4">
                <div class="card-body">
                  <div class="form-group">
                    <label for="title" class="mb-1 text-muted">Title</label>
                    <input id="title" type="text" placeholder="Title" class="form-control" v-model="game.title"/>
                  </div>  
                </div>
              </div>
              <div class="form-item card card-default my-4">
                <div class="card-body">
                  <div class="form-group">
                    <label for="description" class="mb-1 text-muted">Description</label>
                    <textarea class="form-control" placeholder="Description" id="description" cols="30" rows="5" v-model="game.description"></textarea>
                  </div>  
                </div>
              </div>
              <div class="form-item card card-default my-4">
                <div class="card-body">
                  <div class="form-group">
                    <label for="thumbnail" class="mb-1 text-muted">New Thumbnail</label>
                    <input type="file" @change="handleFileChange($event, 'thumbnail')" class="form-control" id="thumbnail">
                    <small class="text-muted">Leave empty to keep current thumbnail</small>
                  </div>  
                </div>
              </div>
              <div class="form-item card card-default my-4">
                <div class="card-body">
                  <div class="form-group">
                    <label for="game" class="mb-1 text-muted">New Game Version</label>
                    <input type="file" @change="handleFileChange($event, 'zipfile')" class="form-control" id="game">
                    <small class="text-muted">Leave empty to keep current version</small>
                  </div>  
                </div>
              </div>

              <div class="mt-4 row">
                <div class="col">
                  <button class="btn btn-primary w-100" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                    Update Game
                  </button>
                </div>
                <div class="col">
                  <router-link to="/manage-games" class="btn btn-danger w-100">Cancel</router-link>
                </div>
              </div>
            </form>
          </div>
        </div>  
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UpdateGame',
  data() {
    return {
      game: {
        title: '',
        description: '',
      },
      thumbnail: null,
      zipfile: null,
      loading: false,
      error: null
    };
  },
  created() {
    this.fetchGameData();
  },
  methods: {
    async fetchGameData() {
      this.loading = true;
      try {
        const slug = this.$route.params.slug;
        const response = await axios.get(`http://localhost:8000/api/v1/games/${slug}`);
        this.game = response.data.content || response.data;
      } catch (error) {
        this.error = 'Failed to load game data';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    handleFileChange(event, field) {
      this[field] = event.target.files[0];
    },
    async handleSubmit() {
      this.loading = true;
      this.error = null;

      try {
        const slug = this.$route.params.slug;
        
        // 1. Update game metadata (title/description)
        if (this.game.title || this.game.description) {
          await axios.put(
            `http://localhost:8000/api/v1/games/${slug}`,
            {
              title: this.game.title,
              description: this.game.description
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          );
        }

        // 2. Upload new files if provided
        if (this.thumbnail || this.zipfile) {
          const formData = new FormData();
          if (this.thumbnail) formData.append('thumbnail', this.thumbnail);
          if (this.zipfile) formData.append('zipfile', this.zipfile);

          await axios.post(
            `http://localhost:8000/api/v1/games/${slug}/upload`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
              }
            }
          );
        }

        alert('Game updated successfully!');
        this.$router.push('/manage-games');
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update game';
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style>
.spinner-border-sm {
  margin-right: 5px;
}
</style>