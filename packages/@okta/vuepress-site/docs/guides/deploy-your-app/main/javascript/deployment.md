## Deploy a JavaScript app

JavaScript apps built for production are a collection of static files. You can deploy them to any web server, and then configure that web server to be SPA-aware.

Ensure that you configure all paths to redirect to `index.html` because your framework handles the routing. You also need to force HTTPS.

## Heroku

One easy way to deploy your JavaScript app to production with Okta is with Heroku.

To begin, install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) and run `heroku login`.

You can deploy your JavaScript application to Heroku in five steps:

1. Run `heroku create`.
2. Add the Git remote that's created as a remote for your project.

   ```
   git remote add heroku <heroku-repo>
   ```

3. Create a `static.json` file with the configuration for secure headers and redirect all HTTP requests to HTTPS. Make sure to change `dist/<your-app>` to have the location of your app's built files.

   ```json
   {
     "headers": {
       "/**": {
         "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; frame-ancestors 'none'; connect-src 'self' https://*.okta.com https://*.herokuapp.com",
         "Referrer-Policy": "no-referrer, strict-origin-when-cross-origin",
         "Strict-Transport-Security": "max-age=63072000; includeSubDomains",
         "X-Content-Type-Options": "nosniff",
         "X-Frame-Options": "DENY",
         "X-XSS-Protection": "1; mode=block",
         "Feature-Policy": "accelerometer 'none'; camera 'none'; microphone 'none'"
       }
     },
     "https_only": true,
     "root": "dist/<your-app>/",
     "routes": {
       "/**": "index.html"
     }
   }
   ```

4. For `static.json` to be read, you have to use the [Heroku static buildpack](https://github.com/heroku/heroku-buildpack-static). The static buildpack runs `npm run build` by default. For Angular, add `--prod` to the build script.

   ```json
   "scripts": {
     "ng": "ng",
     "start": "ng serve",
     "build": "ng build --prod",
     "test": "ng test",
     "lint": "ng lint",
     "e2e": "ng e2e"
   },
   ```

5. Commit your changes, add the Node.js + static buildpack, and deploy your app.

   ```
   git add .
   git commit -m "Configure secure headers and static buildpack"
   heroku buildpacks:add heroku/nodejs
   heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static.git
   git push heroku master
   ```

If your branch isn't named `master`, run:

```
git push --set-upstream heroku <branch-name>
```

You can't sign in to your app until you add your Heroku app's URLs to your **Sign-in redirect URIs**, **Sign-out redirect URIs**, and **Trusted Origins** on Okta.

See [Angular Deployment with a Side of Spring Boot](https://developer.okta.com/blog/2020/05/29/angular-deployment) for deploying to Heroku, Firebase, Netlify, and AWS S3.

## Docker

You can package your JavaScript app with Docker. See the [Angular + Docker with a Big Hug from Spring Boot](https://developer.okta.com/blog/2020/06/17/angular-docker-spring-boot) blog post. Specifically, see the [Create a Docker Container for Your Angular App](https://developer.okta.com/blog/2020/06/17/angular-docker-spring-boot#create-a-docker-container-for-your-angular-app) section.

Okta also has a tutorial that details [how to package a React app with Docker](https://developer.okta.com/blog/2020/06/24/heroku-docker-react).
