<template>
  <div class="flex justify-center items-center h-screen">
    <div class="bg-blue-50 p-10 rounded sm:w-1/3">
      <div class="text-xs">
        Developed using Javascript, will soon upskill to TypeScript..
      </div>
      <h1 class="text-2xl mt-6">Login</h1>

      <section class="mt-6">
        <div class="">
          Email <span class="text-gray-400">ex: Karley_Dach@jasper.info</span>
        </div>
        <div class="mt-2">
          <input
            type="text"
            v-model="email"
            class="p-2 rounded w-full"
            placeholder="Email"
          />
          <div v-if="isEmailInvalid" class="text-red-600 text-xs mt-2">
            Please enter a valid email
          </div>
        </div>
        <div>
          <button
            v-if="isLoading"
            class="px-4 py-2 rounded bg-blue-600 text-white mt-6"
          >
            Loggin in...
          </button>
          <button
            v-else
            @click="getAllUsers()"
            class="px-4 py-2 rounded bg-blue-600 text-white mt-6"
          >
            Login
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      isLoading: false,
      users: [],
      email: "",
      isEmailInvalid: false,
      emailRegex:
        /^[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/,
    };
  },
  methods: {
    // in https://jsonplaceholder.typicode.com/ ddnt find any mock api for Login
    async getAllUsers() {
      if (!this.emailRegex.test(this.email)) {
        this.isEmailInvalid = true;
        return;
      }
      this.isEmailInvalid = false;
      this.isLoading = true;
      const res = await this.$axios.get(`/users`);
      this.isLoading = false;
      this.users = res.data;

      if (this.users.length > 0) {
        this.checkUserExists();
      }
      console.log("res", res.data);
    },
    checkUserExists() {
      const email = this.email.trim();
      const matchingUser = this.users.filter((user) => user.email === email);
      console.log("matching user ", matchingUser);
      if (matchingUser.length > 0) {
        this.$store.dispatch("user", matchingUser[0]);
        location.reload("/");
      } else {
        alert("No user found for the given email");
      }
    },
  },
};
</script>

<style></style>
