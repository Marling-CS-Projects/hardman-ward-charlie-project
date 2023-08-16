# 2.2.17 Cycle 17: Side-scrolling

## Design

In this cycle I will setup side-scrolling. This means the camera (everything in the game visible to the player) will follow the player everywhere they go so that the player sprite is always in the middle of the screen.&#x20;

### Objectives

* [x] Continually check when the player changes
* [x] Get the player's coordinates
* [x] Decrease the Y-coordinate a little so the ground is still at the bottom of the screen
* [x] Set the camera coordinates

### Usability Features

### Key Variables

| Variable Name | Use                                                                                    |
| ------------- | -------------------------------------------------------------------------------------- |
| camPos        | Tell Kaboom.js where I want the centre of the screen to correspond to on the game map. |
| player.pos    | Contains player X and Y coordinates                                                    |

### Pseudocode

```
```

## Development

### Outcome

At the end of this cycle, I have setup side-scrolling for the singleplayer mode of my game. This is important so the player always has a clear view of where abouts their character is and its surroundings, the latter which will be particularly useful when I implement monsters so the player can see any coming towards them.

First of all, the game detects whenever the player changes in any way. This could be a wide variety of events, including movement. This is done through the onUpdate function. This was also used in the previous cycle to implement a temporary fix for the player falling through the ground.&#x20;

```javascript
player.onUpdate(() => { // Execute every time player changes
```

Secondly, the camPos function is called passing in X and Y coordinate parameters to tell the Kaboom.js engine where I want the centre of the screen to correspond to in the actual map itself. In this case, it will be the exact X coordinate of the player and the Y coordinate minus 150. This will result in the player being in the horizontal middle, but nearer the bottom of the screen so the ground is close to the bottom.

{% code title="public/game.js" %}
```javascript
camPos(player.pos.x, player.pos.y - 150) // Player in horizontal middle, near bottom of screen
```
{% endcode %}

## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Log player coordinates to console whenever the player moves.</td><td>X and Y coordinates shown in browser console when the player moves.</td><td>As expected</td><td>Pass</td></tr><tr><td>2</td><td>Set the camera position to the X and Y coordinates.</td><td>Player sprite is always in the centre of the screen when moving.</td><td>As expected</td><td>Pass</td></tr><tr><td>3</td><td>Decrease Y coordinate for camera position by 150 pixels so the ground is still at the bottom of the screen.</td><td>The ground is nearer the bottom of the screen.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

{% embed url="https://youtu.be/RQafdsRi8xw" %}
Test 1: Player coordinates output to player console on movement
{% endembed %}

{% embed url="https://youtu.be/Fd1IOgZGJQY" %}
Test 2: Player sprite always in the centre of the screen
{% endembed %}

{% embed url="https://youtu.be/PMAv_LpCRZU" %}
Test 3: Ground closer to bottom of screen
{% endembed %}
