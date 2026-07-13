Before you create the app, ensure that you have all the necessary information.

1. Retrieve the SP metadata from your client app. SP metadata is typically available as an XML file or a URL from the SP.
1. Extract the SP entity ID and the client’s public certificate from the metadata XML file.

When you create the SAML app in Access Gateway, you use the SP entity ID as the `clientId` value in the request. If you plan to enable request signing or assertion encryption, you also need the SP's public certificate to include in the `spCertificate` field of the request.
