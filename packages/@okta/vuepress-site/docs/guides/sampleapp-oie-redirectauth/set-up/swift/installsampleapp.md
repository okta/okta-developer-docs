1. Install the sample app wherever you want using: `git clone https://github.com/okta/okta-idx-swift.git`


THESE STEPS ARE PENDING UNTIL MIKE IS DONE WITH THE UPDATES
2. Navigate to the `??` directory and edit the `Okta.plist` file with the information that you copied in previous steps:

    ```
        <?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
        <plist version="1.0">
        <dict>
            <key>scopes</key>
            <string>openid profile offline_access</string>
            <key>redirectUri</key>
            <string>{signinredirectUri}</string>
            <key>clientId</key>
            <string>{clientID}</string>
            <key>issuer</key>
            <string>{issuer}</string>
            <key>logoutRedirectUri</key>
            <string>{signoutRedirectUri}</string>
        </dict>
        </plist>
    ```

You have now created your App in Okta and installed the Okta <StackSelector snippet="applang" noSelector inline /> sample app.
