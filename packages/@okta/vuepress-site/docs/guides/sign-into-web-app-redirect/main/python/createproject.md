
1. Make sure that you have a recent version of [Python](https://www.python.org/) and [pip](https://pypi.org/project/pip/) installed.
2. Create a project folder named `okta-flask-quickstart` with a subfolder called `venv` inside.
3. Activate the corresponding environment using the following commands:

```shell
cd okta-flask-quickstart
python3 -m venv venv
. venv/bin/activate
```

> **Note**: This guide uses requests v2.27.1, Flask v2.0.2, pyOpenSSL v.22.0.0, flask-cors v3.0.10, and Flask-Login v0.5.0.

> **Note**: If you're using the Okta CLI, you can also run `okta start flask` to create an app. This command creates an OIDC app in Okta, downloads the [okta-flask-sample](https://github.com/okta-samples/okta-flask-sample), and configures it to work with the OIDC app. This quickstart uses the basic Flask starter app instead, as it's easier to understand the Okta-specific additions if you work through them yourself.
