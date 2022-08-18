<template>
  <nav
    class="fixed top-0 right-0 left-0 flex justify-between items-center px-10 w-full bg-blue-600 text-white sm:h-12 h-16 z-20"
  >
    <section class="sm:flex items-end">
      <div class="font-bold text-xl mr-2">Blog Demo</div>
      <div class="text-xs font-normal pb-1">powered by JSONPlaceholder</div>
    </section>

    <div
      v-if="user.name"
      class="cursor-pointer hover:underline"
      @click="logout()"
    >
      Logout
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("user", {});
      location.reload("/login");
    },
  },
};
</script>

<style></style>
