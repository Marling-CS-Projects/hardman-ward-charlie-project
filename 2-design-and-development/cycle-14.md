# 2.2.14 Cycle 14: Title screen

## Design

In this cycle, I will be writing a simple title screen for my game. As laid out in [Features of Proposed Solution](../1-analysis/1.4a-features-of-the-proposed-solution.md), this will include buttons for singleplayer and multiplayer mode, leaderboard, and sign in/out. The multiplayer and leaderboard buttons will only appear to signed in players and the text of the sign in/out button will depend on if the player is signed in or not. Additionally, signed in players will be shown their username.

### Objectives

* [x] Initialise Kaboom.js with 1280x720 resolution and lught blue background.
* [x] Display name of game "Pixel Quest" in large text at top of screen.
* [x] Get ID from cookie and obtain username from it.
* [x] If a username is found, render multiplayer and leaderboard buttons and display the username in text below.
* [x] Render singleplayer and sign in/out buttons, with the latter text depending on whether the player is signed in.
* [x] Continually check for the buttons being clicked and for now, simply log to console what button is being clicked.

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

At the end of this cycle, I have written most of the code for the title screen. This will greet all players when they access the website where the game is hosted. Signed in users will be presented with all four buttons, while those not signed in will only have access to singleplayer mode and the sign in button.

First of all, the Kaboom.js engine is initialised as a 1280x720 container with a light blue background. This allows the code to make use of the wide range of features in Kaboom.js.

{% code title="public/game.js" %}
```javascript
kaboom({
    width: 1280,
    height: 720,
    background: [100, 255, 255] // Light blue in RGB format
})
```
{% endcode %}

Next, I created the title text. This is at the top middle of the screen and is the words "Pixel Quest" which is the name of my game. The text is 60px in size, grey, and easily visible.

{% code title="public/game.js" %}
```javascript
// Add title text
add([
    text("Pixel Quest", {
        size: 60
    }), // "Pixel Quest" at size 60px
    color(160, 160, 160), // Grey colour
    area(),
    pos(center().x, 50), // Display at horizontal middle, 50px away from top
    anchor("center") // Centre of sprite is specified coordinates
])
```
{% endcode %}

Because what buttons are available and how they are positioned depends on whether the player is signed in or not, the game checks if the player is signed in next and if so, obtains their username.

{% code title="public/game.js" %}
```javascript
var myUsername

// Get value of "id" cookie
const myId = document.cookie.split("; ").find((row) => row.startsWith("id=")) ?.split("=")[1];

if (myId) { // "id" has a set value
    socket.emit('fetch username', myId) // Emit event to Socket.IO server asking for username corresponding to ID in database
} else { // "id" is empty
    /* Create the buttons for signed out players */
}

socket.on('give username', (username) => { // Handle event emitted by Socket.IO server in response to "fetch username"
    myUsername = username // Store username as global variable (accessible anywhere in the code)
    /* Create the buttons for signed in players */
}
```
{% endcode %}

If the player is not signed in, only two buttons are to be rendered in the centre of the screen: singleplayer and sign in/out (which will have "sign in" text). They will have a small distance between one another to make it clear to the player which they are clicking.&#x20;

{% code title="public/game.js" %}
```javascript
// Add single player button
const singlePlayerButton = add([
    rect(300, 50), // Rectangle of size 300x50
    color(160, 160, 160), // Grey background
    area(),
    pos(center().x, center().y-30), // Slightly above the centre of the screen
    anchor("center")
])

// Add text to single player button    
add([
    text("Singleplayer", {
        size: 20
    }),
    color(255, 255, 255), // White text
    area(),
    pos(center().x, center().y-30), // Same position as button
    anchor("center")
])

// Add sign in/out button
const signInOutButton = add([
    rect(300, 50),
    color(160, 160, 160),
    area(),
    pos(center().x, center().y+30), // Slightly below the centre of the screen
    anchor("center")
])

// Add text to sign in/out button
add([
    text("Sign In", {
        size: 20
    }),
    color(255, 255, 255),
    area(),
    pos(center().x, center().y+30),
    anchor("center")
])
```
{% endcode %}

For now, I just want a message to be outputted to the console on clicking the buttons. To accomplish this, I will use the onClick function of the button sprites. Clicking on either of the buttons will output a message to the browser console stating the intended action of the button.

{% code title="public/game.js" %}
```javascript
singlePlayerButton.onClick(() => { // When single player button clicked
    console.log("You clicked singleplayer!") // Brief message stating the (intended) function of the button
})

signInOutButton.onClick(() => {
    console.log("You clicked sign in/out!")
})
```
{% endcode %}

On the client receiving a "give username" Socket.IO event, the game renders all four buttons: singleplayer, multiplayer, leaderboard, and sign in/out (which will have "sign out" text). This is because the only scenario in which the server would emit a "give username" event to this client is if they previously requested their username through emitting the "fetch username" event to the server, which the client only does if their "id" cookie is set to a value. In this scenario, the player is likely signed in and therefore has access to all functionality of the game.

{% code title="public/game.js" %}
```javascript
socket.on('give username', (username) => { // Receive "give username" event from server
    myUsername = username // Store obtained username in global variable (accessible from everywhere in the code)
    
    // Add single player button
    const singlePlayerButton = add([
        rect(300, 50),
        color(160, 160, 160),
        area(),
        pos(center().x, center().y-90), // Higher above centre of screen
        anchor("center")
    ])
    
    // Add text to single player button
    add([
        text("Singleplayer", {
            size: 20
        }),
        color(255, 255, 255),
        area(),
        pos(center().x, center().y-90),
        anchor("center")
    ])
    
    // Add multi player button
    const multiPlayerButton = add([
        rect(300, 50),
        color(160, 160, 160),
        area(),
        pos(center().x, center().y-30), // Slightly above centre of screen
        anchor("center")
    ])
    
    // Add text to multi player button
    add([
        text("Multiplayer", {
            size: 20
        }),
        color(255, 255, 255),
        area(),
        pos(center().x, center().y-30),
        anchor("center")
    ])
    
    // Add leaderboard button
    const leaderBoardButton = add([
        rect(300, 50),
        color(160, 160, 160),
        area(),
        pos(center().x, center().y+30), // Slightly below centre of screen
        anchor("center")
    ])
    
    // Add text to leaderboard button
    add([
        text("Leaderboard", {
            size: 20
        }),
        color(255, 255, 255),
        area(),
        pos(center().x, center().y+30),
        anchor("center")
    ])
    
    // Add sign in/out button
    const signInOutButton = add([
        rect(300, 50),
        color(160, 160, 160),
        area(),
        pos(center().x, center().y+90), // Lower below centre of screen
        anchor("center")
    ])
    
    // Add "sign out" text to sign in/out button
    add([
        text("Sign Out", {
            size: 20
        }),
        color(255, 255, 255),
        area(),
        pos(center().x, center().y+90),
        anchor("center")
    ])
```
{% endcode %}

In this case, I want all four buttons to output a message to the log if clicked. Same as if signed out, I use the onClick function.

{% code title="public/game.js" %}
```javascript
singlePlayerButton.onClick(() => {
    console.log("You clicked singleplayer!")
})
    
multiPlayerButton.onClick(() => {
    console.log("You clicked multiplayer!")
})
    
leaderBoardButton.onClick(() => {
    console.log("You clicked leaderboard!")
})
    
signInOutButton.onClick(() => {
    console.log("You clicked sign in/out!")
})
```
{% endcode %}

Finally, if the player is signed in, their username should be displayed in small text beneath the buttons. This could be helpful if multiple people are sharing a computer to play the game or someone has multiple accounts so the player knows who they're currently signed in as.

{% code title="public/game.js" %}
```javascript
// Add text displaying username
add([
    text("Signed in as: " + myUsername, { // "Signed in as" followed by username
        size: 18
    }),
    color(160, 160, 160), // Grey text
    area(),
    pos(center().x, center().y+140), // Beneath all the buttons
    anchor("center")
])
```
{% endcode %}

### Challenges

The first issue I encountered was getting the title text in the right place. By default, Kaboom.js puts the top left corner of the sprite at the coordinates provided in the "pos" (position) property. I wanted Kaboom.js to put the centre of the sprite at these given coordinates, which saves time as I won't have to figure how many pixels I need to add/take away from the position in order to get the sprite where I want.

Fortunately, this can be achieved through using the "anchor" property and specifying "center". However, this means both the vertical and horizontal middle of the sprite is placed at the given coordinates. Therefore, in this code below, when I specified I wanted the sprite at the horizontal middle and at the very top of the screen, this resulted in the top half being cut off.

{% code title="public/game.js" %}
```javascript
// Add title text
add([
    text("Pixel Quest", {
        size: 60
    }), // "Pixel Quest" at size 60px
    color(160, 160, 160), // Grey colour
    area(),
    pos(center().x, 0), // Display at horizontal middle, top of screen
    anchor("center") // Centre of sprite is specified coordinates
])
```
{% endcode %}

The solution was to change the y-coordinate of the "pos" property to move the text a bit further down. I set it to 50 and refreshed the page and decided that was a good place.

```javascript
pos(center().x, 50), // Display at horizontal middle, 50px away from top
```

The second issue was due to how I setup the buttons. Initially, I declared empty variables which would later be assigned the button sprites depending on whether the player is signed in or not.&#x20;

{% code title="public/game.js" %}
```javascript
// Button variables
var singlePlayerButton
var multiPlayerButton
var leaderBoardButton
var signInOutButton

/* Other stuff */

singlePlayerButton.onClick(() => { // When single player button clicked
    console.log("You clicked singleplayer!") // Brief message stating the (intended) function of the button
})
    
multiPlayerButton.onClick(() => {
    console.log("You clicked multiplayer!")
})
    
leaderBoardButton.onClick(() => {
    console.log("You clicked leaderboard!")
})
    
signInOutButton.onClick(() => {
    console.log("You clicked sign in/out!")
})
```
{% endcode %}

This led to a TypeError which stated the button variables are undefined. This is because the onClick function runs before the button sprites are created, because the buttons are in a different layout depending on if the player signed in. The solution was to move the click functions so they are executed right after the button sprites are created.&#x20;

{% code title="" %}
```javascript
if (myId) { // "id" cookie has a value
    socket.emit('fetch username', myId) // Obtain username
} else { // "id" cookie empty
    /* Other stuff */
    
    // Only handle clicking the singleplayer and sign in buttons because the player isn't signed in
    singlePlayerButton.onClick(() => { // When single player button clicked
        console.log("You clicked singleplayer!") // Brief message stating the (intended) function of the button
    })

    signInOutButton.onClick(() => {
        console.log("You clicked sign in/out!")
    })
}

socket.on('give username', (username) => {
    /* Other stuff */
    
    // Handle all button clicks
    singlePlayerButton.onClick(() => {
        console.log("You clicked singleplayer!")
    })
    
    multiPlayerButton.onClick(() => {
        console.log("You clicked multiplayer!")
    })
    
    leaderBoardButton.onClick(() => {
        console.log("You clicked leaderboard!")
    })
    
    signInOutButton.onClick(() => {
        console.log("You clicked sign in/out!")
    })
})
```
{% endcode %}

## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Initialise Kaboom.js engine with light blue background and 1280x720 resolution.</td><td>Light blue area displayed starting from top left corner of page of size 1280x720.</td><td>As expected</td><td>Pass</td></tr><tr><td>2</td><td>Render "Pixel Quest" title at top of title screen.</td><td>Grey large text saying "Pixel Quest" at top of Kaboom.js area.</td><td>Text appears but is cut off so only the bottom half is visible.</td><td>Fail</td></tr><tr><td>3</td><td>Increase the Y-coordinate of the title text so the text appears further down.</td><td>Grey large text saying "Pixel Quest" at top of Kaboom.js area.</td><td>As expected</td><td>Pass</td></tr><tr><td>4</td><td>If "id" cookie is empty, display browser alert saying the player isn't signed in.</td><td>Browser alert appears if the player is not signed in, telling them such.</td><td>As expected</td><td>Pass</td></tr><tr><td>5</td><td>If "id" cookie has a value, use Socket.IO events created in Cycle 13 to obtain username and display it in alert. </td><td>Browser alert appears if player is signed in, telling them their username.</td><td>As expected</td><td>Pass</td></tr><tr><td>6</td><td>If the player is signed in, display all four buttons in the centre of the screen.</td><td>All four buttons appear in the centre of the screen for signed in users.</td><td>As expected</td><td>Pass</td></tr><tr><td>7</td><td>Display only the singleplayer and sign out buttons in the centre of the screen to signed out players.</td><td>Singleplayer and sign out buttons appear in the centre of the screen for signed out users.</td><td>As expected</td><td>Pass</td></tr><tr><td>8</td><td>Output to the console when the player clicks a button.</td><td>The intended action of the button (e.g. "singleplayer") is outputted alongside a brief message to the console when clicked.</td><td>TypeError: cannot read properties of undefined (reading 'onClick')</td><td>Fail</td></tr><tr><td>9</td><td>Move click functions so they are placed right after the buttons and text are rendered.</td><td>The intended action of the button (e.g. "singleplayer") is outputted alongside a brief message to the console when clicked.</td><td>As expected</td><td>Pass</td></tr><tr><td>10</td><td>If the player is signed in, display their username in small text beneath all the buttons.</td><td>Username displayed below buttons in small text if the player is signed in.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/image (19).png" alt=""><figcaption><p>Test 1: Light blue area of size 1280x720</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (2) (2) (1).png" alt=""><figcaption><p>Test 2: Title text is cut off</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (3) (4).png" alt=""><figcaption><p>Test 3: Title text now appears properly</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (16).png" alt=""><figcaption><p>Test 4: Browser alert to signed out players</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (18).png" alt=""><figcaption><p>Test 5: Browser alert containing username for signed in players</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (1) (3).png" alt=""><figcaption><p>Test 6: All four menu buttons appear on title screen when signed in</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (1) (3) (1).png" alt=""><figcaption><p>Test 7: For signed out users, only the singleplayer and sign in buttons appear</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (2) (2).png" alt=""><figcaption><p>Test 8: TypeError cannot read properties of undefined (reading 'onClick')</p></figcaption></figure>

{% embed url="https://youtu.be/ULO3KcZr2rU" %}
Test 9: Short message outputted to console on clicking a button
{% endembed %}

<figure><img src="../.gitbook/assets/image (8).png" alt=""><figcaption><p>Test 10: Username displayed below buttons when the player is signed in</p></figcaption></figure>
