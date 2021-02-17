```JavaScript

    app.get('/profile', oidc.ensureAuthenticated(), (req, res) => {

    /*
    *
    * Inline Token Hook Extension: If the ID Token contains the patient ID claim addition,
    * the patient ID is displayed on the application profile page.
    *
    */

    var profileTokenString= " " //variable that displays additional Inline Token Hook claim data, if present

    if ( 'userContext' in req){

      // Render the ID token from base 64 into an accessible JSON object
      let tokenClaim = req.userContext.tokens.id_token
      let payload = tokenClaim.split(".")
      let payloadBase64 = payload[1]
      let bufferObj = Buffer.from(payloadBase64, "base64")
      let decodedString = bufferObj.toString("utf8")
      let decodedStringObj = JSON.parse(decodedString)

      // If the additional claim is part of the payload, then add it to the display variable
      if ( 'extPatientId' in decodedStringObj) {
        patientId = decodedStringObj["extPatientId"]
        patientString = "Yes. This user's patient ID is "
        profileTokenString = patientString.concat(patientId)
      } else { //Add hard-coded string if additional claim not present
        profileTokenString = "No. This user is not a patient"
      }
    }

    /*
    * End of the Inline Token Hook code extension. Add one further line below to the existing render function.
    */


    // Convert the userinfo object into an attribute array, for rendering with mustache
    const userinfo = req.userContext && req.userContext.userinfo;
    const attributes = Object.entries(userinfo);
    res.render('profile', {
      isLoggedIn: !!userinfo,
      userinfo: userinfo,
      // Add variable below to display the results of the Token Inline Hook claim addition.
      profileTokenString: profileTokenString,
      // End of the Token Inline Hook addition to this function.
      attributes
    });
  });

    oidc.on('ready', () => {
    // eslint-disable-next-line no-console
    app.listen(sampleConfig.port, () => console.log(`App started on port ${sampleConfig.port}`));
  });

  oidc.on('error', err => {
    // An error occurred with OIDC
    // eslint-disable-next-line no-console
    console.error('OIDC ERROR: ', err);

    // Throwing an error will terminate the server process
    // throw err;
  });
};

```