# 2.2.13 Cycle 13: Integrating login system with Socket.IO

## Design

In this cycle I will be combining the login system that I finished in cycle 7 with the Socket.IO test that I've been using in the previous two cycles. This is important because when I get round to developing the multiplayer mode of the game itself, I want the players to be distinguishable by their actual chosen usernames, not hard-to-remember UUIDs. I will be modifying the previous test so when a user joins the room or clicks a button, their username that they chose during registration is shown instead of a client ID generated using the Node.js UUIDv4 implementation.

### Objectives

* [ ] Sign into test accounts using incognito browser windows so I can log into different accounts
* [x] Obtain user ID from browser cookie
* [x] Use a SQL query to obtain username from database using ID
* [x] Send event to give the client their username and store it in a variable
* [x] Change message for when a new client joins the room to display their username
* [ ] Change message for when a client clicks the button to display their username

### Usability Features

### Key Variables

| Variable Name | Use |
| ------------- | --- |
|               |     |

### Pseudocode

```
```

## Development

### Outcome



### Challenges



## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Substitute user ID from cookie into SQL query to obtain the username.</td><td>Username displayed as a browser alert on loading the Socket.IO test page</td><td>As expected</td><td>Pass</td></tr><tr><td>2</td><td>Display usernames of new clients joining room instead of UUID.</td><td>Joining clients' usernames are shown in bold next to a brief message to all other clients in that room.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption><p>Test 1: Username (charlie) corresponding to user ID (1) stored in cookie displayed on loading page</p></figcaption></figure>

{% embed url="https://www.youtube.com/watch?v=oZ6nmd4UTmM" %}
Test 2: Usernames of new clients appear next to message when joining a room
{% endembed %}
