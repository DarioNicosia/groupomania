<template>
  <div>
    <div class="container-nav">
      <NavBarForum
        v-bind:imageProfile="imageProfile"
        v-bind:showMenu="showMenu"
        v-bind:dropdownIsActive="dropdownIsActive"
        v-bind:away="away"
        v-bind:logout="logout"
        v-bind:btnLogout="btnLogout"
        v-bind:openWrittenPostWindow="openWrittenPostWindow"
        v-bind:openMultimediaWindow="openMultimediaWindow "
      />
    </div>

    <div class="side-menu-container">
      <SideMenu v-bind:logo="logo" v-bind:user="userName" v-bind:refresh="refresh" />
    </div>
    <div class="display-post-container">
      <DisplayPost
        v-for="post in posts"
        v-bind:key="post._id"
        v-bind:title="post.title"
        v-bind:createdBy="post.createdBy"
        v-bind:post="post.post"
        v-bind:date="post.date"
        v-bind:imageUrl="post.imageUrl"
        v-bind:videoUrl="post.videoUrl"
        v-bind:formPostActive="formPostActive"
      />
      <FormPost
        v-bind:formPostActive="formPostActive"
        v-bind:multimediaFormActive="multimediaFormActive "
        v-bind:refresh="refresh"
      />
    </div>
  </div>
</template>

<script>
import NavBarForum from "../components/NavBarForum";
import SideMenu from "../components/SideMenu";
import DisplayPost from "../components/DisplayPost";
import FormPost from "../components/FormPost";
export default {
  name: "Forum",
  components: {
    NavBarForum,
    SideMenu,
    DisplayPost,
    FormPost
  },
  computed: {
    userName() {
      return localStorage.getItem("name");
    }
  },
  data() {
    return {
      dropdownIsActive: false,
      imageProfile: require("../assets/user.svg"),
      logout: "Logout",
      logo: require("../assets/rsz_1icon_white.png"),
      posts: [],
      formPostActive: false,

      multimediaFormActive: false
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
    },
    openWrittenPostWindow() {
      this.formPostActive = true;
      this.multimediaFormActive = false;
    },
    openMultimediaWindow() {
      this.formPostActive = true;
      this.multimediaFormActive = true;
    },
    backToForum() {
      this.formPostActive = false;
      this.multimediaFormActive = false;
    }
  },
  created() {
    try {
      const getPost = async () => {
        let response = await fetch("http://localhost:3000/api/post/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        });
        return response.json();
      };
      getPost().then(allPost => {
        let post = allPost.slice(0).reverse();
        console.log(post);
        this.posts = post;
      });
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style lang="scss" scoped>
.container-nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
.display-post-container {
  margin: 100px auto;
  width: 400px;
}
.side-menu-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
}
</style>
