Create an empty express application named `okta-express-quickstart` using the following command.

This creates an express application that uses **pug** as the view engine.

```bash
npx express-generator@4.16 --view=pug okta-express-quickstart
cd okta-express-quickstart
```

The generator uses outdated versions of dependencies. Update the dependencies to the latest versions by using the following command.

```bash
npm install cookie-parser@latest debug@latest express@latest http-errors@latest morgan@latest pug@latest
```
