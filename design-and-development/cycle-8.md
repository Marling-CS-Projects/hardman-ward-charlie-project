# 2.2.8 Cycle 8: Convert seconds to HH:MM:SS

## Design

My leaderboard will rank signed-in players based on how quickly they beat the game. To keep things simple, their time record will be stored in the database in seconds, however to make it more clear to the player and other players how long they took, the time record will be converted into the format HH:MM:SS when displayed in the leaderboard. For example, 5,000 seconds would be displayed as 01:23:20 (1 hour, 23 minutes, 20 seconds). In this cycle, I will be setting up the conversion from seconds to the HH:MM:SS format.

### Objectives

* [x] Create a function that takes in one parameter for seconds
* [x] Work out how many hours are in given seconds and subtract them.
* [x] Work out how many minutes are in remaining seconds and subtract them.
* [x] Return a string in the format of HH:MM:SS.
* [x] Test with a range of values

### Usability Features

### Key Variables

| Variable Name | Use                                                |
| ------------- | -------------------------------------------------- |
| hours         | Number of hours in the seconds provided            |
| minutes       | Number of minutes in the seconds provided          |
| seconds       | Value passed to function                           |
| format        | Hours, minutes, and seconds in the format HH:MM:SS |

### Pseudocode

{% code title="app.js" %}
```
func format_seconds (seconds): // Function taking in one parameter for seconds
    // Work out hours in seconds and subtract
    hours = round_down(seconds / 3600)
    seconds -= (hours * 3600)
    
    // Work out minutes in seconds and subtract
    minutes = round_down(seconds / 60)
    seconds -= (minutes * 60)
    
    // Return in format HH:MM:SS
    format = "[hours.twodigits]:[minutes.twodigits]:[seconds.twodigits]"
    return format

// Test function with a range of values
print(format_seconds(5000))
print(format_seconds(370))
print(format_seconds(59))
print(format_seconds(10))
```
{% endcode %}

## Development

### Outcome



### Challenges



## Testing

Evidence for testing

### Tests

<table><thead><tr><th width="95">Test</th><th width="158">Instructions</th><th width="171">What I expect</th><th width="174">What actually happens</th><th>Pass/Fail</th></tr></thead><tbody><tr><td>1</td><td>Convert 5,000 to HH:MM:SS</td><td>Console prints 01:23:20</td><td>As expected</td><td>Pass</td></tr><tr><td>2</td><td>Convert 370 to HH:MM:SS</td><td>Console prints 00:06:10</td><td>As expected</td><td>Pass</td></tr><tr><td>3</td><td>Convert 59 to HH:MM:SS</td><td>Console prints 00:00:59</td><td>As expected</td><td>Pass</td></tr><tr><td>4</td><td>Convert 10 to HH:MM:SS</td><td>Console prints 00:00:10</td><td>As expected</td><td>Pass</td></tr></tbody></table>

### Evidence

<figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption><p>Test 1</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (8).png" alt=""><figcaption><p>Test 2</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (18).png" alt=""><figcaption><p>Test 3</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (5).png" alt=""><figcaption><p>Test 4</p></figcaption></figure>
