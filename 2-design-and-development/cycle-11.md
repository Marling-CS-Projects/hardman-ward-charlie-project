# 2.2.11 Cycle 11: Client communication using Socket.IO

## Design

In this cycle, I will be testing the ability of Socket.IO to facilitate communication between different clients. This will be used later on for the multiplayer mode of the game where players can play the game in groups of up to four so that player actions (for example, a player moving forward) appear for all players.

### Objectives

* [x] Setup test page so any client that visits is connected to a Socket.IO server
* [x] Give each client a unique identifier (ID) using UUIDv4
* [x] Announce to everyone connected when someone joins
* [x] Place button on test page
* [x] Whenever any client clicks button, post "\<client ID> pressed the button!"

### Usability Features

### Key Variables

| Variable Name | Use                                                       |
| ------------- | --------------------------------------------------------- |
| server        | Manage the HTTP server of the Express app                 |
| io            | Socket.IO instance used for sending and handling messages |

### Pseudocode

```
import uuidv4 as uuid
import socket.io as io

server = io.create_server()

members = []

io.client_connects:
    id = uuid()
    members.add(id)
    io.emit(id)
    io.emit_all(id + "joined the server")
    
io.on_signal("button", id):
    io.emit_all(id + "clicked the button")
```

## Development

### Outcome

At the end of this cycle, I have tested the ability of Socket.IO to facilitate communication between different clients, which will be used when developing the multiplayer part of my game so that whenever a player carries out an action, such as jumping, that action is registered for all players in the group.&#x20;

First of all, in order to setup a Socket.IO instance, I must setup an HTTP server. To do this, I slightly alter the listening function so that instead of directly listening from the Express application, setup an HTTP server running the app and listen through that instead.

{% code title="app.js" %}
```javascript
const server = http.createServer(app)
server.listen(8080, () => {
    console.log("Server is running!")
})
```
{% endcode %}

Next, I created the Socket.IO instance and setup its handling of the "connection" event (whenever a new client connects) to generate a UUIDv4 as the ID and send it to that client only. Additionally, the server notifies all other clients that a new client has joined with the ID.

{% code title="app.js" %}
```javascript
const io = new Server(server)

io.on('connection', (socket) => {
    const id = uuidv4()
    socket.emit('give id', id)
    socket.broadcast.emit('new user', id)
```
{% endcode %}

Last of all on the server-side, I setup the handling of a new Socket.IO event, which for now I just called "i pressed a button" which is emitted whenever any client clicks the button. I want for the server to send another event, which I called "someone pressed a button" to all the other clients and the ID of the client that clicked the button.

{% code title="app.js" %}
```javascript
socket.on('i pressed a button', (id) => {
    socket.broadcast.emit('someone pressed a button', id)
})
```
{% endcode %}

On the test page, I only wrote a basic HTML body which contains a div container for messages to be outputted to, and a button for the user to click. The button is disabled by default because it is supposed to be unusable until an ID is allocated to the client.

{% code title="public/test.html" %}
```html
<div class="log"></div>
<button class="click-me" disabled>Click Me!</button>
```
{% endcode %}

Before I started writing the JavaScript for the test page, I have to first import two libraries: JQuery and client Socket.IO.

{% code title="public/test.html" %}
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
```
{% endcode %}

### Challenges



## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Give unique ID to new client on connecting.</td><td>UUIDv4 ID generated and displayed as a browser alert when a client opens the test page. </td><td>As expected</td><td>Pass</td></tr><tr><td>2</td><td>Display a message to other clients whenever a new client connects.</td><td>New client's ID is displayed alongside a short message saying they've joined to all other connected clients.</td><td>As expected</td><td>Pass</td></tr><tr><td>3</td><td>Display a message to other clients whenever a client clicks the button.</td><td>Client's ID displayed alongside a short message saying they've pressed the button to all other connected clients.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/image (8).png" alt=""><figcaption><p>Test 1: UUIDv4-generated ID displayed as popup on new connection</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (18).png" alt=""><figcaption><p>Test 2: Client #1 sees join messages for clients #2 and #3</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (5).png" alt=""><figcaption><p>Test 2: Client #2 sees join message of client #3</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (17).png" alt=""><figcaption><p>Test 2: Client #3 does not see any join messages as there have been no more new connections since joining</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (4).png" alt=""><figcaption><p>Test 3: Client #1 gets messages on clients #2 and #3 clicking the button</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (13).png" alt=""><figcaption><p>Test 3: Client #2 gets messages on clients #1 and #3 clicking the button</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (19).png" alt=""><figcaption><p>Test 3: Client #3 gets messages on clients #1 and #2 clicking the button</p></figcaption></figure>
