You have several options for setting the configuration values:

### Option 1: Configuration file

Create a dotenv file named `testenv` (no extension) in the root level of the sample project.

The file format is shown below:

```yaml
ISSUER=https://oie-9102348.oktapreview.com/oauth2/default
CLIENT_ID=0oazcjm779c5MPY0O1d6
CLIENT_SECRET=hCBX_o3OFZMMZMOUzmXb3kHBJd-_Q4IcxIT
```

### Option 2: Environment variables

> **Note:** Environment variables are currently not supported.

Add the values as environment variables with the following naming convention:

* `ISSUER`
* `CLIENT_ID`
* `CLIENT_SECRET`
* `REDIRECTURI` (?)
* `COPES` (?)

### Option 3: Add parameter to the SDK's client constructor

Add the values as parameters to the `config.js` file:

```JavaScript
module.exports = function () {
  const {
    CLIENT_ID =`{YOUR_CLIENT_ID}`,
    CLIENT_SECRET = `{YOUR_CLIENT_SECRET}`,
    ISSUER =`{YOUR_ISSUER}` ,
    OKTA_TESTING_DISABLEHTTPSCHECK = false,
  } = process.env;

  ...
```
