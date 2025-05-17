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
          <h1>Discover Games</h1>
         </div>
      </div>

      <div class="list-form py-5">
        <div class="container">
          <div class="row">
            <div class="col">
              <h2 class="mb-3">300 Game Avaliable</h2>
            </div>

            <div class="col-lg-8" style="text-align: right;">
              <div class="mb-3">
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-secondary">Popularity</button>
                  <button type="button" class="btn btn-outline-primary">Recently Updated</button>
                  <button type="button" class="btn btn-outline-primary">Alphabetically</button>
                </div>
                
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-secondary">ASC</button>
                  <button type="button" class="btn btn-outline-primary">DESC</button>
                </div>
             </div>
            </div>
          </div>
           

           <div class="row">
            <div class="col-md-6">
              <router-link to="/detail-games" class="card card-default mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-4">
                      <img src="../example_game/v1/thumbnail.png" alt="Demo Game 1 Logo" style="width: 100%">
                    </div>
                    <div class="col">
                      <h5 class="mb-1">Demo Game 1 <small class="text-muted">By Dev1</small></h5>
                      <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, numquam repellendus perspiciatis cupiditate veritatis porro quod eveniet animi perferendis molestias debitis temporibus, asperiores iusto.</div>
                      <hr class="mt-1 mb-1">
                      <div class="text-muted">#scores submitted : 203</div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>

            <div class="col-md-6">
              <router-link to="/detail-games" class="card card-default mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-4">
                      <img src="../example_game/v1/thumbnail.png" alt="Demo Game 2 Logo" style="width: 100%">
                    </div>
                    <div class="col">
                      <h5 class="mb-1">Demo Game 2 <small class="text-muted">By Dev1</small></h5>
                      <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, numquam repellendus perspiciatis cupiditate veritatis porro quod eveniet animi perferendis molestias debitis temporibus, asperiores iusto.</div>
                      <hr class="mt-1 mb-1">
                      <div class="text-muted">#scores submitted : 320</div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>

            <div class="col-md-6">
              <router-link to="/detail-games" class="card card-default mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-4">
                      <img src="../example_game/v1/thumbnail.png" alt="Demo Game 3 Logo" style="width: 100%">
                    </div>
                    <div class="col">
                      <h5 class="mb-1">Demo Game 3 <small class="text-muted">By Dev2</small></h5>
                      <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, numquam repellendus perspiciatis cupiditate veritatis porro quod eveniet animi perferendis molestias debitis temporibus, asperiores iusto.</div>
                      <hr class="mt-1 mb-1">
                      <div class="text-muted">#scores submitted : 1143</div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>

            <div class="col-md-6">
              <router-link to="/detail-games" class="card card-default mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-4">
                      <img src="../example_game/v1/thumbnail.png" alt="Demo Game 4 Logo" style="width: 100%">
                    </div>
                    <div class="col">
                      <h5 class="mb-1">Demo Game 4 <small class="text-muted">By Dev1</small></h5>
                      <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, numquam repellendus perspiciatis cupiditate veritatis porro quod eveniet animi perferendis molestias debitis temporibus, asperiores iusto.</div>
                      <hr class="mt-1 mb-1">
                      <div class="text-muted">#scores submitted : 23</div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
           </div>

        </div>
     </div>
      
    </main>
</template>