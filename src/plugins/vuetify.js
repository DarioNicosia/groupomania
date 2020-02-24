import Vue from "vue";
import Vuetify from "vuetify/lib";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
Vue.component("font-awesome-icon", FontAwesomeIcon); // Register component globally
library.add(fas);

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "faSvg",
    values: {
      product: "mdi-dropbox",
      upload: "mdi-cloud_upload",
      steam: "mdi-steam-box",
      pc: "mdi-desktop-classic",
      xbox: "mdi-xbox",
      playstation: "mdi-playstation",
      switch: "mdi-nintendo-switch"
    }
  }
});
