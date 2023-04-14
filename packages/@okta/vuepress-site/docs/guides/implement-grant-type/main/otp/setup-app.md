4. Select **Native Application** as the **Application type**, then click **Next**.
5. Specify the **App integration name**.
6. Enable the **OTP** grant type in addition to the defaults.
7. Select Allow everyone in your organization to access then save.
8. Fill in the remaining details for your app integration, then click **Save**.
9. From the **General** tab of your app integration, copy and save the generated **Client ID** value to implement your authorization flow.

## Set up the authentication policy

Navigate to the app’s “Sign on” tab and at the bottom press “view policy details”

Add a rule (recommended to have it apply to only your test user) and leave everything as is, except update “User must authenticate with” to the scenario you want to test. E.g. password only, any 1 factor, password plus any second factor, etc.

## Update the Global Session Policy

Select - any factor used to meet the authentication policy requirements
Leave default of not required for MFA


click Update Rule

6. using the SWSS token - link to how to get one if they don't have one????