# 2.2.10 Cycle 10: Leaderboard page

## Design

In this cycle, I will be developing the page for the leaderboard. This will be accessible for signed in users from the title screen and will display the quickest 50 (if there are that number) of times to beat the game in the format HH:MM:SS alongside the player's own score.&#x20;

### Objectives

* [x] Handle HTTP GET request to path of leaderboard.
* [x] Obtain username of account from the ID saved in cookie.
* [x] Get quickest 50 time records and their corresponding username from the database.
* [x] Get player's personal record.
* [x] List top 50 records in an HTML table on a page.
* [x] Display player's personal record in bold text above the table.

### Usability Features

### Key Variables

| Variable Name | Use |
| ------------- | --- |
|               |     |

### Pseudocode

{% code title="lib/leaderboard.js" %}
```
import open

// Function to obtain the record of a specific user
func get_personal_record(username):
    record_seconds = db.get("SELECT record FROM users WHERE username=[username]") // Get record from entry matching username
    record = format_seconds(record_seconds) // Format to HH:MM:SS
    return record

// Function to get the quickest 50 time records and their corresponding usernames
func top_records():
    all_records = db.all("SELECT username, record FROM users ORDER BY ASC") // Get all records in ascending order (lowest = quickest first)
    
    // Add 50 top/quickest records to array in JSON format with username and record
    top_records = []
    for i in range(0, 50):
        record_seconds = all_records("record") // Get record from entry in seconds
        record = format_seconds(record_seconds) // Format to HH:MM:SS
        
        // Add username and record in JSON format
        top_records.add({
            username: all_records("username"),
            record: record
        })
    
    return top_records
```
{% endcode %}

{% code title="lib/account.js" %}
```
// Function to obtain username of account from numeric ID
func username_from_id(id):
    username = db.get("SELECT username FROM users WHERE id=[id]")
    return username
```
{% endcode %}

{% code title="app.js" %}
```
// GET request "/leaderboard" will show HTML leaderboard table
app.receive_get_req("/leaderboard", func (req, res) => {
    id = req.cookies("id") // Get ID from cookie
    username = username_from_id(id) // Find username corresponding to ID
    
    personal_record = get_personal_record(username) // Get own record
    
    html = `[OTHER HTML STUFF] + <p><strong>Your record: </strong>[personal_record]<p> + [TABLE STUFF]` // Setup HTML page with personal record and starting table
    
    top_records = top_records() // Get best 50 records
    
    // Display the position, username, and time in the HTML table for each record
    for i in range(0, top_records.len):
        html += `<tr><td>[i+1]</td><td>[top_records[i]("username")]</td><td>[top_records[i]("record")</td><tr>
    
    html += `[FINISHING HTML STUFF]` // Other HTML stuff to conclude the page
    
    res.end(html) // Display HTML in browser
})
```
{% endcode %}

## Development

### Outcome

On completion of this cycle, I have setup the leaderboard page which will allow signed in players to check their record and view the top 50 records. This is key for the competitive element of the game. Later on, I will write the code for updating records on the leaderboard from the client so that the game can determine if a player's time has beaten their record and if so, update the time.

The server uses a GET request to handle any attempt to connect to the leaderboard page, after which it obtains the ID from cookies. If the end result is undefined, this means the player isn't signed in, and therefore they are redirected to the login page.&#x20;

{% code title="app.js" %}
```javascript
app.get('/leaderboard', (req, res) => {
    const id = req.cookies.id
    if (id === undefined) {
        res.redirect("login.html")
```
{% endcode %}

Otherwise, if the ID has a value, the server attempts to get the username corresponding to the ID in the database using the usernameFromId function in the "account" module. If a username is found, the server then attempts to obtain the personal record for that username using the getPersonalRecord function.

{% code title="app.js" %}
```javascript
account.usernameFromId(id, (username) => {
    if (username) {
        leaderboard.getPersonalRecord(username, (record) => {
```
{% endcode %}

After getting the personal record, the starting part of the leaderboard HTML page is defined in the "html" variable. This includes the page title, the player's personal record, and the header rows of the table.

{% code title="app.js" %}
```javascript
var html = `
    <!DOCTYPE html>
    <html>
        <head lang="en">
            <meta charset="utf-8">
            <title>Leaderboard</title>
        </head>
        <body>
            <h1>Leaderboard</h1>
            <p><strong>Your personal record: </strong>${record}</p>
            <table>
                <tr>
                    <th>Position</th>
                    <th>Username</th>
                    <th>Record</th>
                <tr>
`
```
{% endcode %}

After this, the server gets the top 50 records using the topRecords function of the leaderboard module and displays them each as a row in the table. It then finishes the HTML and displays it in the response.

{% code title="app.js" %}
```javascript
leaderboard.topRecords((topRecords) => {
    for (let i = 0; i < topRecords.length; i++) {
        html += `
            <tr>
                <td>${i+1}</td>
                <td>${topRecords[i].username}</td>
                <td>${topRecords[i].record}</td>
            </tr>
        `
    }

    html += "</table></body></html>"

    res.end(html)
})
```
{% endcode %}

In the "account" module, I wrote the usernameFromId function. This takes in the ID as a parameter and then attempts to get the username corresponding to it from the users table:

{% code title="lib/account.js" %}
```javascript
function usernameFromId(id, callback) {
    open((db) => {
        db.get(`SELECT username FROM users WHERE id='${id}'`, (err, row) => {
            if (row) {
                callback(row.username)
            } else {
                callback(false)
            }
        })
    })
}
```
{% endcode %}

In the "leaderboard" module created in the lib directory, I moved the formatSeconds function used to put seconds into the HH:MM:SS format.

{% code title="lib/leaderboard.js" %}
```javascript
function formatSeconds(seconds) {
    const hours = Math.floor(seconds / 3600)
    seconds -= (hours * 3600)

    const minutes = Math.floor(seconds / 60)
    seconds -= (minutes * 60)

    const format = `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`
    return format
}
```
{% endcode %}

The function getPersonalRecord takes in the username as a parameter and then obtains the record corresponding to the username from the users table of the database and converts it to HH:MM:SS using the formatSeconds function.

{% code title="lib/leaderboard.js" %}
```javascript
function getPersonalRecord(username, callback) {
    open((db) => {
        db.get(`SELECT record FROM users WHERE username='${username}'`, (err, row) => {
            const recordSeconds = row.record
            const record = formatSeconds(recordSeconds)
            callback(record)
        })
    })
}
```
{% endcode %}

The topRecords function starts by getting all entries from the users table where the record is defined and in ascending order of records (smallest records = fastest times).

{% code title="lib/leaderboard.js" %}
```javascript
open((db) => {
    db.all(`SELECT username, record FROM users WHERE record IS NOT NULL ORDER BY record ASC`, (err, rows) => {
```
{% endcode %}

The program must now figure out whether to attempt to display the first 50 results, with the possibility of an error occuring if there are less than 50 entries; or display all the results. It checks if the number of rows returned is less than 50, if so it only scans through that number of rows; otherwise it scans through the first 50 rows.

{% code title="lib/leaderboard.js" %}
```javascript
var numberOfRows
if (rows.length < 50) {
    numberOfRows = rows.length
} else {
    numberOfRows = 50
}
```
{% endcode %}

Finally, the code goes through the first number of rows specified, obtaining the record in seconds and converting to HH:MM:SS, and pushing the information of the user and record to an array.

{% code title="" %}
```javascript
const topRecords = []
for (let i = 0; i < numberOfRows; i++) {
    const recordSeconds = rows[i].record
    const record = formatSeconds(recordSeconds)

    topRecords.push({
        username: rows[i].username,
        record: record
    })
}

callback(topRecords)
```
{% endcode %}

## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Get and display username corresponding to id saved in cookie.</td><td>Username corresponding to id displayed in plaintext in the web browser.</td><td>As expected</td><td>Pass</td></tr><tr><td>2</td><td>Get personal record for user and display in browser.</td><td>Personal record displayed in browser.</td><td>As expected</td><td>Pass</td></tr><tr><td>3</td><td>Get best 50 (or less) records in ascending order and display in an HTML table.</td><td>50 best records are shown in an HTML table with lowest times first on accessing the leaderboard.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

{% file src="../.gitbook/assets/simplescreenrecorder-2023-07-09_08.13.39.mkv" %}
Test 1: Username corresponding to id stored in cookie displayed in browser
{% endfile %}

<figure><img src="../.gitbook/assets/image (19) (1).png" alt=""><figcaption><p>Test 2: Personal record for signed in user displayed in browser</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (8) (1).png" alt=""><figcaption><p>Test 3: Best records are displayed in order of lowest time in browser</p></figcaption></figure>
