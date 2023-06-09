# 2.2.6 Cycle 6: Working registration form

## Design

In this cycle, I will be be combining the registration form from Cycle 2 with elements of other previous cycles to create a working registration form that allows the user to enter their username, email, and password to create an account. To prevent conflicts, the back-end must check if an account is already registered with the given username before proceeding with registration.

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

```
import sqlite3

db = sqlite3.open("data.db")

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER NOT NULL AUTO_INCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    record INT,
    PRIMARY KEY (id)
)`)

function register (form, callback):
    username = form.username
    email = form.email
    password = form.password
    
    username_exists = db.get(`SELECT * FROM users WHERE username=[username]`)
    if username_exists:
        callback(409)
    else:
        db.run(`INSERT INTO users (username, email, password) VALUES ([username], [email], [password])`)
        catch err:
            callback(err)
        no err:
            callback(false)
            
app = express()
app.public_dir("/public")

app.receive_post_req('/register', (req, res) :
    register(req.body, (err): 
        if err:
            res.send_error(err)
        else:
            redirect("login.html")

app.run(port=8080)
```

## Development

### Outcome



### Challenges



## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Run initial code</td><td></td><td></td><td></td></tr></tbody></table>

### Evidence

