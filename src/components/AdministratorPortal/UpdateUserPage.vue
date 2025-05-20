<template>
        <main>
      <div class="hero py-5 bg-light">
         <div class="container text-center"> 
            <h2 class="mb-3">
               Manage User - Administrator Portal
            </h2> 
            <div class="text-muted">
               Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </div>
         </div>
      </div>

      <div class="py-5">
         <div class="container"> 

            <div class="row justify-content-center ">
               <div class="col-lg-5 col-md-6"> 
                  
                  <form @submit.prevent="updateUser">

                     <div class="form-item card card-default my-4">
                        <div class="card-body">
                           <div class="form-group">
                              <label for="username" class="mb-1 text-muted">Username (Kosongkan jika tidak diubah)<span class="text-danger">*</span></label>
                              <input id="username" type="text" placeholder="Username" class="form-control" name="username"  v-model="form.username"/>
                           </div>  
                        </div>
                     </div>

                     <div class="form-item card card-default my-4">
                        <div class="card-body">
                           <div class="form-group">
                              <label for="password" class="mb-1 text-muted">Password (Kosongkan jika tidak diubah)<span class="text-danger">*</span></label>
                              <input id="password" type="password" placeholder="Password" class="form-control" name="userpasswordname"  v-model="form.password"/>
                           </div>  
                        </div>
                     </div>
                     
                     <div class="alert alert-danger" v-if="error">
                        {{ error }}
                     </div>

                     <div class="alert alert-success" v-if="success">
                        {{ success }}
                     </div>

                     <div class="mt-4 row">
                        <div class="col">
                           <button type="submit" class="btn btn-primary w-100">Submit</button>
                        </div>
                        <div class="col">
                           <router-link to="/admin/list-user" class="btn btn-danger w-100">Back</router-link>
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

export default{
   name: 'UpdateUser',
   data(){
      return {
         form: {
            username: '',
            password: '',
         },
         error: '',
         success: '',
         usernameParam: null
      }
   },
   methods: {
      async updateUser(){
        this.usernameParam  = this.$route.params.username;
         this.error = ''
         this.success = ''

         try {
               const token = localStorage.getItem('token')
               const response = await axios.put(`http://localhost:8000/v1/users/${this.usernameParam}`, this.form, {
                  headers: {
                     Authorization: `Bearer ${token}`
                  }
               });
               if (response.data.status === 'success') {
                  this.success = 'Data Berhasil Di update'
                  this.form.username = ''
                  this.form.password = ''
               }
         } catch (err) {
            const responseData = err.response?.data
            if (responseData?.errors) {
               const errorMessages = Object.values(responseData.errors).flat().join(', ')
               this.error = errorMessages || responseData.message || 'Registrasi gagal. Coba lagi.'
            }else{
               this.error = responseData?.message || 'Registrasi gagal. Coba lagi.'
            }
         }

      }
   }
}



</script>