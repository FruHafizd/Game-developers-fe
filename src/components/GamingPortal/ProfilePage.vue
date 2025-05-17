<template>
    <main>
      <div class="hero py-5 bg-light">
         <div class="container text-center"> 
            <h2 class="mb-1">
              Dev1
            </h2> 
            <h5 class="mt-2">Last Login 2024-04-09 22:45:41</h5>
         </div>
      </div>

      <div class="py-5">
         <div class="container"> 

            <div class="row justify-content-center ">
               <div class="col-lg-5 col-md-6"> 
                        
              <h5>Highscores per Game</h5>
              <div class="card-body">
                <ol>
                  <li><router-link to="/detail-games">Demo Game 1 (3004)</router-link></li>
                  <li><router-link to="/detail-games">Demo Game 2 (2000)</router-link></li>
                  <li><router-link to="/detail-games">Demo Game 3 (1044)</router-link></li>
                  <li><router-link to="/detail-games">Demo Game 4 (1005)</router-link></li>
                </ol>
              </div>
              <h5>Authored Games</h5>
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

                
                <router-link to="/discover-games" class="btn btn-danger w-100">Back</router-link>

               </div>
             </div>  
            
         </div>
      </div>
    </main>
</template>