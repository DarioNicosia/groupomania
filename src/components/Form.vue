<template>
  <div class="container-form px-5" :class="{'container-form-small': $vuetify.breakpoint.mdAndDown}">
    <h1 v-if="signupWindowOpen" class="title-form">{{ signUpTitle }}</h1>
    <h1 v-else class="title-form">{{ loginTitle }}</h1>
    <h4
      v-if="signupWindowOpen"
      class="signup-subtitle title-form mb-4"
    >Create your account now and start join Groupomania community</h4>
    <h4
      v-else
      class="login-subtitle title-form mb-4"
    >Welcome back! Find out what's going on in your community</h4>

    <v-form v-on:submit="submitForm" autocomplete="off" ref="form" v-model="valid">
      <div class="form-section">
        <label v-if="signupWindowOpen" class="label" for="name">Name</label>
        <v-text-field
          v-if="signupWindowOpen"
          color="rgba(38, 102, 109, 0.81)"
          class="name form-item pt-0"
          placeholder="insert your name"
          id="name"
          v-model="name"
          :rules="nameRules"
          required
        />
      </div>

      <div v-if="signupWindowOpen" class="form-section">
        <label class="label" for="email">Email</label>
        <v-text-field
          @click.tab="clearField"
          class="email form-item pt-0"
          color="rgba(38, 102, 109, 0.81)"
          v-model="email"
          placeholder="insert your email"
          id="email"
          :rules="emailRules"
          :error-messages="
            signUpError && signupWindowOpen ? 'this email already exists' : null
          "
          required
        />
      </div>

      <div v-else class="form-section">
        <label class="label" for="email">Email</label>
        <v-text-field
          @click.tab="clearField"
          class="email form-item pt-0"
          color="rgba(38, 102, 109, 0.81)"
          v-model="email"
          placeholder="insert your email"
          id="email"
          :rules="emailRules"
          :error-messages="
            userNotFound && signupWindowOpen == false
              ? 'User not found. Please try again '
              : null
          "
          required
        />
      </div>

      <div class="form-section">
        <v-label for="password">Password</v-label>
        <v-text-field
          v-model="password"
          @click.tab="clearField"
          class="password form-item pt-0"
          color="rgba(38, 102, 109, 0.81)"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
          :type="show1 ? 'text' : 'password'"
          placeholder="insert your password"
          :rules="passwordRules"
          :error-messages="
            wrongPassword && signupWindowOpen == false
              ? 'Wrong Password. Please try again'
              : null
          "
          required
        />
      </div>
      <v-btn
        type="submit"
        color="rgba(38, 102, 109,0.868)"
        class="btn-form form-item white--text"
        :loading="loading"
      >Submit</v-btn>
    </v-form>
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
    clearField: {
      type: Function
    },

    signupWindowOpen: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    signUpError: {
      type: Boolean
    },
    wrongPassword: {
      type: Boolean
    },
    userNotFound: {
      type: Boolean
    }
  },

  data() {
    return {
      name: "",
      email: "",
      password: "",
      show1: false,
      valid: true,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 15) || "Name must be less than 15 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 3) || "Name must be more than 3 characters"
      ]
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
        const newForm = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        this.$emit("form-submitted", newForm);
      }
    }
  }
};
</script>

<style scoped>
.container-form {
  background-color: rgba(240, 248, 255, 0.612);
  padding: 15px;
  flex-basis: 40%;
  position: relative;
  text-align: left;
  box-shadow: 8px 8px 8px -8px rgba(0, 0, 0, 0.75);
  border-radius: 4px;
}
.container-form-small {
  max-width: 400px;
}

.form-section {
  margin: -2px;
}

.title-form {
  text-align: center;
}
label {
  font-weight: bold !important;
}

.btn-form {
  width: 100%;
  background-color: rgba(38, 102, 109, 0.81) !important;
  color: rgba(38, 102, 109, 0.81);
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 8px 8px 8px -8px rgba(0, 0, 0, 0.75);
}

.btn-form:disabled {
  background-color: rgba(38, 102, 109, 0.434) !important;
}

.btn_disabled {
  background-color: rgba(38, 102, 109, 0.434) !important;
}

.form-warning {
  display: block;
  margin-bottom: 5px;
  color: rgb(189, 33, 33);
  font-weight: bold;
  font-size: 11px;
}
.v-text-field {
  font-weight: 500 !important;
  padding: -2px 10px !important;
  margin: 0 0 5px 0 !important;
  width: 100% !important;
}
.v-label {
  font-weight: bold !important;
  margin-bottom: -10px;
}

.v-btn[disabled] {
  border: 0px solid rgba(38, 102, 109, 0.468) !important;
  background-color: #26666d77 !important;
}
</style>
