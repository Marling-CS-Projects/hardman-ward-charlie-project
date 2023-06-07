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



### Challenges



## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Run initial code</td><td>Form is displayed at http://localhost:8080/test.html, the details are outputted in the terminal on submission, and the page changes to display the text "Hello world!" after submission</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/Screenshot (9).png" alt=""><figcaption><p>Form accessible from http://localhost:8080</p></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot (8).png" alt=""><figcaption><p>"Hello world!" page on success</p></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot (10).png" alt=""><figcaption><p>Terminal output displays details submitted</p></figcaption></figure>
