---
title: Authorization
---
# Authorization {#authz}

<div class="chapter-author">By Sai Maddali</div>

In the previous chapter we discussed authentication and the various ways of authenticating an entity. We learned that authentication *only* deals with validating the identity of an entity. It answers "Who are you?" Thus, authentication doesn't answer "What are you allowed to do?" That's the realm of authorization. Once an entity is authenticated into a system, that system needs to understand whether the authenticated entity can access, view, or interact with something.

Let's consider an example. When you log into your bank account, you're considered authenticated – but that doesn't mean you're necessarily authorized to perform certain actions, like withdrawing funds. Just being logged in doesn't also allow you to withdraw $1,000,000. This is why when you buy something at the store with your credit card, the card reader says "Authorizing" and not "Authenticating." It's trying to verify whether you have enough funds in your account to make a purchase.

In this chapter I'll give you a brief overview of the various types of authorization and how they can be utilized to your advantage when building API services.

While each authorization type has its pros/cons, the goal is to convey when to use one scheme over the other. We will cover hierarchical, role-based, attribute-based, and delegated authorization.





<section class="chapter-subsection-list"><ul><li><a href="/books/api-security/authz/hierarchical">Hierarchical</a></li><li><a href="/books/api-security/authz/role-based">Role-Based Access Control</a></li><li><a href="/books/api-security/authz/attribute-based">Attribute-Based Access Control</a></li><li><a href="/books/api-security/authz/takeaways">Key Takeaways</a></li></ul></section>
