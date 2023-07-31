# 2.2.15 Cycle 15: Leaderboard and sign in/out from title screen

## Design

In this cycle, I will be updating the click functions configured in the previous cycle for the title screen so that the leaderboard button redirects the player to the leaderboard and the sign in/out button either redirects the player to the sign in page or signs them out depending on if they are signed in or not.

### Objectives

* [x] Go to leaderboard page on clicking leaderboard button.
* [x] If player is signed out, go to sign in page on clicking sign in/out button.
* [x] If player is signed in, clear the "id" cookie and reload the page

### Usability Features

### Key Variables

| Variable Name | Use |
| ------------- | --- |
|               |     |

### Pseudocode

{% code title="public/game.js" %}
```
if my_id: // If ID found from cookie
    emit('get username', attach: my_id) // Emit Socket.IO event containing ID to server
else: // Cookie is empty
    ## Code to create button sprites goes here ##
    
    signinout_btn.click: // On clicking sign in
        go_to("/login.html") // Go to login page
    
on('give username', attach: my_username): // Receive Socket.IO event from server containing corresponding username
    ## Code to create button sprites goes here ##
    
    leaderboard_btn.click: // On clicking leaderboard button
        go_to("/leaderboard") // Go to leaderboard page
        
    signinout_btn.click: // On clicking sign out
        document.cookie = "id=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;" // Set cookie to past date, effectively deleting it
        reload_page() // Reload page
```
{% endcode %}

## Development

### Outcome

At the end of this cycle, I have setup some of the button clicks on the title screen so the player can access the leaderboard and sign in pages directly from the title screen as well as sign out if they wish. This means the remaining buttons to configure are the single and multiplayer buttons, which will be implemented when I develop the actual gameplay aspects of this game in upcoming cycles.

If the game detects the player is not signed in, through a lack of a value in the "id" cookie, it will setup the sign in/out button to read "sign in" and configure it to redirect to the login form that I made in [Cycle 2](cycle-2.md). Signed out users do not have access to the leaderboard or multiplayer mode, so the only other button displayed is the singleplayer button, which for now simply outputs to the browser console.

```javascript
singlePlayerButton.onClick(() => {
    console.log("You clicked singleplayer!")
})

    signInOutButton.onClick(() => {
        location.href = "/login.html"
    })
```

### Challenges



## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Redirect signed out user to login form on clicking sign in/out button.</td><td>Signed out players are taken to login form when they click "sign in"</td><td>As expected</td><td>Pass</td></tr><tr><td>2</td><td>Delete cookie and reload page when a signed in user clicks the sign in/out button.</td><td>Signed in players are logged out and the page refreshes when they click "sign out"</td><td>As expected</td><td>Pass</td></tr><tr><td>3</td><td>Go to leaderboard page on clicking the leaderboard button (only visible to signed in users).</td><td>Signed in players who click the leaderboard button are taken to the leaderboard page.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

{% embed url="https://www.youtube.com/watch?v=XOj4X9UVg6w" %}
All three tests successful&#x20;
{% endembed %}
