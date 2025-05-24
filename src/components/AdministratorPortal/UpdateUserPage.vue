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
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-6">
            <form @submit.prevent="updateUser">
              <!-- Username -->
              <div class="form-item card card-default my-4">
                <div class="card-body">
                  <div class="form-group">
                    <label for="username" class="mb-1 text-muted">
                      Username (Kosongkan jika tidak diubah)
                    </label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Username"
                      class="form-control"
                      v-model="form.username"
                    />
                  </div>
                </div>
              </div>

              <!-- Password -->
              <div class="form-item card card-default my-4">
                <div class="card-body">
                  <div class="form-group">
                    <label for="password" class="mb-1 text-muted">
                      Password (Kosongkan jika tidak diubah)
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      class="form-control"
                      v-model="form.password"
                    />
                  </div>
                </div>
              </div>

              <!-- Alert -->
              <div class="alert alert-danger" v-if="error">
                {{ error }}
              </div>
              <div class="alert alert-success" v-if="success">
                {{ success }}
              </div>

              <!-- Actions -->
              <div class="mt-4 row">
                <div class="col">
                  <button type="submit" class="btn btn-primary w-100">
                    Submit
                  </button>
                </div>
                <div class="col">
                  <router-link to="/admin/list-user" class="btn btn-danger w-100">
                    Back
                  </router-link>
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
import axios from "axios";

export default {
  name: "UpdateUser",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      error: "",
      success: "",
    };
  },
  methods: {
    async updateUser() {
      this.error = "";
      this.success = "";
      const id = this.$route.params.id;

      // Filter hanya kirim field yang tidak kosong
      const payload = {};
      if (this.form.username.trim() !== "") {
        payload.username = this.form.username.trim();
      }
      if (this.form.password.trim() !== "") {
        payload.password = this.form.password.trim();
      }

      if (Object.keys(payload).length === 0) {
        this.error = "Harap isi setidaknya satu field untuk diubah.";
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const url = `http://localhost:8000/api/v1/users/${id}`; 

        const response = await axios.put(url, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        });

        if (response.data.status === "success") {
          this.success = "Data berhasil diupdate.";
          this.form.username = "";
          this.form.password = "";
        }
      } catch (err) {
        const responseData = err.response?.data;
        if (responseData?.errors) {
          const errorMessages = Object.values(responseData.errors)
            .flat()
            .join(", ");
          this.error = errorMessages || responseData.message || "Update gagal.";
        } else {
          this.error = responseData?.message || "Terjadi kesalahan saat update.";
        }
      }
    }
  },
};
</script>
