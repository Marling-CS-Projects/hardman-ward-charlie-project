# 2.1 Design Frame

## Systems Diagram

![](https://github.com/Marling-School/alevel-project-template/blob/docs/.gitbook/assets/System%20Diagram.jpg)

This diagram shows the different parts of the game that I will focus on creating. I have split each section into smaller sub-sections. Throughout the development stage, I will pick one or two of these sections to focus on at a time to gradually build up and piece together the game. I have broken the project down this way as it roughly corresponds to the success criteria.

## Usability Features

Usability is an important aspect to my game as I want it to be accessible to all. There are 5 key points of usability to create the best user experience that I will be focusing on when developing my project. These are:

### Effective

Users can achieve the goal with completeness and accuracy. To do this, I will implement a smooth transition between levels and make the&#x20;

#### Aims

*

### Efficiency

The speed and accuracy to which a user can complete the goal. To do this, I will add power-ups to my game that help the player if they are at a disadvantage to their opponents, such as if they are far behind. I will also make sure the controls of the game are easy for the player to pick up by using WSAD which is common in many PC games.

#### Aims

* Implement power-ups that assist the player in getting ahead of their opponents.
* Implement controls that will be familiar to many players and easy to pick up.
* Create the title screen to be clear about what the player needs to do in order to play.

### Engaging

The solution is engaging for the user to use. To do this, I will add in 4 levels with random placing of props and chests to keep the players engaged and make them want to play again. Additionally, my game will be multiplayer allowing the player to invite up to four others to play with them.

#### Aims

* Add four levels with a different environment to each other.
* Generate the levels each time with random placement of props and chests.
* Implement online multiplayer to let players play together.

### Error Tolerant

The solution should have as few errors as possible and if one does occur, it should be able to correct itself. To do this, I will write my code to manage as many different game scenarios as possible so that it will not crash when someone is playing it.

#### Aims

* The game should not crash.
* The game should not regularly lag.
* The game should not contain any bugs that damage the user experience

### Easy To Learn

The solution should be easy to use and not be over complicated. To do this, I will implement the WSAD control system as this is familiar to many PC gamers and therefore will be easy to pick up. I will also make sure the forms for registering or logging into an account are user friendly.

#### Aims

* Use WSAD to move around as these are familiar to many players.
* Use HTML and CSS stylesheets to make the login/registration forms user friendly.

## Pseudocode for the Game

### Pseudocode for game

This is the basic layout of the object to store the details of the game. This will be what is rendered as it will inherit all important code for the scenes.

```
object Game
    type: Phaser
    parent: id of HTML element
    width: width
    height: height
    physics: set up for physics
    scenes: add all menus, levels and other scenes
end object

render Game to HTML web page
```

### Pseudocode for a level

This shows the basic layout of code for a Phaser scene. It shows where each task will be executed.

```
class Level extends Phaser Scene

    procedure preload
        load all sprites and music
    end procedure
    
    procedure create
        start music
        draw background
        create players
        create platforms
        create puzzle elements
        create enemies
        create obstacles
        create finishing position
        create key bindings
    end procedure
    
    procedure update
        handle key presses
        move player
        move interactable objects
        update animations
        check if player at exit
    end procedure
    
end class
```
