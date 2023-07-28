# 2.2.14 Cycle 14: Title screen

## Design

In this cycle, I will be writing a simple title screen for my game. As laid out in [Features of Proposed Solution](../1-analysis/1.4a-features-of-the-proposed-solution.md), this will include buttons for singleplayer and multiplayer mode, leaderboard, and sign in/out. The multiplayer and leaderboard buttons will only appear to signed in players and the text of the sign in/out button will depend on if the player is signed in or not. Additionally, signed in players will be shown their username.

### Objectives

* [x] Initialise Kaboom.js with 1280x720 resolution and lught blue background.
* [x] Display name of game "Pixel Quest" in large text at top of screen.
* [x] Get ID from cookie and obtain username from it.
* [ ] If a username is found, render multiplayer and leaderboard buttons and display the username in text below.
* [ ] Render singleplayer and sign in/out buttons, with the latter text depending on whether the player is signed in.
* [ ] Continually check for the buttons being clicked and for now, simply log to console what button is being clicked.

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

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Initialise Kaboom.js engine with light blue background and 1280x720 resolution.</td><td>Light blue area displayed starting from top left corner of page of size 1280x720.</td><td>As expected</td><td>Pass</td></tr><tr><td>2</td><td>Render "Pixel Quest" title at top of title screen.</td><td>Grey large text saying "Pixel Quest" at top of Kaboom.js area.</td><td>Text appears but is cut off so only the bottom half is visible.</td><td>Fail</td></tr><tr><td>3</td><td>Increase the Y-coordinate of the title text so the text appears further down.</td><td>Grey large text saying "Pixel Quest" at top of Kaboom.js area.</td><td>As expected</td><td>Pass</td></tr><tr><td>4</td><td>If "id" cookie is empty, display browser alert saying the player isn't signed in.</td><td>Browser alert appears if the player is not signed in, telling them such.</td><td>As expected</td><td>Pass</td></tr><tr><td>5</td><td>If "id" cookie has a value, use Socket.IO events created in Cycle 13 to obtain username and display it in alert. </td><td>Browser alert appears if player is signed in, telling them their username.</td><td>As expected</td><td>Pass</td></tr><tr><td>6</td><td>If the player is signed in, display all four buttons in the centre of the screen.</td><td>All four buttons appear in the centre of the screen for signed in users.</td><td>As expected</td><td>Pass</td></tr><tr><td>7</td><td>Display only the singleplayer and sign out buttons in the centre of the screen to signed out players.</td><td>Singleplayer and sign out buttons appear in the centre of the screen for signed out users.</td><td>As expected</td><td>Pass</td></tr><tr><td>8</td><td>Output to the console when the player clicks a button.</td><td>The name of the button (e.g. "singleplayer") is outputted alongside a brief message to the console when clicked.</td><td>TypeError: cannot read properties of undefined (reading 'onClick')</td><td>Fail</td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/image (19).png" alt=""><figcaption><p>Test 1: Light blue area of size 1280x720</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (2) (2).png" alt=""><figcaption><p>Test 2: Title text is cut off</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (3).png" alt=""><figcaption><p>Test 3: Title text now appears properly</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (16).png" alt=""><figcaption><p>Test 4: Browser alert to signed out players</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (18).png" alt=""><figcaption><p>Test 5: Browser alert containing username for signed in players</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image.png" alt=""><figcaption><p>Test 6: All four menu buttons appear on title screen when signed in</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption><p>Test 7: For signed out users, only the singleplayer and sign in buttons appear</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (2).png" alt=""><figcaption><p>Test 8: The game checks whether the player is signed in or not before defining the button sprites, which breaks the onClick function used to register the mouse clicking the button</p></figcaption></figure>
