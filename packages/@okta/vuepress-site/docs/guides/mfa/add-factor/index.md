---
title: Add factor to user
---

Now that you have created a user account in Okta, you are ready to
setup MFA for that user account. A key part of enabling MFA for a
user is actually verifying that they have a MFA token. In Okta,
this process is known as "Enrollment". Once a MFA token has been
enrolled, we can then "Verify" that they actually have this token
by asking them to answer a challenge using their token.

The process attaching of a factor to a user is similar for every type
of factor that Okta supports. In this document we will only cover how to attach a Google
Authenticator factor.

At a high level, the process of attaching a factor to an account is
similar for all factors an works as follows:

1.  Add a factor to the user account.
2.  Enroll the factor.

Once the factor has been enrolled, you can verify it as needed.

Using the User ID that you created earlier, add a Google
Authenticator factor to that user as follows:

1.  Open the **Factors (Okta API)** collection in Postman.
2.  Add a new Google Authenticator Factor to your user with the
    **POST Enroll Google Authenticator Factor** request template in
    Postman. **Important**, be sure to replace the `{userId}`
    template in the request URL with the User ID for the user you
    created previously.
3.  Save the value of the `id` (the Factor ID) that is returned by
    Postman, you will be using this id in the next step.
4.  Copy the URL located in the `href` value of the `qrcode` link
    found in the `\_embedded` object located at the bottom of the
    response in Postman. Open this URL in a new tab of your
    favorite browser.

<NextSectionLink/>
