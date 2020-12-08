import VueSelect from 'vue-select';
import pageComponents from '@internal/page-components'
import 'bootstrap/dist/css/bootstrap-grid.css';


export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.component('v-select', VueSelect);


}
