<template>
  <div
    class="container-message"
    :class="{'container-message-small ': $vuetify.breakpoint.mdAndDown}"
  >
    <div class="message" :class="{'mx-auto': $vuetify.breakpoint.mdAndDown}">
      <h3 class="welcome_header mr-2 ml-2">Welcome to Groupomania Family!</h3>
      <p class="welcome-message mr-2 ml-2">
        Click on unread posts on side menu to get update
        on the latest news from our community.
        Or just write your first post,
        publish photo and video
      </p>
    </div>
    <div>
      <img
        v-bind:src="imageWelcome"
        alt="welcome illustration"
        class="image-welcome"
        :class="{'d-none': $vuetify.breakpoint.mdAndDown}"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "WelcomeMessage",
  props: {
    imageWelcome: {
      type: String
    }
  }
};
</script>

<style scoped>
.container-message {
  display: flex;

  max-width: 700px;
  justify-content: space-between;
  align-items: center;
  margin: 28vh auto;
}
.container-message-small {
  display: flex;

  max-width: 450px;

  align-items: center;
  margin: 25vh auto;
}
.image-welcome {
  max-width: 250px;
}
.message {
  margin-left: 20px;
  text-align: left;
}
.welcome_header {
  font-size: 1.6rem;
}

.welcome-message {
  font-size: 1.085rem;
  margin-top: 10px;
}
</style>