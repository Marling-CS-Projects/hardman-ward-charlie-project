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

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Run initial code</td><td></td><td></td><td></td></tr></tbody></table>

### Evidence

