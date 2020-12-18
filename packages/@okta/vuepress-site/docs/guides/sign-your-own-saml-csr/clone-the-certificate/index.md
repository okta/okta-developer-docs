---
title: Clone the certificate
---

* To share the certificate that you created across multiple apps, clone it with the
[Apps API](/docs/reference/api/apps/#clone-application-key-credential) using the key `id` that you generated.

* To share the certificate that you created across multiple IdPs, clone it with the [IdPs API](#top) using the key `id` that you generated.

Be sure to clone the certificate to every app or IdP with which you want to share it. Once cloned, you will need to [update the key credential](/docs/guides/sign-your-own-saml-csr/update-the-key-credential/) for the target app.

If the certificate that you cloned from changes, you must repeat the cloning operation for each app or IdP.

> **Important:** Sharing certificates isn't a recommended security practice. This API is provided to support legacy use cases.

<NextSectionLink/>
