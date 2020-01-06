import VueSelect from 'vue-select';
import VueNavigationBar from 'vue-navigation-bar';
import pageComponents from '@internal/page-components'

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.component('v-select', VueSelect);
  Vue.component('v-navigation-bar', VueNavigationBar);

  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }

}