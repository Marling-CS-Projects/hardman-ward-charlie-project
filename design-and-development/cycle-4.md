# 2.2.4 Cycle 4: Receive POST requests

## Design

In the fourth cycle, I will be testing the ability of Node.js to receive POST requests from the front-end and handle them. This will be used later on in development for communication between the front-end and back-end in areas such as login/registration and leaderboard.

### Objectives

* [x] Send a POST request using a form in HTML
* [x] Receive the request in Node.js using the Express.js library
* [x] Output details submitted in the form in Node.js
* [x] Indicate to client that request was successful

### Usability Features

### Key Variables

| Variable Name | Use                                   |
| ------------- | ------------------------------------- |
| app           | Store Express.js application          |
| req           | Information submitted in POST request |
| res           | Send response to client               |

### Pseudocode

```
import express

app = express()
app.public_dir("/public")

app.receive_post_req("/test", (req, res) {
    print("Username is: " + req.username)
    print("Email is: " + req.email)
    print("Password is: " + req.password)
    
    res("Hello world!")
})

app.run(port=8080)
```

## Development

### Outcome

At the end of this cycle, I have confirmed that Node.js is able to receive and handle POST requests, which is a vital aspect of the login/registration and leaderboard aspects of my game. Node.js, through the Express.js library, is able to parse data submitted in an HTML form and send a response to the client.

In order to parse data submitted by the user in the form, below is the code to import the third-party body-parser Node.js module:

{% code title="app.js" %}
```javascript
const bodyParser = require('body-parser')
```
{% endcode %}

Below is the code that sets up an Express.js application and configures it to serve static pages from the public directory in my project folder:

{% code title="app.js" %}
```javascript
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))
```
{% endcode %}

Below is the code that prints out the username, email, and password submitted in the form:

{% code title="app.js" %}
```javascript
app.post('/test', (req, res) => {
    console.log("Username is " + req.body.username)
    console.log("Email is " + req.body.email)
    console.log("Password is " + req.body.password)
```
{% endcode %}

After the form details are printed, the server sends a response to the client saying "Hello, world!" I use this as confirmation that the request was sent and received:

{% code title="app.js" %}
```javascript
res.end('Hello, world!')
```
{% endcode %}

For a POST request to be sent on submission of an HTML form, it must be specified where the request is to be sent and through what method. Here is the code for the test form:

{% code title="public/test.html" %}
```html
<form action="/test" method="POST">
    <fieldset>
        <label for="username">Username</label>
        <input type="text" name="username" id="username">
    </fieldset>
    <fieldset>
        <label for="email">Email</label>
        <input type="email" name="email" id="email">
    </fieldset>
    <fieldset>
        <label for="password">Password</label>
        <input type="password" name="password" id="password">
    </fieldset>
    <input type="submit" value="Submit">
</form>
```
{% endcode %}

## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Run initial code</td><td>Form is displayed at http://localhost:8080/test.html, the details are outputted in the terminal on submission, and the page changes to display the text "Hello world!" after submission</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/Screenshot (9).png" alt=""><figcaption><p>Form accessible from http://localhost:8080</p></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot (8).png" alt=""><figcaption><p>"Hello world!" page on success</p></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot (10).png" alt=""><figcaption><p>Terminal output displays details submitted</p></figcaption></figure>
