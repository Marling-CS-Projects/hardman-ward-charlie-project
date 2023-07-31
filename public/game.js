kaboom({
    width: 1280,
    height: 720,
    background: [100, 255, 255]
})

add([
    text("Pixel Quest", {
        size: 60
    }),
    color(160, 160, 160),
    area(),
    pos(center().x, 50),
    anchor("center")
])

const socket = io()

var myUsername

const myId = document.cookie.split("; ").find((row) => row.startsWith("id=")) ?.split("=")[1];

if (myId) {
    socket.emit('fetch username', myId)
} else {
    const singlePlayerButton = add([
        rect(300, 50),
        color(160, 160, 160),
        area(),
        pos(center().x, center().y-30),
        anchor("center")
    ])
    
    add([
        text("Singleplayer", {
            size: 20
        }),
        color(255, 255, 255),
        area(),
        pos(center().x, center().y-30),
        anchor("center")
    ])

    const signInOutButton = add([
        rect(300, 50),
        color(160, 160, 160),
        area(),
        pos(center().x, center().y+30),
        anchor("center")
    ])
    
    add([
        text("Sign In", {
            size: 20
        }),
        color(255, 255, 255),
        area(),
        pos(center().x, center().y+30),
        anchor("center")
    ])

    singlePlayerButton.onClick(() => {
        console.log("You clicked singleplayer!")
    })

    signInOutButton.onClick(() => {
        location.href = "/login.html"
    })
}

socket.on('give username', (username) => {
    myUsername = username
    
    const singlePlayerButton = add([
        rect(300, 50),
        color(160, 160, 160),
        area(),
        pos(center().x, center().y-90),
        anchor("center")
    ])
    
    add([
        text("Singleplayer", {
            size: 20
        }),
        color(255, 255, 255),
        area(),
        pos(center().x, center().y-90),
        anchor("center")
    ])
    
    const multiPlayerButton = add([
        rect(300, 50),
        color(160, 160, 160),
        area(),
        pos(center().x, center().y-30),
        anchor("center")
    ])
    
    add([
        text("Multiplayer", {
            size: 20
        }),
        color(255, 255, 255),
        area(),
        pos(center().x, center().y-30),
        anchor("center")
    ])
    
    const leaderBoardButton = add([
        rect(300, 50),
        color(160, 160, 160),
        area(),
        pos(center().x, center().y+30),
        anchor("center")
    ])
    
    add([
        text("Leaderboard", {
            size: 20
        }),
        color(255, 255, 255),
        area(),
        pos(center().x, center().y+30),
        anchor("center")
    ])
    
    const signInOutButton = add([
        rect(300, 50),
        color(160, 160, 160),
        area(),
        pos(center().x, center().y+90),
        anchor("center")
    ])
    
    add([
        text("Sign Out", {
            size: 20
        }),
        color(255, 255, 255),
        area(),
        pos(center().x, center().y+90),
        anchor("center")
    ])

    singlePlayerButton.onClick(() => {
        console.log("You clicked singleplayer!")
    })
    
    multiPlayerButton.onClick(() => {
        console.log("You clicked multiplayer!")
    })
    
    leaderBoardButton.onClick(() => {
        location.href = "/leaderboard"
    })
    
    signInOutButton.onClick(() => {
        document.cookie = "id=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
        location.reload()
    })

    add([
        text("Signed in as: " + myUsername, {
            size: 18
        }),
        color(160, 160, 160),
        area(),
        pos(center().x, center().y+140),
        anchor("center")
    ])
})

