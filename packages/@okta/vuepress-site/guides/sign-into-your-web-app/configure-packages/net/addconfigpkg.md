All of our .NET SDKs are hosted on [NuGet](https://www.nuget.org/). These instructions show you how to install all the dependencies you need to configure your web application to use the Okta middleware.

Install the following dependencies in your project:

* [Microsoft.Owin.Security.Cookies](https://www.nuget.org/packages/Microsoft.Owin.Security.Cookies) 4.0.0 or higher 
* [Microsoft.Owin.Host.SystemWeb](https://www.nuget.org/packages/Microsoft.Owin.Host.SystemWeb) 4.0.0 or higher
* [Okta.AspNet](https://www.nuget.org/packages/Okta.AspNet) 1.1.0 or higher

You can install them via **NuGet Package Manager**:

1. In the Solution Explorer right click on your solution and select **Manage Nuget Packages for Solution**
1. Click on **Browse** and search for the package you want to install, for example, `Okta.AspNet`
1. Select your package and click **Install**

Or via **Package Manager Console**:

`PM>  Install-Package <your-package-name>`



