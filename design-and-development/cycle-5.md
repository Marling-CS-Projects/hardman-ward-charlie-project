# 2.2.5 Cycle 5: Reading and saving cookies

## Design

In this cycle, I will be testing the ability of Node.js to save cookies and read their values using Express.js. This will be used later on store the numeric ID for the account on sign in which will be read when reading and writing to the leaderboard, and setting up multiplayer games. I will be making use of the cookie-parser middleware to read and write cookies in a format Javascript understands.

### Objectives

* [x] Handle POST request from HTML form
* [x] Save username in browser cookie
* [x] Direct the user to a page stating their username if a value is read from cookie

### Usability Features

### Key Variables

| Variable Name           | Use                                                    |
| ----------------------- | ------------------------------------------------------ |
| app                     | Store Express.js application                           |
| req.cookies             | List of cookies stored in the browser for that website |
| res.cookie(name, value) | Function to save cookie with specified name and value  |

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

At the end of this cycle, I have successfully saved a cookie based on HTML form input in Node.js and read from it. This will be necessary for the accounts system of my game because the game will need some way of knowing if the player is signed in, and if so, what account they are signed in to.

For parsing cookies in a format supported by JavaScript, I used the cookie-parser middleware:

{% code title="app.js" %}
```javascript
const cookieParser = require('cookie-parser')
app.use(cookieParser())
```
{% endcode %}

I  used a GET request to determine what page the user would be directed to based on cookie value when they attempt to access the root of the server (http://localhost:8080/). If the value was undefined, and therefore the user was not signed in, they would be redirected to the login form, while if the user was signed in, they would be displayed their username.

{% code title="app.js" %}
```javascript
app.get('/', (req, res) => {
    const username = req.cookies.username

    if (username == undefined) {
        res.redirect("login.html")
    } else {
        res.end("Welcome, " + username)
    }
})
```
{% endcode %}

Similar to Cycle 4, I used a POST request to handle the login form's submission, this time instead of outputting the details the program would save the username in a cookie before redirecting to the root of the server, triggering the GET request:

{% code title="app.js" %}
```javascript
app.post('/login', (req, res) => {
    res.cookie('username', req.body.username)
    res.redirect('/')
})
```
{% endcode %}

## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Run initial code</td><td>On submission of login form, the value entered as the username is stored in a cookie and the browser is redirected to a page showing the username value.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/Screenshot (14).png" alt=""><figcaption><p>Login form on http://localhost:8080/login.html</p></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot (15).png" alt=""><figcaption><p>Welcome page showing username stored in cookie</p></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot (16).png" alt=""><figcaption><p>Cookie for localhost saved in Chrome</p></figcaption></figure>
