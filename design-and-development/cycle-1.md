# 2.2.1 Cycle 1: Login system

## Design

In the first cycle, I will be developing the back-end aspects of the login system using Node.js, SQLite, and the bcrypt hashing algorithm, before writing the HTML pages for login and registration that will be displayed to the user.

The aim is to allow new players to create an account with the password stored securely in a SQLite database table, and existing players to securely authenticate and have the browser store a cookie so the game can tell if signed in.

### Objectives

* [ ] Create a Node.js project in Visual Studio Code
* [ ] Install SQLite3, Express.js, and bcrypt modules using NPM
* [ ] Write functions to register a new account or authenticate an existing one
* [ ] Validate the details provided by the user
* [ ] Handle errors that occur during login/registration
* [ ] Handle POST requests from the client to login and register
* [ ] Write an HTML webpage containing login and registration forms that send POST requests on submission

### Usability Features

### Key Variables

| Variable Name         | Use                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------- |
| usernameTaken         | Determine if the username entered by the user on registration is already in use by another account. |
| credentialsValid      | Determine if the username and password entered by the user on login are valid.                      |
| username and password | Inputs specified by the user to login or register.                                                  |

### Pseudocode

#### lib/user.js

```
procedure setup_db()
    open("data.db")
    run_sql("CREATE TABLE IF NOT EXISTS users (
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        record INT
    )")
end procedure
         
procedure register(username, password)
    username_taken = run_sql("SELECT * FROM users WHERE username='[username]'")
    if username_taken
        return false
    else
        run_sql("INSERT INTO users (username, password, record) VALUES ('[username]', '[password]', 0)")
        return true
    end if
end procedure

procedure login(username, password)
    credentials_valid = run_sql("SELECT * FROM users WHERE username='[username]' AND password='[password]'")
    if credentials_valid
        return true
    else
        return false
    end if
end procedure 
```

#### app.js

```
setup_db()

if post_request == "/register"
    success = register(post_request.username, post_request.password)
    if success
        go_to("login.html")
    else
        show_error("Username already in use")
    end if
else if post_request == "/login"
    success = login(post_request.username, post_request.password)
    if success
        save_cookie("username", post_request.username)
        go_to("game.html")
    else
        show_error("Incorrect username or password")
    end if
end if
```

## Development

### Outcome

### Challenges

Description of challenges

## Testing

Evidence for testing

### Tests

| Test | Instructions  | What I expect     | What actually happens | Pass/Fail |
| ---- | ------------- | ----------------- | --------------------- | --------- |
| 1    | Run code      | Thing happens     | As expected           | Pass      |
| 2    | Press buttons | Something happens | As expected           | Pass      |

### Evidence
