

let areas = ["hole in the ground", "mine", "mantle", "Asteroid", "Moon", "Planet", "Sun", "Black Hole", "Galaxy", "Universe"]

let rockCount = 0


let playerStats = {
    clickPower: 1,
    income: 0
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
        name: "Digging Machine",
        level: 0,
        cost: 100000,
        clickPower: 0,
        income: 125,
        id: "digging-machine",
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

//handles passive income
setInterval(() => {
    rockCount += playerStats.income / 10
    updateScreen()
}, 100);

//increases the player's rock count by their click power
function clickMine() {
    quickDisable("btn-mine")
    rockCount += playerStats.clickPower
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
function updateUnlocks() {
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

//updates the player's stats window
function updateStats() {
    let clickPower
    let income



    document.getElementById("click-power-display").innerText = shortNum(playerStats.clickPower)
    document.getElementById("income-display").innerText = shortNum(playerStats.income)
}

//calls all relevant update fuctions to update the screen
function updateScreen() {
    let rockDisplay = shortNum(rockCount)
    document.getElementById("rock-count").innerText = rockDisplay
    updateStats()
    updateUnlocks()
}

//Allows for displaying numbers inn exponential form
function expo(x, f) {
    return Number.parseFloat(x).toExponential(f);
}

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


drawUpgrades()
updateScreen()

