<template>
  <section class="text-sm">
    <h1 class="text-2xl font-bold text-blue-600">Hi, {{ user.name }}</h1>
    <h3 class="mt-6">Write a new post</h3>
    <div class="mt-2">
      <input
        class="p-2 rounded w-full border"
        type="text"
        placeholder="Title"
        v-model="title"
      />
      <div v-if="isTitleInvalid" class="text-red-600 text-xs mt-2">
        Enter Title
      </div>
    </div>
    <div class="mt-4">
      <textarea
        class="p-2 rounded w-full border"
        v-model="description"
        placeholder="Description"
      ></textarea>
      <div v-if="isDescInvalid" class="text-red-600 text-xs mt-2">
        Enter Description
      </div>
    </div>
    <div class="mt-2">
      <button
        v-if="loading === 'addPost'"
        class="px-4 py-2 rounded bg-blue-600 text-white"
      >
        Adding...
      </button>
      <button
        class="px-4 py-2 rounded bg-blue-600 text-white"
        v-else
        @click="addNewPost()"
      >
        Add
      </button>

      <div class="mt-10 text-gray-500">Also supports Mobile UI.</div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  data() {
    return {
      loading: "",
      title: "",
      description: "",
      isTitleInvalid: "",
      isDescInvalid: "",
    };
  },
  methods: {
    isPostNotValid() {
      if (this.title === "") {
        this.isTitleInvalid = true;
      } else {
        this.isTitleInvalid = false;
      }
      if (this.description === "") {
        this.isDescInvalid = true;
      } else {
        this.isDescInvalid = false;
      }

      return this.isTitleInvalid || this.isDescInvalid;
    },
    async addNewPost() {
      if (this.isPostNotValid()) {
        return;
      }
      const user = this.$store.state.user;
      this.loading = "addPost";
      const res = await this.$axios.post(`/posts`, {
        title: this.title,
        body: this.description,
        userId: user.id,
      });
      this.loading = "";
      if (res.data.id) {
        this.title = "";
        this.description = "";
        alert(
          `New post added.


JSONPlaceholder NOTE: resource will not be really updated on the server but it will be faked as if.`
        );
      }
      console.log("res", res.data);
    },
  },
};
</script>
