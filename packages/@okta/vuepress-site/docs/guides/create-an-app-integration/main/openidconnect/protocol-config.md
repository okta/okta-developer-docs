5. Choose either **Web Application** or **Single-Page Application** as the **Application type** for your integration and click **Next**.
6. Configure the following integration settings on the **General Settings** tab:

	* **App integration name** - Enter a name for your integration and (optionally) upload a logo.

	* **Grant types** - Select the [grant type](/docs/guides/implement-grant-type/) for your OAuth 2.0 flow based on your app type:
		- **Web app:**
			- **Authorization Code** (mandatory for web platform applications)
			- **Refresh token** (not supported for OIN app integrations)
			- **Implicit (hybrid)** (optional) — click **Advanced** to select.
			
			>**Note:** If you're using Classic Engine, select **Implicit (hybrid)** from the **Grant type** section.

		- **SPA:**
			- **Authorization Code**
			- **Implicit (hybrid)** — Click **Advanced** to select.
			
			>**Note:** For SPA app integrations, the **Authorization Code** grant type always uses PKCE to verify the client. Also, the **Client acting on behalf of itself** grant type isn't supported in OIN app integrations.

	* **Sign-in redirect URIs** - Enter the absolute URIs where Okta sends OAuth responses. You can specify more than one.

	* **Sign-out redirect URIs (Optional)** - Enter the URIs where Okta redirects users after sign-out.

	* **Login initiation** - Configure the settings based on your sign-in initiation flow to determine how the integration appears as a tile on the Okta End-User Dashboard:
		- If you only support direct SSO from your app, set **Login initiated by to App Only**.
		- If you want a dashboard tile, set **Login initiated by to Either Okta or App**. This reveals the **App Embed Link** and allows you to select **Display application icon to users**.
		- Set the **Login flow to Redirect to app to initiate login (OIDC compliant)** and provide the URI used to initiate the request.

	* **Assignments** - Assign a group or leave the **Everyone** default. Ensure that the intended users are assigned to the selected group.
7. Click **Save**.

8. To build and finalize your implementation settings details, see [Create OpenID Connect app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext_Apps_App_Integration_Wizard-oidc)

