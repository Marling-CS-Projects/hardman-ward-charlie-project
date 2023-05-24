# 2.2.3 Cycle 3: Hashing passwords with bcrypt

## Design

In this third cycle, I will be using the bcrypt algorithm to hash passwords before they are written to my SQLite database. This will make the login system more secure because hashing cannot be reversed.

### Objectives

* [ ] Install the bcrypt module
* [ ] Write a test entry to the users table with a hashed password
* [ ] Compare a hashed password stored in a variable to one in the table

### Usability Features

### Key Variables

| Variable Name | Use |
| ------------- | --- |
|               |     |

### Pseudocode

```
// Import SQLite3 module for handling SQLite databases and bcrypt for hashing
import sqlite3, bcrypt

// Open/create SQLite database
db = sqlite3.open("data.db")

// Create tables for accounts and sessions
db.run(`CREATE TABLE IF NOT EXISTS users (
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    record INT
)`)

// Write to database
db.run(`INSERT INTO users (username, password) VALUES ('charlie','[bcrypt.hash("password123")]')`)

// Authenticate password
const password_correct1 = db.get(`SELECT * FROM users WHERE username='charlie' && password="[bcrypt.hash("password123")]"`)
print(password_correct1) // Should be "true"
const password_correct2 = db.get(`SELECT * FROM users WHERE username='charlie' && password="[bcrypt.hash("pass555")]"`)
print(password_correct2) // Should be "false"
```

## Development

### Outcome



### Challenges



## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Run initial code</td><td></td><td></td><td></td></tr></tbody></table>

### Evidence

