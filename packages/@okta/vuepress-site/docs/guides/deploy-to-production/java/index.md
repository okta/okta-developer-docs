---
title: Java
---

Java applications typically build into a WAR or a JAR for production.

If you deploy your application as a WAR, it's possible you have a context path. If you do, make sure you add this to your Login redirect URI and your Logout redirect URI for your Okta app.

// todo: how to do this with the Okta CLI

JAR-based Java apps usually don't have a context, and if you start them locally, they'll be available at `http://localhost:8080`.

### Heroku

The easiest way to deploy your Java app to production with Okta is to use Heroku. We provide an [Okta Heroku Add-on](https://devcenter.heroku.com/articles/okta) that auto-provisions a Okta org for you, and adds the appropriate applications to it.

To begin, install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) and run `heroku login`.

You can deploy your Java application to Heroku in 5 steps:

1. Run `heroku apps:create`
2. Add the Git remote that's created as a remote for your project

       git remote add heroku <heroku-repo>

3. Run `heroku addons:create okta`
4. Create a `Procfile` that sets the `PORT` and your Okta configuration.

        web: java -Dserver.port=$PORT -Dokta.oauth2.client-id=${OKTA_OAUTH2_CLIENT_ID_WEB} -Dokta.oauth2.client-secret=${OKTA_OAUTH2_CLIENT_SECRET_WEB} -jar target/*.jar

5. Commit your changes and run `git push heroku master`

If your branch isn't named `master`, run:

```
git push --set-upstream heroku <branch-name>
```

**TIP**: If you want to use a different version of Java, create a `system.properties` and add `java.runtime.version=11` (or another version) to it.

For more information, see [Deploy a Secure Spring Boot App to Heroku](https://developer.okta.com/blog/2020/08/31/spring-boot-heroku).

### Forcing HTTPS
