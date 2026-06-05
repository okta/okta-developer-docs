
You've [registered an AI agent](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-register), including adding the delegations that you require. You've also created resource connections that define the AI agent's access to your org's resources. Now, the agent must obtain the actual tokens or credentials to perform tasks.

Delegations (Early Access): The users, apps, and other AI agents that can authorize the AI agent to act on their behalf. When you delegate an AI agent to an app, it can only act on a user's behalf if the user is signed in to the app. When you delegate an AI agent to a non-human identity (like an app or another AI agent), it can act on behalf of the AI agent without a user. See Agent-to-agent connections.
When you delegate an AI agent to another AI agent, Okta automatically creates a resource connection between the two AI agents. For all other delegation types, you need to configure AI agent resource connections separately.



To delegate the AI agent to a non-human identity

To allow users who are signed in to an app to delegate their identity to the AI agent, click Add caller next to User sign-on.