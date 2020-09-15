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
}
