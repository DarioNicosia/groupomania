<template>
  <div class="dropdown-container">
    <img v-on:click="showMenuProfile" v-bind:src="imageProfile" class="image-profile" />
    <transition name="slide-fade">
      <ul v-on-clickaway="away" v-if="dropdownProfileIsActive" class="container-menu">
        <li v-on:click="deleteAccount()" class="menu-item">Delete Account</li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { directive as onClickaway } from "vue-clickaway";
export default {
  directives: {
    onClickaway: onClickaway
  },
  name: "DropdownProfile",
  props: {
    showMenuProfile: {
      type: Function
    },
    imageProfile: {
      type: String
    },
    away: {
      type: Function
    },
    dropdownProfileIsActive: {
      type: Boolean
    },
    deleteAccount: {
      type: Function
    }
  }
};
</script>
<style lang="scss" scoped>
.dropdown-container {
  margin-top: 2px;
}
.image-profile {
  width: 50px;
  height: 50px;
  margin-top: 6px;
  cursor: pointer;
}
.container-menu {
  position: fixed;
  right: 235px;
  background-color: rgb(38, 102, 109);
  padding: 5px;
  margin-top: 5px;

  border-radius: 10px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
}
.menu-item {
  padding: 5px;
  margin: 4px;
  list-style-type: none;
  color: #ffff;
  font-weight: bold;
  cursor: pointer;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>

