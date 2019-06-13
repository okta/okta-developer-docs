---
title: Clone the certificate
---

- To share the certificate you created across multiple apps, clone it with the
[Apps API](/docs/reference/api/apps/#clone-application-key-credential) using the key `id` you generated.

- To share the certificate you created across multiple Identity Providers, clone it with the [IdPs API](#top) using the key `id` you generated.

Be sure to clone the certificate to every app or IdP with which you want to share it.

If the certificate you cloned from changes, you must repeat the cloning operation for each app or IdP.

**Important:** Sharing certificates is not a recommended security practice. This API is provided to support legacy use cases.

<NextSectionLink/>
