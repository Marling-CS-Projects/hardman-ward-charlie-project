# 2.2.12 Cycle 12: Socket.IO rooms

## Design

In this cycle, I will be testing Socket.IO's rooms feature, which allows events to be broadcasted to a select group of clients. This will be used when developing the multiplayer mode of my game in which players can play the game in groups of up to four.

### Objectives

* [x] Create Room and Join Room buttons
* [x] Generate and display an eight-character code combination of upper and lowercase letters and numbers
* [x] Prompt for code combination to join
* [x] Announce when a new client joins the room
* [x] Post when any client connected to the same room clicks the button

### Usability Features

### Key Variables

| Variable Name | Use |
| ------------- | --- |
|               |     |

### Pseudocode

{% code title="app.js" %}
```
func generate_room (rooms) => {
    chars = string_to_list("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890")
    
    while true {
        room = ""
        
        for i in range(0, 10) {
            room += random(chars)
        }
        
        if (room not in rooms) {
            break
        }
    }
    
    return room
}

io.new_connection(socket => {
    socket.receive_event('create room') => {
        room = generate_room(io.rooms_list)
        join_room(room)
        send_event('give room', room)
    }
})
```
{% endcode %}

## Development

### Outcome



### Challenges



## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Create room with 8 character code.</td><td>8 character code displayed in the form of an alert after clicking "create room"</td><td>As expected</td><td>Pass</td></tr><tr><td>2</td><td>Join room by providing code.</td><td>User ID displayed only to other clients in the room on joining.</td><td>As expected</td><td>Pass</td></tr><tr><td>3</td><td>Click button to send a message to other clients in the room.</td><td>Short message with the client's ID displayed to all other clients in the room.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/image (18).png" alt=""><figcaption><p>Test 1: Room code alert on clicking "create room"</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption><p>Test 1: Different room code alert when create room clicked in a different tab</p></figcaption></figure>

{% embed url="https://www.youtube.com/watch?v=-i06ml-WlY4" %}
Test 2: Join message only displayed to other clients in the same room
{% endembed %}

{% embed url="https://youtu.be/mS6SMO-18aw" %}
