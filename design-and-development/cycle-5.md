# 2.2.5 Cycle 5: Reading and saving cookies

## Design

In this cycle, I will be testing the ability of Node.js to save cookies and read their values using Express.js. This will be used later on store the numeric ID for the account on sign in which will be read when reading and writing to the leaderboard, and setting up multiplayer games. I will be making use of the cookie-parser middleware to read and write cookies in a format Javascript understands.

### Objectives

* [ ] Handle POST request from HTML form
* [ ] Save username in browser cookie
* [ ] Direct the user to a page stating their username if a value is read from cookie

### Usability Features

### Key Variables

| Variable Name | Use                          |
| ------------- | ---------------------------- |
| app           | Store Express.js application |

### Pseudocode

```
// Import Express.js module
import express
// Import cookie-parser to read cookies in supported format
import cookie-parser

// Setup Express.js app and serve static files from public directory
app = express()
app.public_dir("/public")
app.use_middleware(cookie-parser)

// Handle connection to root ("/")
app.receive_get_req("/", (req, res) {
    // Get username from cookie
    username = req.read_cookie(username)
    if username undefined: // Username empty, therefore no cookie saved
        redirect("login.html") // Go to login form
    else: // Username exists
        res("Your username is " + username)
}

// Handle POST request "/login"
app.receive_post_req("/login", (req, res) {
    res.save_cookie(username=req.username)
    redirect("/")
})

app.run(port=8080) // Run on port 8080 (accessible at http://localhost:8080)
```

## Development

### Outcome



### Challenges



## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Run initial code</td><td></td><td></td><td></td></tr></tbody></table>

### Evidence

