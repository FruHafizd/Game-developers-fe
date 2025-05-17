<template>
     <nav class="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/">Administrator Portal</router-link>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li><router-link to="/admin/list-admin" class="nav-link px-2 text-white">List Admins</router-link></li>
          <li><router-link to="/admin/list-user" class="nav-link px-2 text-white">List Users</router-link></li>
          <li class="nav-item">
            <span class="nav-link active bg-dark">Welcome, Administrator</span>
          </li>
          <li class="nav-item">
            <router-link to="/signin" class="btn bg-white text-primary ms-4">Sign Out</router-link>
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