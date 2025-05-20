<template>
    <main>
      <div class="hero py-5 bg-light">
         <div class="container text-center"> 
            <h2 class="mb-3">
               Manage Games - Gaming Portal
            </h2>
         </div>
      </div>

      <div class="py-5">
         <div class="container"> 

            <div class="row justify-content-center ">
               <div class="col-lg-5 col-md-6"> 
                  
                  <form @submit.prevent="handleSubmit">
                     <div class="form-item card card-default my-4">
                        <div class="card-body">
                           <div class="form-group">
                              <label for="title" class="mb-1 text-muted">Title <span class="text-danger">*</span></label>
                              <input id="title" type="text" placeholder="Title" class="form-control" name="title" v-model="title"/>
                           </div>  
                        </div>
                     </div>
                     <div class="form-item card card-default my-4">
                        <div class="card-body">
                           <div class="form-group">
                              <label for="description" class="mb-1 text-muted">Description <span class="text-danger">*</span></label>
                              <textarea name="description" class="form-control" placeholder="Description" id="description" cols="30" rows="5" v-model="description"></textarea>
                           </div>  
                        </div>
                     </div>
                     <div class="form-item card card-default my-4">
                        <div class="card-body">
                           <div class="form-group">
                              <label for="thumbnail" class="mb-1 text-muted">Thumbnail <span class="text-danger">*</span></label>
                              <input type="file" @change="handleFileChange($event,'thumbnail')" name="thumbnail" class="form-control" id="thumbnail">
                           </div>  
                        </div>
                     </div>
                     <div class="form-item card card-default my-4">
                        <div class="card-body">
                           <div class="form-group">
                              <label for="game" class="mb-1 text-muted">File Game <span class="text-danger">*</span></label>
                              <input type="file" @change="handleFileChange($event,'zipfile')" name="game" class="form-control" id="game">
                           </div>  
                        </div>
                     </div>
   
                     <div class="mt-4 row">
                        <div class="col">
                           <button class="btn btn-primary w-100">Submit</button>
                        </div>
                        <div class="col">
                           <router-link to="/manage-games" class="btn btn-danger w-100">Back</router-link>
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
  name: 'AddGame',
  data() {
    return {
      title: '',
      description: '',
      zipfile: null,
      thumbnail: null,
      loading: false,
    };
  },
  methods: {
    handleFileChange(event, field) {
      this[field] = event.target.files[0];
    },
    async handleSubmit() {
      this.loading = true;

      try {
        // STEP 1: Kirim judul dan deskripsi
        const createResponse = await axios.post(
          'http://localhost:8000/api/v1/games',
          {
            title: this.title,
            description: this.description
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        const slug = createResponse.data.slug;

        // STEP 2: Kirim file zip dan thumbnail
        const formData = new FormData();
        formData.append('zipfile', this.zipfile);
        if (this.thumbnail) {
          formData.append('thumbnail', this.thumbnail);
        }

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

        alert('Game berhasil ditambahkan!');
        this.$router.push('/manage-games');
      } catch (error) {
        console.error(error);
        alert('Gagal menambahkan game.');
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
