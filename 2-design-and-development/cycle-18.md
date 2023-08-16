# 2.2.18 Cycle 18: Permanent solution to ground falling bug

## Design

In [Cycle 16](cycle-16.md), I implemented a temporary solution to a bug apparently quite prevalent in Kaboom.js, where my player would randomly fall through the "solid" ground, usually when moving or jumping. More recently, I tested the game on my laptop with the temporary fix removed and there were no problems, suggesting the bug could be more to do with the graphics card and drivers of my Raspberry Pi 4. However, I still want my game to be as accessible across a wide range of devices as possible, and it's likely whatever is causing this is not exclusive to Raspberry Pi's.

The main problem with my temporary solution was it checked if the player Y coordinate was more than (further down the screen) 512, which are the ground coordinates, and reset it to 512 if such. However, I plan on adding more blocks that will have different Y coordinates, and therefore this solution is unfit.

In this cycle, I will be writing a more permanent solution that will work by detecting whether the player is colliding with a block and determining whether they are falling through the block, moving them back on top if so. Additionally, I will be adding more blocks and making some holes in the ground to test if the fix works.

### Objectives

* [x] Add new layers of brown "dirt" below the green (for grass) ground layer
* [x] Detect when the player collides with a block
* [x] Compare the block's X coordinate with the player's to see if the player is between the horizontal beginning and end of the block
* [x] Then compare the block's Y coordinate with the player's to see if the player is below the top of the block
* [x] If both the above conditions are true, calculate the exact Y coordinate of the top of the block and move the player back up there.

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

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Add new layers of blocks to map with symbols for dirt and stone blocks.</td><td>Initial ground layer of grass followed by dark brown block. Some stone will be on the surface because it is too far down to see for now.</td><td>As expected</td><td>Pass</td></tr><tr><td>2</td><td>When player collides with a block, output the block's coordinates to the browser console.</td><td>Coordinates of blocks player touches constantly outputted to browser console.</td><td>As expected</td><td>Pass</td></tr><tr><td>3</td><td>If the player is within a specified X range to be considered on the block, and below the Y coordinate of the top of the block, set the player's Y coordinate to that of the top of the block.</td><td>When the player could potentially fall through a block, they are moved back on top of it so this never happens. Player can now fall into specified holes in the map.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/image (27).png" alt=""><figcaption><p>Test 1: Dirt layer below the ground slightly visible</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (28).png" alt=""><figcaption><p>Test 2: Coordinates of blocks outputted to console when the player touches them</p></figcaption></figure>

{% embed url="https://youtu.be/eUGDifkoRqI" %}
Test 3: If player goes below top of block they are standing on, they are moved back on top of the block to prevent falling through
{% endembed %}
