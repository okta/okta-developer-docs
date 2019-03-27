To do this, you must define a gradle manifest placeholder in your app's `build.gradle`:

code sample

Make sure this is consistent with the redirect URI used in `okta_app_auth_config.json`. For example, if your **Login Redirect URI** is `com.okta.example:/callback`, the **AppAuth Redirect Scheme** is `com.okta.example`.

Known issue info