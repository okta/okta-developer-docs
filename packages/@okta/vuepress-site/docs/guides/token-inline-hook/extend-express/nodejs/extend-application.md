```JavaScript

    app.get('/profile', oidc.ensureAuthenticated(), (req, res) => {
    // Convert the userinfo object into an attribute array, for rendering with mustache
    const userinfo = req.userContext && req.userContext.userinfo;
    const attributes = Object.entries(userinfo);

    /*
    * Inline Token Hook Extension: If the ID Token contains the patient ID claim addition,
    * the patient ID is added to the attributes array and displayed on the user's profile page.
    */

    // Render the ID token payload from the request into an accessible JSON object
    // For more information on the ID token, see:  https://developer.okta.com/docs/reference/api/oidc/#id-token
    let payload = (req.userContext.tokens.id_token).split("."); //split payload segment from ID Token
    let bufferObj = Buffer.from(payload[1], "base64"); //decode payload from base64
    let decodedStringObj = JSON.parse(bufferObj.toString("utf8")); //return string to JSON object

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