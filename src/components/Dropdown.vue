<template>
  <div class="dropdown-container">
    <button v-on:click="showMenu" class="btn-upload">Upload</button>
    <transition name="slide-fade">
      <ul v-on-clickaway="away" v-if="dropdownIsActive" class="container-menu">
        <li class="menu-item">Write a post</li>
        <li class="menu-item">Multimedia</li>
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
  name: "Dropdown",
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
    }
  }
};
</script>
<style lang="scss" scoped>
.dropdown-container {
  width: 120px;
  margin: 0 20px;
}
.btn-upload {
  width: 80%;
  background-color: rgb(38, 102, 109);
  color: #ffff;
  outline: none;
  padding: 5px;
  border-color: transparent;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 7px 7px 8px -8px rgba(0, 0, 0, 0.75);
  cursor: pointer;
}
.container-menu {
  position: fixed;
  background-color: rgb(38, 102, 109);
  padding: 5px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
}

.menu-item {
  padding: 5px;
  margin: 7px;
  list-style-type: none;
  color: #ffff;
  font-weight: bold;
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
