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
```
{% endcode %}

## Development

### Outcome

On completing this cycle, I have tested Socket.IO's rooms feature and the ability to emit and receive events within a specific room. This will be used in developing the multiplayer mode of my game because players will be able to create their own multiplayer group or join an existing one, allowing up to four players per group.

I want rooms to be relatively easy to type in, which is why I chose the 8 character mix of letters and numbers for a code. In contrast to UUID, which it is very unlikely two generated UUIDs will be the same, there is a much greater probability this 8 character mix could collide, so it is important to perform a check to make sure the generated code is not already in use.

My generateRoom function takes in one parameter, known as rooms. This is intended to be a list of all rooms for the Socket.IO server. The function declares an empty variable known as room, which will be used to store possible codes for rooms. A while loop is used to continually generate a new code until of course a unique one is generated. At the start of the loop, the room is set to an empty string which clears it from any previous attempts.

{% code title="app.js" %}
```javascript
function generateRoom(rooms) {
    var room

    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split('')

    while (true) {
        room = ""
```
{% endcode %}

Next, a for loop is used inside the while loop to run the same code 8 times because the room is intended to be 8 characters long. It picks a random character from the chars array and appends it to the room string.

{% code title="app.js" %}
```javascript
for (let i = 0; i < 8; i++) {
    const chosenChar = chars[Math.floor(Math.random() * chars.length)]
    room += chosenChar
}
```
{% endcode %}

Finally, the function checks if the list given as the rooms parameter does not contain the generated code, breaking from the loop and returning the value of the room string if so.

{% code title="app.js" %}
```javascript
if (!rooms.includes(room)) {
    break
}
```
{% endcode %}

In contrast to the previous cycle, where the client was immediately allocated an ID on connection to the Socket.IO server, nothing runs on connection to the server alone. Instead, the user is provided with a choice on whether they want to create a new room or join an existing one.

When the user chooses to create a room, the server formats an object of all the rooms being hosted on the server as a list of only the room names. The list is then put into the generateRooms function as the "rooms" parameter. Once a room is created, an event which I called "give room" is sent to the client containing the room. However, the client does not yet join the room.

{% code title="app.js" %}
```javascript
socket.on('create room', () => {
    const rooms = Object.keys(io.sockets.adapter.rooms)

    const room = generateRoom(rooms)

    socket.emit('give room', room)
})
```
{% endcode %}

In the client-side JavaScript, on receiving the "give room" event from the server, the room code is stored as a globally accessible variable known as "myRoom" and a browser alert is used for now to show the code to the user. The client then transmits the "join room" event alongside their generated room code to the server.

{% code title="public/test.html" %}
```javascript
socket.on('give room', (room) => {
    myRoom = room
    alert("Your room code is " + myRoom)
    socket.emit('join room', myRoom)
})
```
{% endcode %}

The server-side handling of the "join room" event applies both to creating a new room and joining an existing one. It first adds the client to the room and generates an ID to distinguish the client from others. It then sends the new client their ID, which like the previous cycle will be displayed in a browser alert, and it disables the create and join room buttons, and enables the click button. All other clients in the room are notified someone new has joined, which will be displayed as a short message on the page. When I'm developing the actual game, I will use usernames instead of these long IDs, and in the next cycle, I will integrate the accounts system with this test.

{% code title="app.js" %}
```javascript
socket.on('join room', (room) => {
    socket.join(room)

    const id = uuidv4()

    socket.emit('give id', id)
    socket.to(room).emit('new user', id)
})
```
{% endcode %}

{% code title="public/test.html" %}
```javascript
socket.on('give id', (id) => {
    myId = id
    $('.create-room').attr('disabled', true)
    $('.join-room').attr('disabled', true)
    $('.click-me').attr('disabled', false)
    alert("Your ID is " + myId)
})

socket.on('new user', (id) => {
    $('.log').html($('.log').html() + `<p><strong>${id}</strong> joined the room</p>`)
})
```
{% endcode %}

A small difference to the "click me" button is instead of just sending the client's ID to the server, like in the previous cycle, it must send both the room and the ID by using the JSON format. This is so the server can notify only clients that are in the same room that the client clicked the button.

{% code title="public/test.html" %}
```javascript
$('.click-me').click(() => {
    socket.emit('i clicked the button', {
        id: myId,
        room: myRoom
    })
})
```
{% endcode %}

{% code title="app.js" %}
```javascript
socket.on('i clicked the button', (data) => {
    const { id, room } = data

    socket.to(room).emit('someone clicked the button', id)
})
```
{% endcode %}

## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Create room with 8 character code.</td><td>8 character code displayed in the form of an alert after clicking "create room"</td><td>As expected</td><td>Pass</td></tr><tr><td>2</td><td>Join room by providing code.</td><td>User ID displayed only to other clients in the room on joining.</td><td>As expected</td><td>Pass</td></tr><tr><td>3</td><td>Click button to send a message to other clients in the room.</td><td>Short message with the client's ID displayed to all other clients in the room.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/image (18).png" alt=""><figcaption><p>Test 1: Room code alert on clicking "create room"</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (1) (1).png" alt=""><figcaption><p>Test 1: Different room code alert when create room clicked in a different tab</p></figcaption></figure>

{% embed url="https://www.youtube.com/watch?v=-i06ml-WlY4" %}
Test 2: Join message only displayed to other clients in the same room
{% endembed %}

{% embed url="https://youtu.be/mS6SMO-18aw" %}
Test 3: Click button sends message to other clients in room
{% endembed %}
