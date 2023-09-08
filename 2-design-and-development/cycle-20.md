# 2.2.20 Cycle 20: Create multiplayer room

## Design

In this cycle, I will add the functionality to create a new multiplayer room from the multiplayer screen created in the previous cycle that is accessed from the title screen. This will generate a random code of eight characters that other players can then use to join. Up to four players will be able to join a multiplayer game.

I have decided to change the text on the buttons on the multiplayer screen. They will now be "Join Room" and "Create Room" instead of "Join Game" and "Start Game". I made this decision because in previous cycles involving Socket.IO, I have referred to groups of clients as "rooms" as the Socket.IO module and its developers do so. Additionally, using the word "game" to refer to both the gameplay itself and rooms could become confusing and I do not want to have to constantly clarify.

**Here is the multiplayer screen before the change:**

<figure><img src="../.gitbook/assets/image (32).png" alt=""><figcaption></figcaption></figure>

**Here it is after the change:**

<figure><img src="../.gitbook/assets/image (2) (1).png" alt=""><figcaption></figcaption></figure>

### Objectives

* [x] Check if create room button on multiplayer screen is clicked.
* [x] Generate eight character random code and send it back to client.
* [x] Create new scene called "waiting" which will show after joining a multiplayer room.
* [x] Display room code.
* [x] Render start and leave buttons.
* [x] Go back to title screen when the leave button is clicked.

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



## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>On clicking the start room button, go to "waiting" scene.</td><td>Blank blue screen after clicking the button with the text "Start Room" on the multiplayer screen.</td><td>As expected</td><td>Pass</td></tr><tr><td>2</td><td>Emit Socket.IO event "create room" on going to "waiting" scene, for now just output the room code to server console.</td><td>Room code appears in server console when a player tries to start a new multiplayer game.</td><td>As expected</td><td>Pass</td></tr><tr><td>3</td><td>Display room code in text on receiving "give room" Socket.IO event.</td><td>Room code shown as text on screen after creating room.</td><td>As expected</td><td>Pass</td></tr><tr><td>4</td><td>Render start game and leave room buttons nearer the bottom of the screen.</td><td>Buttons saying "Start Game" and "Leave Room" near the bottom of the screen.</td><td>As expected</td><td>Pass</td></tr><tr><td>5</td><td>Go back to title screen on clicking leave room button.</td><td>Clicking the leave room button on the waiting screen takes the player back to the title screen.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/image (3).png" alt=""><figcaption><p>Test 1: Clicking create room button goes to "waiting" scene</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (1) (1).png" alt=""><figcaption><p>Test 2: Room codes output to Node.js log on clicking "Create Room"</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (3) (1).png" alt=""><figcaption><p>Test 3: Room code displayed on screen after creating room</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (4).png" alt=""><figcaption><p>Test 4: Start Game and Leave Room buttons displayed near the bottom of the screen</p></figcaption></figure>

{% embed url="https://youtu.be/rtt-prAm5CE" %}
Test 5: Clicking Leave Room takes player back to title screen
{% endembed %}
