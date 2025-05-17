<template>
    <nav class="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
      <div class="container">
        <a class="navbar-brand" href="index.html">Administrator Portal</a>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          
         <li><router-link to="/admin/list-admin" class="nav-link px-2 text-white">List Admins</router-link></li>
         <li><router-link to="/admin/list-user" class="nav-link px-2 text-white">List Users</router-link></li>
         <li class="nav-item">
           <a class="nav-link active bg-dark" href="#">Welcome, Administrator</a>
         </li> 
         <li class="nav-item">
          <a href="../signin.html" class="btn bg-white text-primary ms-4">Sign Out</a>
         </li>
       </ul> 
      </div>
    </nav>

    <main>

      <div class="list-form py-5">
         <div class="container">
            <h6 class="mb-3">List Admin Users</h6>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Created at</th>
                        <th>Last login</th>
                    </tr>
                </thead>
                <tbody>
                  <tr>
                      <td>admin1</td>
                      <td>2024-04-05 20:55:40</td>
                      <td>2024-04-05 20:55:40</td>
                  </tr>
                  <tr>
                      <td>admin2</td>
                      <td>2024-04-13 20:55:40</td>
                      <td>2024-04-28 20:55:40</td>
                  </tr>
                </tbody>
            </table>

         </div>
      </div>
      
    </main>
</template>

<script>

</script>