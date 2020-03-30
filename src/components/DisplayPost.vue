<template>
  <transition name="slide-fade">
    <div
      v-if="formPostActive == false"
      class="container-posts"
      :class="{'container-posts-small-screen': $vuetify.breakpoint.mdAndDown}"
    >
      <h1 class="post-title">{{ title }}</h1>
      <small class="small">{{ createdBy }}</small>
      <div class="second-container-post">
        <p class="post">{{ post }}</p>

        <Media v-if="videoUrl" :kind="'video'" :controls="true" width="100%" :src="videoUrl"></Media>
        <img
          v-if="imageUrl"
          v-bind:src="imageUrl"
          v-bind:alt="nameAltTag"
          width="100%"
          class="image-post"
        />
      </div>
      <small class="small font-weight-medium caption mt-5 grey--text">{{ date }}</small>
    </div>
  </transition>
</template>

<script>
import Media from "@dongido/vue-viaudio";
export default {
  name: "DisplayPost",
  components: {
    Media
  },
  props: {
    title: {
      type: String
    },
    createdBy: {
      type: String
    },
    post: {
      type: String
    },
    imageUrl: {
      type: String
    },
    date: {
      type: String
    },
    videoUrl: {
      type: String
    },
    formPostActive: {
      type: Boolean
    },
    forumActive: {
      type: Boolean
    }
  },
  computed: {
    nameAltTag() {
      return "image posted by " + this.createdBy;
    }
  }
};
</script>

<style scoped>
.container-posts {
  width: 480px;
  text-align: left;
  margin-bottom: 25px;
}
.container-posts-small-screen {
  width: 100%;

  margin-bottom: 25px;
}
.post-title {
  text-transform: uppercase;
  font-size: 1.1rem;
  margin-bottom: -5px;
}
.post {
  font-weight: 500;
  font-size: 1.1rem;
  margin-bottom: 3px;
}
.small {
  font-weight: 600;
  color: rgb(38, 102, 109);
  font-size: 0.8rem;
}
.second-container-post {
  margin-top: 5px;
  margin-bottom: -10px;
}
.slide-fade-enter-active {
  transition: all 0.9s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter {
  transform: translateY(-10px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
