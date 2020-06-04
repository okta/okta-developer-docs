---
title: Add a factor for the user
---

You are now ready to set up MFA for the user that you created. A key part of enabling MFA for a user is verifying that they have an MFA token. In Okta, this process is known as Enrollment. After an MFA token is enrolled, we can verify that they actually have this token
by asking them to answer a challenge using their token.

The process of attaching a factor to a user is similar for every type of factor that Okta supports. In this example, we cover only how to attach a Google Authenticator factor. At a high level, the process of attaching a factor involves adding a factor to the user account and then enrolling that factor. Once the factor is enrolled, you can <GuideLink link="../verify-factor">verify it</GuideLink> using the Factors API.

<StackSelector snippet="addfactor" />



<NextSectionLink/>
