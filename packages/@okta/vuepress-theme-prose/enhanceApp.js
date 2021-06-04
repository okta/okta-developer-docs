import VueSelect from 'vue-select';
import pageComponents from '@internal/page-components'
import 'bootstrap/dist/css/bootstrap-grid.css';
import PortalVue from 'portal-vue';


export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.use(PortalVue);
  Vue.component('v-select', VueSelect);

  router.beforeEach((to, from, next) => {
    /**
     * Catch `404` in router and redirect to custom 404 page
     */
    if (to.matched.length > 0 && to.matched[0].path === "*") {
      next("/errors/404.html");
    } else {
      next();
    }
  });

}
