import VueSelect from 'vue-select';
import pageComponents from '@internal/page-components'
import VueBrowserUpdate from 'vue-browserupdate';

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.component('v-select', VueSelect);

  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }

  Vue.use(VueBrowserUpdate, {
    options: {
      required: {e:-4,f:-3,o:-3,s:-1,c:-3},
      text: "Your web browser ({brow_name}) is not supported. For the best site experience, we recommend updating your browser. <br> <a{up_but}>Update browser</a> <a{ignore_but}>Ignore</a>"
    },
  });

}
