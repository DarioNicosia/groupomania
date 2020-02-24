<template>
  <section class="side-menu d-none d-md-block">
    <div class="container-image">
      <img v-on:click="refresh" v-bind:src="logo" alt="groupomania logo" class="img-side-menu" />
    </div>
    <h4 class="side-menu-header">User</h4>
    <p class="side-menu-second-header">{{ user }}</p>
    <h4 class="side-menu-header">Popular</h4>
    <p class="side-menu-second-header unreadPost" v-on:click="unreadBtn">
      Unread posts
      <span v-if="userRead == false" class="unread-post-count">{{ unreadPostLength }}</span>
    </p>
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
    },
    unreadPostLength: {
      type: Number
    },
    userRead: {
      type: Boolean
    },
    unreadBtn: {
      type: Function
    }
  }
};
</script>

<style scoped>
.side-menu {
  margin-right: 0;
  background-color: rgb(38, 102, 109);
  position: fixed;
  height: 100vh;
  padding: 20px;
  width: 200px;
  box-shadow: 7px 7px 8px -8px rgba(0, 0, 0, 0.75);
}
.img-side-menu {
  width: 100px;
  padding: 1px 20px;
  margin-bottom: 19px;
  cursor: pointer;
}
.side-menu-header {
  text-align: center;
  display: block;
  border-top: 1px rgb(176, 176, 176) solid;
  border-bottom: 1px rgb(176, 176, 176) solid;
  margin-left: 1px;
  color: rgb(176, 176, 176);
}

.side-menu-second-header {
  color: #ffffff;
  padding: 0 3px;
  font-weight: bold;
  font-size: 0.75rem;
  margin-top: 10px;
  margin-bottom: 25px;
  text-align: left;
  text-transform: uppercase;
}
.unread-post-count {
  margin-left: 10px;
  position: relative;
  right: 0px;
  left: 20px;
  background-color: rgba(177, 18, 50, 0.886);
  padding: 4px 9px;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 800;
  text-shadow: 15px 15px 28px -13px rgb(84, 83, 84);
}
.unreadPost {
  cursor: pointer;
}
</style>
