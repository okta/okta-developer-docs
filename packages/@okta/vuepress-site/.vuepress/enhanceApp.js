var redirectsJson = require('./redirects.json');
import pageComponents from '@internal/page-components'
import Guides from '@okta/vuepress-theme-default/layouts/Guides.vue';

export default ({ router, Vue }) => {
  router.addRoutes(redirectsJson);
  router.addRoutes([
    {
      path: '/guides/:guide?/:framework?/:section?',
      component: Guides,
    },
  ]);
}
