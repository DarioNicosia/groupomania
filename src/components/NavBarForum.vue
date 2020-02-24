<template>
  <nav class="container-nav-forum">
    <div
      class="nav-logo d-none "
      v-on:click="refresh"
      :class="{ 'd-block': $vuetify.breakpoint.mdAndDown }"
    >
      <img class="nav-image" v-bind:src="logo" />
    </div>
    <ul class="nav-forum__item">
      <DropdownProfile
        class="d-none d-md-block"
        v-bind:showMenuProfile="showMenuProfile"
        v-bind:imageProfile="imageProfile"
        v-bind:away="away"
        v-bind:dropdownProfileIsActive="dropdownProfileIsActive"
        v-bind:deleteAccount="deleteAccount"
      />
      <Dropdown
        class="d-none d-md-block"
        v-bind:showMenu="showMenu"
        v-bind:dropdownIsActive="dropdownIsActive"
        v-bind:away="away"
        v-bind:openWrittenPostWindow="openWrittenPostWindow"
        v-bind:openMultimediaWindow="openMultimediaWindow"
      />

      <li v-on:click="btnLogout" class="nav-forum__logout">{{ logout }}</li>
    </ul>
  </nav>
</template>

<script>
import Dropdown from "./Dropdown";
import DropdownProfile from "./DropdownProfile";
export default {
  name: "NavBarForum",
  components: {
    Dropdown,
    DropdownProfile
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
    },
    refresh: {
      type: Function
    },
    logo: {
      type: String
    }
  }
};
</script>
<style lang="scss" scoped>
.container-nav-forum {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  border-bottom: 1px rgb(240, 240, 240) solid;
  width: 100%;

  background-color: rgba(254, 254, 254, 0.872);
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
.nav-logo {
  margin-right: auto;
  margin-left: 20px;
  margin-top: 5px;
  width: 10px;
  cursor: pointer;
  z-index: 1;
}
.nav-image {
  width: 3rem;
  padding: 8px;
  border-radius: 50%;
  border: 2px solid rgb(38, 102, 109);
  cursor: pointer;
  background: rgb(38, 102, 109);
  z-index: 1;
}
</style>
