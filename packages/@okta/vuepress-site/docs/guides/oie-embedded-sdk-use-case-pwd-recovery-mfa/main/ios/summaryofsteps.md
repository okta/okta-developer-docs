The following sequence diagram details each step in the password recovery flow.

<div class="three-quarter">

![Displays a sequence diagram for the password recovery use case](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-swift-pwd-recovery.png)

</div>

## The sample application's integration with the SDK

Similar to the Okta APIs, the SDK uses a generic interface to handle
each step of the user sign-in flow. This interface enables applications
to use a dynamic model when responding to policy changes within Okta. Specifically,
it enables a pure policy-driven design that accepts new functionality,
such as adding additional sign-in factors, without the need to update your
application's code. This feature is important for mobile devices due to the challenges in updating applications. See how the [sample application](/docs/guides/oie-embedded-common-run-samples/ios/main/) uses the SDK to implement this dynamic policy-driven behavior.

## Integrate the SDK with the sample code

In contrast to the sample application, the
[sample code](https://github.com/okta/okta-idx-swift/tree/master/Samples/Signin%20Samples)
provided in this step-by-step guide wraps the SDK with a more prescriptive and explicit interface
that is purposely built to help facilitate understanding of how to use the SDK.
It's meant to be a learning tool and although you can implement similar code in your
app, you're advised to use the same best practice dynamic approach implemented
in the sample application.

