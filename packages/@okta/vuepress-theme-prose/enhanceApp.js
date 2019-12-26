import vSelect from 'vue-select';

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.component('v-select', vSelect);
}