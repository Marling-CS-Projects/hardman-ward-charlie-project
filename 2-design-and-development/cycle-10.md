# 2.2.10 Cycle 10: Leaderboard page

## Design

In this cycle, I will be developing the page for the leaderboard. This will be accessible for signed in users from the title screen and will display the quickest 50 (if there are that number) of times to beat the game in the format HH:MM:SS alongside the player's own score.&#x20;

### Objectives

* [ ] Handle HTTP GET request to path of leaderboard.
* [ ] Obtain username of account from the ID saved in cookie.
* [ ] Get quickest 50 time records and their corresponding username from the database.
* [ ] Get player's personal record.
* [ ] List top 50 records in an HTML table on a page.
* [ ] Display player's personal record in bold text above the table.

### Usability Features

### Key Variables

| Variable Name | Use |
| ------------- | --- |
|               |     |

### Pseudocode

{% code title="lib/leaderboard.js" %}
```
import open

func get_personal_record(username):
    record = db.get("SELECT record FROM users WHERE username=[username]")
    return record
    
func top_records():
    all_records = db.all("SELECT username, record FROM users ORDER BY ASC")
    
    top_records = []

    for i in range(0, 50):
        top_records.add({
            username: all_records("username"),
            record: all_records("record")
        })
    
    return top_records
```
{% endcode %}

{% code title="lib/account.js" %}
```
func username_from_id(id):
    username = db.get("SELECT username FROM users WHERE id=[id]")
    return username
```
{% endcode %}

{% code title="app.js" %}
```
app.receive_get_req("/leaderboard", func (req, res) => {
    
})
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

