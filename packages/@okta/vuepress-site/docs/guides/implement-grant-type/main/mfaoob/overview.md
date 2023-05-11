## About the direct authentication MFA OOB grant

Use direct authentication when you want your application to directly authenticate users. For example, you don't want to delegate authentication to an IdP or authorization server using an HTTP redirect in a web browser. While delegating authentication is preferred, use direct authentication in situations where there's a high degree of trust between the user and your app.

Also, you can use direct authentication where usability constraints hinder the use of browser-based flows, such as mobile applications.

Use the direct authentication MFA OOB flow when you want to use an out-of-band factor as a secondary factor. An out-of-band factor is a type of factor that requires a secondary verification method through a separate communication channel along with the initial user credentials.

>**Note:** Okta currently supports only Okta Verify Push for the MFA OOB flow.
