# 2.2.13 Cycle 13: Integrating login system with Socket.IO

## Design

In this cycle I will be combining the login system that I finished in cycle 7 with the Socket.IO test that I've been using in the previous two cycles. This is important because when I get round to developing the multiplayer mode of the game itself, I want the players to be distinguishable by their actual chosen usernames, not hard-to-remember UUIDs. I will be modifying the previous test so when a user joins the room or clicks a button, their username that they chose during registration is shown instead of a client ID generated using the Node.js UUIDv4 implementation.

### Objectives

* [x] Sign into test accounts using incognito browser windows so I can log into different accounts
* [x] Obtain user ID from browser cookie
* [x] Use a SQL query to obtain username from database using ID
* [x] Send event to give the client their username and store it in a variable
* [x] Change message for when a new client joins the room to display their username
* [x] Change message for when a client clicks the button to display their username

### Usability Features

### Key Variables

| Variable Name | Use                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------- |
| myUsername    | Global variable to store client's username                                                          |
| socket        | Transmit and receive Socket.IO events (messages)                                                    |
| data          | Used when I want to transmit multiple variables in an event, for example both the room and username |

### Pseudocode

```
```

## Development

### Outcome

At the end of this cycle, I have integrated the login system that I finished in cycle 7 into the Socket.IO test page, meaning usernames are displayed next to messages instead of UUIDs. This will be important when developing multiplayer mode so the game can tell which player is performing a specific action such as movement, and display it to all other players in the group.

The user ID, not username, is saved in a cookie when signing in so I used the usernameFromId function created in Cycle 10. On the client-side, I first extracted the ID value from the site cookies and then transmitted an event that I called "fetch username" containing the ID.

{% code title="public/test.html" %}
```javascript
var myUsername

const myId = document.cookie.split("; ").find((row) => row.startsWith("id=")) ?.split("=")[1];
        
socket.emit('fetch username', myId)
```
{% endcode %}

Handling this event on the server-side involved taking the value included (the ID obtained from the cookies) and storing it as a temporary variable, id, and passing it into the usernameFromId callback function. Once that function has finished running, the server transmits an event "give username" back to the client. Unlike POST requests, Socket.IO does not have any specific function for responding to an event, so it must transmit a new event instead.

{% code title="app.js" %}
```javascript
socket.on('fetch username', (id) => {
    account.usernameFromId(id, (username) => {
        socket.emit('give username', username)
    })
})
```
{% endcode %}

When the client receives the "give username" event, it stores the username in the global variable, myUsername, meaning it can be accessed anywhere in the code. The first two buttons, create and join room, are enabled.

{% code title="public/test.html" %}
```javascript
socket.on('give username', (username) => {
    myUsername = username
    alert("Your username is " + myUsername)

    $('.create-room').attr('disabled', false)
    $('.join-room').attr('disabled', false)
})
```
{% endcode %}

When the client receives "give room" from the server after the user clicked the "Create Room" button, in the previous cycle it responded by transmitting the "join room" event containing the room code and their UUID. The UUID is replaced with their username. This also applies to when the user clicks the "Join Room" button and types in the code

{% code title="public/test.html" %}
```javascript
socket.emit('join room', {
    room: myRoom,
    username: myUsername
})
```
{% endcode %}

The server handling of the "join room" event transmitted on clicking create/join room no longer generates a UUID and transmits that to the client. Instead, it transmits a new event to the client which I called "you joined room" with no attached data, and instead of transmitting a UUID to all the other clients in the room, it transmits the username.

{% code title="app.js" %}
```javascript
socket.on('join room', (data) => {
    const { room, username } = data

    socket.join(room)

    socket.emit('you joined room')
    socket.to(room).emit('new user', username)
})
```
{% endcode %}

Similarly, the server handling of the "i clicked the button" event, transmitted on clicking the "click me" button, transmits the username to the other clients in the room instead of the ID as the "someone clicked the button" event.

{% code title="app.js" %}
```javascript
socket.to(room).emit('someone clicked the button', username)
```
{% endcode %}

Finally, when the user clicks the "click me" button, the client transmits the "i clicked the button" event containing the username as a property, rather than the ID.

{% code title="public/test.html" %}
```javascript
$('.click-me').click(() => {
    socket.emit('i clicked the button', {
        username: myUsername,
        room: myRoom
    })
})
```
{% endcode %}

## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Substitute user ID from cookie into SQL query to obtain the username.</td><td>Username displayed as a browser alert on loading the Socket.IO test page</td><td>As expected</td><td>Pass</td></tr><tr><td>2</td><td>Display usernames of new clients joining room instead of UUID.</td><td>Joining clients' usernames are shown in bold next to a brief message to all other clients in that room.</td><td>As expected</td><td>Pass</td></tr><tr><td>3</td><td>Display username of a client when they click the "click me" button.</td><td>The username of the client that clicked the button is displayed next to a brief message to other clients in the same room.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/image (1) (2).png" alt=""><figcaption><p>Test 1: Username (charlie) corresponding to user ID (1) stored in cookie displayed on loading page</p></figcaption></figure>

{% embed url="https://www.youtube.com/watch?v=oZ6nmd4UTmM" %}
Test 2: Usernames of new clients appear next to message when joining a room
{% endembed %}

{% embed url="https://youtu.be/A-kUl7xRhBg" %}
Test 3: Username appears alongside message when a client clicks the "click me" button
{% endembed %}
