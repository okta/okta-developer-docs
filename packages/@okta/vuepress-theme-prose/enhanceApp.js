import VueSelect from 'vue-select';
import pageComponents from '@internal/page-components'
import 'bootstrap/dist/css/bootstrap-grid.css';
import PortalVue from 'portal-vue';
import GeneratedContentLayout from './components/GeneratedContentLayout.vue'
import {
  concepts,
  guides,
  languagesSdk,
  reference,
  releaseNotes
} from "./const/navbar.const";


export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.use(PortalVue);
  Vue.component('v-select', VueSelect);

  let arrayOfDocs = [concepts, guides, languagesSdk, reference, releaseNotes].map(el => el[0]);
  function sanitizeTitle(el) {
    if (el.guideName) {
      return el.guideName;
    }
    return el.title.toLowerCase().replace(/ /ig, '-').replace(/\//ig, '-');
  }
  
  function generatedLinks(arr, parent = null) {
    for(let el of arr) {
      if (!el.path) {
        let path = parent.path + sanitizeTitle(el);
        if (!el.guideName) {
          router.addRoutes([
            { path: path, component: GeneratedContentLayout, name: path },
          ]);
        }
        el.path = path + '/';
      }
      if (el.subLinks && el.subLinks.length > 0) {
        generatedLinks(el.subLinks, el);
      }
    }
  }
  generatedLinks(arrayOfDocs);

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
