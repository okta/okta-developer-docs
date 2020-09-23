---
title: Overview
---
You can deploy your Okta-protected app to many different hosting providers. You can also host it yourself.

If you're developing a Single-Page Application (SPA), you need to host it on a web server and configure all paths to redirect to `index.html`. This is because your framework handles the routing. You also need to force HTTPS.

If you're developing a server-side application, for example in Java, .NET, or Node.js, you likely only need to do three things after deploying your app:

1. Configure your app (or server settings) to force HTTPS.
2. Configure your app to read your Okta settings (for example, issuer, client ID, and client secret) from environment variables or a secrets provider (like HashiCorp Vault).
2. Modify your Okta app to have login and logout redirect URIs that match your production app.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
