<template>
  <nav class="container-nav-forum">
    <ul class="nav-forum__item">
      <img
        v-bind:src="imageProfile"
        alt="image profile"
        class="nav-forum__image-profile"
      />
      <Dropdown
        v-bind:showMenu="showMenu"
        v-bind:dropdownIsActive="dropdownIsActive"
        v-bind:away="away"
      />

      <li v-on:click="btnLogout" class="nav-forum__logout">{{ logout }}</li>
    </ul>
  </nav>
</template>

<script>
import Dropdown from "./Dropdown";
export default {
  name: "NavBarForum",
  components: {
    Dropdown
  },
  props: {
    dropdownIsActive: {
      type: Boolean
    },
    showMenu: {
      type: Function
    },
    menuItem: {
      type: String
    },
    away: {
      type: Function
    },
    imageProfile: {
      type: String
    },
    logout: {
      type: String
    },
    btnLogout: {
      type: Function
    }
  }
};
</script>
<style lang="scss" scoped>
.container-nav-forum {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  position: fixed;
  border-bottom: 2px rgba(176, 176, 176, 0.66) solid;

  width: 100%;
}
.nav-forum__item {
  display: flex;
  align-items: center;
  list-style-type: none;
  justify-content: flex-end;
  width: 100%;
  height: 60px;
  padding: 35px 20px;
}
.nav-forum__image-profile {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: antiquewhite;
  border-bottom: 3px solid rgb(38, 102, 109);
  cursor: pointer;
}
.nav-forum__logout {
  margin-right: 20px;
  border: 2px rgb(38, 102, 109) solid;
  padding: 2px 15px;
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: 600;
  color: rgb(38, 102, 109);
}
</style>
