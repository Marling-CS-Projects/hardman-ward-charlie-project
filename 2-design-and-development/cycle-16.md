# 2.2.16 Cycle 16: Player and basic movement

## Design

In this cycle, I will setup the player sprite which will be controlled by the WSAD keys and the space key. For now, I will use a simple cube but if I have time at the end of design and development, I will draw a character to use as the sprite.

### Objectives

* [x] New scene loaded on clicking singleplayer button
* [x] Setup solid surface for player sprite to rest on
* [x] Create player sprite with gravity and collision
* [ ] Move forward when pressing W
* [ ] Move backward when pressing S
* [ ] Change direction to left on pressing A
* [ ] Change direction to right on pressing D
* [ ] Jump on pressing space

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

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Create a level in main scene, definining the "G" (ground) symbol as a green block, which appears at the bottom of the screen.</td><td>Green surface appears at bottom of screen on clicking singleplayer.</td><td>ReferenceError: solid is not defined</td><td>Fail</td></tr><tr><td>2</td><td>Use body({isStatic: true}) in place of solid() for ground symbol of level.</td><td>Green surface appears at bottom of screen on clicking singleplayer.</td><td>Uncaught error: must provide tileWidth and tileHeight</td><td>Fail</td></tr><tr><td>3</td><td>Replace width and height properties of level config with tileWidth and tileHeight.</td><td>Green surface appears at bottom of screen on clicking singleplayer.</td><td>Uncaught TypeError: Cannot read properties of undefined (reading ' ')</td><td>Fail</td></tr><tr><td>4</td><td>Put ground symbol under the JSON property "tiles"</td><td>Green surface appears at bottom of screen on clicking singleplayer.</td><td>Uncaught Error: Level symbol def must be a function returning a component list</td><td>Fail</td></tr><tr><td>5</td><td>Return a list for the ground symbol.</td><td>Green surface appears at bottom of screen on clicking singleplayer.</td><td>As expected</td><td>Pass</td></tr><tr><td>6</td><td>Render player sprite as a solid blue rectangle with gravity at the top left of the screen.</td><td>Player drops from the top left of the screen and lands on ground.</td><td>Player appears but does not fall from top left of screen.</td><td>Fail</td></tr><tr><td>7</td><td>Set gravity as 2400 after initialising Kaboom.js.</td><td>Player drops from the top left of the screen and lands on ground.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/image (20).png" alt=""><figcaption><p>Test 1: ReferenceError solid not defined</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (21).png" alt=""><figcaption><p>Test 2: Uncaught error: must provide tileWidth and tileHeight</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (22).png" alt=""><figcaption><p>Test 3: Uncaught TypeError: Cannot read properties of undefined (reading ' ')</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (23).png" alt=""><figcaption><p>Test 4: Uncaught Error: Level symbol def must be a function returning a component list</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (24).png" alt=""><figcaption><p>Test 5: Green blocks appear at bottom of the screen for the ground</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (26).png" alt=""><figcaption><p>Test 6: Player sprite appears but stays where it is and does not fall onto the ground</p></figcaption></figure>

{% embed url="https://youtu.be/ozvak2vgkdE" %}
Test 7: Player drops from the top left of the screen and lands on ground
{% endembed %}
