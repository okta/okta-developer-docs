---
title: Extend the sample Express app
---

The following code extends the local sample Node.js Express application to display the results of the Token Inline Hook claim addition. This step is optional. The Token Inline Hook is functional and the results of the implementation are available in the external service logs, as well as the System Log on your Okta org. But this extension is nice to have!

To extend the local sample Node.js Express application, you need to update the `sample-web-server.js` file.

### Update the web server page

1. Navigate to your project folder `samples-nodejs-express-4` and continue to the `common` folder (`samples-nodejs-express-4/common`).
2. In an editor, open the `sample-web-server.js` page.
3. Locate the routing function `app.get('/profile'` and add the code, below, after the `const` declarations and before the `res.render` function.

This extension renders the ID Token, and if it contains the claim added by the Token Inline Hook, adds this claim to the attributes array. This array displays claims on the user's Profile page.

<StackSelector snippet="extend-application"/>

<NextSectionLink/>