<template>
  <div class="home">
    <NavBar
      v-bind:logo="logo"
      v-bind:signUp="signUp"
      v-bind:login="login"
      v-bind:signupBtn="signupBtn"
      v-bind:loginBtn="loginBtn"
      v-bind:signupWindowOpen="signupWindowOpen"
      v-bind:reload="reload"
    />
    <v-container
      class="container"
      style="max-width: 930px"
      :class="{'container-small-screen': $vuetify.breakpoint.mdAndDown}"
    >
      <Header v-bind:brandLogo="brandLogo" />
      <Form
        v-on:form-submitted="sendForm"
        v-bind:signUpTitle="signUpTitle"
        v-bind:loginTitle="loginTitle"
        v-bind:signupWindowOpen="signupWindowOpen"
        v-bind:signUpError="signUpError"
        v-bind:userNotFound="userNotFound"
        v-bind:wrongPassword="wrongPassword"
        v-bind:loading="loading"
        v-bind:clearField="clearField"
      />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Form from "../components/Form";

export default {
  name: "home",

  components: {
    NavBar,
    Header,
    Form
  },
  data() {
    return {
      brandLogo: require("../assets/icon-left-white.svg"),
      logo: require("../assets/rsz_1icon_white.png"),
      signUp: "Sign Up",
      login: "Login",
      signUpTitle: "Sign Up",
      loginTitle: "Login",
      signupWindowOpen: true,
      name: "",
      email: "",
      password: "",
      loading: false,
      signUpError: false,
      userNotFound: false,
      wrongPassword: false
    };
  },
  methods: {
    reload() {
      location.reload();
    },
    signupBtn() {
      this.signupWindowOpen = true;
    },
    loginBtn() {
      this.signupWindowOpen = false;
    },
    clearField() {
      console.log("clear");
      this.wrongPassword = false;
      this.signUpError = false;
      this.userNotFound = false;
    },

    sendForm(newForm) {
      this.loading = true;
      let url = "https://server-groupomania.herokuapp.com/";
      if (!newForm.name && this.signupWindowOpen) {
        alert("please fill all form field");
      } else if (!newForm.name) {
        try {
          const login = async () => {
            let loginResponse = await fetch(url + "api/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: newForm.email,
                password: newForm.password
              })
            });
            return loginResponse.json();
          };
          login().then(loginData => {
            if (loginData.status == 400) {
              this.userNotFound = true;
              this.loading = false;
            } else if (loginData.status == 401) {
              this.wrongPassword = true;
              this.loading = false;
            } else {
              localStorage.setItem("token", loginData.token);
              localStorage.setItem("name", loginData.userName);
              window.location = "/forum/" + loginData.userId;
              this.loading = false;
            }
          });
        } catch (error) {
          alert(error);
          this.loading = false;
        }
      } else {
        try {
          const signUp = async () => {
            let signUpResponse = await fetch(url + "api/auth/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: newForm.name,
                email: newForm.email,
                password: newForm.password
              })
            });
            return signUpResponse.json();
          };
          signUp().then(userData => {
            if (!userData.userId) {
              this.signUpError = true;
              this.loading = false;
            } else {
              const login = async () => {
                let loginResponse = await fetch(url + "api/auth/login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email: newForm.email,
                    password: newForm.password
                  })
                });
                return loginResponse.json();
              };
              login().then(loginData => {
                localStorage.setItem("token", loginData.token);
                localStorage.setItem("name", loginData.userName);
                window.location = "/forum/" + loginData.userId;
                this.loading = false;
              });
            }
          });
        } catch (error) {
          alert(error);
          this.loading = false;
        }
      }
    }
  }
};
</script>

<style>
.home {
  background-image: url("../assets/backgroung_image.jpg");
  background-size: cover;
  height: 100%;
  background-position: center;
}
.home:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(38, 102, 109, 0.31);
}

.image {
  position: relative;
}

.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 10vh auto;
}

.container-small-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 350px;
  min-height: 40%;
  align-items: center;
  margin: 4vh auto;
}
</style>
