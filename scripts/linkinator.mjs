import { LinkChecker } from 'linkinator';

const EXTERNAL_LINKS = 'http://localhost:8080';

import handler from 'serve-handler';
import http from 'http';

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: 'packages/@okta/vuepress-site/dist',
  });
});

const checker = new LinkChecker();

server.listen(8080, () => {
  checker.on('link', (link) => {
    console.log(`Source: ${link.url}`);
    console.log(`Status: ${link.status}`);
    console.log(`Parent: ${link.parent}`);
    console.log('');
  });

  checker.check({
    path: EXTERNAL_LINKS,
    recurse: true,
  });
});