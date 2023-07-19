# 2.2.11 Cycle 11: Client communication using Socket.IO

## Design

In this cycle, I will be testing the ability of Socket.IO to facilitate communication between different clients. This will be used later on for the multiplayer mode of the game where players can play the game in groups of up to four so that player actions (for example, a player moving forward) appear for all players.

### Objectives

* [ ] Setup test page so any client that visits is connected to a Socket.IO server
* [ ] Give each client a unique identifier using UUIDv4
* [ ] Announce to everyone connected when someone joins
* [ ] Place button on test page
* [ ] Whenever any client clicks button, post "\<client identifier> clicked the button!"

### Usability Features

### Key Variables

| Variable Name | Use |
| ------------- | --- |
|               |     |

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



### Challenges



## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Assign unique ID to client on connection.</td><td>UUIDv4 is displayed as a browser alert on accessing the test page.</td><td>As expected</td><td>Pass</td></tr><tr><td>2</td><td>Display message to other clients on a new connection.</td><td>New ID is displayed alongside a short message to all other connected clients.</td><td>As expected</td><td>Pass</td></tr><tr><td>3</td><td>When a client clicks the button, display a message to all other clients.</td><td>Message containing ID shown to other clients on clicking the button.</td><td></td><td></td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/image (8).png" alt=""><figcaption><p>Test 1: ID generated using UUIDv4 displayed as popup alert on connecting to page</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (18).png" alt=""><figcaption><p>Test 2: First client to connect sees the IDs of the two other clients</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (5).png" alt=""><figcaption><p>Test 2: Second client to connect sees the ID of the third client</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (17).png" alt=""><figcaption><p>Test 2: Third client does not see any IDs as no new clients have connected since</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (4).png" alt=""><figcaption><p>Test 3: First client gets a message whenever the second or third click the button</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (13).png" alt=""><figcaption><p>Test 3: Second client gets a message whenever the first or third click the button</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (19).png" alt=""><figcaption><p>Test 3: Third client gets a message whenever the first or second click the button</p></figcaption></figure>
