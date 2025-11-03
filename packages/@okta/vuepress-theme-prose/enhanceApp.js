import VueSelect from "vue-select";
import "bootstrap/dist/css/bootstrap-grid.css";
import PortalVue from "portal-vue";
import { LAYOUT_CONSTANTS } from "./const/index.const";

function scrollToAnchor(to) {
  const targetAnchor = to.hash.slice(1);
  const targetElement = document.getElementById(targetAnchor);

  if (targetElement) {
    const scrollToPosition = targetElement.offsetTop - LAYOUT_CONSTANTS.ANCHOR_TOP_MARGIN;

    return window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
  } else {
    return false;
  }
}

export default ({ Vue, options, router, siteData }) => {
  Vue.use(PortalVue);
  Vue.component('v-select', VueSelect);

  router.beforeEach((to, from, next) => {
    /**
     * Catch `404` in router and redirect to custom 404 page
     */
    if (to.matched.length > 0 && to.matched[0].path === "*") {
      if (typeof window !== 'undefined' && window.location.hostname.startsWith('preview')) {
        async function processRedirects(yamlUrl) {
          try {
            const response = await fetch(yamlUrl);
            if (!response.ok) return;

            const yamlText = await response.text();
            const data = jsyaml.load(yamlText);

            data.redirects.forEach(entry => {
              const { from: from1, to: to1 } = entry;
              if ((from1.endsWith('.html') && from1.slice(0, -5) === to.path) || (to.path === from1)) {
                window.location.href = to1;
              }
            });
          } catch (error) {
            console.error('Error processing redirects:', error);
            next("/errors/404.html");
          }
        }

        processRedirects('/conductor/conductor.yml');
        
        return;
      }

      next("/errors/404.html");
    } else {
      next();
    }
  });

  router.options.scrollBehavior = (to, from, savedPosition) => {
    if(savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return scrollToAnchor(to);
    }
  };
};
