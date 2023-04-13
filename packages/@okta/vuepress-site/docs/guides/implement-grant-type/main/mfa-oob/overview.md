## About the direct authentication MFA OOB grant

Use direct authentication when you want your application to directly authenticate users, rather than delegating authentication to an IdP or authorization server using an HTTP redirect in a web browser. While delegating authentication is preferred, you can use direct authentication in situations where there is a high degree of trust between the user and your app. Additionally, you can use direct authentication where usability constraints hinder the use of browser-based flows, such as native mobile applications.

Use the direct authentication MFA OOB flow when you want to use an out-of-band factor as a secondary factor.

>**Note:** Okta supports only Okta Verify Push.
