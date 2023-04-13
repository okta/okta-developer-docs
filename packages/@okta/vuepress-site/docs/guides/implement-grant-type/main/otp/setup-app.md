3.Create an OIDC client from Applications → Applications → Create App Integration

Choose OIDC and Native Application.

Name your app

Enable the following grant types in addition to the defaults: Resource Owner Password, OTP, OOB, MFA OTP, MFA OOB

Select Allow everyone in your organization to access then save.

4.Copy and paste your client ID, which will be needed in a later step.

5. Setup the app sign on policy

Navigate to the app’s “Sign on” tab and at the bottom press “view policy details”

Add a rule (recommended to have it apply to only your test user) and leave everything as is, except update “User must authenticate with” to the scenario you want to test. E.g. password only, any 1 factor, password plus any second factor, etc.

6. Update Global Session Policy with the following

Select - any factor used to meet the authentication policy requirements
Leave default of not required for MFA


click Update Rule

6. using the SWSS token - link to how to get one if they don't have one????