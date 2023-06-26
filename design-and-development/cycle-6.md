# 2.2.6 Cycle 6: Working registration form

## Design

In this cycle, I will be be combining the registration form from [Cycle 2](cycle-2.md) with elements of other previous cycles to create a working registration form that allows the user to enter their username, email, and password to create an account. To prevent conflicts, the server must check if an account is already registered with the given username before proceeding with registration.

### Objectives

* [x] Create a SQLite database with an automatically generated unique numeric ID, username, email, password, and record fields.
* [x] Validate username submitted in registration form to ensure it does not already exist.
* [x] Insert entry containing submitted data to the users table.
* [x] Redirect the user to the login form if successful.
* [x] If an error occurs, display the error on a separate page to the user.

### Usability Features

### Key Variables

| Variable Name | Use                                                  |
| ------------- | ---------------------------------------------------- |
| db            | Faciliate read/write operations to external database |
| err           | Store errors that may occur on executing SQL queries |
| req.body      | Information submitted in form                        |
| res           | Response to client                                   |
| register      | Function to register a new user                      |

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

At the end of this cycle, I have successfully setup a working registration form for players to sign up in order to have their scores counted on the leaderboard and play multiplayer. I will now proceed onto the login form so the player's details can be authenticated and have their "id" property stored in a cookie.

Functions relating to the accounts system are stored in a separate Javascript file, account.js. Each time the server operates on the database, it will run this open function and return the db object as a callback so the interpreter waits until the task is finished:

{% code title="lib/account.js" %}
```javascript
function open(callback) {
    const db = new sqlite3.Database("data.db")
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        record INT
    )`)
    callback(db)
}
```
{% endcode %}

The function for the registration itself takes in one parameter, form, which is intended to be the body of the POST request. After opening the database, it assigns username, email, and password to constant variables.&#x20;

{% code title="lib/account.js" %}
```javascript
function register(form, callback) {
    open((db) => {
        const username = form.username
        const email = form.email
        const password = form.passwordjaa
```
{% endcode %}

Next the server must check if the username is already taken and if that is the case, return an error. I implemented this through a SQL query that selects all the fields from the users table if the username is equal to that submitted by the user in the form. If any value is returned, that means a matching entry was found and therefore the username is already used by another account.

{% code title="lib/account.js" %}
```javascript
 db.get(`SELECT * FROM users WHERE username='${username}'`, (err, usernameExists) => {
        if (usernameExists) {
           callback({
              code: 409,
              msg: "Username already taken"
       })
```
{% endcode %}

If no matching entry was found, the server continues with registering the user. I used SQL's INSERT INTO command to add a new entry with the user details submitted in the form. If an error occurs, an internal server error of code 500 is returned.

{% code title="lib/account.js" %}
```javascript
db.run(`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`, (err) => {
    if (err) {
        callback({
            code: 500,
            msg: "Internal database error"
        })
    } else {
        callback(false)
    }
})
```
{% endcode %}

In the main file, I import the contents of my accounts module using the following:

{% code title="" %}
```javascript
const account = require('./lib/account')
```
{% endcode %}

On receiving a POST request at /register, the request body is passed in to the register function. If an error occurs, its status code and message will be sent as the response to the client. If the registration is successful, the client is redirected to the login form.

{% code title="app.js" %}
```javascript
app.post('/register', (req, res) => {
    account.register(req.body, (err) => {
        if (err) {
            res.status(err.code).send(err.msg)
        } else {
            res.redirect("login.html")
        }
        res.end()
    })
})
```
{% endcode %}

### Challenges

My initial test failed because of a syntax error in the code to create the users table. The SQL query attempted to create a field "id" with the property "AUTO\_INCREMENT" so the number would increase on its own for each account made -- I didn't realise I didn't need the underscore. After modifying the query to use AUTO\_INCREMENT and set "id" as the primary key on the same line, the table was successfully created.

Original SQL query that caused a syntax error:

```sql
CREATE TABLE IF NOT EXISTS users (
        id INTEGER AUTO_INCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        record INT,
        PRIMARY KEY (id)
)
```

Updated query that was successful:

```sql
CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        record INT
)
```

## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Submit form with new username</td><td>Registration succeeds and the browser is redirected to the login form.</td><td>SQLite3 syntax error when creating table near "AUTO_INCREMENT"</td><td>Fail</td></tr><tr><td>2</td><td>Submit form with new username</td><td>Registration succeeds and the browser is redirected to the login form.</td><td>As expected</td><td>Pass</td></tr><tr><td>3</td><td>Submit form with username already in use</td><td>Error shown saying username is already taken.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/err1.png" alt=""><figcaption><p>Syntax error on test 1</p></figcaption></figure>

<figure><img src="../.gitbook/assets/success1.png" alt=""><figcaption><p>Registration form with test data</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (5) (1).png" alt=""><figcaption><p>On success, the browser is redirected to the login form</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (3).png" alt=""><figcaption><p>Test entry written into users table of database</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image.png" alt=""><figcaption><p>Error when attempting to register a username already in use</p></figcaption></figure>
