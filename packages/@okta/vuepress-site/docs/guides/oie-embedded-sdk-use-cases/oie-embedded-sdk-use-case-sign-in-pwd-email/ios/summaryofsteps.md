## The dynamic model of the SDK and sample application

Much like the Okta API it calls, the SDK uses a generic interface to handle
each step of the user sign in flow. This interface enables calling applications
to use a dynamic model when responding to policy changes within Okta. Specifically,
it enables a pure policy-driven design which accepts new functionality,
such as adding additional sign in factors, without the need to update your
application's code. Such a feature becomes important for mobile devices where
keeping applications updated is challenging. The
[sample application](/docs/guides/oie-embedded-sdk-run-sample/ios/main/),
provided in the SDK's Git Repository, uses the SDK to implement such dynamic policy
driven behavior.

## Working with the sample code

The
[sample code](https://github.com/okta/okta-idx-swift/tree/master/Samples/Signin%20Samples)
provided in this guide wraps the SDK with a more prescriptive and explicit interface
that is purposely built to help facilitate understanding of how to use the SDK.
It's meant to be a learning tool and although you can implement similar code in your
app, you're advised to stick to the same best practice dynamic approach implemented
in the sample application.

The example integration used in this guide is a simple use case designed to
explain the basics of calling the SDK.

## Summary of steps

The following sequence diagram illustrates the flow of an application using the
[sample code](#sample-code) to implement this use case.

<div class="common-image-format">

![A sequence diagram for the sign in with passowrd and email use case](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-swift-sign-in-pwd-email.png)

</div>
