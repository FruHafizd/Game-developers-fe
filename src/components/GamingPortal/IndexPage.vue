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
         <div class="container text-center">
          <h1 class="mb-0 mt-0">Dashboard</h1>
         </div>
      </div>

      <div class="list-form py-5">
         <div class="container">
          <h5 class="alert alert-info">
            Welcome, Administrator. Don't forget to sign out when you are finished using this page
          </h5>
         </div>
      </div>
      
    </main>
</template>