Place `Okta:Authority` and `Okta:ClientId` properties into `wwwroot/appsettings.json` file. 

`Okta:Authority` (issuer) should be set to this: `https://(yourOktaDomain)/oauth2/default`

In `Program.Main` function add this configuration code:

```csharp
builder.Services.AddOidcAuthentication(options =>
{
    // Replace the Okta placeholders with your Okta values in the appsettings.json file.
    options.ProviderOptions.Authority = builder.Configuration.GetValue<string>("Okta:Authority");
    options.ProviderOptions.ClientId = builder.Configuration.GetValue<string>("Okta:ClientId");

    options.ProviderOptions.ResponseType = "code";
});
```