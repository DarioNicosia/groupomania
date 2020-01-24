<template>
  <div class="container-form">
    <h1 v-if="signupWindowOpen" class="title-form">{{signUpTitle}}</h1>
    <h1 v-else class="title-form">{{loginTitle}}</h1>
    <h4
      v-if="signupWindowOpen"
      class="signup-subtitle title-form"
    >Create your account now and start join Groupomania community</h4>
    <h4 v-else class="login-subtitle title-form">Welcome back!</h4>

    <form v-on:submit="submitForm">
      <label v-if="signupWindowOpen" class="label" for="name">Name</label>
      <input
        v-if="signupWindowOpen"
        type="text"
        class="name form-item"
        placeholder="insert your name"
        id="name"
        v-model="name"
        required
      />
      <label class="label" for="email">Email</label>
      <input
        type="text"
        class="email form-item"
        v-model="email"
        placeholder="insert your email"
        id="email"
        required
      />
      <small
        v-if="signUpError && signupWindowOpen"
        class="form-warning"
      >This email already exists. Please use another email or login</small>
      <label class="label" for="password">Password</label>
      <input
        type="text"
        v-model="password"
        class="password form-item"
        placeholder="insert your password"
        required
      />
      <button type="submit" class="btn-form form-item">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Form",
  props: {
    signUpTitle: {
      type: String
    },
    loginTitle: {
      type: String
    },
    signupWindowOpen: {
      type: Boolean
    },
    signUpError: {
      type: Boolean
    }
  },
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
      const newForm = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      this.$emit("form-submitted", newForm);
    }
  }
};
</script>

<style lang="scss" scoped>
.container-form {
  background-color: rgba(240, 248, 255, 0.612);
  padding: 15px;
  flex-basis: 40%;
  position: relative;
  text-align: left;
  box-shadow: 8px 8px 8px -8px rgba(0, 0, 0, 0.75);
}

input[type="text"] {
  width: 100%;
  padding: 6px 10px;
  margin: 0 0 5px 0;
  display: inline-block;
  border: 1px solid #ccc;
  font-size: 15px;
  box-sizing: border-box;
  outline-color: rgba(38, 102, 109, 0.468);
  background-color: transparent;
  border-color: transparent;
  border-bottom-color: rgba(38, 102, 109, 0.468);
  border-bottom: 2px rgba(38, 102, 109, 0.468) solid;
}

.title-form {
  text-align: center;
}
.label {
  font-weight: bold;
  margin-bottom: 30px;
}

.btn-form {
  width: 100%;
  background-color: rgba(38, 102, 109, 0.81);
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 8px 8px 8px -8px rgba(0, 0, 0, 0.75);
}

.form-warning {
  display: block;
  margin-bottom: 5px;
  color: rgb(189, 33, 33);
  font-weight: bold;
  font-size: 11px;
}
</style>