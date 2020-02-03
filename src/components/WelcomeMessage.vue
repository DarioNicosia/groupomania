<template>
  <div class="container-message">
    <div class="message">
      <h3 class="welcome_header">Welcome to Groupomania Family!</h3>
      <p>
        Click on unread post button on side menu to get update
        <br />on the latest news from our community.
        <br />Or just write your first post,
        publish photo and video
      </p>
    </div>
    <div>
      <img v-bind:src="imageWelcome" alt="welcome illustration" class="image-welcome" />
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
  max-width: 800px;
  justify-content: space-between;
  align-items: center;
  margin: 25vh auto;
}
.image-welcome {
  max-width: 300px;
}
.message {
  font-size: 1.1rem;
}
.welcome_header {
  font-size: 1.2rem;
}
</style>