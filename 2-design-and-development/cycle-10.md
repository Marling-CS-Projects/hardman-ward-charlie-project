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



## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Get and display username corresponding to id saved in cookie.</td><td>Username corresponding to id displayed in plaintext in the web browser.</td><td>As expected</td><td>Pass</td></tr><tr><td>2</td><td>Get personal record for user and display in browser.</td><td>Personal record displayed in browser.</td><td>As expected</td><td>Pass</td></tr><tr><td>3</td><td>Get best 50 (or less) records in ascending order and display in an HTML table.</td><td>50 best records are shown in an HTML table with lowest times first on accessing the leaderboard.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

{% file src="../.gitbook/assets/simplescreenrecorder-2023-07-09_08.13.39.mkv" %}
Test 1: Username corresponding to id stored in cookie displayed in browser
{% endfile %}

<figure><img src="../.gitbook/assets/image (19).png" alt=""><figcaption><p>Test 2: Personal record for signed in user displayed in browser</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (8).png" alt=""><figcaption><p>Test 3: Best records are displayed in order of lowest time in browser</p></figcaption></figure>
