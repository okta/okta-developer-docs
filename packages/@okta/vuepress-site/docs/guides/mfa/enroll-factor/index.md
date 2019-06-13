---
title: Enroll the factor
---

After adding a factor to an Okta user, the next step is to have
the user setup their factor and then prove that they have done
that by answering a challenge with their token.

Continuing on from the steps above:

1.  Open Google Authenticator on your phone.
2.  Tap the **+** button in Google Authenticator.
3.  Select the **Scan barcode** option.
4.  Scan the QR Code on the browser tab you opened previously.
5.  Switch to Postman on your computer.
6.  From the **Factors (Okta API)** collection, select the **POST
    Activate TOTP Factor** request template.
7.  Replace the `{userId}` and `{factorId}` templates with the
    User ID and Factor ID values that you've copied previously.
8.  In the JSON body, replace the `passCode` value with the
    passcode shown on Google Authenticator.
9.  Click the blue **Send** button.

<NextSectionLink/>
