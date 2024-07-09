---
title: User Profiles
meta:
  - name: description
    content: A high-level, developer-focused overview of user profiles and the Okta Universal Directory.
---

# User profiles

A user profile in Okta is the data record where user information is stored. A typical user profile contains information, or attributes, such as a user’s first name, last name, username, and email address. Users can be employees, customers, partners, or end-users of apps.

The default Okta user profile has [31 user attributes](/docs/reference/api/users/#default-profile-properties), which you can customize based on client requirements. You can add other custom attributes to the user profile to support most client user needs. Custom profile attribute types enable you to customize the user experience even more, based on your org and app needs.

You can manage user profile design and customization for your org, and individual user updates, from the Admin Console or using specific APIs.

See also [Users, Groups, and Profiles](https://help.okta.com/okta_help.htm?id=ext_User_Lifecycle_Overview).

## What is the Okta Universal Directory

The Okta Universal Directory is the service that stores all the information on your users (user profiles) for your organization. Depending on the setup for your org, the Universal Directory can serve as the “single-source-of-truth” for your users.

Also, the Universal Directory holds app user profiles, which define the attributes that apps require from individual users. For example, one of your apps might only need to know the user’s name as one string (for example, “John Doe”). Another app might require the user’s first and last names to be separate (for example, “John” and “Doe”). Furthermore, some apps might store sensitive information, like a user’s address, while other apps don’t. If you share the same user profile with each app, both apps have access to data they might not need or be authorized to view. With Universal Directory, you can be sure that each app only gets the data that it needs.

The Universal Directory has a single Okta user profile for every user and an app user profile for each app. The user profile is the primary place for all user information to be stored, and the app users profile is where app-specific information is stored.

You can manage the User profiles in the Universal Directory from the Admin Console or use the [User API](/docs/reference/api/users).

You can manage the Apps user profiles in the Universal Directory from the Admin Console or use the [Apps API](/docs/reference/api/apps).

### User mappings

In addition to storing user profiles and app user profiles, the Universal Directory maps data from one profile to another. This keeps data synchronized between all of your apps. For example, you can store a user’s first and last name in the user profile and map that data to an app user profile. A single change to a field in a User Profile is reflected in all the apps that map to that field.

See also [About attribute mappings](https://help.okta.com/okta_help.htm?id=ext-usgp-about-attribute-mappings)

You can manage the Universal Directory mappings between profiles using the Admin Console or the [Profile Mappings API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ProfileMapping/).

## User Profile types

Okta has two basic user profile types that define a user in the Universal Directory: Okta user profile type and app user profile type. The Okta user profile type is further composed of Group profile types and Custom profile types.

See [About profile types](https://help.okta.com/okta_help.htm?id=ext-usgp-about-profiles) and [About custom user types in Universal Directory](https://help.okta.com/okta_help.htm?id=ext-custom-user-types)

### Okta user profile type

The Okta user profile type defines the default user record used in the Universal Directory. The default user profile contains 31 attributes in accordance with the [RFC System for Cross-domain Identity Management: Core Schema](https://datatracker.ietf.org/doc/html/rfc7643#section-4.1) and can also be extended with custom attributes. To manage the default user profile, use the [Users API](/docs/reference/api/users), and review the [Profile object](/docs/reference/api/users/#profile-object) and the [User object](/docs/reference/api/users/#user-object) for further information.

#### Group profile type

Okta groups simplify management of multiple users of the same type. See [About groups](https://help.okta.com/okta_help.htm?id=ext_Directory_Groups). The Group profile itself consists of attributes, and can be defined and managed with the [Groups API](/docs/reference/api/groups/). See the [Group object](/docs/reference/api/groups/#group-object) and [Group attributes](/docs/reference/api/groups/#group-attributes).

#### Custom profile type

The custom user profile type is based on the Okta user profile type, and defines different types of users, for example admins, contractors, help desk, and so on. Similar to the default Okta profile, the custom user profile type contains 31 attributes and can be extended with custom attributes. See [About custom user types in Universal Directory](https://help.okta.com/okta_help.htm?id=ext-custom-user-types).

The [User Types API](/docs/reference/api/user-types/) defines and manages the custom profile types.

User profiles can only belong to one user profile type. The [User object property](/docs/reference/api/users/#user-properties) `type` defines the custom user profile (or default profile) that the user is associated with.

>**Note:** The default [Profile object property](/docs/reference/api/users/#default-profile-properties) `userType` is a user profile attribute and isn’t a reference to the default or custom profile type.

### App user profile type

The app user profile type defines the attributes available for a user of that app in the Universal Directory. The app user profile attributes are mapped to the user profile and determines the data that can be sent to or imported from an app. Similar to user profiles, the app user profile has base attributes and custom attributes.

The available custom attributes, however, are determined by the app. You can manage the app user profile type with the [Apps API](/docs/reference/api/apps/). Review the [Application User Profile](/docs/reference/api/apps/#application-user-profile-object) object and the [Application User](/docs/reference/api/apps/#application-user-object) object for further details.

## Universal Directory schemas

Many different types of data can be stored in a user profile such as strings, numbers, dates, lists. A schema is a description of what type of information is stored in a user profile. Each element in a schema is known as an “attribute” and each attribute has the following metadata or properties:

* **Data type:** What kind of data is being stored. Examples include, string, number, and Boolean.
* **Display name:** A human readable label to be used in User Interfaces
* **Variable name:** The machine-readable identifier for the attribute
* **Description:** A more in-depth description of what the attribute is for
* **Enum:** If the attribute value comes from a fixed list of choices
* **Attribute Length:** How long the value can be, as appropriate for the attribute’s data type
* **Attribute required:** If an attribute is required, Okta gives an error if the attribute isn’t included.

Schemas define every user profile type: Okta default user profile, custom user profiles, group user profiles, and app user profiles. The [Schemas API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Schema/) manages operations for all user profiles. See [User Schema object](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Schema/#tag/Schema/operation/getUserSchema!c=200&path=$schema&t=response), [App User Schema object](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Schema/#tag/Schema/operation/getApplicationUserSchema!c=200&path=$schema&t=response), and [Group Schema object](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Schema/#tag/Schema/operation/getGroupSchema!c=200&path=$schema&t=response).
