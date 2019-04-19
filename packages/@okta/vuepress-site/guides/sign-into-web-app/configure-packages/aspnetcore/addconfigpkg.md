All of our .NET SDKs are hosted on [NuGet](https://www.nuget.org/). These instructions show you how to install all of the dependencies you need to configure your web application to use the Okta middleware.

Install the following dependencies in your project:

* [Microsoft.AspNetCore.Authentication.Cookies](https://www.nuget.org/packages/Microsoft.AspNetCore.Authentication.Cookies/) 2.2.0 or higher 
* [Okta.AspNetCore](https://www.nuget.org/packages/Okta.AspNetCore)

You can install them via the **NuGet Package Manager**:

1. In the Solution Explorer, right-click on your solution and select **Manage Nuget Packages for Solution**.
1. Click **Browse** and search for the package you want to install, for example, `Okta.AspNetCore`.
1. Select your package and click **Install**.

Or via the **dotnet CLI**:

`$ dotnet add package Okta.AspNetCore`

