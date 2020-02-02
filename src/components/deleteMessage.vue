<template>
  <div class="container-message">
    <div class="message">
      <h3>Your account has been deleted</h3>
      <p>
        We are sorry to see you go.
        <br />Feel free to come back whenever you want
      </p>
      <button v-on:click="confirmDelete" class="btn-confirmDelete">Ok</button>
    </div>
    <div>
      <img v-bind:src="imageDelete" alt="sad face illustration" class="image-delete-account" />
    </div>
  </div>
</template>

<script>
export default {
  name: "deleteMessage",
  props: {
    imageDelete: {
      type: String
    },
    confirmDelete: {
      type: Function
    }
  }
};
</script>

<style scoped>
.container-message {
  display: flex;
  max-width: 920px;
  justify-content: space-around;
  align-items: center;
  margin: 20vh auto;
}
.image-delete-account {
  max-width: 300px;
}
.btn-confirmDelete {
  width: 20%;
  background-color: rgba(38, 102, 109, 0.81);
  color: white;
  padding: 5px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 8px 8px 8px -8px rgba(0, 0, 0, 0.75);
}
</style>