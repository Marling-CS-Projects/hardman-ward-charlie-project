# 2.2.16 Cycle 16: Player and basic movement

## Design

In this cycle, I will setup the player sprite which will be controlled by the WSAD keys. For now, I will use a simple rectangle but if I have time at the end of design and development, I will draw a character to use as the sprite.

### Objectives

* [x] New scene loaded on clicking singleplayer button
* [x] Setup solid surface for player sprite to rest on
* [x] Create player sprite with gravity and collision
* [x] Move forward when pressing A
* [x] Move backward when pressing D
* [x] Jump on pressing W

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

At the end of this cycle, I have setup the basic movement controls for the player. These are vital for the game to function, however there are still some features missing. For example, in Features of Proposed Solution, I said my game will have side-scrolling, meaning the player is always centered in the screen. Additionally, there are no checks for if the player walks off the map, which currently just results in the player sprite endlessly falling. Furthermore, I have not yet added multiplayer support where there will be up to four player sprites assigned in order of joining.

To start, I had to put everything in the title screen in a scene, which I named "title". Kaboom.js scenes allow for quickly changing the content on the screen without retaining anything previous, which I would want in my game.

{% code title="public/game.js" %}
```javascript
scene("title", () => {
    /* Code for title screen */
```
{% endcode %}

I modified the click function of the singleplayer button for both sign in scenarios. Previously, it would output a message to the console, but now it goes to a new scene called "main"; this will be the gameplay itself.&#x20;

{% code title="public/game.js" %}
```javascript
singlePlayerButton.onClick(() => { // When single player button clicked
    go("main") // Start game
})
```
{% endcode %}

Outside of the title scene, I must now tell the game which scene I want it to load at the start.

{% code title="public/game.js" %}
```javascript
go("title") // Go to title screen
```
{% endcode %}

At the start of the "main" scene, I setup what Kaboom.js calls a "level", which is essentially the environment of the game. To keep things simple to start with, I just added a single layer of ground at the bottom of the screen. Later on when I'm setting up different game levels which have different environments, I will setup more blocks, add multiple possible maps, and put in enemies; and if I have time at the end, I will make more detailed graphics.

{% code title="public/game.js" %}
```javascript
const map = [
    "                                          ",
    "                                          ",
    "                                          ",
    "                                          ",
    "                                          ",
    "                                          ",
    "                                          ",
    "                                          ",
    "                                          ",
    "                                          ",
    "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
] // Define layout of map using symbols

const config = { // Tell Kaboom.js what each symbol should be rendered as
    // 64x64 blocks
    tileWidth: 64,
    tileHeight: 64,
    tiles: { // How each symbol should be displayed
        "G" : () => [ // Everytime "G" is specified on the map render this
            rect(64, 64), // 64x64 cube
            color(0, 200, 0), // Light green
            area(),
            body({ isStatic: true }) // Block solid but not affected by gravity
        ]
    }
}

addLevel(map, config)
```
{% endcode %}

Next, I add the player. To avoid potentially wasting time, this is for now just a blue rectangle going up for now; if I have time at the end, I will draw a character. It is a dark blue rectangle of 64x128 that falls from the top left of the screen before landing on the ground. It has two JSON properties: walk\_speed and jump\_speed, which are the values for how fast the player will walk and jump when the movement controls are implemented.

{% code title="public/game.js" %}
```javascript
const player = add([
    rect(64, 128), // 64x128 rectangle
    color(0, 0, 200), // Dark blue
    area(),
    body(), // Solid and with gravity
    pos(0, 0), // Top left of screen
    // Speeds to walk and jump at
    { 
        walk_speed: 240,
        jump_speed: 450
    }
])
```
{% endcode %}

Finally, the movement controls are A to move left, D to move right, and W to jump. These use the speeds defined in creating the player sprite. In the case of moving left, the game moves the player by negative walk speed to move leftward.

{% code title="public/game.js" %}
```javascript
onKeyDown("a", () => { // "A" key pressed
    player.move(-player.walk_speed, 0) // Move left by walk speed
})

onKeyDown("d", () => { // "D" key pressed
    player.move(player.walk_speed, 0) // Move right by walk speed
})

onKeyPress("w", () => { // "W" key pressed
    player.jump(player.jump_speed) // Jump by jump speed
})
```
{% endcode %}

### Challenges

Throughout this cycle, I encountered several errors and bugs. Most of these were in the early tests because the Kaboom.js tutorial I was using is over two years old and Kaboom.js has had a lot of updates since then, and therefore I was using a lot of the wrong syntax.

The first error I encountered was in test 1 and it was that the solid attribute of sprites was not found. Earlier versions of Kaboom.js had this attribute. If a sprite has the solid attribute, it will not go through other sprites with the solid attribute. This is important because I want the player sprite to rest on top of the ground instead of fall through it, for example.&#x20;

After researching, I found using the body attribute along specifying the isStatic property as true (this disables gravity for the sprite) effectively does the same thing as solid.

{% code title="public/game.js" %}
```javascript
"G" : [ // Everytime "G" is specified on the map render this
    rect(64, 64), // 64x64 cube
    color(0, 200, 0), // Light green
    area(),
    body({ isStatic: true }) // In replacement of "solid()"
]
```
{% endcode %}

The second error that occured in test 2 was once again related to the fact the Kaboom.js tutorial I used was out of date. Since the tutorial was made, the "width" and "height" properties of level configuration have been renamed to tileWidth and tileHeight, with each symbol inside the map considered a "tile". This one was easy to resolve, simply change width and height in the config to tileWidth and tileHeight.

{% code title="public/game.js" %}
```javascript
const config = {
    tileWidth: 64,
    tileHeight: 64,
```
{% endcode %}

The third error that occured in test 3 was due to a change in Kaboom.js where the properties of each tile now had to be included under the tiles property. Kaboom.js was therefore attempting to read a nonexistent property, resulting in a "cannot read properties of undefined" error in the browser console. It can be fixed by adding the "tiles" property and cutting and pasting the definition of each tile beneath.

{% code title="public/game.js" %}
```javascript
tiles: { // How each symbol should be rendered
    "G" : [ // Everytime "G" is specified on the map render this
        rect(64, 64), // 64x64 cube
        color(0, 200, 0), // Light green
        area(),
        body({ isStatic: true }) // Block solid but not affected by gravity
    ]
}
```
{% endcode %}

The fourth error that occured in test 4 was because I didn't use a function to return a list for the tile definition. At the time of the tutorial being made, all that was required was to define a tile was to provide a list, but Kaboom.js has been updated since then to require a function return a list.

{% code title="public/game.js" %}
```javascript
"G" : () => [
    /* Define tile properties */
```
{% endcode %}

By default, Kaboom.js no longer assumes you want gravity when coding your game. While good for some games, this was bad for me and in test 6 my player sprite was left floating in the air. Fortunately, it is easy to fix this by simply defining gravity strength after initialising the Kaboom.js game engine.

{% code title="public/game.js" %}
```javascript
setGravity(1200)
```
{% endcode %}

My final problem was not an explicit error but rather a bug within the Kaboom.js engine itself. It occured when setting up the movement controls for my player. While A and D to move the player left and right respectively worked without any issue, the W key to jump resulted in the player sprite glitching through the ground, despite it being solid, and the player endlessly falling. I found this out when I read the player's coordinates from the browser console, which showed an incredibly high Y coordinate. In the video for test 8, you can briefly see the sprite falling through the ground when I jumped, however I did not notice this at first.

After researching, I found multiple reports of this bug and no known solution, so I thought of my own fix. Only when the player is supposed to be resting on the ground did this glitch occur, so I found out the Y coordinate of the player on the ground, which is 512, and setup the game to continually check for the player going above this coordinate and set their Y back to 512.&#x20;

{% code title="public/game.js" %}
```javascript
player.onUpdate(() => { // Execute every time player changes
    if (player.pos.y > 512) { // Y coordinate is higher than 512
        player.pos.y = 512 // Set back to 512 to prevent falling off the map
    }
})
```
{% endcode %}

## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Create a level in main scene, definining the "G" (ground) symbol as a green block, which appears at the bottom of the screen.</td><td>Green surface appears at bottom of screen on clicking singleplayer.</td><td>ReferenceError: solid is not defined</td><td>Fail</td></tr><tr><td>2</td><td>Use body({isStatic: true}) in place of solid() for ground symbol of level.</td><td>Green surface appears at bottom of screen on clicking singleplayer.</td><td>Uncaught error: must provide tileWidth and tileHeight</td><td>Fail</td></tr><tr><td>3</td><td>Replace width and height properties of level config with tileWidth and tileHeight.</td><td>Green surface appears at bottom of screen on clicking singleplayer.</td><td>Uncaught TypeError: Cannot read properties of undefined (reading ' ')</td><td>Fail</td></tr><tr><td>4</td><td>Put ground symbol under the JSON property "tiles"</td><td>Green surface appears at bottom of screen on clicking singleplayer.</td><td>Uncaught Error: Level symbol def must be a function returning a component list</td><td>Fail</td></tr><tr><td>5</td><td>Return a list for the ground symbol.</td><td>Green surface appears at bottom of screen on clicking singleplayer.</td><td>As expected</td><td>Pass</td></tr><tr><td>6</td><td>Render player sprite as a solid blue rectangle with gravity at the top left of the screen.</td><td>Player drops from the top left of the screen and lands on ground.</td><td>Player appears but does not fall from top left of screen.</td><td>Fail</td></tr><tr><td>7</td><td>Set gravity as 1200 after initialising Kaboom.js.</td><td>Player drops from the top left of the screen and lands on ground.</td><td>As expected</td><td>Pass</td></tr><tr><td>8</td><td>Move left when A key pressed, right when D key pressed, and jump when W key pressed.</td><td>The player is moved left or right on pressing A and D respectively, and jumps on pressing W.</td><td>A and D keys move player in their respective directions, however W causes the player to fall through the ground and go off screen.</td><td>Fail</td></tr><tr><td>9</td><td>Continually check for if the player goes below the ground and bring it back on top if that happens.</td><td>The player is moved left or right on pressing A and D respectively, and jumps on pressing W.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/image (20).png" alt=""><figcaption><p>Test 1: ReferenceError solid not defined</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (21).png" alt=""><figcaption><p>Test 2: Uncaught error: must provide tileWidth and tileHeight</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (22).png" alt=""><figcaption><p>Test 3: Uncaught TypeError: Cannot read properties of undefined (reading ' ')</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (23).png" alt=""><figcaption><p>Test 4: Uncaught Error: Level symbol def must be a function returning a component list</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (24).png" alt=""><figcaption><p>Test 5: Green blocks appear at bottom of the screen for the ground</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (26).png" alt=""><figcaption><p>Test 6: Player sprite appears but stays where it is and does not fall onto the ground</p></figcaption></figure>

{% embed url="https://www.youtube.com/watch?v=ozvak2vgkdE" %}
Test 7: Player sprite falls and lands onto ground
{% endembed %}

{% embed url="https://www.youtube.com/watch?v=kdvKFod3Rmc" %}
Test 8: A and D keys move the player left and right respectively; however W to jump results in the player falling through the ground and going off screen
{% endembed %}

{% embed url="https://www.youtube.com/watch?v=tq0wr8leW7g" %}
Test 9: A and D keys move the player left and right respectively, and W jumps the player and lands back on ground
{% endembed %}
