<template>
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
          <router-link to="/login" class="btn bg-white text-primary ms-4">Sign Out</router-link>
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

           <table class="table table-striped">
               <thead>
                   <tr>
                       <th width="100">Thumbnail</th>
                       <th width="200">Title</th>
                       <th width="500">Description</th>
                       <th width="180">Action</th>
                   </tr>
               </thead>
               <tbody>
                 <tr>
                     <td><img src="../example_game/v1/thumbnail.png" alt="Demo Game 1 Logo" style="width: 100%"></td>
                     <td>Demo Game 1</td>
                     <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, numquam repellendus perspiciatis cupiditate veritatis porro quod eveniet animi perferendis molestias debitis temporibus, asperiores iusto.                    </td>
                     <td>
                      <router-link to="/detail-games" class="btn btn-sm btn-primary">Detail</router-link>
                      <router-link to="/manage-games-form-update" class="btn btn-sm btn-secondary">Update</router-link>
                      <router-link to="#" class="btn btn-sm btn-danger">Delete</router-link>
                     </td>
                 </tr>
                 <tr>
                     <td><img src="../example_game/v1/thumbnail.png" alt="Demo Game 2 Logo" style="width: 100%"></td>
                     <td>Demo Game 2</td>
                     <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, numquam repellendus perspiciatis cupiditate veritatis porro quod eveniet animi perferendis molestias debitis temporibus, asperiores iusto.                    </td>
                     <td>
                      <router-link to="/detail-games" class="btn btn-sm btn-primary">Detail</router-link>
                      <router-link to="/manage-games-form-update" class="btn btn-sm btn-secondary">Update</router-link>
                      <router-link to="#" class="btn btn-sm btn-danger">Delete</router-link>
                     </td>
                 </tr>
                 <tr>
                     <td><img src="../example_game/v1/thumbnail.png" alt="Demo Game 3 Logo" style="width: 100%"></td>
                     <td>Demo Game 3</td>
                     <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, numquam repellendus perspiciatis cupiditate veritatis porro quod eveniet animi perferendis molestias debitis temporibus, asperiores iusto.                    </td>
                     <td>
                      <router-link to="/detail-games" class="btn btn-sm btn-primary">Detail</router-link>
                      <router-link to="/manage-games-form-update" class="btn btn-sm btn-secondary">Update</router-link>
                      <router-link to="#" class="btn btn-sm btn-danger">Delete</router-link>
                     </td>
                 </tr>
               </tbody>
           </table>

        </div>
     </div>
      
    </main>
</template>