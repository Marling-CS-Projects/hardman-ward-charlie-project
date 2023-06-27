# 2.2.9 Cycle 9: Updating time records

## Design

In this cycle, I will be using the Node.js SQLite3 library to update the time records for users in the database. I will also use SQLite to obtain scores for the test users and converting them into HH:MM:SS format using the function I wrote in Cycle 8.

### Objectives

* [ ] Create a few new accounts using the registration form completed in Cycle 6.
* [ ] Update their time records using SQL queries and the Node.js SQLite3 library.
* [ ] Obtain scores using SQL queries and convert them to HH:MM:SS format.

### Usability Features

### Key Variables

| Variable Name | Use |
| ------------- | --- |
|               |     |

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



### Challenges



## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Register test accounts using form.</td><td>Two additional entries for user accounts in the "users" table of database.</td><td></td><td></td></tr></tbody></table>

### Evidence

