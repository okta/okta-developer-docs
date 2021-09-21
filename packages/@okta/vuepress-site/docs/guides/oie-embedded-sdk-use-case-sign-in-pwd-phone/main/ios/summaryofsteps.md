The following sequence diagram details each step in the authentication flow for this use case.

<div class="common-image-format">

![Displays a sequence diagram for the sign-in with email and phone use case](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-swift-sign-in-pwd-phone-1.png)

</div>

## The sample application's integration with the SDK

Much like the Okta API it calls, the SDK uses a generic interface to handle
each step of the user sign-in flow. This interface enables calling applications
to use a dynamic model when responding to policy changes within Okta. Specifically,
it enables a pure policy-driven design which accepts new functionality,
such as adding additional sign-in factors, without the need to update your
application's code. Such a feature becomes important for mobile devices where
keeping applications updated is challenging. The
[sample application](/docs/guides/oie-embedded-sdk-run-sample/ios/main/),
provided in the SDK's Git Repository, uses the SDK to implement such dynamic policy
driven behavior. See this sample application for more details on how to design
a dynamic application using the SDK.

## Integrate the SDK with the sample code

In contrast to the sample application, the
[sample code](https://github.com/okta/okta-idx-swift/tree/master/Samples/Signin%20Samples)
provided in this step by step guide wraps the SDK with a more prescriptive and explicit interface
that is purposely built to help facilitate understanding of how to use the SDK.
It's meant to be a learning tool and although you can implement similar code in your
app, you're advised to stick to the same best practice dynamic approach implemented
in the sample application.
