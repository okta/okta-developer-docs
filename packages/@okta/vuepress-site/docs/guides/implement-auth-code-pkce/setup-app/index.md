---
title: Set up your Application
---

You set up your OpenID Connect application inside the Okta Developer Console:

1. From the Applications page, choose **Add Application**.
2. On the Create New Application page, select **Native** or **SPA**, depending on the type of application you are working on.
  > **Note:** It is important to choose appropirate application type for apps which are public clients. Failing to do so may result in Okta API endpoints attempting to verify app's client secret, which public clients are not designed to have, hence breaking sign in or sign out flow.
3. Fill-in the Application Settings, then click **Done**.

<NextSectionLink/>
