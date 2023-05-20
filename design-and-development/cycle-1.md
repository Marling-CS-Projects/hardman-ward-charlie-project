# 2.2.1 Cycle 1: Login system

## Design

In the first cycle, I will be developing the basic aspects of the login system using Node.js and SQLite, before writing the HTML pages for login and registration that will be displayed to the user.

The aim is to allow new players to create an account with the password stored securely in a SQLite database table, and existing players to securely authenticate and have the browser store a cookie so the game can tell if signed in.

### Objectives

* [x] Create a Node.js project in Visual Studio Code
* [x] Install SQLite3, Cookie/Body Parser, and Express.js modules using NPM
* [x] Write functions to register a new account or authenticate an existing one
* [x] Validate the details provided by the user
* [x] Handle errors that occur during login/registration
* [x] Handle POST requests from the client to login and register
* [x] Write an HTML webpage containing login and registration forms that send POST requests on submission

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

At the end of this cycle, I have setup the login and registration forms for my game and written the back-end Node.js code to create new accounts in the SQLite database and authenticate logins to existing accounts.&#x20;

Code TBA

### Challenges

One aspect of this development cycle that I found challenging was the use of callback functions. A callback function is one passed into another function as an argument. I decided to use callback functions because they are used a lot in the SQLite3 Node.js library and allow the code to wait until a task is completed before moving onto the next one. Initially, the registration function in my code did not pass any value if registration was successful, meaning the request would hang indefinitely. After reviewing the code, I realised that my main code had no way of knowing the function was completed without passing a value, resulting in the request hanging.

## Testing

Evidence for testing

### Tests

| Test | Instructions                                                                       | What I expect                                                                             | What actually happens                                                                                                                                   | Pass/Fail |
| ---- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 1    | Run initial code                                                                   | User submits registration form and is taken to the login page if successful.              | While the user details were saved to the database, the request hangs indefinitely and the front-end receives no response indicating success or failure. | Fail      |
| 2    | Run code with registration function passing false in place of error if successful. | User submits registration form and is taken to the login page if successful.              | As expected                                                                                                                                             | Pass      |
| 3    | Run login function that authenticates the given details.                           | User submits login form and is taken to a blank page informing that login was successful. | As expected                                                                                                                                             | Pass      |

### Evidence

<figure><img src="../.gitbook/assets/Screenshot from 2023-05-20 12-28-56.png" alt=""><figcaption><p>Registration page</p></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot from 2023-05-20 12-29-13.png" alt=""><figcaption><p>Login page</p></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot from 2023-05-20 12-29-21.png" alt=""><figcaption><p>Placeholder message for login success</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (2).png" alt=""><figcaption><p>Error message displayed if user enters invalid details for login</p></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot from 2023-05-20 12-29-54.png" alt=""><figcaption><p>Cookie containing username saved in Firefox</p></figcaption></figure>
