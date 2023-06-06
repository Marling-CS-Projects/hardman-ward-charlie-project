# 2.2.3 Cycle 3: Hashing passwords with bcrypt

## Design

In this third cycle, I will be testing the Node.js implementation of hashing algorithm bcrypt. This will be used later on to store passwords and authenticate the user in the SQLite database, since it is more secure than storing it in plaintext where it could be obtained by a hacker.&#x20;

### Objectives

* [ ] Write a new entry to my users table with the password hashed
* [ ] Compare passwords with the one in the database to see if they are valid

### Usability Features

### Key Variables

| Variable Name | Use                           |
| ------------- | ----------------------------- |
| hash          | Store hashed output of string |

### Pseudocode

```
// Import SQLite3 and bcrypt modules
import sqlite3, bcrypt

// Open SQLite database
db = sqlite3.open("data.db")

// Hash password and insert it into users table with user 'charlie2'
password = bcrypt.hash(salt=10, 'password123')
db.run(`INSERT INTO users (username, password) VALUES ('charlie2', '[password]')`)

// Query entry with wrong password
password = bcrypt.hash(salt=10, '321drowssap')
details_valid = db.get(`SELECT * FROM users WHERE username='charlie2' AND password='[password]'`)
print(details_valid) // Should print false

// Query entry with correct password
password = bcrypt.hash(salt=10, 'password123')
details_valid = db.get(`SELECT * FROM users WHERE username='charlie2' AND password='[password]'`)
print(details_valid) // Should print user details
```

## Development

### Outcome



### Challenges



## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Run initial code</td><td>The test entry with hashed password is successfully written to the users table, and the password checks return "incorrect" and "correct" respectively.</td><td>The test entry is successfully written to the users table but due to the asynchronous nature of the bcrypt and sqlite3 library, the password checks run at the same time and therefore, they both return "incorrect" because the entry does not exist in the users table yet.</td><td>Fail</td></tr><tr><td>2</td><td></td><td></td><td></td><td></td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/Screenshot_2023-06-05_18-51-01.png" alt=""><figcaption></figcaption></figure>
