---
title: Contributing to Python SDK 3.0
meta:
  - name: description
    content: Okta maintains the following SDKs for developers who don't want to use the recommended sign-in experience in their apps, which is redirecting users to sign in using the Okta-hosted Sign-In Widget.
---

<style>
   td > img { vertical-align : middle;}
</style>

## Contributing to Python SDK 3.0

Join the Okta open-source community to contribute to the next generation of the Python SDK, built on OpenAPI specification 3.0. The Python SDK 3.0 is a modernized architecture powered by the OpenAPI generator that replaces the legacy Swagger-based system with a fully typed and auto-documented SDK. By integrating Pydantic, the SDK now features strongly-typed data models with runtime validation that ensures greater accuracy, reduced bugs, and improved code clarity.

## Key concepts

* OAS 3.0 compliance: The SDK's foundation on OpenAPI 3.0 auto-generates client code, ensuring greater accuracy and faster feature coverage.
* Strongly-typed data models: By integrating Pydantic, all API models now offer robust data validation and type enforcement at runtime, which reduces bugs and improves code clarity.
* Open-source contribution: The SDK welcomes community contributions for bug fixes, feature enhancements, and documentation improvements.
* Breaking change: Python SDK 3.0 has officially deprecated support for OpenAPI 2.0 (OAS 2.0). If you migrate from a previous version, update your code to conform to the new OAS 3.0-compliant methods and structures.

## Contribution overview

The Python SDK 3.0 is a community-driven project. You can use this SDK in your server-side code to interact with the Okta management API.

By contributing to Okta open source repos, you can help us maintain quality, fix bugs, and expand feature coverage for this release. Contributions typically fall into the following areas:

* Bug fixes: Addressing [issues](https://github.com/okta/okta-sdk-python/issues) that are identified in the new OAS 3.0-generated code or client wrappers.
* Documentation: Improve docstrings and READMEs, or provide better examples.
* Testing and validation: Help validate the auto-generated code against new or specific Okta API scenarios.

## Contribution prerequisites

Before you submit code, ensure that you meet the following requirements:

* [Sign the CLA](https://developer.okta.com/cla/): Sign the Contributor License Agreement (CLA) before Okta can merge your pull request.
* Use GitHub: Have a GitHub account to fork the repo and submit a pull request.
* Tools and environment:
  * Python: Version 3.9+ or higher.
  * OpenAPI Generator: `openapi-generator-cli` version 7.7.0.
* Okta environment:
  * Okta org: An [Okta Integrator Free Plan org](https://developer.okta.com/signup)   with appropriate permissions.
  * API token: An active [API token](https://developer.okta.com/docs/api/getting_started/getting_a_token) to authenticate your requests.

## Installation and use

This section demonstrates how to quickly install and configure the SDK. Okta recommends that you use a virtual environment to install the package. Depending on your development goals, there are two ways to install the Okta Python SDK.

### Option 1: Standard installation (PyPI)

If you want to test or try the package locally, install the package directly from the PyPI platform using the following command:

1. Install the latest version using `pip`:

```shell
pip install okta

# Or for environments using an alias:
pip3 install okta
```

### Option 2: Local installation (from source)

Use this method if you cloned the official Python SDK repo and want to update a package or test your changes locally before you create a pull request.

1. Install prerequisites: First, install the `setuptools` library if it’s not already available.

```shell
pip3 install setuptools
```

2. Install the SDK: Run the setup script to install your local packages to your user environment.

```shell
python setup.py install --user
```

## Client initialization and configuration

After you install the SDK, initialize the client to verify your setup. Ensure that your configuration (Org URL and API token) is available through environment variables or an `okta.yaml` file.

1. Use the imported `OktaClient` to initialize the client with your configuration.

> **Note**: After you initialize  a client, you can call methods to make requests from the Python SDK to the Okta management APIs.

The following snippet highlights how to initialize the client and create a new user.

```python
import asyncio
from okta.client import Client as OktaClient

config = {
    'orgUrl': 'https://{your_org}.okta.com',
    'token': 'YOUR_API_TOKEN',
}

okta_client = OktaClient(config)
# ... more code to make API calls ...
```

> **Note**: For comprehensive configuration and advanced usage patterns, refer to the [Okta Python SDK](https://github.com/okta/okta-sdk-python) GitHub repo.

2. Run the code: Use the above example snippet to create a python script (`test-pythonsdk3.py`) to initialize the client, create a new user, and run the script from your terminal.

> **Notes**
Replace 'orgUrl': 'https://{your_org}.okta.com' with your Okta org URL.
Replace 'token': 'YOUR_API_TOKEN' with your generated API token.

```python
import asyncio
from okta import UserProfile, PasswordCredential, CreateUserRequest, UserNextLogin, UserCredentials
from okta.client import Client as OktaClient
config = {
   'orgUrl': 'https://{your_org}.okta.com',
   'token': 'YOUR_API_TOKEN',
}


okta_client = OktaClient(config)
user_config = {
   "firstName": "Sample",
   "lastName": "Sample",
   "email": "sample12.sample@example.com",
   "login": "sample12.sample@example.com",
   "mobilePhone": "555-415-1337"
 }
user_profile = UserProfile(**user_config)
password_value = {
   "value": "Knock*knock*neo*111"
}
password_credential = PasswordCredential(**password_value)
user_credentials = {
   "password": password_credential
}
user_credentials = UserCredentials(**user_credentials)
create_user_request = {
   "profile": user_profile,
   "credentials": user_credentials,
}
user_request = CreateUserRequest(**create_user_request)
async def users():
   next_login = UserNextLogin(UserNextLogin.CHANGEPASSWORD)
   user, resp, err = await okta_client.create_user(user_request, activate=True, provider=False, next_login=next_login)
   print("The response of UserApi->create_user:\n")
   print(user)
   print(resp, err)


   users, resp, err = await okta_client.list_users()
   for user in users:
       print(user.profile.first_name, user.profile.last_name)
       try:
           print(user.profile.customAttr)
       except:
           print('User has no customAttr')
loop = asyncio.get_event_loop()
loop.run_until_complete(users())
```

## Contribution workflow

To contribute code, follow a standard open-source workflow that focuses on keeping your branch up-to-date with the official repository.

1. Fork and clone the repo.

a. Navigate to the [Okta SDK Python](https://github.com/okta/okta-sdk-python/tree/master) repo and fork it in your browser. Then clone your fork to your local machine:

```shell
git clone https://github.com/okta/okta-sdk-python.git
cd okta-sdk-python
```

2. Sync and create a feature branch.

a. Ensure your local `master` branch is up-to-date with `origin/master`:

```shell
git checkout master
git fetch
git pull
```

b. Create a descriptive feature branch for your changes:

```shell
git checkout -b feature_x
```

3. [Optional] Make changes, generate models, and commit.

Make your code, documentation, or fix changes in your feature branch.

> **Note**: If your changes are related to the mustache template files, run the below SDK generation process:

a. Review the [prerequisites](#contribution-prerequisites) list to install the required OpenAPI package.

b. Change directory to openapi.

```shell
cd openapi
```

c. Run the build script to regenerate the Okta SDK Python package:

```shell
generate.sh
```

4. Test and validate.

a. Run tests using `pytest` to ensure your changes didn't introduce regressions:

```shell
pytest tests
```

5. Add and commit your changes:

```shell
git status
git add <files>
git commit -m "descriptive commit message for your changes"
```

6. Publish your feature branch to the repo.

a. Switch back to the `master` branch and ensure it's the latest:

```shell
git checkout master # Switch to the master branch
git pull # Pull the latest changes on the master branch
```

b. Switch back to your feature branch and `rebase` it on `master`:

```shell
git checkout feature_x # Switch to your feature branch
git rebase master # Rebase feature work on master branch
```

c. Publish your feature branch to your fork:

```shell
git push origin feature_x # Make a Pull Request changes with your feature work
```

7. Create a Pull Request (PR):

a. Navigate to your forked repo (https://github.com/YOUR_ACCOUNT/okta-sdk-python) on GitHub and **Create a Pull Request**.

b. In the **description**, add the test coverage report to ensure the required coverage for the newly added code.

> **Note** To generate the report, use the following command:

```shell
pytest --cov=okta/api --cov-report=html --continue-on-collection-errors --maxfail=0 tests/integration -v
```

> After the command completes, navigate to the `htmlcov` folder and open `index.html` in your browser. This file displays the visual test results; attach this report while creating the PR.

c. Click **Create Pull Request**.

### Clean up (optional)

After the pull request is merged, delete your local branch:

```shell
git branch -D feature_x # local branch deletion
```
