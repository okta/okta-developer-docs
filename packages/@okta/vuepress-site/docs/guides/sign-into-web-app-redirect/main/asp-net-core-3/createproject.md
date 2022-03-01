For this tutorial, we create a sample app from scratch using the Visual Studio ASP.NET Core Web App project template.

1. Launch Visual Studio 2022, select **New project** > **ASP.NET Core Web App (Model-View-Controller)**, and click **Next**.
2. Name your project and click **Next**.
3. Select **Framework** as **.NET Core 3.1**, **Authentication** as **None** (don't worry, Okta handles this part) and select **Configure for HTTPS**.
4. Click **Create**.

> **Note**: This guide uses .NET Core 3.1.

> **Note**: If you're using the Okta CLI, you can also run `okta start okta-dotnetcore3-webapp-quickstart` to create an app. This command creates an OIDC app in Okta, downloads the [okta-dotnetcore3-webapp-quickstart](https://github.com/okta-samples/okta-dotnetcore3-webapp-quickstart) sample, and configures it to work with the OIDC app. This quickstart uses a basic .NET Core starter app instead, as it's easier to understand the Okta-specific additions if you work through them yourself.
