<template>
  <section class="side-menu">
    <div class="container-image">
      <img
        v-on:click="refresh"
        v-bind:src="logo"
        alt="groupomania logo"
        class="img-side-menu"
      />
    </div>
    <h4 class="side-menu-header">User</h4>
    <p class="side-menu-second-header">{{ user }}</p>
    <h4 class="side-menu-header">Popular</h4>
    <p class="side-menu-second-header">Unread posts</p>
  </section>
</template>

<script>
export default {
  name: "SideMenu",
  props: {
    logo: {
      type: String
    },
    user: {
      type: String
    },
    refresh: {
      type: Function
    }
  }
};
</script>

<style lang="scss" scoped>
.side-menu {
  margin-right: 0;
  background-color: rgb(38, 102, 109);
  position: fixed;
  height: 100vh;
  padding: 20px;
  box-shadow: 7px 7px 8px -8px rgba(0, 0, 0, 0.75);
}
.img-side-menu {
  width: 100px;
  padding: 1px 20px;
  margin-bottom: 10px;
  cursor: pointer;
}
.side-menu-header {
  text-align: left;

  margin-left: 1px;
  color: rgb(176, 176, 176);
}
.side-menu-second-header {
  color: #ffffff;
  padding: 0 10px;
  font-weight: 600;
  margin-bottom: 25px;
}
</style>
