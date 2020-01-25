<template>
  <div>
    <NavBarForum
      v-bind:imageProfile="imageProfile"
      v-bind:showMenu="showMenu"
      v-bind:dropdownIsActive="dropdownIsActive"
      v-bind:away="away"
      v-bind:logout="logout"
      v-bind:btnLogout="btnLogout"
    />
    <div class="forum-container">
      <SideMenu
        v-bind:logo="logo"
        v-bind:user="userName"
        v-bind:refresh="refresh"
      />
    </div>
  </div>
</template>

<script>
import NavBarForum from "../components/NavBarForum";
import SideMenu from "../components/SideMenu";
export default {
  name: "Forum",
  components: {
    NavBarForum,
    SideMenu
  },
  computed: {
    userName() {
      return localStorage.getItem("name");
    }
  },
  data() {
    return {
      dropdownIsActive: false,
      imageProfile: require("../assets/icon-left-white.svg"),
      logout: "Logout",
      logo: require("../assets/rsz_1icon_white.png"),
      user: "Dario Nicosia"
    };
  },
  methods: {
    showMenu() {
      this.dropdownIsActive = true;
    },
    away() {
      this.dropdownIsActive = false;
    },
    refresh() {
      location.reload();
    },
    btnLogout() {
      localStorage.clear();
      window.location = "/";
    }
  }
};
</script>
