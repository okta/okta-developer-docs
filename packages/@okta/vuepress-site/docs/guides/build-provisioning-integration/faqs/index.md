---
title: Frequently Asked Questions (Provisioning)
---

## SCIM Technical Questions

**What are the differences between SCIM 1.1 and 2.0?**

* Namespaces:  Namespaces are different, therefore 2.0 is not backwards compatible with 1.1

    | SCIM 1.1 | SCIM 2.0 |
    | --- | --- |
    | `urn:scim:schemas:core:1.0 urn:scim:schemas:extension:enterprise:1.0`  |  `urn:ietf:params:scim:schemas:core:2.0:User urn:ietf:params:scim:schemas:extension:enterprise:2.0:User` |

* Service Provider Configuration Endpoint: There's no `s` at the end of the SCIM 2.0 endpoint.

    | SCIM 1.1 | SCIM 2.0 |
    | --- | --- |
    | `/ServiceProviderConfigs` | `/ServiceProviderConfig` |

* Patch Protocol

    | SCIM 1.1 | SCIM 2.0 |
    | --- | --- |
    | [Section 3.3.2](http://www.simplecloud.info/specs/draft-scim-api-01.html#edit-resource-with-patch) | [Section 3.5.2: Uses JSON Patch](https://tools.ietf.org/html/rfc7644#section-3.5.2) |

* Error Response Schema

    | SCIM 1.1 | SCIM 2.0 |
    | --- | --- |
    | [Section 3.9](http://www.simplecloud.info/specs/draft-scim-api-01.html#anchor6) | [Section 3.12](https://tools.ietf.org/html/rfc7644#section-3.12) |

* Reference Type

    | SCIM 1.1 | SCIM 2.0 |
    | --- | --- |
    | N/A | Supports reference type pointing to the full URL of another SCIM Resource |

* Query by POST /search

    | SCIM 1.1 | SCIM 2.0 |
    | --- | --- |
    | N/A | [Section 3.4.3](https://tools.ietf.org/html/rfc7644#section-3.4.3) |

**Our API is similar to SCIM, but is not 100% compliant. Can we still integrate with Okta?**

Unfortunately, your app's SCIM server API must be fully SCIM compliant in order to integrate with Okta.
Okta's SCIM client endpoints are hard coded into a template which adhere directly to [the SCIM spec](http://www.simplecloud.info/).
Not all capabilities of the SCIM spec need to be supported (see [Required SCIM Server Capabilities](/docs/concepts/scim/#required-scim-server-capabilities/) in our SCIM Technical Reference) but the core schema and features do need to be supported.

**SCIM is a new standard. How broadly is it being adopted by cloud app vendors and how confident can I be in the SCIM standard's long-term viability?**

Okta has seen significant SCIM momentum in the market amongst our network of app developers over the past year.
Hot new apps like [Slack](https://api.slack.com/scim)
and [Lucidchart](https://www.lucidchart.com/techblog/2016/08/04/an-implementers-overview-managing-cloud-identity-with-scim/)
are supporting SCIM as well established software companies
like [Huddle](https://github.com/Huddle/huddle-apis/wiki/Integrating%20with%20SCIM).
Okta has doubled down on our investment in our SCIM server
and launched our own SCIM provisioning developer program.
The SCIM standards is strong and is run by Salesforce, Google, and Sailpoint (Okta is also a contributor).

**How should I be managing authentication to my SCIM API?**

Okta recommends using the OAuth 2.0 Authorization Code Grant Flow (aka "three-legged OAuth).
Okta doesn't support the Client Credentials or Resource Owner Password Credentials Authorization grant flows.
The Authorization Code Grant Flow is more common in SaaS/cloud and is also more secure.
In addition to OAuth, Okta also supports basic auth and header token auth options.

**I have a multi-tenant app how do I allow my customers to customize their specific tenant in Okta?**

Use the three-legged OAuth (Authorization Grant flow),
so that you know exactly which token/key the customer is using.
Another option is by URL. When the customer configures your app in Okta, we can prompt them to add their unique subdomain for your app  (see Zscaler app below).
Okta can use part of this url in the SCIM endpoint for that customer, for example `http://www.company.com/tenantA/scim` or `http://www.company.com/tenantB/scim`.
This subdomain field can be configured with Okta after you submit your app for Okta review.

![Example SCIM endpoint with subdomain](/img/oin/scim-scalar.png "Example SCIM endpoint with subdomain")

**Why do I need to implement the type attribute for attributes such as emails/phoneNumbers/addresses?**

The SCIM User Profile allows for an array of emails. The only way to differentiate between emails is to use the `type` sub-attribute.

* When returning multi-valued attributes, service providers SHOULD canonicalize the value returned (e.g., by returning a value for the sub-attribute "type", such as "home" or "work") when appropriate (e.g., for email addresses and URLs).
* Service providers MAY return element objects with the same "value" sub-attribute more than once with a different `type` sub-attribute (e.g., the same email address may be used for work and home) but SHOULD NOT return the same (type, value) combination more than once per attribute, as this complicates processing by the client.
* When defining schema for multi-valued attributes, it is considered a good practice to provide a `type` attribute that MAY be used for the purpose of canonicalization of values. In the schema definition for an attribute, the service provider MAY define the recommended canonical values (see [RFC 7643 Section 7](https://tools.ietf.org/html/rfc7643#section-7)).

See [Section 2.4 of RFC 7643](https://tools.ietf.org/html/rfc7643#section-2.4) for more details.

**I only have one email/phone number/address in my user profile. Do I need to implement the array of emails/phone numbers/addresses?**

Yes, the you must return these fields in an array, which is specified in the SCIM spec as a multi-valued attribute: [Section 2.4](https://tools.ietf.org/html/rfc7643#section-2.4).

**Why doesn't Okta support DELETE /Users?**

Okta users are never deleted for compliance and audit purposes; they are deactivated instead. Because of this, Okta never makes an HTTP DELETE request to a user resource on your SCIM API. Instead, Okta makes an HTTP PATCH request to set the active setting to false. You'll need to support the concept of an "active" and "inactive" user in your app.

**Will Okta be supporting the /groups SCIM endpoint? When?**

Yes, Okta will eventually support the /groups endpoint of the SCIM API. We are targeting early 2017 for this feature. In the meantime, to support the setting licensing / entitlements in your app without groups, you can use custom attributes in Okta to manage this. For examples, Lucidchart was able to support this use case with a user attribute called "License Type". See the "Extensibility" section of Lucidchart's blog post for more details.

**How does data validation work with SCIM provisioning? For example, if my app requires phone number in a specific format, how do I ensure that Okta passes the attribute in that format? If a data validation error issue occurs how does error reporting work?**

The SCIM spec specifies valid data formats for a given user profile attribute, however Okta does not rigorously validate that the customer has inputted values meeting those requirements to preserve flexibility.
Therefore, data validation should be handled by your app's SCIM Server. In other words, when Okta provisions user profile to your app, it should check that the data is valid per their special requirements. Error messages sent in the response from your app will be surfaced to the Okta administrator via alerts and tasks in the Okta interface. You should also specify your data requirements in your config guide.

**How much filtering support is needed?**

The filtering capabilities in the SCIM protocol are pretty broad but the common filtering use case with Okta is quite narrow -- determine if a newly created Okta user already exists in your app based on a matching identifier . This means the eq (equals) operator is all you really need to support for now. We "might" eventually support other operators but don't right now.
Note that Okta only supports filtering via the eq operator on the SCIM userName attribute on the SCIM Server side. However, Okta can use any AppUser attribute on the Okta side for passing into the eq operator. Typically this would also be `appuser.userName`, but `appuser.email` or `appuser.randomAttribute` can also work.

### Publishing Questions

**If I submit my app with a set of attributes, and then I want to add attributes during the testing phase of the app, is this acceptable?**

Yes. Add a new app instance in your dev org to test the new attributes and email <developers@okta.com>.

**Once my app has been published, and I add additional attributes, how do I republish my app? Can I republish frequently?**

Yes, you can republish your app, but we recommend you don't do it frequently. Your app goes through Okta's QA process every time you add additional attributes.

### Dev Doc Examples

* Box - <https://developer.box.com/docs/custom-integrations>
* Slack - <https://api.slack.com/>
* OneLogin - <https://developers.onelogin.com/>
* Zendesk - <https://developer.zendesk.com/apps>

## Helpful Resources

[SCIM Overview](https://www.lucidchart.com/techblog/2016/08/04/an-implementers-overview-managing-cloud-identity-with-scim/)

[Okta End-User Management](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_People)

[Okta Provisioning Basics](https://help.okta.com/en/prod/Content/Topics/Apps/Provisioning_Deprovisioning_Overview.htm)

[SCIM and Facebook](https://developers.facebook.com/docs/facebook-at-work/provisioning/scim-api)

[OpenID Explained](http://openidexplained.com/)

[SCIM and Onelogin](https://developers.onelogin.com/scim)

## Appendix: Using the Example SCIM Server

Okta provides an [example SCIM Server](https://github.com/oktadeveloper/okta-scim-beta) written in
Python.

This example SCIM server demonstrates how to implement a basic SCIM
server that can create, read, update, and deactivate Okta users.

You can find the sample code to handle HTTP requests to this sample application in [Required SCIM Server Capabilities](/docs/concepts/scim/#required-scim-server-capabilities/)
Use the instructions that follow to set up and run the example SCIM server.

### How to run

This example code was written for **Python 2.7** and does not
currently work with Python 3.

Here is how to run the example code on your machine:

First, start by doing a `git checkout` of this repository, then
`cd` to directory that `git` creates. Then, do the following:

1. `cd` to the directory you just checked out:

    `$ cd okta-scim-beta`
2. Create an isolated Python environment named `venv` using [virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/):

    `$ virtualenv venv`
3. Next, activate the newly created virtual environment:

    `$ source venv/bin/activate`
4. Then, install the dependencies for the sample SCIM server using Python's ["pip" package manager](https://en.wikipedia.org/wiki/Pip_%28package_manager%29):

    `$ pip install -r requirements.txt`
5. Finally, start the example SCIM server using this command:

    `$ python scim-server.py`

### Introduction

Below are instructions for writing a SCIM server in Python, using
Flask and SQLAlchemy.

A completed version of this example server is available in this git
repository in the file named `scim-server.py`.

### Imports

We start by importing the Python packages that the SCIM server will
use:

    import os
    import re
    import uuid

    from flask import Flask
    from flask import render_template
    from flask import request
    from flask import url_for
    from flask_socketio import SocketIO
    from flask_socketio import emit
    from flask_sqlalchemy import SQLAlchemy
    import flask

### Setup

`re` adds support for regular expression parsing, `flask` adds the Flask
web framework, `flask_socketio` and `flask_sqlalchemy` add a idiomatic support for
their respective technologies to Flask.

Next we initialize Flask, SQLAlchemy, and SocketIO:

    app = Flask(__name__)
    database_url = os.getenv('DATABASE_URL', 'sqlite:///test-users.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    db = SQLAlchemy(app)
    socketio = SocketIO(app)

### SQLAlchemy support for the "users" table

Below is the class that SQLAlchemy uses to give us easy access to
the "users" table.

The `update` method is used to "merge" or "update" a new User object
into an existing User object. This is used to simplify the code for
the code that handles PUT calls to `/Users/{id}`.

The `to_scim_resource` method is used to turn a User object into
a [SCIM "User" resource schema](https://tools.ietf.org/html/rfc7643#section-4.1).

    class User(db.Model):
        __tablename__ = 'users'
        id = db.Column(db.String(36), primary_key=True)
        active = db.Column(db.Boolean, default=False)
        userName = db.Column(db.String(250),
                             unique=True,
                             nullable=False,
                             index=True)
        familyName = db.Column(db.String(250))
        middleName = db.Column(db.String(250))
        givenName = db.Column(db.String(250))

        def __init__(self, resource):
            self.update(resource)

        def update(self, resource):
            for attribute in ['userName', 'active']:
                if attribute in resource:
                    setattr(self, attribute, resource[attribute])
            for attribute in ['givenName', 'middleName', 'familyName']:
                if attribute in resource['name']:
                    setattr(self, attribute, resource['name'][attribute])

        def to_scim_resource(self):
            rv = {
                "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
                "id": self.id,
                "userName": self.userName,
                "name": {
                    "familyName": self.familyName,
                    "givenName": self.givenName,
                    "middleName": self.middleName,
                },
                "active": self.active,
                "meta": {
                    "resourceType": "User",
                    "location": url_for('user_get',
                                        user_id=self.id,
                                        _external=True),
                    # "created": "2010-01-23T04:56:22Z",
                    # "lastModified": "2011-05-13T04:42:34Z",
                }
            }
            return rv

### Support for SCIM Query resources

We also define a `ListResponse` class, which is used to return an
array of SCIM resources into a
[Query Resource](https://tools.ietf.org/html/rfc7644#section-3.4.2).

    class ListResponse():
        def __init__(self, list, start_index=1, count=None, total_results=0):
            self.list = list
            self.start_index = start_index
            self.count = count
            self.total_results = total_results

        def to_scim_resource(self):
            rv = {
                "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
                "totalResults": self.total_results,
                "startIndex": self.start_index,
                "Resources": []
            }
            resources = []
            for item in self.list:
                resources.append(item.to_scim_resource())
            if self.count:
                rv['itemsPerPage'] = self.count
            rv['Resources'] = resources
            return rv

### Support for SCIM error messages

Given a `message` and HTTP `status_code`, this will return a Flask
response with the appropriately formatted SCIM error message.

By default, this function will return an HTTP status of "[HTTP 500
Internal Server Error](https://tools.ietf.org/html/rfc2068#section-10.5.1)". However you should return a more specific
`status_code` when possible.

See [section 3.12](https://tools.ietf.org/html/rfc7644#section-3.12) of [RFC 7644](https://tools.ietf.org/html/rfc7644) for details.

    def scim_error(message, status_code=500):
        rv = {
            "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
            "detail": message,
            "status": str(status_code)
        }
        return flask.jsonify(rv), status_code

### Socket.IO support

This sample application makes use of Socket.IO to give you a "real
time" view of SCIM requests that Okta makes to this sample
application.

When you load the sample application (the "/" route), your browser
will be sent a web application that uses Socket.IO to display
updates without the need for you to reload the page:

    @app.route('/')
    def hello():
        return render_template('base.html')

This page is updated using the functions below:

* `send_to_browser` is syntactic sugar that will `emit` Socket.IO messages to the browser with the proper `broadcast` and `namespace` settings.
* `render_json` is more syntactic sugar which is used to render JSON replies to Okta's SCIM client and `emit` the SCIM resource to Socket.IO at the same time.
* `test_connect` is the function called with a browser first starts up Socket.IO, it returns a list of currently active users to the browser via Socket.IO.
* `test_disconnect` is a stub that shows how to handle Socket.IO "disconnect" messages.

The code described above is as follows:

    def send_to_browser(obj):
        socketio.emit('user',
                      {'data': obj},
                      broadcast=True,
                      namespace='/test')

    def render_json(obj):
        rv = obj.to_scim_resource()
        send_to_browser(rv)
        return flask.jsonify(rv)

    @socketio.on('connect', namespace='/test')
    def test_connect():
        for user in User.query.filter_by(active=True).all():
            emit('user', {'data': user.to_scim_resource()})

    @socketio.on('disconnect', namespace='/test')
    def test_disconnect():
        print('Client disconnected')

### Socket.IO application

Below is the JavaScript that powers the Socket.IO application described above. For the full contents of the HTML that this JavaScript is part of, see the `base.html` file in the `templates` directory of this project.

    $(document).ready(function () {
        namespace = '/test'; // change to an empty string to use the global namespace
        var uri = 'https://' + document.domain  + namespace;
        console.log(uri);
        var socket = io.connect(uri);

        socket.on('user', function(msg) {
            console.log(msg);
            var user = msg.data;
            var user_element = '#' + user.id
            var userRow = '<tr id="' + user.id + '"><td>' + user.id + '</td><td>' + user.name.givenName + '</td><td>' + user.name.familyName + '</td><td>' + user.userName + '</td></tr>';
            if($(user_element).length && user.active) {
                $(user_element).replaceWith(userRow);
            } else if (user.active) {
                $('#users-table').append(userRow);
            }

            if($(user_element).length && user.active) {
                $(user_element).show();
            }
            if($(user_element).length && !user.active) {
                $(user_element).hide();
            }
        });
    });

### Support for running from the command line

This bit of code allows you to run the sample application by typing `python scim-server.py` from your command line.

This code also includes a `try/catch` block that creates all tables of the `User.query.one()` function throws an error (which should only happen if the User table isn't defined.

    if __name__ == "__main__":
        try:
            User.query.one()
        except:
            db.create_all()
        app.debug = True
        socketio.run(app)

[devforum]: https://devforum.okta.com
