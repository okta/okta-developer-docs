#### Dynamic properties with Okta Expression Language

 The OIN Wizard supports [Okta Expression Language](/docs/reference/okta-expression-language/#reference-user-attributes) to generate dynamic properties, such as URLs or URIs, based on your customer tenant. You can specify dynamic strings for your <StackSnippet snippet="protocol-name" inline/> properties in the OIN Wizard:

1. Add your [tenant settings](#tenant-settings) in the OIN Wizard. These settings become fields for customer admins to enter during your OIN integration installation to identify their tenant.

2.  Language format in your integration properties for dynamic values based on customer information.
 
For example, if you have a XAA configuration variable called subdomain, then you can set your Issuer URL string for your Resource App to `'https://' + app.subdomain + '.example.org/strawberry/'`. When your customer sets their subdomain variable value to `berryfarm`, then `https://berryfarm.example.org/strawberry/` is their issuer URL.

>**Note:** A variable can include a complete URL (for example, `https://example.com/`). This enables you to use global variables, such as `app.issuerURL`.

The following are Expression Language specifics for XAA properties:

* Any XAA tenant settings that you define in the OIN Wizard are considered app properties. They have an `app. prefix` when you reference them in Expression Language. For example, if your tenant variable name is `subdomain`, then you can reference that variable using `app.subdomain`.

XAA properties support Expression Language conditional expressions. For example:

````
'https://' + app.subdomain + '.example.org/strawberry/'`
'https://' + (app.region == 'us' ? 'myfruit' : 'myveggie') + '.example.com/strawberry/'
````

XAA properties support Expression Language String functions. For example:

```
(String.len(app.baseUrl) == 0 ? 'https://fruit.example.com/' : app.baseUrl) + '/strawberry'
(String.stringContains(app.environment,"PROD") ? 'https://fruit.example.com' : 'https://fruit-sandbox.example.com') + '/strawberry/'
```