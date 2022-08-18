<template>
  <div
    class="px-10 pt-20 pb-10 sm:flex h-screen overflow-y-scroll fixed top-0 right-0 left-0 bottom-0"
  >
    <div class="sm:w-3/5 w-full sm:pr-10 overflow-y-scroll">
      <!-- Posts -->
      <div v-if="loading === 'posts'">Loading...</div>
      <section v-else>
        <div v-for="post in posts" :key="post.id" class="mb-10 border-b pb-4">
          <h3 class="font-bold text-xl capitalize">{{ post.title }}</h3>
          <p class="mt-4 text-gray-700 font-normal">{{ post.body }}</p>
          <!-- Comments -->
          <section class="mt-4">
            <div
              @click="getCommentsByPostId(post.id)"
              class="text-xs underline cursor-pointer text-right"
              v-if="currPostId !== post.id"
            >
              View Comments
            </div>

            <div v-if="loading === 'comments' && currPostId === post.id">
              Loading....
            </div>
            <div v-else-if="currPostId === post.id">
              <!-- Add Comment -->
              <section>
                <div class="mt-2">
                  <div
                    v-if="loading === 'addComment'"
                    class="text-gray-600 text-xs mt-2"
                  >
                    Saving....
                  </div>
                  <input
                    class="p-2 rounded w-full border text-xs"
                    type="text"
                    placeholder="Write a comment and press Enter."
                    v-model="comment"
                    @keyup.enter="addComment()"
                  />
                  <div
                    v-if="isCommentInvalid"
                    class="text-red-600 text-xs mt-2"
                  >
                    Enter Comment
                  </div>
                </div>
              </section>
              <div
                v-for="comment in comments"
                :key="comment.id"
                class="bg-gray-50 text-xs p-4 border-b"
              >
                <div class="mt-4 font-bold capitalize">
                  {{ comment.name }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ comment.email }}
                </div>
                <div class="mt-4">"{{ comment.body }}"</div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
    <div class="sm:w-2/5 w-full sm:pl-10">
      <AddPost />
      <!-- Add New Post -->
    </div>
  </div>
</template>

<script>
import AddPost from "../components/AddPost.vue";
export default {
  components: { AddPost },
  name: "HomeView",
  data() {
    return {
      loading: "",
      posts: [],
      currPostId: undefined,
      comments: [],
      comment: "",
      title: "",
      description: "",
      isTitleInvalid: "",
      isDescInvalid: "",
      isCommentInvalid: "",
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    isCommentNotValid() {
      if (this.comment === "") {
        this.isCommentInvalid = true;
      } else {
        this.isCommentInvalid = false;
      }

      return this.isCommentInvalid;
    },
    async addComment(postId) {
      if (this.isCommentNotValid()) {
        return;
      }
      this.loading = "addComment";
      const res = await this.$axios.post(`/comments`, {
        body: this.comment,
        postId: postId,
      });
      this.loading = "";
      if (res.data.id) {
        this.comment = "";
        alert(
          `Comment added.

          
JSONPlaceholder NOTE: resource will not be really updated on the server but it will be faked as if.`
        );
      }
      console.log("res", res.data);
    },

    async getPostsByUserId() {
      const user = this.$store.state.user;
      this.loading = "posts";
      const res = await this.$axios.get(`/users/${user.id}/posts`);
      this.posts = res.data;
      console.log("res", res.data);
      this.loading = "";
    },

    async getCommentsByPostId(postId) {
      this.loading = "comments";
      const res = await this.$axios.get(`posts/${postId}/comments`);
      this.comments = res.data;
      console.log("res", res.data);
      this.loading = "";
      this.currPostId = postId;
    },
  },
  mounted() {
    this.getPostsByUserId();
  },
};
</script>
