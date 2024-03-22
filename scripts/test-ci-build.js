const http = require('http');
const handler = require('serve-handler');

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options
  return handler(request, response, {
    public: "packages/@okta/vuepress-site/dist"
  });
});

server.listen(8080, () => {
  console.log('Running at http://localhost:8080');
});

