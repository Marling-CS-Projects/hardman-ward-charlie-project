# 2.2.17 Cycle 17: Side-scrolling

## Design

In this cycle I will setup side-scrolling. This means the camera (everything in the game visible to the player) will follow the player everywhere they go so that the player sprite is always in the middle of the screen.&#x20;

### Objectives

* [ ] Continually check when the player changes
* [ ] Get the player's coordinates
* [ ] Decrease the Y-coordinate a little so the ground is still at the bottom of the screen
* [ ] Set the camera coordinates

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

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Log player coordinates to console whenever the player moves.</td><td>X and Y coordinates shown in browser console when the player moves.</td><td>As expected</td><td>Pass</td></tr><tr><td>2</td><td>Set the camera position to the X and Y coordinates.</td><td>Player sprite is always in the centre of the screen when moving.</td><td>As expected</td><td>Pass</td></tr><tr><td>3</td><td>Decrease Y coordinate for camera position by 150 pixels so the ground is still at the bottom of the screen.</td><td>The ground is nearer the bottom of the screen.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

{% embed url="https://youtu.be/RQafdsRi8xw" %}

{% embed url="https://youtu.be/Fd1IOgZGJQY" %}

{% embed url="https://youtu.be/PMAv_LpCRZU" %}
