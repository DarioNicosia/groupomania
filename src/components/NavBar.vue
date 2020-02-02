<template>
  <nav class="nav-container">
    <ul class="nav-item">
      <div class="nav-logo" v-on:click="reload">
        <img class="nav-image" v-bind:src="logo" />
      </div>
      <li
        v-on:click="signupBtn()"
        class="nav-link signup"
        v-bind:class="{ selected: signupWindowOpen }"
      >
        {{ signUp }}
      </li>
      <li
        v-on:click="loginBtn()"
        class="nav-link login"
        v-bind:class="{ selected: signupWindowOpen == false }"
      >
        {{ login }}
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",

  props: {
    brandLogo: {
      type: String
    },
    logo: {
      type: String
    },
    signupBtn: {
      type: Function
    },
    loginBtn: {
      type: Function
    },
    signUp: {
      type: String
    },
    login: {
      type: String
    },
    signupWindowOpen: {
      type: Boolean
    },
    reload: {
      type: Function
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-container {
  position: relative;
}
.nav-item {
  display: flex;
  align-items: center;
  list-style-type: none;

  width: 100%;
  height: 80px;
  padding: 10px;
}
.nav-logo {
  margin-right: auto;
  margin-left: 20px;
  margin-top: 5px;
  width: 10px;
}
.nav-image {
  width: 3rem;
  cursor: pointer;
}
.nav-link {
  margin: 10px;
  color: #ffff;

  padding: 5px 15px;
  border: 3px transparent solid;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}

.nav-link:hover {
  background-color: rgba(38, 102, 109, 0.81);
  color: #ffff;
  border: 3px transparent solid;
}

.nav-link.login {
  margin-right: 40px;
}

.selected {
  background-color: rgba(38, 102, 109, 0.81);
  color: #ffff;
  border: 3px transparent solid;
  box-shadow: 8px 8px 8px -8px rgba(0, 0, 0, 0.75);
}
</style>
