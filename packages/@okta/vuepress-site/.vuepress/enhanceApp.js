import pageComponents from '@internal/page-components'
import Guides from '@okta/vuepress-theme-default/layouts/Guides.vue';

export default ({ router, Vue }) => {
  router.addRoutes([
    {
      path: '/docs/guides/:guide?/:framework?/:section?',
      component: Guides,
    },
  ]);
}
