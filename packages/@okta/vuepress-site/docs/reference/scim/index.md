---
title: SCIM Protocol
icon: /assets/img/icons/scim.svg
meta:
  - name: description
    content: Your SCIM API must support specific SCIM API endpoints to work with Okta. Those endpoints and their explanations are detailed here.
layout: Landing
---

# SCIM Protocol

Your SCIM API must support the following SCIM API endpoints to work with Okta:

![scim api endpoints required to work with Okta width:](/img/scim_flowchart.png "scim api endpoints required to work with Okta width:")

### Create account

<ApiOperation method="post" url="/Users" />

Your SCIM 2.0 API should allow the creation of a new user
account. The four basic attributes listed above must be supported, along with any additional attributes that your application supports. If your application supports entitlements, your SCIM 2.0 API should allow configuration of those as well.

An HTTP POST to the `/Users` endpoint must return an immutable or system ID of the user (`id`) must be returned to Okta.

Okta will call this SCIM API endpoint under the following circumstances:

* **Direct assignment**

    When a user is assigned to an Okta application using the "Assign to People" button in the "People" tab.
* **Group-based assignment**

    When a user is added to a group that is assigned to an Okta
    application. For example, an Okta administrator can assign a group of users to an Okta application using the "Assign to Groups" button in the "Groups" tab. When a group is assigned to an Okta application, Okta sends updates to the assigned application when a user is added or removed from that group.

Below is an example demonstrating how the [sample application](https://github.com/oktadeveloper/okta-scim-beta) handles account creation:

```python
@app.route("/scim/v2/Users", methods=['POST'])
def users_post():
    user_resource = request.get_json(force=True)
    user = User(user_resource)
    user.id = str(uuid.uuid4())
    db.session.add(user)
    db.session.commit()
    rv = user.to_scim_resource()
    send_to_browser(rv)
    resp = flask.jsonify(rv)
    resp.headers['Location'] = url_for('user_get',
                                        user_id=user.userName,
                                        _external=True)
    return resp, 201
```

Note: `force=True` is set because Okta sends `application/scim+json` as the `Content-Type` and the `.get_json()` method expects `application/json`.

###### SCIM 1.1

Below is a sample request from Okta:

```http
POST /v1/Users HTTP/1.1
Accept: application/json
Accept-Charset: utf-8
Content-Type: application/json; charset=utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Content-Length: 321
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate

{
	"schemas": ["urn:scim:schemas:core:1.0"],
	"userName": "jane.doe@example.com",
	"name": {
		"givenName": "Jane",
		"familyName": "Doe"
	},
	"emails": [{
		"primary": true,
		"value": "jane.doe@example.com",
		"type": "work"
	}],
	"displayName": "Jane Doe",
	"locale": "en_US",
	"externalId": "00uv931EiyRsnwOGa0g3",
	"groups": [],
	"password": "4a9XuKkx",
	"active": true
}
```

For more information, see [section 3.1](http://www.simplecloud.info/specs/draft-scim-api-01.html#create-resource) of the [SCIM 1.1 Protocol Specification](http://www.simplecloud.info/specs/draft-scim-api-01.html).

###### SCIM 2.0

Below is a sample request from Okta:

```http
POST /v2/Users HTTP/1.1
Accept: application/scim+json
Accept-Charset: utf-8
Content-Type: application/scim+json; charset=utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Content-Length: 348
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate

{
	"schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
	"userName": "jane.doe@example.com",
	"name": {
		"givenName": "Jane",
		"familyName": "Doe"
	},
	"emails": [{
		"primary": true,
		"value": "jane.doe@example.com",
		"type": "work"
	}],
	"displayName": "Jane Doe",
	"locale": "en_US",
	"externalId": "00uv931EiyRsnwOGa0g3",
	"groups": [],
	"password": "4a9XuKkx",
	"active": true
}
```

For more information on user creation via the `/Users` SCIM endpoint, see [section 3.3](https://tools.ietf.org/html/rfc7644#section-3.3) of the [SCIM 2.0 Protocol Specification](https://tools.ietf.org/html/rfc7644).

### Read list of accounts with search

<ApiOperation method="get" url="/Users" />

Your SCIM 2.0 API must support the ability for Okta to retrieve users (and entitlements like groups if available) from your service. This allows Okta to fetch all user resources in an efficient manner for reconciliation and initial bootstrap (to get all users from your app into the system).

Here is an example using `curl` to make a GET request to `/Users`:

    curl https://joel-scim.herokuapp.com/scim/v2/Users

Below is how the [sample application](https://github.com/oktadeveloper/okta-scim-beta) handles listing user resources, with support for filtering and pagination:

```python
@app.route("/scim/v2/Users", methods=['GET'])
def users_get():
    query = User.query
    request_filter = request.args.get('filter')
    match = None
    if request_filter:
        match = re.match('(\w+) eq "([^"]*)"', request_filter)
    if match:
        (search_key_name, search_value) = match.groups()
        search_key = getattr(User, search_key_name)
        query = query.filter(search_key == search_value)
    count = int(request.args.get('count', 100))
    start_index = int(request.args.get('startIndex', 1))
    if start_index < 1:
        start_index = 1
    start_index -= 1
    query = query.offset(start_index).limit(count)
    total_results = query.count()
    found = query.all()
    rv = ListResponse(found,
                      start_index=start_index,
                      count=count,
                      total_results=total_results)
    return flask.jsonify(rv.to_scim_resource())
```

> If you want to see the SQL query that SQLAlchemy is using for
> the query, add this code after the `query` statement that you want
> to see: `print(str(query.statement))`

Below is a sample request from Okta:

```http
GET /v2/Users?startIndex=1&count=2 HTTP/1.1
Accept: application/scim+json
Accept-Charset: utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate
```

For more details on the `/Users` SCIM endpoint, see [section 3.4.2](https://tools.ietf.org/html/rfc7644#section-3.4.2) of the [SCIM 2.0 Protocol Specification](https://tools.ietf.org/html/rfc7644).

### Read account details

<ApiOperation method="get" url="/Users/{id}" />

Your SCIM 2.0 API must support fetching of users by user id.

Below is how the [sample application](https://github.com/oktadeveloper/okta-scim-beta) handles returning a user resource by `user_id`:

```python
@app.route("/scim/v2/Users/<user_id>", methods=['GET'])
def user_get(user_id):
    try:
        user = User.query.filter_by(id=user_id).one()
    except:
        return scim_error("User not found", 404)
    return render_json(user)
```

If we don't find a user, we return a HTTP status 404 ("Not found") with SCIM error message.

Below is a sample request from Okta:

```http
GET /v2/Users/{id} HTTP/1.1
Accept: application/scim+json
Accept-Charset: utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate
```

For more details on the `/Users/{id}` SCIM endpoint, see [section 3.4.1](https://tools.ietf.org/html/rfc7644#section-3.4.1) of the [SCIM 2.0 Protocol Specification](https://tools.ietf.org/html/rfc7644).

### Update account details

<ApiOperation method="put" url="/Users/{id}" />

When a profile attribute of a user assigned to your SCIM enabled application is changed, Okta will do the following:

* Make a GET request against `/Users/{id}` on your SCIM API for the user to update.
* Take the resource returned from your SCIM API and update only the attributes that need to be updated.
* Make a PUT request against `/Users/{id}` in your SCIM API with the updated resource as the payload.

Examples of things that can cause changes to an Okta user profile are:

* A change in profile a master like Active Directory or a Human Resource Management Software system.
* A direct change of a profile attribute in Okta for a local user.

Below is how the [sample application](https://github.com/oktadeveloper/okta-scim-beta) handles account profile updates:

```python
@app.route("/scim/v2/Users/<user_id>", methods=['PUT'])
def users_put(user_id):
    user_resource = request.get_json(force=True)
    user = User.query.filter_by(id=user_id).one()
    user.update(user_resource)
    db.session.add(user)
    db.session.commit()
    return render_json(user)
```

###### SCIM 1.1

Below is a sample request from Okta:

```http
PUT /v1/Users/8ff680f1c7064d518b3a05545f8155cb HTTP/1.1
Accept: application/json
Accept-Charset: utf-8
Content-Type: application/json; charset=utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Content-Length: 464
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate

{
	"id": "8ff680f1c7064d518b3a05545f8155cb",
	"externalId": "00uv931EiyRsnwOGa0g3",
	"meta": {
		"created": "05-17-2018 00:00:00",
		"lastModified": "05-17-2018 00:00:00",
		"version": "v1.0"
	},
	"schemas": ["urn:scim:schemas:core:1.0"],
	"userName": "jane.doe@example.com",
	"displayName": "Jane Doe",
	"locale": "en_US",
	"active": true,
	"password": "TkdFNVdIVkxhM2c9",
	"emails": [{
		"value": "jane.doe@example.com",
		"type": "work",
		"primary": true
	}],
	"name": {
		"familyName": "Doe",
		"givenName": "Jane"
	},
	"groups": []
}
```

For more details, see [section 3.3.1](http://www.simplecloud.info/specs/draft-scim-api-01.html#edit-resource-with-put) of the [SCIM 1.1 Protocol Specification](http://www.simplecloud.info/specs/draft-scim-api-01.html).

###### SCIM 2.0

Below is a sample request from Okta:

```http
PUT /v2/Users/{id} HTTP/1.1
Accept: application/scim+json
Accept-Charset: utf-8
Content-Type: application/scim+json; charset=utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Content-Length: 506
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate

{
	"id": "{id}",
	"externalId": "00uq2kqg7YTkFo3cY0g3",
	"meta": {
		"resourceType": "User",
		"created": "04-12-2018 00:00:00",
		"lastModified": "04-12-2018 00:00:00",
		"version": "v1.0"
	},
	"schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
	"userName": "jane.doe@example.com",
	"displayName": "Jane Doe",
	"locale": "en_US",
	"active": true,
	"password": "TkdFNVdIVkxhM2c9",
	"emails": [{
		"value": "jane.doe@example.com",
		"type": "work",
		"primary": true
	}],
	"name": {
		"familyName": "Doe",
		"givenName": "Jane"
	},
	"groups": []
}
```

For more details on updates to the `/Users/{id}` SCIM endpoint, see [section 3.5.1](https://tools.ietf.org/html/rfc7644#section-3.5.1) of the [SCIM 2.0 Protocol Specification](https://tools.ietf.org/html/rfc7644).

### Deactivate account

<ApiOperation method="patch" url="/Users/{id}" />

Deprovisioning is perhaps the most important reason customers why customers ask that your application supports provisioning
with Okta. Your SCIM API should support account deactivation via a PATCH to `/Users/{id}` where the payload of the PATCH request sets the `active` property of the user to `false`. Okta also doe s a PUT if the Patch is not supported for deactivation.

Your SCIM API should allow account updates at the attribute level. If entitlements are supported, your SCIM API should also be able to update entitlements based on SCIM profile updates.

Okta will send a PATCH request to your application to deactivate a user when an Okta user is "unassigned" from your application. Examples of when this happen are as follows:

* A user is manually unassigned from your application.
* A user is removed from a group which is assigned to your application.
* When a user is deactivated in Okta, either manually or via by an external profile master like Active Directory or a Human Resource Management Software system.

Below is how the [sample application](https://github.com/oktadeveloper/okta-scim-beta) handles account deactivation:

```python
@app.route("/scim/v2/Users/<user_id>", methods=['PATCH'])
def users_patch(user_id):
    patch_resource = request.get_json(force=True)
    for attribute in ['schemas', 'Operations']:
        if attribute not in patch_resource:
            message = "Payload must contain '{}' attribute.".format(attribute)
            return message, 400
    schema_patchop = 'urn:ietf:params:scim:api:messages:2.0:PatchOp'
    if schema_patchop not in patch_resource['schemas']:
        return "The 'schemas' type in this request is not supported.", 501
    user = User.query.filter_by(id=user_id).one()
    for operation in patch_resource['Operations']:
        if 'op' not in operation and operation['op'] != 'replace':
            continue
        value = operation['value']
        for key in value.keys():
            setattr(user, key, value[key])
    db.session.add(user)
    db.session.commit()
    return render_json(user)
```

###### SCIM 1.1

Below is a sample request from Okta:

```http
PATCH /v1/Users/2fabb15c24a2440c93a0214599603bcb HTTP/1.1
Accept: application/json
Accept-Charset: utf-8
Content-Type: application/json; charset=utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Content-Length: 111
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate

{
	"schemas": ["urn:scim:schemas:core:1.0"],
	"id": "8ff680f1c7064d518b3a05545f8155cb",
	"active": false
}
```

###### SCIM 2.0

Below is a sample request from Okta:

```http
PATCH /v2/Users/{id} HTTP/1.1
Accept: application/scim+json
Accept-Charset: utf-8
Content-Type: application/scim+json; charset=utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Content-Length: 118
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate

{
	"schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
	"Operations": [{
		"op": "replace",
		"value": {
			"active": false
		}
	}]
}
```

For more details on user attribute updates to `/Users/{id}` SCIM endpoint, see [section 3.5.2](https://tools.ietf.org/html/rfc7644#section-3.5.2) of the [SCIM 2.0 Protocol Specification](https://tools.ietf.org/html/rfc7644).

##### Filtering on `userName eq` (Required)

Your SCIM API must be able to filter users following the pattern  "userName eq "..." ". This is because most provisioning actions, besides Import Users, require the ability for Okta to determine if a user resource exists on your system.

Consider the scenario where an Okta customer with thousands of users has a provisioning integration with your system, which also has thousands of users. When an Okta customer adds a new user to their Okta organization, Okta needs a way to determine quickly if a resource for the newly created user was previously created on your system.

Examples of filters that Okta might send to your SCIM API are as follows:

```bash
userName eq "jane.doe"

userName eq "jane.doe@example.com"
```

Here is an example of how to implement SCIM filtering in Python:

```python
request_filter = request.args.get('filter')
match = None
if request_filter:
    match = re.match('(\w+) eq "([^"]*)"', request_filter)
if match:
    (search_key_name, search_value) = match.groups()
    search_key = getattr(User, search_key_name)
    query = query.filter(search_key == search_value)
```

Below is a sample request from Okta:

```http
GET /v2/Users?filter=userName+eq+%22jane.doe%40example.com%22&startIndex=1&count=100 HTTP/1.1
Accept: application/scim+json
Accept-Charset: utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate
```

For more details on filtering in SCIM 2.0, see [section 3.4.2.2](https://tools.ietf.org/html/rfc7644#section-3.4.2.2) of the [SCIM 2.0 Protocol Specification](https://tools.ietf.org/html/rfc7644).

##### Filtering on additional parameters (Optional)

Okta currently only supports filtering on `username eq`. However, we may support additional parameters and operators in the future to unlock new use cases. You may want to support these now to future-proof your application. These additional filters may include the following:

`meta.lastModified`: This filter would be needed to fetch incremental updates from SCIM APIs by querying for resources using a filter expression that requests resources which were updated since the last update. This will likely be done using the `gt` filter operator. For example:

> `filter=meta.lastModified gt "2011-05-13T04:42:34Z"`

`externalId`: Okta may use the `externalId` as a more robust alternative to `userName` when determining if the user already exists in your application during a reactivation flow. `externalId` is a more stable identifier for users, because the `userName` and email addresses for a user can change.

Here is an example of an `externalId` filter that might be sent to your application:

```bash
externalId eq "00u1abcdefGHIJKLMNOP"
```

For details about supporting `externalId`, see
[section 3.1](https://tools.ietf.org/html/rfc7643#section-3.1) of [RFC 7643](https://tools.ietf.org/html/rfc7643), excerpted below.
Note that in the following excerpt, "provisioning client" refers to Okta and the service provider refers to you, the 3rd-party that Okta is making calls to.

> (externalId is) "A String that is an identifier for the resource
> as defined by the provisioning client. The "externalId" may
> simplify identification of a resource between the provisioning
> client and the service provider by allowing the client to use a
> filter to locate the resource with an identifier from the
> provisioning domain, obviating the need to store a local mapping
> between the provisioning domain's identifier of the resource and
> the identifier used by the service provider. Each resource MAY
> include a non-empty "externalId" value. The value of the
> "externalId" attribute is always issued by the provisioning
> client and MUST NOT be specified by the service provider. The
> service provider MUST always interpret the externalId as scoped
> to the provisioning domain. While the server does not enforce
> uniqueness, it is assumed that the value's uniqueness is
> controlled by the client setting the value.

When adding support for `externalId` filtering to your application, we suggest that you use OAuth2.0 for authentication and use the OAuth2.0 `client_id` to scope the `externalId` to the provisioning domain.

`emails` and `id`: Both of these attributes could also be used by Okta to determine if the user already exists in your application, instead of `userName` or `externalId`.

##### Resource pagination

When returning large lists of resources, your SCIM implementation must support pagination using a *limit* (`count`) and *offset* (`startIndex`) to return smaller groups of resources in a request.

Below is an example of a `curl` command that makes a request to the `/Users/` SCIM endpoint with `count` and `startIndex` set:

```bash
$ curl 'https://scim-server.example.com/scim/v2/Users?count=1&startIndex=1'
{
  "Resources": [
    {
      "active": false,
      "id": 1,
      "meta": {
        "location": "http://scim-server.example.com/scim/v2/Users/1",
        "resourceType": "User"
      },
      "name": {
        "familyName": "Doe",
        "givenName": "Jane",
        "middleName": null
      },
      "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
      ],
      "userName": "jane.doe@example.com"
    }
  ],
  "itemsPerPage": 1,
  "schemas": [
    "urn:ietf:params:scim:api:messages:2.0:ListResponse"
  ],
  "startIndex": 1,
  "totalResults": 1
}
```

> **Note:** When returning a paged resource, your API should return a
> capitalized `Resources` JSON key ("Resources"), however Okta will also
> support a lowercase string ("resources"). Okta will also accept
> lowercase JSON strings for the keys of child nodes inside
> `Resources` object such as `startindex`, `itemsperpage`, or `totalresults`.

One way to handle paged resources is to have your database do the paging for you. Here is how the [sample application](https://github.com/oktadeveloper/okta-scim-beta) handles
pagination with SQLAlchemy:

    count = int(request.args.get('count', 100))
    start_index = int(request.args.get('startIndex', 1))
    if start_index < 1:
        start_index = 1
    start_index -= 1
    query = query.offset(start_index).limit(count)

Note: This code subtracts "1" from the `startIndex`, because `startIndex` is [1-indexed](https://tools.ietf.org/html/rfc7644#section-3.4.2) and the OFFSET statement is [0-indexed](http://www.postgresql.org/docs/8.0/static/queries-limit.html).

For more details pagination on a SCIM 2.0 endpoint, see [section 3.4.2.4](https://tools.ietf.org/html/rfc7644#section-3.4.2.4) of the [SCIM 2.0 Protocol Specification](https://tools.ietf.org/html/rfc7644).

##### Rate limiting

Some customer actions, such as adding hundreds of users at once, causes large bursts of HTTP requests to your SCIM API. For scenarios like this, we suggest that your SCIM API return rate limiting information to Okta via the [HTTP 429 Too Many Requests](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#429) status code. This helps Okta throttle the rate at which SCIM requests are made to your API.

For more details on rate limiting requests using the HTTP 429 status code, see [section 4](https://tools.ietf.org/html/rfc6585#section-4) of [RFC 6585](https://tools.ietf.org/html/rfc6585).

### Get groups

<ApiOperation method="get" url="/Groups" />

Okta currently supports the /groups endpoint for GET /groups of a SCIM API. This is usually done to check for groups data and is not mandatory for SCIM to work. The minimum check we require is for the resources to be of JSON. check example below.

Example:

```bash
{
  "schemas": [
    "urn:ietf:params:scim:api:messages:2.0:ListResponse"
  ],
  "totalResults": 1,
  "startIndex": 0,
  "itemsPerPage": 0,
  "Resources": [
    {
      "id": "66ed8bece1944aa18bf96fb5c935c4ba",
      "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:Group"
      ],
      "displayName": "Marketing",
      "members": [
        {
          "value": "m1@atko.com",
          "$ref": "localhost:8080/Users/12345",
          "display": "Marketing User 1"
        },
        {
          "value": "m2@atko.com",
          "$ref": "localhost:8080/Users/12346",
          "display": "Marketing User 2"
        }
      ]
    }
  ]
}
```

Below is a sample request from Okta:

```http
GET /v2/Groups?startIndex=1&count=100 HTTP/1.1
Accept: application/scim+json
Accept-Charset: utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate
```

##### Create group

<ApiOperation method="post" url="/Groups" />

Okta supports creation of a Group along with its user memberships in the downstream SCIM enabled application if your SCIM 2.0 API supports it. The caveat is that the users must already be provisioned in your SCIM enabled application.

###### SCIM 1.1

Below is a sample request from Okta:

```http
POST /v1/Groups HTTP/1.1
Accept: application/json
Accept-Charset: utf-8
Content-Type: application/json; charset=utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Content-Length: 236
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate

{
	"schemas": ["urn:scim:schemas:core:1.0"],
	"displayName": "Example Group",
	"members": [{
		"value": "85467bb36e1c4f8991750501bf491962",
		"display": "steve@ad.oktatest.com"
	}, {
		"value": "2fabb15c24a2440c93a0214599603bcb",
		"display": "bob@ad.oktatest.com"
	}]
}
```

###### SCIM 2.0

Below is a sample request from Okta:

```http
POST /v2/Groups HTTP/1.1
Accept: application/scim+json
Accept-Charset: utf-8
Content-Type: application/scim+json; charset=utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Content-Length: 99
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate

{
	"schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
	"displayName": "Example Group",
	"members": [{
		"value": "85467bb36e1c4f8991750501bf491962",
		"display": "steve@ad.oktatest.com"
	}, {
		"value": "2fabb15c24a2440c93a0214599603bcb",
		"display": "bob@ad.oktatest.com"
	}]
}
```

For more details, see [section 3.3](https://tools.ietf.org/html/rfc7644#section-3.3) of the [SCIM 2.0 Protocol Specification](https://tools.ietf.org/html/rfc7644).

### Read group details

<ApiOperation method="get" url="/Groups/{id}" />

Okta supports reading the Group's details by group id along with the membership details. If a Group is not found, your SCIM application may return a HTTP status 404("not found").

Below is a sample SCIM 2.0 request from Okta:

```http
GET /v2/Groups/{id} HTTP/1.1
Accept: application/scim+json
Accept-Charset: utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate
```

For more details on the `/Groups/{id}` SCIM endpoint, see [section 3.4.1](https://tools.ietf.org/html/rfc7644#section-3.4.1) of the [SCIM 2.0 Protocol Specification](https://tools.ietf.org/html/rfc7644).


### Update group details

<ApiOperation method="put" url="/Groups/{id}" />

PUT /Groups/{id}

Any updates to the Group profile and memberships in Okta can be reflected into your SCIM application. Okta will do the following to make the Group changes effective:

* Make a GET request against `/groups/{id}` on your SCIM API for the group to update.
* Take the resource returned from your SCIM API and update only the attributes that need to be updated.
* Make a PUT request against `/groups/{id}` in your SCIM API with the updated resource as the payload.

###### SCIM 1.1

Below is a sample request from Okta:

```http
PUT /v1/Groups/8599fdac3d3142d6beebfc363d2e01a9 HTTP/1.1
Accept: application/json
Accept-Charset: utf-8
Content-Type: application/json; charset=utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Content-Length: 276
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate

{
	"schemas": ["urn:scim:schemas:core:1.0"],
	"displayName": "SCIM_test1",
	"id": "8599fdac3d3142d6beebfc363d2e01a9",
	"members": [{
		"value": "978dc5c3d4aa4014a3678e9d30ef093a",
		"display": "bob@ad.oktatest.com"
	}, {
		"value": "54c76a50f48c42e38c10f350f8e6055e",
		"display": "pete@ad.oktatest.com"
	}]
}
```

###### SCIM 2.0

Below is a sample request from Okta:

```http
PUT /v2/Groups/{id} HTTP/1.1
Accept: application/scim+json
Accept-Charset: utf-8
Content-Type: application/scim+json; charset=utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Content-Length: 293
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate

{
	"schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
	"id": "{id}",
	"displayName": "SCIM_test1",
	"members": [{
		"value": "978dc5c3d4aa4014a3678e9d30ef093a",
		"display": "bob@ad.oktatest.com"
	}, {
		"value": "54c76a50f48c42e38c10f350f8e6055e",
		"display": "pete@ad.oktatest.com"
	}]
}
```

For more details, see [section 3.5.1](https://tools.ietf.org/html/rfc7644#section-3.5.1) of the [SCIM 2.0 Protocol Specification](https://tools.ietf.org/html/rfc7644).

### Update group details

<ApiOperation method="patch" url="/Groups/{id}" />

> **Note:** We recommend retrieving the `id` field for the Group ID from the path itself instead of parsing it from the `value` attribute in the request body. We plan to deprecate the `id` field in the body to be strictly SCIM RFC compliant.

###### SCIM 1.1

Below is a sample request from Okta to update group details:

```http
PATCH /v1/Groups/8599fdac3d3142d6beebfc363d2e01a9 HTTP/1.1
Accept: application/json
Accept-Charset: utf-8
Content-Type: application/json; charset=utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Content-Length: 108
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate

{
	"schemas": ["urn:scim:schemas:core:1.0"],
	"id": "8599fdac3d3142d6beebfc363d2e01a9",
	"displayName": "New Group Name"
}
```

Below is a sample request from Okta to remove and add group members:

```http
PATCH /v1/Groups/8599fdac3d3142d6beebfc363d2e01a9 HTTP/1.1
Accept: application/json
Accept-Charset: utf-8
Content-Type: application/json; charset=utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Content-Length: 131
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate

{
	"schemas": ["urn:scim:schemas:core:1.0"],
	"members": [{
		"value": "6629838e056045b7a23fb55816c644eb",
		"display": "dave@ad.oktatest.com"
	}, {
		"value": "85467bb36e1c4f8991750501bf491962",
		"display": "steve@ad.oktatest.com",
		"operation": "delete"
	}]
}
```

Below is a sample request from Okta to replace all group members in case of a full push:

```http
PATCH /v1/Groups/8599fdac3d3142d6beebfc363d2e01a9 HTTP/1.1
Accept: application/json
Accept-Charset: utf-8
Content-Type: application/json; charset=utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Content-Length: 243
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate

{
	"schemas": ["urn:scim:schemas:core:1.0"],
	"meta": {
		"attributes": ["members"]
	},
	"members": [{
		"value": "bcfa9b1f143741929df70a571c6b4b47",
		"display": "inca@clouditude.net"
	}, {
		"value": "85467bb36e1c4f8991750501bf491962",
		"display": "steve@ad.oktatest.com"
	}]
}
```

For more details, see [section 3.3.2](http://www.simplecloud.info/specs/draft-scim-api-01.html#edit-resource-with-patch) of the [SCIM 1.1 Protocol Specification](http://www.simplecloud.info/specs/draft-scim-api-01.html).

###### SCIM 2.0

Below is a sample request from Okta to update group details:

```http
PATCH /v2/Groups/619435534e58458c8c92e86d1e07d2f8 HTTP/1.1
Accept: application/scim+json
Accept-Charset: utf-8
Content-Type: application/scim+json; charset=utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Content-Length: 170
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate

{
	"schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
	"Operations": [{
		"op": "replace",
		"value": {
			"id": "619435534e58458c8c92e86d1e07d2f8",
			"displayName": "New Group Name"
		}
	}]
}
```

Below is a sample request from Okta to remove and add group members:

```http
PATCH /v2/Groups/{id} HTTP/1.1
Accept: application/scim+json
Accept-Charset: utf-8
Content-Type: application/scim+json; charset=utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Content-Length: 293
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate

{
  "schemas": [
    "urn:ietf:params:scim:api:messages:2.0:PatchOp"
  ],
  "Operations": [
    {
      "op": "remove",
      "path": "members[value eq \"removeUser1\"]"
    },
    {
      "op": "remove",
      "path": "members[value eq \"removeUser2\"]"
    },
    {
      "op": "add",
      "path": "members",
      "value": [
        {
          "value": "addUser1",
          "display": "addUser1@example.com"
        },
        {
          "value": "addUser2",
          "display": "addUser2@example.com"
        }
      ]
    }
  ]
}
```

Below is a sample request from Okta to replace all group members in case of a full push:

```http
PATCH /v2/Groups/{id} HTTP/1.1
Accept: application/scim+json
Accept-Charset: utf-8
Content-Type: application/scim+json; charset=utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Content-Length: 293
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate

{
  "schemas": [
    "urn:ietf:params:scim:api:messages:2.0:PatchOp"
  ],
  "Operations": [
    {
      "op": "replace",
      "path": "members",
      "value": [
        {
          "value": "addUser1",
          "display": "addUser1@example.com"
        },
        {
          "value": "addUser2",
          "display": "addUser2@example.com"
        }
      ]
    }
  ]
}
```

For more details, see [section 3.5.2](https://tools.ietf.org/html/rfc7644#section-3.5.2) of the [SCIM 2.0 Protocol Specification](https://tools.ietf.org/html/rfc7644).

### Delete group

<ApiOperation method="delete" url="/Groups/{id}" />

Okta can delete the Group in your SCIM enabled application. For more details on deleting resources, see section [3.6](https://tools.ietf.org/html/rfc7644#section-3.6) of the [SCIM 2.0 Protocol Specification](https://tools.ietf.org/html/rfc7644).

Below is a sample request from Okta:

```http
DELETE /v2/Groups/{id} HTTP/1.1
Accept: application/scim+json
Accept-Charset: utf-8
Content-Type: application/scim+json; charset=utf-8
User-Agent: Okta SCIM Client 1.0.0
Authorization: Bearer {token}
Host: scimapp.okta1.com:1910
Connection: Keep-Alive
Accept-Encoding: gzip,deflate
```

For more details, see [section 3.6](https://tools.ietf.org/html/rfc7644#section-3.6) of the [SCIM 2.0 Protocol Specification](https://tools.ietf.org/html/rfc7644).
