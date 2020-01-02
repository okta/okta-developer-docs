import VueSelect from 'vue-select';
import VueNavigationBar from 'vue-navigation-bar';

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.component('v-select', VueSelect);
  Vue.component('v-navigation-bar', VueNavigationBar);
}