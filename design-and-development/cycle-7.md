# 2.2.7 Cycle 7: Working login

Design

In this cycle, I will be combining the login form created in [Cycle 2](cycle-2.md) with the ability to save and read cookies demonstrated in [Cycle 5](cycle-5.md) to create a working login form that authenticates user details and saves the user ID in a cookie.&#x20;

### Objectives

* [ ] Check for a matching entry in database based on submitted username and password.
* [ ] Save numeric ID in cookie that can be read from later.
* [ ] Display message if login successful with ID loaded from cookie.
* [ ] Display error if login unsuccessful, for example if invalid credentials were entered.

### Usability Features

### Key Variables

| Variable Name | Use |
| ------------- | --- |
|               |     |

### Pseudocode

{% code title="lib/account.js" %}
```
// Login function to verify user credentials
function login (form, callback):
    open(db):
        // Get submitted details
        username = form.username
        password = form.password
        
        // Check if account with those credentials exists
        valid_credentials = db.get("SELECT * FROM users WHERE username=[username] AND password=[password]")
        if valid_credentials: // Account does exist, therefore credentials valid
            callback(false, valid_credentials.data.id)
        else if error: // SQL-related error
            callback(error)
        else: // Entry not found, so invalid credentials
            callback(401) // Unauthorised
            
export(register, login) // Login function can be imported
```
{% endcode %}

{% code title="app.js" %}
```
// Handle POST request "/login"
app.receive_post_req('/login', (req, res):
    // Run login function
    account.login(form=req.body, (err, id):
        if err:
            res.send_err(err)
        else: // Login successful
            res.cookieSet('id', id) // Set cookie with ID
            redirect('/') // Redirect to index page
        res.done() // Finish

// Handle GET request "/"
app.receive_get_req('/', (req, res):
    id = req.cookies.id // Get ID stored in cookie
    
    // If nothing is set in the cookie, redirect client to login
    if id undefined:
        redirect("login.html")
    
    res.end("Hello, your ID is" + id) // Display ID to user in plaintext
```
{% endcode %}

## Development

### Outcome



### Challenges

My first test crashed on attempting to access the site from my browser. On further investigation, this appeared to be caused by how I implemented handling of the "GET" request to the site's root (http://localhost:8080).&#x20;

{% code title="app.js" %}
```javascript
const id = req.cookies.id

if (id === undefined) {
    res.redirect("login.html")
}

res.end("Hello, your ID is " + id)
```
{% endcode %}

In the above code, the server checks if the value for the "id" cookie is undefined, which would mean the user is not signed in. If it is such, it redirects the client to the login form. I thought I did not need to use an else statement with the alternative scenario, which is that the cookie had a set value and to display it to the client. However, I was wrong, because the error I got on the crash indicated that the server attempted to send another response after the request was "concluded" by the use of the redirect function.&#x20;

## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Redirect client to root ("/") if there is no "id" cookie.</td><td>Browser redirected to login page.</td><td>Server crashes with uncaught error "ERR_STREAM_WRITE_AFTER_END"</td><td>Fail</td></tr><tr><td>2</td><td>Redirect client to root ("/") if there is no "id" cookie. Updated code uses an "else" statement to handle if cookie is defined.</td><td>Browser redirected to login page.</td><td>As expected</td><td>Pass</td></tr><tr><td>3</td><td></td><td></td><td></td><td></td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/image (15).png" alt=""><figcaption><p>ERR_STREAM_WRITE_AFTER_END on test 1</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (4).png" alt=""><figcaption><p>Redirected to login form on test 2</p></figcaption></figure>

