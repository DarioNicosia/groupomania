<template>
  <div class="header-container">
    <img v-bind:src="brandLogo" alt="logo" class="header__image" />

    <h3 class="header__sub">Share Ideas. Build Networks</h3>
    <h3 class="header__sub">Let's create a stronger team</h3>
    <h3 class="header__sub header__underline">Togheter</h3>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    brandLogo: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  position: relative;
  flex-basis: 40%;
}
.header__image {
  text-align: left;
  background-color: rgba(38, 102, 109, 0.81);
  padding: 10px 10px;
  box-shadow: 8px 8px 5px -8px rgba(0, 0, 0, 0.75);
  border-radius: 4px;
}

.header__sub {
  text-align: left;
  font-size: 1.6rem;
  color: #ffff;
}
</style>


