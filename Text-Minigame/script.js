const narrative = document.getElementById("narrative")
const optionsButtonsElement = document.getElementById("option-buttons")
const swordInventoryElement = document.getElementById("sword-inventory-amount")
const shieldInventoryElement = document.getElementById("shield-inventory-amount")
const armourInventoryElement = document.getElementById("armour-inventory-amount")
const ironInventoryElement = document.getElementById("iron-inventory-amount")
const woodInventoryElement = document.getElementById("wood-inventory-amount")
const leatherInventoryElement = document.getElementById("leather-inventory-amount")
const moneyElement = document.getElementById("money-amount")
const textLogElement = document.getElementById("text-log")
let inventory = {}
let money = 0


function startGame() {

    inventory = {    
        swords: {
            id: "Sword",
            value : 3,
            element: swordInventoryElement
        },
        shields: {
            id: "Shield",
            value : 2,
            element: shieldInventoryElement
        },
        armour: {
            id: "Armour",
            value : 0,
            element: armourInventoryElement
        },
        iron: {
            id: "Iron",
            value : 4,
            element: ironInventoryElement
        },
        wood: {
            id: "Wood",
            value : 2,
            element: woodInventoryElement
        },
        leather: {
            id: "Leather",
            value : 0,
            element: leatherInventoryElement
        },
        money: {
            id: "Money",
            value: 2,
            element: moneyElement
        }
    }
    showTextNode(1)
    displayInventoryElement(inventory)
    
}

function selectOption(option) {
    let increaseCondition = false
    if (option.hasOwnProperty("textLog")) {textLogElement.innerText = option.textLog}
    if (option.hasOwnProperty("addItem")) {option.addItem()}
    else if (option.hasOwnProperty("sellItem")) {option.sellItem()}
    if (option.hasOwnProperty("nextText")) {showTextNode(option.nextText)}

}

function showTextNode(textNodeIndex) { //Shows relevant text node
    const textNode = textNodes.find(textNodeCounter => textNodeCounter.id === textNodeIndex) //.find loops through array until if finds an element that fits conditions. Passes in counter for items in textNodes and checks whether ID matches nextTextNode
    narrative.innerText = textNode.text

    while (optionsButtonsElement.firstChild) {
        optionsButtonsElement.removeChild(optionsButtonsElement.firstChild) //removes all the buttons
    }

    textNode.options.forEach(option => { //adds all the new buttons
        const button = document.createElement("button")
        button.innerText = option.text
        button.classList.add("btn")
        button.addEventListener("click", function handleClick() {selectOption(option)})
        optionsButtonsElement.appendChild(button)
    
        })
}

function displayInventoryElement (inventory) {
    swordInventoryElement.innerText = inventory.swords.value
    shieldInventoryElement.innerText = inventory.shields.value
    armourInventoryElement.innerText = inventory.armour.value
    ironInventoryElement.innerText = inventory.iron.value
    woodInventoryElement.innerText = inventory.wood.value
    leatherInventoryElement.innerText = inventory.leather.value
    moneyElement.innerText = inventory.money.value


}

function increaseInventoryElement (value, element) {
    element.innerText = value
    increaseAnimation(element)
}

function decreaseInventoryElement (value, element) {
    element.innerText = value
    decreaseAnimation(element)
}

function increaseAnimation(div) {
    
        div.classList.add("increase")
        div.addEventListener("animationend", () => {
            div.classList.remove("increase")
        }, {once: true})
}

function decreaseAnimation(div) {
    div.classList.add("decrease")
    div.addEventListener("animationend", () => {
        div.classList.remove("decrease")
    }, {once: true})
}



const textNodes = [
    {
        id: 1,
        text: "Would you like to build or sell an item today?",
        options: [
            {
                text: "Build Item",
                nextText: 2,
                textLog: "Build Item"
                
            },
            {
                text: "Sell Item",
                nextText: 3,
                textLog: "Sell Item"
            },
            {
                text: "Buy Resources",
                nextText: 4,
                textLog: "Buy Resources"
            }
        ]
    },
    {
        id: 2,
        text: "Which item would you like to build?",
        options: [
            {
                text: "Build Sword",
                get textLog() {
                    if (inventory.iron.value >= 2 && inventory.wood.value >= 1) {
                        return "Sword Built"
                    }
                    else return "Not enough resources: Need 2 Iron and 1 Wood for a sword"
                }, 
                addItem: () => {
                    if (inventory.iron.value >= 2 && inventory.wood.value >= 1) {
                        inventory.swords.value += 1
                        increaseInventoryElement(inventory.swords.value, inventory.swords.element)
                        inventory.iron.value -= 2
                        decreaseInventoryElement(inventory.iron.value, inventory.iron.element)
                        inventory.wood.value -= 1
                        decreaseInventoryElement(inventory.wood.value, inventory.wood.element)
                        
                        
                    }   
                }

            },
            {
                text: "Build Shield",
                get textLog() {
                    if (inventory.iron.value >= 1 && inventory.wood.value >= 3) {
                        return "Shield Built"
                    }
                    else return "Not enough resources: Need 1 Iron and 3 Wood for a Shield"
                }, 
                addItem: () => {
                    if (inventory.iron.value >= 1 && inventory.wood.value >= 3) {
                        inventory.shields.value += 1
                        increaseInventoryElement(inventory.shields.value, inventory.shields.element)
                        inventory.iron.value -= 1
                        decreaseInventoryElement(inventory.iron.value, inventory.iron.element)
                        inventory.wood.value -= 3
                        decreaseInventoryElement(inventory.wood.value, inventory.wood.element)
                    }   
                }
            },
            {
                text: "Build Armour",
                get textLog() {
                    if (inventory.iron.value >= 3 && inventory.leather.value >= 1) {
                        return "Armour Built"
                    }
                    else return "Not enough resources: Need 3 Iron and 1 Leather for Armour"
                }, 
                addItem: () => {
                    if (inventory.iron.value >= 3 && inventory.leather.value >= 1) {
                        inventory.armour.value += 1
                        increaseInventoryElement(inventory.armour.value, inventory.armour.element)
                        inventory.iron.value -= 3
                        decreaseInventoryElement(inventory.iron.value, inventory.iron.element)
                        inventory.leather.value -= 1
                        decreaseInventoryElement(inventory.leather.value, inventory.leather.element)
                    }   
                }
            },
            {
                text: "Go Back",
                textLog: "Go Back",
                nextText: 1
            }
        ]
    },
    {
        id: 3,
        text: "Which item would you like to sell?",
        options: [
            {
                text: "Sell Sword",
                get textLog() {
                    if (inventory.swords.value > 0){
                        return "Sword Sold"
                    }
                    else return "No Swords to sell"
                },
                sellItem: () => {
                if (inventory.swords.value > 0) {
                    inventory.swords.value -= 1
                    decreaseInventoryElement(inventory.swords.value, inventory.swords.element)
                    inventory.money.value += 10
                    increaseInventoryElement(inventory.money.value, inventory.money.element)

                }
            }            

            },
            {
                text: "Sell Shield",
                get textLog() {
                    if (inventory.shields.value > 0){
                        return "Shield Sold"
                    }
                    else return "No Shields to sell"
                },
                sellItem: () => {
                    if (inventory.shields.value > 0) {
                        inventory.shields.value -= 1
                        decreaseInventoryElement(inventory.shields.value, inventory.shields.element)
                        inventory.money.value += 7
                        increaseInventoryElement(inventory.money.value, inventory.money.element)
                    }
                }
            },
            {
                text: "Sell Armour",
                get textLog() {
                    if (inventory.armour.value > 0){
                        return "Armour Sold"
                    }
                    else return "No Armour to sell"
                },
                sellItem: () => {
                    if (inventory.armour.value > 0) {
                        inventory.armour.value -= 1
                        decreaseInventoryElement(inventory.armour.value, inventory.armour.element)
                        inventory.money.value += 15
                        increaseInventoryElement(inventory.money.value, inventory.money.element)
                    }
                }
            },
            {
                text: "Go Back",
                textLog: "Go Back",
                nextText: 1
            }
        ]
    },
    {
        id: 4,
        text: "Which components would you like to buy?",
        options: [
            {
                text: "Buy Iron",
                get textLog() {
                    if (inventory.money.value >= 3){
                        return "Iron Bought"
                    }
                    else return "You can't afford this item!"
                },
                addItem: () => {
                    if (inventory.money.value >= 3) {
                        inventory.iron.value += 1
                        increaseInventoryElement(inventory.iron.value, inventory.iron.element)
                        inventory.money.value -= 3
                        decreaseInventoryElement(inventory.money.value, inventory.money.element)
                    }}

                
            },
            {
                text: "Buy Wood",
                get textLog() {
                    if (inventory.money.value >= 1){
                        return "Wood Bought"
                    }
                    else return "You can't afford this item!"
                },
                addItem: () => {
                    if (inventory.money.value >= 1) {
                        inventory.wood.value += 1
                        increaseInventoryElement(inventory.wood.value, inventory.wood.element)
                        inventory.money.value -= 1
                        decreaseInventoryElement(inventory.money.value, inventory.money.element)

                    }}
            },
            {
                text: "Buy Leather",
                get textLog() {
                    if (inventory.money.value >= 2){
                        return "Leather Bought"
                    }
                    else return "You can't afford this item"
                },
                addItem: () => {
                    if (inventory.money.value >= 2) {
                        inventory.leather.value += 1
                        increaseInventoryElement(inventory.leather.value, inventory.leather.element)
                        inventory.money.value -= 2
                        decreaseInventoryElement(inventory.money.value, inventory.money.element)

                    }}
            },
            {
                text: "Go Back",
                nextText: 1
            }
        ]
    }

]

startGame()



/*function addButton (buttonID, buttonText, parent) {   
    const newButton = document.createElement("button");
    const buttonNode = document.createTextNode(buttonText);
    newButton.appendChild(buttonNode);
    newButton.setAttribute("id", buttonID);
    const body = document.getElementById(parent);
    body.append(newButton);
}

function addingBackButton (narrative) {
    let backButton = document.getElementById("backButton")
    backButton.addEventListener("click", function handleClick() {
        narrative.textContent = "Would you like to build or sell an item today?"
    
    })
}

buildingButton.addEventListener("click", function handleClick() {
    console.log("Build")
    narrative.textContent = "What would you like to build?"
    buildingButton.remove();
    sellButton.remove();
    addButton("swordButton", "Sword", "Minigame-Body")
    addButton("shieldButton", "Shield", "Minigame-Body")
    addButton("armourButton", "Armour", "Minigame-Body")
    addButton("backButton", "Go Back", "Minigame-Body")    
})



sellButton.addEventListener("click", function handleClick() {
    console.log("Sell")
    narrative.textContent = "What would you like to sell?"
    buildingButton.remove();
    sellButton.remove();
    addButton("swordButton", "Sword", "Minigame-Body")
    addButton("shieldButton", "Shield", "Minigame-Body")
    addButton("armourButton", "Armour", "Minigame-Body")
    addButton("backButton", "Go Back", "Minigame-Body")
})*/

