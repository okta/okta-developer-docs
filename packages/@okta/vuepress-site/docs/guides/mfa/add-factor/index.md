---
title: Add a factor for the user
---

You are now ready to set up MFA for the user that you created. A key part of enabling MFA for a user is verifying that they have an additional factor enrolled. After an MFA factor is enrolled, we can verify that they actually have this token
by asking them to answer a challenge using their factor.

The process of attaching a factor to a user is similar for every type of factor that Okta supports. At a high level, you add a factor to the user account and then enroll that factor. Once the factor is enrolled, you can <GuideLink link="../verify-factor">verify it</GuideLink> using the Factors API.

You can choose whether you'd like to see instructions for adding Google Authenticator or an SMS factor:

<StackSelector snippet="addfactor" />



<NextSectionLink/>
