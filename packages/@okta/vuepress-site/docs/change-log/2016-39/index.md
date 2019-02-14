---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2016.37
---

## 2016.39

### Feature Enhancement: Sharing Certificates Between App Instances

By cloning an app key credential with the Apps API, you can share the same certificate between two or more apps:

<pre>/apps/<em>:aid</em>/credentials/keys/<em>:kid</em>/clone?targetAid=<em>:targetAid</em></pre>

To share a certificate among app instances:

1. Generate a new app key credential for an app (the source app).
2. Use the new credential in the source app.
3. Share the credential (`kid`) with one or more target apps.
4. Use the new credential in the target app.

For more detailed instructions, see ["Clone Key Credential for Application"](/docs/api/resources/apps#clone-application-key-credential)
and ["Update Key Credential for Application"](/docs/api/resources/apps#update-key-credential-for-application).

### Bug Fixed

The WWW-Authenticate header couldn't be read when the `/oauth2/v1/userinfo` endpoint returned errors in a browser. (OKTA-101943)
