1. Create a new file called `.okta.env` in your project root, containing the following:

```bash
ORG_URL=https://${yourOktaDomain}
CLIENT_ID=${clientId}
CLIENT_SECRET=${clientSecret}
```

2. Replace the placeholders with your own values obtained earlier.

3. Add the following into your app file:

```python
load_dotenv('.okta.env')
```