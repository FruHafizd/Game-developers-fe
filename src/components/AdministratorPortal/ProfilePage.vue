<template>
    <main>
      <div class="hero py-5 bg-light">
         <div class="container text-center"> 
            <h2 class="mb-1">
              {{ user.username }}
            </h2> 
            <h5 class="mt-2">Registered at {{ formatDate(user.registeredTimestamp) }}</h5>
         </div>
      </div>

      <div class="py-5">
         <div class="container"> 
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div class="row justify-content-center ">
               <div class="col-lg-5 col-md-6"> 
                        
              <h5 v-if="user.highscores && user.highscores.length > 0">Highscores per Game</h5>
              <div class="card-body" v-if="user.highscores && user.highscores.length > 0">
                <ol>
                  <li v-for="(highscore, index) in user.highscores" :key="index">
                    <router-link :to="`/detail-games/${highscore.game.slug}`">
                      {{ highscore.game.title }} ({{ highscore.score }})
                    </router-link>
                  </li>
                </ol>
              </div>
              <h5 v-if="user.authoredGames && user.authoredGames.length > 0">Authored Games</h5>
              <router-link 
                v-for="(game, index) in user.authoredGames" 
                :key="index"
                :to="`/detail-games/${game.slug}`" 
                class="card card-default mb-3"
              >
                <div class="card-body">
                  <div class="row">
                    <div class="col-4">
                      <img src="../../example_game/v1/thumbnail.png" :alt="`${game.title} Logo`" style="width: 100%">
                    </div>
                    <div class="col">
                      <h5 class="mb-1">{{ game.title }}</h5>
                      <div>{{ game.description }}</div>
                      <hr class="mt-1 mb-1">
                      <div class="text-muted">#scores submitted : N/A</div>
                    </div>
                  </div>
                </div>
              </router-link>

                
                <router-link to="/admin/list-user" class="btn btn-danger w-100">Back</router-link>

               </div>
             </div>  
            
         </div>
      </div>
    </main>
</template>

<script>
import axios from 'axios';

export default{
  name: 'AdminProfile',
  data(){
    return{
      user: {
        username: '',
        registeredTimestamp: '',
        authoredGames: [],
        highscores: []
      },
      loading: false,
      error: null
    }
  },
  async mounted() {
    await this.fetchUser();
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleString();
    },
    async fetchUser(){
      this.loading = true;
      this.error = null;

      try {
        const username = this.$route.params.username;
        const response = await axios.get(`http://localhost:8000/api/v1/users/${username}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        this.user = response.data;
      } catch (error) {
        this.error = 'Failed Fetch To Api';
        console.error('Error fetching user:', error);
        if (error.response && error.response.status === 401) {
          this.$router.push('/login');
        }
      }finally{
        this.loading = false;
      }
    }
  }
}
</script>