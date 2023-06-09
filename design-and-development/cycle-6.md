# 2.2.6 Cycle 6: Working registration form

## Design

In this cycle, I will be be combining the registration form from [Cycle 2](cycle-2.md) with elements of other previous cycles to create a working registration form that allows the user to enter their username, email, and password to create an account. To prevent conflicts, the server must check if an account is already registered with the given username before proceeding with registration.

### Objectives

* [ ] Create a SQLite database with an automatically generated unique numeric ID, username, email, password, and record fields.
* [ ] Validate username submitted in registration form to ensure it does not already exist.
* [ ] Insert entry containing submitted data to the users table.
* [ ] Redirect the user to the login form if successful.
* [ ] If an error occurs, display the error on a separate page to the user.

### Usability Features

### Key Variables

| Variable Name | Use |
| ------------- | --- |
|               |     |

### Pseudocode

{% code title="lib/account.js" %}
```
// Import SQLite3 module for read/write to database
import sqlite3

// Callback function to create/open DB and create users table
function open (callback):
    db = sqlite3.open("data.db")
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER NOT NULL AUTO_INCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        record INT,
        PRIMARY KEY (id)
    )`)
    callback(db)

// Register function to check if username is taken and if not create new account
function register (form, callback):
    open((db) : 
        // Get details submitted in form
        username = form.username
        email = form.email
        password = form.password
    
        // Check if username is already in use
        username_exists = db.get(`SELECT * FROM users WHERE username=[username]`)
        if username_exists: // Username taken
            callback(409) // Return 409 -- error code for "conflict"
        else:
            // Insert entry into users table
            db.run(`INSERT INTO users (username, email, password) VALUES ([username], [email], [password])`)
            catch err:
                callback(err) // SQL error occurs
            no err:
                callback(false)
    )

export(register) // Register function can be imported from module
```
{% endcode %}

{% code title="app.js" %}
```
// Import account module
import lib/account

// Setup Express app
app = express()
app.public_dir("/public")

// Handle POST request "/register"
app.receive_post_req('/register', (req, res) :
    // Run register function
    account.register(form=req.body, (err): 
        if err:
            res.send_error(err) // Display error message to client
        else:
            redirect("login.html") // Redirect to login page

app.run(port=8080)
```
{% endcode %}

## Development

### Outcome



### Challenges



## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Run initial code</td><td></td><td></td><td></td></tr></tbody></table>

### Evidence

