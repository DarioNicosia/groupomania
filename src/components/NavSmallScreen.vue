<template>
  <v-container
    class="justify-space-around d-none mt-0 icon-backround py-1"
    :class="{ 'd-flex': $vuetify.breakpoint.smAndDown }"
  >
    <div class="dropdown-container-profile">
      <v-icon color="white" size="30" class="pt-0 pb-0" v-on:click="showMenuProfile">mdi-account</v-icon>
      <transition name="slide-fade">
        <ul
          v-on-clickaway="away"
          v-if="dropdownProfileIsActive"
          class="container-menu--profile"
          :class="{
            'container-menu--profile--small': $vuetify.breakpoint.smAndDown
          }"
        >
          <li v-on:click="deleteAccount()" class="menu-item">Delete Account</li>
        </ul>
      </transition>
    </div>
    <div class="dropdown-container">
      <v-icon
        v-on:click="showMenu"
        style="cursor:pointer"
        color="white"
        size="30"
        class="py-0"
      >mdi-cloud-upload</v-icon>
      <transition name="slide-fade">
        <ul v-on-clickaway="away" v-if="dropdownIsActive" class="container-menu">
          <li v-on:click="openWrittenPostWindow()" class="menu-item">Write a post</li>
          <li v-on:click="openMultimediaWindow()" class="menu-item">Multimedia</li>
        </ul>
      </transition>
    </div>
    <div>
      <v-icon color="white" class="pt-0 pb-0" size="30" v-on:click="unreadBtn">mdi-email</v-icon>
      <span v-if="userRead == false" class="unread-post-count text--white">
        {{
        unreadPostLength
        }}
      </span>
    </div>
  </v-container>
</template>

<script>
import { directive as onClickaway } from "vue-clickaway";
export default {
  directives: {
    onClickaway: onClickaway
  },
  name: "NavSmallScreen",
  props: {
    unreadPostLength: {
      type: Number
    },
    userRead: {
      type: Boolean
    },
    unreadBtn: {
      type: Function
    },
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
    openWrittenPostWindow: {
      type: Function
    },
    openMultimediaWindow: {
      type: Function
    },
    showMenuProfile: {
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
<style scoped>
.unread-post-count {
  position: relative;
  top: -10px;
  left: -10px;
  padding: 2px 6px;
  background-color: rgba(177, 18, 50, 0.886);
  color: white;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 800;
  text-shadow: 15px 15px 28px -13px rgb(84, 83, 84);
}
.dropdown-container {
  width: 50px;
  margin: 0 20px 0 0;
}

.dropdown-container-profile {
  width: 50px;
}

.container-menu {
  position: fixed;
  background-color: rgb(38, 102, 109);
  padding: 5px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
}
.container-menu--profile {
  position: fixed;
  background-color: rgb(38, 102, 109);
  padding: 5px;
  margin-top: 20px;

  border-radius: 10px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
}

.container-menu--profile--small {
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

.icon-backround {
  background-color: rgb(38, 102, 109);
  z-index: 100;
}
</style>
