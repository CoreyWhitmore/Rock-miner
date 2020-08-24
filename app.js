

let rockCount = 1000000000


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
        visibility: "none",
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
        visibility: "none",
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
        visibility: "none",
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
        visibility: "none",
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
        visibility: "none",
        disabled: "disabled",
        description: "Increases income by 125"
    },
    {
        name: "Martial Artist",
        level: 0,
        cost: 1000000,
        clickPower: 0,
        income: 1000,
        id: "martial-artist",
        visibility: "none",
        disabled: "disabled",
        description: "Increases income by 1,000"
    },
    {
        name: "Bomb Technician",
        level: 0,
        cost: 10 ** 7,
        clickPower: 0,
        income: 5000,
        id: "bomb-technician",
        visibility: "none",
        disabled: "disabled",
        description: "Increases income by 5,000"
    },
    {
        name: "Giant Drill",
        level: 0,
        cost: 10 ** 9,
        clickPower: 0,
        income: 250000,
        id: "giant-drill",
        visibility: "none",
        disabled: "disabled",
        description: "Increases income by 250,000"
    },
    {
        name: "Nuclear Blast Miner",
        level: 0,
        cost: 10 ** 12,
        clickPower: 0,
        income: 2 * (10 ** 7),
        id: "nuclear-blast-miner",
        visibility: "none",
        disabled: "disabled",
        description: "Increases income by 20,000,000"
    },
    {
        name: "Plasma Lance",
        level: 0,
        cost: 10 ** 15,
        clickPower: 0,
        income: 1.5 * (10 ** 10),
        id: "plasma-lance",
        visibility: "none",
        disabled: "disabled",
        description: "Increases income by 15,000,000,000"
    },
    {
        name: "Mountain Blaster",
        level: 0,
        cost: 10 ** 18,
        clickPower: 0,
        income: 1.0 * (10 ** 13),
        id: "mountain-blaster",
        visibility: "none",
        disabled: "disabled",
        description: "Increases income by 15,000,000,000"
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
        visibility: "none"
    },
    {
        name: "Coffee Maker",
        cost: 100000,
        bonus: 2,
        purchased: false,
        description: "Lots of caffine so you can work all day long (+100% rocks)",
        id: "coffee-maker",
        visibility: "none"
    },
    {
        name: "Rock Splitter",
        cost: 10 ** 7,
        bonus: 2,
        purchased: false,
        description: "Turns out if you cut a rock in half you have two rocks (+100% rocks)",
        id: "rock-splitter",
        visibility: "none"
    },
    {
        name: "Strike gold",
        cost: 10 ** 9,
        bonus: 2,
        purchased: false,
        description: "Sell all this stupid yellow rock you found for more rocks (+100% rocks)",
        id: "strike-gold",
        visibility: "none"
    },
    {
        name: "Gem deposit",
        cost: 10 ** 11,
        bonus: 2,
        purchased: false,
        description: "Shiny rocks that can be traded for more rocks(+100% rocks)",
        id: "gem-deposit",
        visibility: "none"
    },
    {
        name: "Geothermal Energy",
        cost: 10 ** 13,
        bonus: 2,
        purchased: false,
        description: "All this annoying lava can be harnessed to power your machines!",
        id: "geothermal-energy",
        visibility: "none"
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
                        class="btn btn-primary btn-upgrade d-${item.visibility}"
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
        $(`#btn-${item.id}`).tooltip({ delay: { "show": 100, "hide": 200 } })
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
                        class="btn btn-primary btn-enhance d-${item.visibility}"
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
        $(`#btn-${item.id}`).tooltip({ delay: { "show": 100, "hide": 200 } })
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
            document.getElementById("btn-" + item.id).removeAttribute("disabled")
            document.getElementById("btn-" + item.id).setAttribute(`class`, `btn btn-primary btn-enhance d-${item.visibility}`)
        } else if (rockCount < itemCost && item.purchased == false) {
            document.getElementById("btn-" + item.id).setAttribute("disabled", "")
        } else (
            item.visibility = "none"
        )
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
    item.cost = Math.ceil(item.cost * 1.07)
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

//array outside function to keep track of competed achievements
let completeAchievements

//function that handles achievements and contains array holding achievement objects
function updateAchievements() {
    //Array holding achievement objects
    let achievements = [
        //upgrade
        {
            title: "Triple Strike",
            description: "Own at least 3 pickaxes",
            message: "What am I going do do with 3 pickaxes?? I only have two hands! (+10% rocks)",
            bonus: 0.1,
            criteria: upgrades[0].level,
            unlockValue: 2
        },
        //Rock count achievements
        {
            title: "Collector I",
            description: "Own 10,000 rocks",
            message: "These are getting hard to count (+10% rocks)",
            bonus: 0.1,
            criteria: rockCount,
            unlockValue: 10000
        },
        {
            title: "Collector II",
            description: "Own 100,000,000 rocks",
            message: "We have to go deeper!  (+30% rocks)",
            bonus: 0.3,
            criteria: rockCount,
            unlockValue: 100000000
        },
        {
            title: "Collector III",
            description: "Own a trillion rocks",
            message: "How many rocks are there?? (+60% rocks)",
            bonus: 0.6,
            criteria: rockCount,
            unlockValue: 10 ** 12
        },
        {
            title: "Everest",
            description: "357 trillion rocks",
            message: "More rocks than the world's tallest mountain  (+100% rocks)",
            bonus: 1.0,
            criteria: rockCount,
            unlockValue: 357 ** 12
        },
        {
            title: "Collector IV",
            description: "1.000e+15 rocks",
            message: "Gotta use scientific notation for all these rocks (+150% rocks)",
            bonus: 1.5,
            criteria: rockCount,
            unlockValue: 10 ** 15
        }

    ]

    if (!completeAchievements) {
        completeAchievements = []
        for (let i = 0; i < achievements.length; i++) {
            completeAchievements.push(false)
        }
    }

    //checks for new completed achievements
    for (let i = 0; i < achievements.length; i++) {
        let achievement = achievements[i]
        if (achievement.criteria >= achievement.unlockValue && completeAchievements[i] == false) {
            completeAchievements[i] = true
            document.getElementById("message-display").innerText = "Achievement: " + achievements[i].title + " - " + achievements[i].description + "\n" + achievements[i].message
        }
    }


    //updates player's stats based on completed achievements
    let achievementBonus = 1
    for (let i = 0; i < achievements.length; i++) {
        if (completeAchievements[i]) {
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

