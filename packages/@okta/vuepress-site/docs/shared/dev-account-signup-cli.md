## Set up Okta


1. Install the Okta command-line interface: [Okta CLI](https://cli.okta.com/).
2. If you don't already have a free Okta developer account, create one by entering `okta register` on the command line.
3. Make a note of the Okta Domain as you need that later.
4. **IMPORTANT:** Set the password for your Okta developer org by opening the link that's shown after your domain is registered. Look for output similar to this:

   ```
   Your Okta Domain: https://dev-xxxxxxx.okta.com
   To set your password open this link:
   https://dev-xxxxxxx.okta.com/welcome/xrqyNKPCZcvxL1ouKUoh
   ```

   > **Note**: If you don't receive the confirmation email sent as part of the creation process, check your spam filters for an email from `noreply@okta.com`

5. Connect to your Okta developer org if you didn't create one in the last step (successfully creating an Okta org also signs you in) by running the following command. You need the URL of your org &mdash; which is your [Okta domain](/docs/guides/find-your-domain/) with `https://` prepended &mdash; and an [API/access token](/docs/guides/create-an-api-token/):

   ```
   okta login
   ```