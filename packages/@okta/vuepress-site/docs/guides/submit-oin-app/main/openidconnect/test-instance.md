1. Specify the **Application label** and any integration properties required in the **General settings** tab.
1. Click **Next**. The **Sign-On Options** tab appears.
1. Select **OpenID Connect**.
1. Click **View Setup Instructions** to open a new tab to your integration setup instructions. This is the customer configuration guide you previously specified in the OIN Wizard.
1. Follow the instructions

Fill out necessary AIPs on the Sign-On Options settings tab, and click Done
On the Assignments tab (this is where they’ll land after step 14), click Assign > Assign to People
Find your name and click the Assign button next to your name
A dialog box will open with the title “Assign [app name] to People”. Click Save and Go Back
On the People page, click Done
Return to the Sign On tab.
To configure OIDC settings in your application, use the default authorization server available at https://${yourOktaDomain}/oauth2/default as your issuer URI, as well as Client ID and Client Secret pair accessible on the Sign On tab. This will enable the ISV application and Okta can communicate with each other.