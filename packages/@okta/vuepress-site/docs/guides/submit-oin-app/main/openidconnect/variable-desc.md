For example, if you have an OIDC configuration variable called `subdomain`, then you can set your redirect URL string to `https://{app.subdomain}.example.org/strawberry/login`. When your customer admin sets their `subdomain` variable value to `berryfarm`, then `https://berryfarm.example.org/strawberry/login` is their redirect URL.

> **Note**: A variable can include a complete URL (for example, `https://example.com`). This enables you to use global variables, such as `{app.baseURL}`.
