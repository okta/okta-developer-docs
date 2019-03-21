var redirectsJson = require('./redirects.json');

export default ({ router }) => {
  router.addRoutes(redirectsJson)
}
