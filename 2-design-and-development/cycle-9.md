# 2.2.9 Cycle 9: Updating and reading time records

## Design

In this cycle, I will be using the Node.js SQLite3 library to set the time records for users in the database. I will also use SQL queries to read scores for the test users and convert them into HH:MM:SS format using the function I wrote in [Cycle 8](cycle-8.md).

### Objectives

* [x] Create a couple of new accounts using the registration form completed in Cycle 6.
* [x] Update their time records using SQL queries and the Node.js SQLite3 library.
* [x] Obtain scores using SQL queries and convert them to HH:MM:SS format.

### Usability Features

### Key Variables

| Variable Name | Use                                                   |
| ------------- | ----------------------------------------------------- |
| db            | Facilitate read/write operations to external database |
| record        | Time record in seconds                                |

### Pseudocode

```
import sqlite3

db = sqlite3.open("data.db")

serialize:
    db.run('UPDATE users SET record=612 WHERE username=charlie')
    db.run('UPDATE users SET record=8362 WHERE username=chcharll')
    db.run('UPDATE users SET record=10 WHERE username=chas_06')
    
    record = db.get('SELECT record FROM users WHERE username=charlie')
    record_format = formatSeconds(record)
    print(record_format)
    
    record = db.get('SELECT record FROM users WHERE username=chcharll')
    record_format = formatSeconds(record)
    print(record_format)
    
    record = db.get('SELECT record FROM users WHERE username=chas_06')
    record_format = formatSeconds(record)
    print(record_format)
```

## Development

### Outcome

At the end of this cycle, I have confirmed I am able to update time records in the database, as well as read values for users and convert them to HH:MM:SS to make them easier to understand for the user. The former will be used when developing the base game to set a new record for the player. The latter will be used in the next cycle to create the leaderboard page with the shortest 50 times as well as the signed in player.&#x20;

To set the records, I used the SQL UPDATE command and for now I will use the username for identifying which entry to modify. When I develop the game itself, the ID will be used since it is stored in the cookie and most easily accessible.

{% code title="app.js" %}
```javascript
db.run(`UPDATE users SET record=612 WHERE username="charlie"`)
db.run(`UPDATE users SET record=8362 WHERE username="chcharll"`)
db.run(`UPDATE users SET record=10 WHERE username="chas_06"`)
```
{% endcode %}

To obtain each one, I used the db.get function and checked for errors before continuing.

{% code title="app.js" %}
```javascript
db.get(`SELECT record FROM users WHERE username="charlie"`, (err, row) => {
    if (err) {
        console.error(err)
        return
    }
```
{% endcode %}

Finally, I format the record property of the row as HH:MM:SS and output to console:

```javascript
const record = formatSeconds(row.record)
console.log(record)
```

The same is repeated for the other two users in the database.

## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Register test accounts using form.</td><td>Two additional entries for user accounts in the "users" table of database.</td><td>As expected</td><td>Pass</td></tr><tr><td>2</td><td>Update records of test accounts.</td><td>Test records written to database.</td><td>As expected</td><td>Pass</td></tr><tr><td>3</td><td>Output records of test accounts.</td><td>Records written in test 2 outputted to console in HH:MM:SS format.</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/image (19) (1).png" alt=""><figcaption><p>New accounts created in test 1</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (5).png" alt=""><figcaption><p>Test record values set in test 2</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image.png" alt=""><figcaption><p>Records set in test 2 outputted in HH:MM:SS format in test 3</p></figcaption></figure>
