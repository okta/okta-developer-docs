For example, if you have a SAML configuration variable called `subdomain`, then you can set your ACS URL string to `https://${org.subdomain}.example.org/strawberry/login`. When your customer admin sets their `subdomain` variable value to `berryfarm`, then `https://berryfarm.example.org/strawberry/login` is their ACS URL.

> **Note**: A variable can include a complete URL (for example, `https://example.com`). This enables you to use global variables, such as `org.baseURL`.
