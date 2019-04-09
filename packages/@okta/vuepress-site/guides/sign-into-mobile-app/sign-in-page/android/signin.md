First initialize the Okta AppAuth SDK in the `Activity#onCreate` method of the Activity that you are using to log users into your app. In this example, we call it LoginActivity:

code example

After the `OktaAppAuth` instance is initialized, you can start the authorization flow by simply calling `login` whenever you're ready:

code example