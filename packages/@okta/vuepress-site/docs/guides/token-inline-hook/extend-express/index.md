---
title: Extend the sample Express app
---

The following code extends the local sample Node.js Express application to display the results of the Token Inline Hook claim addition. This step is optional. The Token Inline Hook is functional and the results of the implementation are available in the external service logs, as well the System Log on your Okta org. But this extension is a nice-to-have!

To extend the local sample Node.js Express application, you need to:

- Update the `sample-web-server.js` file
- Update the `profile.mustache` template

### Update the application profile page

1. Navigate to your project folder `samples-nodejs-express-4` and continue to the `views` folder (`samples-nodejs-express-4/common/views`).
2. In an editor, open the `profile.mustache` page.
3. In the `doc-overview` `<div>` structure, add the following paragraph tagged content between the comments, which displays the results of the Token Inline Hook claim addition.

```HTML
<p><strong>Inline Token Hook Extension: </strong>Is {{userinfo.name}} a patient? {{profileTokenString}}.</p>
```

The full `<div>` structure now appears as:


```HTML
        <div class="doc-overview">
          <h2 class="ui dividing header" data-se="overview-doc-header">
            My Profile
          </h2>
          <p>Hello, {{userinfo.name}}. Below is the information that was read from the <a href="https://developer.okta.com/docs/api/resources/oidc#get-user-information">User Info Endpoint</a>
            and persisted by the <a href="https://github.com/okta/okta-oidc-js/tree/master/packages/oidc-middleware">Okta OIDC Middleware Library</a> at <code>req.userinfo</code>.
          </p>
          <p>This route is protected with the <code>oidc.ensureAuthenticated()</code> middleware, which will ensure that this page cannot be accessed until you have authenticated.</p>
          <!-- For the Inline Token Hook extension -->
          <p><strong>Inline Token Hook Extension: </strong>Is {{userinfo.name}} a patient? {{profileTokenString}}.</p>
          <!-- displays additional token claim, if present -->
        </div>
```

### Update the web server page

1. Navigate to your project folder `samples-nodejs-express-4` and continue to the `common` folder (`samples-nodejs-express-4/common`).
2. In an editor, open the `sample-web-server.js` page.
3. Locate the routing function `app.get('/profile'` and add the code below to the function. Make sure to also add the variable `profileTokenString` to the render function (`res.render(profile)`).

<StackSelector snippet="extend-application"/>

<NextSectionLink/>