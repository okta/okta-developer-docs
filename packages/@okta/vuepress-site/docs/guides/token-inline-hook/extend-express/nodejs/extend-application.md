```JavaScript

    app.get('/profile', oidc.ensureAuthenticated(), (req, res) => {
    // Convert the userinfo object into an attribute array, for rendering with mustache
    const userinfo = req.userContext && req.userContext.userinfo;
    const attributes = Object.entries(userinfo);

    /*
    * Inline Token Hook Extension: If the ID Token contains the patient ID claim addition,
    * the patient ID is added to the attributes array and displayed on the user's profile page.
    */

    // Render the ID token from the request into an accessible JSON object
    let tokenClaim = req.userContext.tokens.id_token;
    let payload = tokenClaim.split(".");
    let payloadBase64 = payload[1];
    let bufferObj = Buffer.from(payloadBase64, "base64");
    let decodedString = bufferObj.toString("utf8");
    let decodedStringObj = JSON.parse(decodedString);

    // If the additional claim is part of the payload, then add it to the attributes array
    if ('extPatientId' in decodedStringObj){
      patientId = decodedStringObj["extPatientId"]
      attributes.push(['extPatientId', patientId])
    }

    /*
    * End of the Inline Token Hook code extension.
    */

    res.render('profile', {
      isLoggedIn: !!userinfo,
      userinfo: userinfo,
      attributes
    });
  });
```