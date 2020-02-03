<template>
  <div>
    <deleteMessage
      v-if="messageDeleted"
      v-bind:imageDelete="imageDelete"
      v-bind:confirmDelete="confirmDelete"
    />
    <div v-else class="container-forum">
      <div class="container-nav">
        <NavBarForum
          v-bind:imageProfile="imageProfile"
          v-bind:showMenu="showMenu"
          v-bind:dropdownIsActive="dropdownIsActive"
          v-bind:away="away"
          v-bind:logout="logout"
          v-bind:btnLogout="btnLogout"
          v-bind:openWrittenPostWindow="openWrittenPostWindow"
          v-bind:openMultimediaWindow="openMultimediaWindow"
          v-bind:dropdownProfileIsActive="dropdownProfileIsActive"
          v-bind:deleteAccount="deleteAccount"
          v-bind:showMenuProfile="showMenuProfile"
        />
      </div>

      <div class="side-menu-container">
        <SideMenu
          v-bind:logo="logo"
          v-bind:user="userName"
          v-bind:unreadPostLength="unreadPostLength"
          v-bind:refresh="refresh"
          v-bind:userRead="userRead"
          v-bind:unreadBtn="unreadBtn"
        />
      </div>
      <WelcomeMessage v-if="userIsNew" v-bind:imageWelcome="imageWelcome" />
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
          v-bind:multimediaFormActive="multimediaFormActive"
          v-bind:refresh="refresh"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NavBarForum from "../components/NavBarForum";
import SideMenu from "../components/SideMenu";
import DisplayPost from "../components/DisplayPost";
import FormPost from "../components/FormPost";
import deleteMessage from "../components/deleteMessage";
import WelcomeMessage from "../components/WelcomeMessage";
export default {
  name: "Forum",
  components: {
    NavBarForum,
    SideMenu,
    DisplayPost,
    FormPost,
    deleteMessage,
    WelcomeMessage
  },
  computed: {
    userName() {
      return localStorage.getItem("name");
    },
    unreadPostLength() {
      return this.unRead.length;
    }
  },
  data() {
    return {
      dropdownIsActive: false,
      dropdownProfileIsActive: false,
      imageProfile: require("../assets/user.svg"),
      logout: "Logout",
      logo: require("../assets/rsz_1icon_white.png"),
      posts: [],
      unRead: [],
      userRead: true,
      formPostActive: false,
      url: "http://localhost:3000/",
      id: this.$route.params.id,
      multimediaFormActive: false,
      messageDeleted: false,
      imageDelete: require("../assets/sadface.svg"),
      imageWelcome: require("../assets/celebration.svg"),
      userIsNew: false
    };
  },
  methods: {
    showMenu() {
      this.dropdownIsActive = true;
    },
    showMenuProfile() {
      this.dropdownProfileIsActive = true;
    },
    away() {
      this.dropdownIsActive = false;
      this.dropdownProfileIsActive = false;
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
      this.userIsNew = false;
    },
    openMultimediaWindow() {
      this.formPostActive = true;
      this.multimediaFormActive = true;
      this.userIsNew = false;
    },
    backToForum() {
      this.formPostActive = false;
      this.multimediaFormActive = false;
    },
    deleteAccount() {
      try {
        const deleteAccountRequest = async () => {
          let responseRequest = await fetch(
            this.url + "api/account/" + this.id + "/delete",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            }
          );
          return responseRequest.json();
        };
        deleteAccountRequest().then(() => {
          this.messageDeleted = true;
          localStorage.clear();
        });
      } catch (error) {
        console.log(error);
      }
    },
    confirmDelete() {
      console.log("confirmed");
      window.location = "/";
    },
    unreadBtn() {
      const id = this.$route.params.id;
      let url = "http://localhost:3000/";
      console.log(this.unRead);
      try {
        const unreadRequest = async () => {
          let response = await fetch(url + "api/post/" + id + "/read", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
              userId: this.id,
              postsId: this.unRead
            })
          });
          return response.json();
        };
        unreadRequest().then(readPost => {
          console.log(readPost.message);
          location.reload();
        });
      } catch (error) {
        console.log(error);
      }
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

        post.forEach(posts => {
          if (posts.userRead.includes(this.id)) {
            this.posts.push(posts);
          } else {
            this.unRead.push(posts._id);
            this.userRead = false;
          }
        });
        if (this.posts.length == 0) {
          this.userIsNew = true;
        } else {
          this.userIsNew = false;
        }
        console.log(this.posts);
        console.log(this.unRead);
        //this.posts = this.postRead;
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
