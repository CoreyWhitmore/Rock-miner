

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
    }
]

//Draws the upgrade buttons
function drawUpgrades() {
    let template = '<div class="col-12"><h3>Upgrades</h3></div>'
    for (let i = 0; i < upgrades.length; i++) {
        let item = upgrades[i]
        let itemCost = Math.floor(item.cost)
        template += `<div class="col-12 my-1">
                        <button id="btn-${item.id}"
                        class="btn btn-primary btn-upgrade ${item.visibility}"
                        type="submit"
                        onclick="upgrade('${item.id}')"
                        ${item.disabled}
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Tooltip on right">
                            (${item.level}) ${item.name} - ${itemCost}
                            <span id="${item.id}"></span>
                        </button>
                    </div>`
    }
    document.getElementById("upgrade-container").innerHTML = template
    for (let i = 0; i < upgrades.length; i++) {
        let item = upgrades[i]
        $(`#btn-${item.id}`).tooltip({})
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
    document.getElementById("click-power-display").innerText = playerStats.clickPower.toString()
    document.getElementById("income-display").innerText = playerStats.income.toString()
}

//calls all relevant update fuctions to update the screen
function updateScreen() {
    document.getElementById("rock-count").innerText = (Math.floor(rockCount)).toString()
    updateStats()
    updateUnlocks()
}


drawUpgrades()
updateScreen()

