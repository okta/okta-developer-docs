var redirectsJson = require('./redirects.json');
import pageComponents from '@internal/page-components'

export default ({ router, Vue }) => {
  router.addRoutes(redirectsJson)

}
