---
title: Create a test user
---

The first step in adding MFA to an existing
application is to create a user account in Okta. Among other
things, creating a user account in Okta allows you to add
MFA to your application without needing to
update your user schemas.

For the purposes of this demonstration, we will be creating a
random user generated using the [Random User Generator](https://randomuser.me/) website:

1.  Generate a random user by loading <https://randomuser.me> in
    your browser.
2.  Copy the random user's data from the website to somewhere you
    can refer to later:
    -   First Name
    -   Last Name
    -   Email Address
3.  Open the **Users (Okta API)** collection in Postman.
4.  Create a user using the "POST Create User without Credentials"
    request template in Postman.
5.  Save the value of the `id` (the User ID) that is returned by Postman, you will
    be using this ID a lot. (In Okta, User ID's start with `00u`)

<NextSectionLink/>
