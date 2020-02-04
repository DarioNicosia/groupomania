<template>
  <transition name="slide-fade">
    <div v-if="formPostActive">
      <img v-on:click="backToForum" v-bind:src="arrow" alt="back arrow" class="arrow" />
      <div v-if="formPostActive" class="container-form-post">
        <h3 v-if="multimediaFormActive == false" class="header-form-post">Write your post</h3>
        <h3 v-else class="header-form-post">Upload your file</h3>
        <form v-on:submit="submitPost">
          <div class="form-section">
            <label for="title-post" class="form-post-label">Title</label>
            <input type="text" class="title-post" v-model="title" id="title-post" required />
          </div>
          <div v-if="multimediaFormActive == false" class="form-section">
            <label for="textarea-post" class="form-post-label">Post</label>
            <textarea
              name="post"
              id="textarea-post"
              cols="47"
              rows="11"
              v-model="postText"
              required
            ></textarea>
            <small class="count-characters">
              max
              <span
                v-bind:class="{ warn_character: warnLimitCharacter }"
              >{{ countCharacters }}/500</span>
              characters
            </small>
          </div>
          <div v-else class="form-section">
            <FilePond
              accepted-file-types="image/jpeg, image/png, image/jpg, video/mp4, video/quicktime"
              required="true"
              name="multimedia"
              allow-multiple="false"
              :maxFileSize="maxFileSize"
              :server="server"
              labelTapToRetry=" "
              labelTapToUndo=" "
              labelButtonRemoveItem=" "
            />
          </div>
          <button
            v-if="multimediaFormActive == false"
            v-bind:class="{ btn_disabled: warnLimitCharacter }"
            class="form-post-button"
            type="submit"
            :disabled="warnLimitCharacter"
          >Submit</button>
        </form>
        <button
          v-if="multimediaFormActive"
          class="form-post-button"
          type="click"
          v-on:click="refresh"
        >Uploaded</button>
      </div>
    </div>
  </transition>
</template>

<script>
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
export default {
  name: "FormPost",
  components: {
    FilePond: vueFilePond(
      FilePondPluginImagePreview,
      FilePondPluginFileValidateType,
      FilePondPluginFileEncode,
      FilePondPluginFileValidateSize
    )
  },

  props: {
    formPostActive: {
      type: Boolean
    },
    multimediaFormActive: {
      type: Boolean
    },
    refresh: {
      type: Function
    },
    arrow: {
      type: String
    },
    backToForum: {
      type: Function
    }
  },
  computed: {
    countCharacters() {
      let removeWhiteSpace = this.postText.replace(/\s/g, "");
      return removeWhiteSpace.length;
    },
    warnLimitCharacter() {
      let removeWhiteSpace = this.postText.replace(/\s/g, "");
      if (removeWhiteSpace.length > 500) {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      title: "",
      postText: "",
      myFiles: [],
      maxFileSize: "100MB",
      multimediaUploaded: false,
      allowImagePreview: true,
      server: {
        url: "https://server-groupomania.herokuapp.com/",
        timeout: 7000,
        process: {
          url: "api/multimedia",
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
          ondata: formData => {
            formData.append("title", this.title);
            formData.append("userId", this.$route.params.id);
            formData.append("createdBy", localStorage.getItem("name"));
            return formData;
          }
        }
      }
    };
  },

  methods: {
    submitPost(event) {
      if (this.formPostActive) {
        event.preventDefault();
        const id = this.$route.params.id;
        let url = "https://server-groupomania.herokuapp.com/";

        try {
          const createPost = async () => {
            let response = await fetch(url + "api/post/" + id, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
              },
              body: JSON.stringify({
                userId: id,
                title: this.title,
                post: this.postText,
                createdBy: localStorage.getItem("name")
              })
            });
            return response.json();
          };
          createPost().then(() => {
            window.location = "/forum/" + id;
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script>

<style  scoped>
.container-form-post {
  width: 400px;
  padding: 25px;

  border-radius: 5px;
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.173);
}
.form-post-label {
  display: block;
  text-align: left;
  font-weight: 600;
}
.title-post {
  width: 100%;
  border-radius: 5px;
  border: 2px rgba(176, 176, 176, 0.66) solid;

  padding: 8px;
  font-size: 1rem;
  outline: none;
}
textarea {
  width: 100%;
  border-radius: 5px;
  border: 2px rgba(176, 176, 176, 0.66) solid;
  box-shadow: 2px 2px 2px -8px rgba(0, 0, 0, 0.75);
  padding: 8px;
  font-size: 1rem;
  outline: none;
}
.form-section {
  margin: 15px 0;
}
.form-post-button {
  width: 100%;
  background-color: rgb(38, 102, 109);
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
.btn_disabled {
  background-color: rgba(38, 102, 109, 0.434);
}
.count-characters {
  display: block;
  text-align: left;
  font-weight: 500;
  font-size: 0.7rem;
  color: rgb(120, 120, 120);
}
.arrow {
  position: relative;
  right: 50%;
  top: 30px;
  box-shadow: 2px 2px 2px -8px rgba(0, 0, 0, 0.75);
  cursor: pointer;
}
.warn_character {
  color: rgb(210, 28, 28);
}
.slide-fade-enter-active {
  transition: all 1.1s ease;
}
.slide-fade-leave-active {
  transition: all 1.5s ease;
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
