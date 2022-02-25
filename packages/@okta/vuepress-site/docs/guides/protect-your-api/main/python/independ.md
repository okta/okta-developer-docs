All Okta packages for Python use [pip](https://packaging.python.org/guides/tool-recommendations/). Install the following dependencies in your project:

- `pip install requests`
- `pip install Flask`
- `pip install flask-cors`
- `pip install pyOpenSSL`
- `pip install Flask-Login`
- `pip install okta-jwt-verifier`

Or the same with one command:
- `pip install requests Flask flask-cors pyOpenSSL Flask-Login okta-jwt-verifier`

All needed dependencies are usually located in the `requirements.txt` file. If you cloned the samples repo, you can install the dependencies using that file from the root of the project:

- `pip install -r requirements.txt`


You can then import them into your project:

```py
import okta_jwt_verifier
```
