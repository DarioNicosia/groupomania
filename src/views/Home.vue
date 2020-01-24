<template>
  <div class="home">
    <NavBar
      v-bind:brandLogo="brandLogo"
      v-bind:signUp="signUp"
      v-bind:login="login"
      v-bind:signupBtn="signupBtn"
      v-bind:loginBtn="loginBtn"
      v-bind:signupWindowOpen="signupWindowOpen"
    />
    <div class="container">
      <Header v-bind:brandLogo="brandLogo" />
      <Form
        v-on:form-submitted="sendForm"
        v-bind:signUpTitle="signUpTitle"
        v-bind:loginTitle="loginTitle"
        v-bind:signupWindowOpen="signupWindowOpen"
        v-bind:signUpError="signUpError"
      />
    </div>
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
      signUp: "Sign Up",
      login: "Login",
      signUpTitle: "Sign Up",
      loginTitle: "Login",
      signupWindowOpen: true,
      name: "",
      email: "",
      password: "",
      signUpError: false
    };
  },
  methods: {
    signupBtn() {
      this.signupWindowOpen = true;
    },
    loginBtn() {
      this.signupWindowOpen = false;
    },
    sendForm(newForm) {
      let url = "http://localhost:3000/";
      if (!newForm.name) {
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
            if (loginData.error) {
              alert("invalid email or password");
            } else if (loginData.error === 401) {
              alert("invalid password");
            } else {
              localStorage.setItem("token", loginData.token);
              localStorage.setItem("name", loginData.userName);
              window.location = "/forum/" + loginData.userId;
            }
          });
        } catch (error) {
          console.log(error);
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
              });
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.home {
  background-image: url("../assets/backgroung_image.jpg");
  background-size: cover;
  height: 100vh;
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
  max-width: 920px;
  justify-content: space-between;
  align-items: flex-start;
  margin: 12vh auto;
}
</style>
