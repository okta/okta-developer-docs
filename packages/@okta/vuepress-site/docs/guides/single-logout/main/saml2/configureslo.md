4. Scroll down, click **Show Advanced Settings**, and then scroll down to the **SAML Request** section.
5. Click **Browse files** to upload a signature certificate or CA in `.pem` format. Your app must sign the SLO request with the certificate.
6. In the **Logout** section, do the following to configure SLO:
    * **SLO initiation**: Select the checkbox to enable SP-initiated SLO for the app.
    * **Response URL**: Enter the URL where you want Okta to send the logout response at the end of SLO. For example: `http://myapp.exampleco.com/logout`
    * **SP Issuer**: Enter the identifier for the app. This is usually the Assertion Consumer Service (ACS) URL or the SP Entity ID. The ACS URL is most often the SAML Post URL location for the target app. The SP Entity ID is the unique identifier that is the intended audience of the SAML assertion. The **SP Issuer** value is included in the metadata sent in the SP-initiated inbound logout request from the app. For example: `https://myapp.exampleco.com`
    * **SLO participation**: Select the checkbox to allow your SAML app to participate in IdP-initiated SLO. Users are signed out of the app when any other app, or Okta, initiates single logout.
    * **Request URL**: Enter the URL where you want Okta to send the IdP-initiated logout request. For example: `http://myapp.exampleco.com/saml/logout`
    * Select how your app expects Okta to send the IdP-initiated logout request:
        * **HTTP POST**: Send additional data in the request body
        * **HTTP Redirect**: Send data as query parameters in the request URL
    * Select **Include user session details** to include the session index (`sessionIndex`) as part of the IdP-initiated logout request. This ends a specific user’s session rather than all active user sessions within that browser.
7. Click **Next** and then **Finish**.

#### Collect the SLO details for your app

1. On the **Sign On** tab, click **View Setup Instructions** in the instructional text along the side of the **Settings** section. The page that appears includes configuration information for your SAML app.
1. Copy the **Identity Provider Single Logout URL**. This is the POST request URL that your app uses to initiate the logout request with Okta. For example:  `https://{yourOktaDomain}/app/{app}/{key}/slo/saml`

    * `yourOktaDomain`: Your Okta org URL
    * `app`: The name (not label) of your SAML app
    * `key`: The ID of your SAML app

1. Copy the **Identity Provider Single Logout Callback URL**. This is where the SAML app makes a POST or REDIRECT request to Okta in response to the Okta outbound logout request.

1. Add these URLs to the configuration settings in your SP SAML app.
