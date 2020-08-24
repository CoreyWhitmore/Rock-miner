

let areas = ["hole in the ground", "mine", "mantle", "Asteroid", "Moon", "Planet", "Sun", "Black Hole", "Galaxy", "Universe"]

let rockCount = 10 ** 15


let playerStats = {
    clickPower: 1,
    income: 0,
    enhanceMult: 1,
    achievementMult: 1
}

//Array holding upgrade objects
let upgrades = [
    {
        name: "Additional Pickaxe",
        level: 0,
        cost: 10,
        clickPower: 1,
        income: 0,
        id: "pick",
        visibility: "invisible",
        disabled: "disabled",
        description: "Increases Click Power by 1"
    },
    {
        name: "Rat with a spoon",
        level: 0,
        cost: 100,
        clickPower: 0,
        income: 1,
        id: "rat",
        visibility: "invisible",
        disabled: "disabled",
        description: "Increases income by 1"
    },
    {
        name: "Homeless man",
        level: 0,
        cost: 1000,
        clickPower: 0,
        income: 5,
        id: "homeless",
        visibility: "invisible",
        disabled: "disabled",
        description: "Increases income by 5"
    },
    {
        name: "Miner",
        level: 0,
        cost: 10000,
        clickPower: 0,
        income: 25,
        id: "miner",
        visibility: "invisible",
        disabled: "disabled",
        description: "Increases income by 25"
    },
    {
        name: "Digger Machine",
        level: 0,
        cost: 100000,
        clickPower: 0,
        income: 125,
        id: "digger-machine",
        visibility: "invisible",
        disabled: "disabled",
        description: "Increases income by 125"
    },
    {
        name: "Blast-miner",
        level: 0,
        cost: 1000000,
        clickPower: 0,
        income: 1000,
        id: "blast-miner",
        visibility: "invisible",
        disabled: "disabled",
        description: "Increases income by 1,000"
    },
    {
        name: "Excavator",
        level: 0,
        cost: 10000000,
        clickPower: 0,
        income: 5000,
        id: "Excavator",
        visibility: "invisible",
        disabled: "disabled",
        description: "Increases income by 5,000"
    }
]

//Array holding enchancement objects
let enhancements = [
    {
        name: "Sharper Tools",
        cost: 1000,
        bonus: 2,
        purchased: false,
        description: "Mining rocks with sharp tools will be much better than dull ones (+100% rocks)",
        id: "sharp-tools",
        visibility: "invisible"
    },
    {
        name: "Coffee Maker",
        cost: 100000,
        bonus: 2,
        purchased: false,
        description: "Lots of caffine so you can work all day long (+100% rocks)",
        id: "coffee-maker",
        visibility: "invisible"
    },
    {
        name: "Rock Splitter",
        cost: 10000000,
        bonus: 2,
        purchased: false,
        description: "Turns out if you cut a rock in half you have two rocks (+100% rocks)",
        id: "rock-splitter",
        visibility: "invisible"
    },
    {
        name: "Strike gold",
        cost: 1000000000,
        bonus: 2,
        purchased: false,
        description: "Sell all this stupid yellow rock you found for more rocks (+100% rocks)",
        id: "strike-gold",
        visibility: "invisible"
    },
    {
        name: "Gem deposit",
        cost: 100000000000,
        bonus: 2,
        purchased: false,
        description: "Shiny rocks that can be traded for more rocks(+100% rocks)",
        id: "gem-deposit",
        visibility: "invisible"
    },
    {
        name: "Geothermal Energy",
        cost: 10000000000000,
        bonus: 2,
        purchased: false,
        description: "All this annoying lava can be harnessed to power your machines!",
        id: "geothermal-energy",
        visibility: "invisible"
    }
]

//Draws the upgrade buttons
function drawUpgrades() {
    let template = '<div class="col-12"><h3>Upgrades</h3></div>'
    for (let i = 0; i < upgrades.length; i++) {
        let item = upgrades[i]
        let itemCost = shortNum(item.cost)

        template += `<div class="col-12 my-1">
                        <button id="btn-${item.id}"
                        class="btn btn-primary btn-upgrade ${item.visibility}"
                        type="submit"
                        onclick="upgrade('${item.id}')"
                        ${item.disabled}
                        data-toggle="tooltip"
                        data-placement="right"
                        title="${item.description}">
                            (${item.level}) ${item.name} - ${itemCost}
                            <span id="${item.id}"></span>
                        </button>
                    </div>`
    }
    document.getElementById("upgrade-container").innerHTML = template
    for (let i = 0; i < upgrades.length; i++) {
        let item = upgrades[i]
        // @ts-ignore
        $(`#btn-${item.id}`).tooltip({ delay: { "show": 500, "hide": 100 } })
        // @ts-ignore
        $(`#btn-${item.id}`).on('click', function () {
            // @ts-ignore
            $(this).tooltip('hide')
        })
    }
}

//Draws the Enhancement buttons
function drawEnhancements() {
    let template = '<div class="col-12"><h3>Enhancements</h3></div>'
    for (let i = 0; i < enhancements.length; i++) {
        let item = enhancements[i]
        let itemCost = shortNum(item.cost)

        template += `<div class="col-12 my-1">
                        <button id="btn-${item.id}"
                        class="btn btn-primary btn-enhance ${item.visibility}"
                        type="submit"
                        onclick="purchaseEnhancement('${item.id}')"
                        ${item.disabled}
                        data-toggle="tooltip"
                        data-placement="right"
                        title="${item.description}"> ${item.name} - ${itemCost} <span id="${item.id}"></span>
                        </button>
                    </div>`
    }
    document.getElementById("enhancement-container").innerHTML = template
    for (let i = 0; i < enhancements.length; i++) {
        let item = enhancements[i]
        // @ts-ignore
        $(`#btn-${item.id}`).tooltip({ delay: { "show": 500, "hide": 100 } })
        // @ts-ignore
        $(`#btn-${item.id}`).on('click', function () {
            // @ts-ignore
            $(this).tooltip('hide')
        })
    }
}

//determines which Enhancement buttons are visible and unlocked
function updateEnhanceUnlocks() {
    for (let i = 0; i < enhancements.length; i++) {
        let item = enhancements[i]
        let itemCost = Math.floor(item.cost)
        if (rockCount >= itemCost && item.purchased == false) {
            item.visibility = "visible"
            document.getElementById("btn-" + item.id).setAttribute(`class`, `btn btn-primary btn-enhance ${item.visibility}`)
        } else {
            item.visibility = "invisible"
        }
    }
}

//purchases enhancement when the button is clicked
function purchaseEnhancement(id) {
    let item = findEnhancement(id)
    rockCount -= Math.floor(item.cost)
    item.purchased = true
    updatePlayer()
    updateScreen()
    drawEnhancements()
}


//levels up an item whenever you click the relevant button
function upgrade(id) {
    let item = findItem(id)
    rockCount -= Math.floor(item.cost)
    item.level++
    item.cost = Math.ceil(item.cost * 1.1)
    updatePlayer()
    updateScreen()
    drawUpgrades()
}

//finds an item by it's id
function findItem(id) {
    for (let i = 0; i < upgrades.length; i++) {
        if (upgrades[i].id == id) {
            return upgrades[i]
        }
    }
}

function findEnhancement(id) {
    for (let i = 0; i < enhancements.length; i++) {
        if (enhancements[i].id == id) {
            return enhancements[i]
        }
    }
}

//handles passive income
setInterval(() => {
    rockCount += (playerStats.income * playerStats.enhanceMult * playerStats.achievementMult) / 100
    updateScreen()
}, 10);

//increases the player's rock count by their click power
function clickMine() {
    quickDisable("btn-mine")
    rockCount += playerStats.clickPower * playerStats.enhanceMult * playerStats.achievementMult
    updateScreen()
}

//prevents button spam functions and maxes clicks per second at ~50 (for some reason this number is not exact)
function quickDisable(target) {
    document.getElementById(target).setAttribute("disabled", "")
    setTimeout(() => {
        document.getElementById(target).removeAttribute("disabled")
    }, 20);
}

//determines which upgrade buttons are visible and unlocked
function updateUpgradeUnlocks() {
    for (let i = 0; i < upgrades.length; i++) {
        let item = upgrades[i]
        let itemCost = Math.floor(item.cost)
        if (rockCount >= itemCost) {
            item.visibility = "visible"
            document.getElementById("btn-" + item.id).removeAttribute("disabled")
            document.getElementById("btn-" + item.id).setAttribute(`class`, `btn btn-primary btn-upgrade ${item.visibility}`)
        } else {
            document.getElementById("btn-" + item.id).setAttribute("disabled", "")
        }
    }
}

//Updates the player's stats based on the current items
function updatePlayer() {
    playerStats.clickPower = 1
    playerStats.income = 0
    for (let i = 0; i < upgrades.length; i++) {
        let item = upgrades[i]
        playerStats.clickPower += item.clickPower * item.level
        playerStats.income += item.income * item.level
    }
}

function updateEnhancements() {
    playerStats.enhanceMult = 1;
    for (let i = 0; i < enhancements.length; i++) {
        if (enhancements[i].purchased) {
            playerStats.enhanceMult *= enhancements[i].bonus
        }
    }
}

//updates the player's stats window
function updateStats() {
    document.getElementById("click-power-display").innerText = shortNum(playerStats.clickPower * playerStats.enhanceMult * playerStats.achievementMult)
    document.getElementById("income-display").innerText = shortNum(playerStats.income * playerStats.enhanceMult * playerStats.achievementMult) + "/sec"
    document.getElementById("enhance-display").innerText = shortNum(playerStats.enhanceMult * 100)
    document.getElementById("achieve-display").innerText = shortNum(playerStats.achievementMult * 100)
}

//function that handles achievements
function updateAchievements() {


    //Array holding achievement objects
    let achievements = [
        {
            title: "Triple Strike",
            description: "Player owns at least 3 pickaxes",
            message: "What am I going do do with 3 pickaxes?? I only have two hands!",
            bonus: 0.1,
            complete: false,
            criteria: upgrades[0].level,
            unlockValue: 2
        },
        {
            title: "Collector I",
            description: "Own 10,000 rocks",
            message: "These are getting hard to count",
            bonus: 0.1,
            complete: false,
            criteria: rockCount,
            unlockValue: 10000
        },
        {
            title: "Collector II",
            description: "Own 100,000,000 rocks",
            message: "We have to go deeper!",
            bonus: 0.2,
            complete: false,
            criteria: rockCount,
            unlockValue: 100000000
        },
        {
            title: "Collector III",
            description: "Own 1,000,000,000,000 rocks",
            message: "How many rocks are there??",
            bonus: 0.3,
            complete: false,
            criteria: rockCount,
            unlockValue: 1000000000000
        },
        {
            title: "Everest",
            description: "357 trillion rocks",
            message: "More rocks than the world's tallest mountain",
            bonus: 0.4,
            complete: false,
            criteria: rockCount,
            unlockValue: 357000000000000
        },
        {
            title: "Collector IV",
            description: "1.000e+15 rocks",
            message: "Gotta use scientific notation for all these rocks",
            bonus: 0.5,
            complete: false,
            criteria: rockCount,
            unlockValue: 10 ** 15
        }

    ]

    //checks for new completed achievements
    for (let i = 0; i < achievements.length; i++) {
        let achievement = achievements[i]
        if (achievement.criteria >= achievement.unlockValue) {
            achievements[i].complete = true
            document.getElementById("message-display").innerText = "Achievement: " + achievements[i].title + "\n" + achievements[i].message
        }
    }




    //updates player's stats based on completed achievements
    let achievementBonus = 1
    for (let i = 0; i < achievements.length; i++) {
        if (achievements[i].complete) {
            achievementBonus += achievements[i].bonus
        }
    }
    playerStats.achievementMult = achievementBonus
}

//calls all relevant update fuctions to update the screen
function updateScreen() {
    let rockDisplay = shortNum(rockCount)
    document.getElementById("rock-count").innerText = rockDisplay
    updateStats()
    updateUpgradeUnlocks()
    updateEnhanceUnlocks()
    updateAchievements()
    updateEnhancements()
}

//Allows for displaying numbers inn exponential form
function expo(x, f) {
    return Number.parseFloat(x).toExponential(f);
}

//Changes large numbers to a shorter form (ex: 10,000,000 -> 10M)
function shortNum(num) {
    if (num < 10000) {
        return (Math.floor(num)).toString()
    } else if (num >= 10000 && num < 10000000) {
        return (Math.floor(num / 1000)).toString() + "K"
    } else if (num >= 10000000 && num < 10000000000) {
        return (Math.floor(num / 1000000)).toString() + "M"
    } else if (num >= 10000000000 && num < 10000000000000) {
        return (Math.floor(num / 1000000000)).toString() + "B"
    } else if (num >= 10000000000000 && num < 10000000000000000) {
        return (Math.floor(num / 1000000000000)).toString() + "T"
    } else {
        return expo((num), 3).toString()
    }
}

drawEnhancements()
drawUpgrades()
updateScreen()

