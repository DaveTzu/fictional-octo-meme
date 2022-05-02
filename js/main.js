// Idea: dual collective party and personal inventory for Dungeons and Dragons
//       area for equped and not equipped
//       gear overlay kinda thing
//       encumbrance calculated or toggle Off
//       toggle on:  mouse over has information
//       easily spawn your own draggable things
//       save stuff to access your things overtime
//       view other party members things
//       user pperminssions
//      ammunition tracker?
//      click on item in inventory to add ++1 an items total
//      track number of attuned items

class PartyInventory{
    constructor(inventoryID, startingSize){
        this.inventoryID = inventoryID
        this.slots = []

        for (let i = 0; i < startingSize; i++) {
            this.slots.push(new EquipSlot(i, inventoryID, 'any'))
        }
    }
    addToInventory(slotNumber, x) {
        this.slots[slotNumber].fill(x)
    }
    clearInventorySlot(slotNumber) {
        this.slots[slotNumber].clear()
    }
    takeFromInventorySlot(slotNumber) {
        return this.slots[slotNumber].take()
    }
    moveItem(fromSlot, toSlot){
        this.slots[toSlot].fill(this.slots[fromSlot].take())
    }
}
class EquipSlot{
    constructor(slotID, inventoryID, slotType){
        
        this.slotID = slotID
        this.inventoryID = inventoryID
        this.slotType = slotType
        this.space = null
    }
    fill(obj){
        if (!this.space) {
            this.space = obj
        }
    }
    clear(){
        if(this.space) {
            this.space = null
        }
    }
    take(){
        if(this.space){
            let x = this.space
            this.space = null
            return x
        } else {
            return 'THIS IS AN ERROR;  NOTHING WAS HERE TO TAKE!'
        }
    }
}

let partyInventory

document.querySelector('.armorBtn').addEventListener('click', loadMenuData)
document.querySelector('.gearBtn').addEventListener('click', loadMenuData)
document.querySelector('.meleeWeaponsBtn').addEventListener('click', loadMenuData)
document.querySelector('.rangedWeaponsBtn').addEventListener('click', loadMenuData)
document.querySelector('.selectOther').addEventListener('change', loadMenuData)
document.querySelector('.magicItemsBtn').addEventListener('click', loadMenuData)
document.querySelector('.transferBtn').addEventListener('click', loadTransferMenu)
document.querySelector('.pcInventoryTab').addEventListener('click', switchTab)
document.querySelector('.partyInventoryTab').addEventListener('click', switchTab)

let transferMenuUp = false
let customMenuUp = false

function onLoadCreateInventories(){
    for (let i = 0; i<45; i++) {
        createItemSlot('partyInventory', 'any', i)
    }
    partyInventory = new PartyInventory('partyInventory', 45)

    // for (let i = 0; i<45; i++) {
    //     createItemSlot('pcInventory')
    // }
    //BEGIN PC INVENTORY MAKE
    createItemSlot('pcInventory', 'weapon')
    createItemSlot('pcInventory', 'none')
    createItemSlot('pcInventory', 'head')
    createItemSlot('pcInventory', 'neck')
    createItemSlot('pcInventory', 'otherEquipped')
    createItemSlot('pcInventory', 'any')
    createItemSlot('pcInventory', 'any')
    createItemSlot('pcInventory', 'any')
    createItemSlot('pcInventory', 'any')

    createItemSlot('pcInventory', 'weapon')
    createItemSlot('pcInventory', 'bracers')
    createItemSlot('pcInventory', 'cloak')
    createItemSlot('pcInventory', 'ring')
    createItemSlot('pcInventory', 'otherEquipped')
    createItemSlot('pcInventory', 'any')
    createItemSlot('pcInventory', 'any')
    createItemSlot('pcInventory', 'any')
    createItemSlot('pcInventory', 'any')

    createItemSlot('pcInventory', 'weapon')
    createItemSlot('pcInventory', 'gloves')
    createItemSlot('pcInventory', 'armor')
    createItemSlot('pcInventory', 'ring')
    createItemSlot('pcInventory', 'otherEquipped')
    createItemSlot('pcInventory', 'any')
    createItemSlot('pcInventory', 'any')
    createItemSlot('pcInventory', 'any')
    createItemSlot('pcInventory', 'any')

    createItemSlot('pcInventory', 'ammunition')
    createItemSlot('pcInventory', 'none')
    createItemSlot('pcInventory', 'boots')
    createItemSlot('pcInventory', 'none')
    createItemSlot('pcInventory', 'otherEquipped')
    createItemSlot('pcInventory', 'any')
    createItemSlot('pcInventory', 'any')
    createItemSlot('pcInventory', 'any')
    createItemSlot('pcInventory', 'any')

    createItemSlot('pcInventory', 'ammunition')
    createItemSlot('pcInventory', 'otherEquipped')
    createItemSlot('pcInventory', 'otherEquipped')
    createItemSlot('pcInventory', 'otherEquipped')
    createItemSlot('pcInventory', 'otherEquipped')
    createItemSlot('pcInventory', 'any')
    createItemSlot('pcInventory', 'any')
    createItemSlot('pcInventory', 'any')
    createItemSlot('pcInventory', 'any')
    // END PC INVENTORY MAKE
}

function createItemSlot(inventory, slotType = 'any', slotID = 'none'){
    let inventoryToAdd = document.querySelector(`.inventoryContainer-${inventory}`)
    let newElement = document.createElement('div')
    newElement.draggable = false
    newElement.dataset.slotid = slotID
    if (slotType === 'none') {
        newElement.classList.add('slotNone')
        newElement.classList.add('dropFull')
        newElement.innerHTML = 'X'
    } else {
        newElement.classList.add('dropEmpty')
        if ( slotType === 'any'){
            newElement.classList.add('slotAny')
        } else if (slotType === 'head'){
            newElement.classList.add('slotHead')
            newElement.innerHTML = 'HEAD<br>SLOT'
        } else if (slotType === 'neck'){
            newElement.classList.add('slotNeck')
            newElement.innerHTML = 'NECK<br>SLOT'
        } else if (slotType === 'cloak'){
            newElement.classList.add('slotCloak')
            newElement.innerHTML = 'CLOAK<br>SLOT'
        } else if (slotType === 'armor'){
            newElement.classList.add('slotArmor')
            newElement.innerHTML = 'ARMOR<br>SLOT'
        } else if (slotType === 'clothes'){
            newElement.classList.add('slotClothes')
            newElement.innerHTML = 'CLOTHES<br>SLOT'
        } else if (slotType === 'bracers'){
            newElement.classList.add('slotBracers')
            newElement.innerHTML = 'BRACERS<br>SLOT'
        } else if (slotType === 'gloves'){
            newElement.classList.add('slotGloves')
            newElement.innerHTML = 'GLOVES<br>SLOT'
        } else if (slotType === 'ring'){
            newElement.classList.add('slotRing')
            newElement.innerHTML = 'RING<br>SLOT'
        } else if (slotType === 'boots'){
            newElement.classList.add('slotBoots')
            newElement.innerHTML = 'BOOTS<br>SLOT'
        } else if (slotType === 'ammunition'){
            newElement.classList.add('slotAmmunition')
            newElement.innerHTML = 'AMMUNITION<br>SLOT'
        } else if (slotType === 'weapon'){
            newElement.classList.add('slotWeapon')
            newElement.innerHTML = 'WEAPON<br>SLOT'
        } else if (slotType === 'otherEquipped'){
            newElement.classList.add('slotEquipped')
            newElement.innerHTML = 'OTHER<br>EQUIPPED<br>SLOT'
        }

    }
    inventoryToAdd.append(newElement)
}

function switchTab(){
    if (event.target.classList.contains('pcInventoryTab')) {
        document.querySelector('.inventoryContainer-partyInventory').classList.add('tabClosed')
        document.querySelector('.inventoryContainer-partyInventory').classList.remove('tabOpen')
        document.querySelector('.inventoryContainer-pcInventory').classList.add('tabOpen')
        document.querySelector('.inventoryContainer-pcInventory').classList.remove('tabClosed')


    } else if (event.target.classList.contains('partyInventoryTab')) {
        document.querySelector('.inventoryContainer-pcInventory').classList.add('tabClosed')
        document.querySelector('.inventoryContainer-pcInventory').classList.remove('tabOpen')
        document.querySelector('.inventoryContainer-partyInventory').classList.add('tabOpen')
        document.querySelector('.inventoryContainer-partyInventory').classList.remove('tabClosed')
    }
}

function check(){
    console.log('yes!')
}

function loadTransferMenu(){
    clearItemsInPullMenu()
    transferMenuUp = true
    removeFromMenuPullToggle = true
}

function loadMenuData(){
    clearItemsInPullMenu()
    let apiUrl = 'https://www.dnd5eapi.co/api/'
    let base = 'equipment-categories/'
    let category
    let magic = false
    if (event.target.classList.contains('armorBtn')){
        category = 'armor'
        document.querySelector('.armorBtn').style.background = 'rgb(246, 230, 161)'
    } else if (event.target.classList.contains('gearBtn')) {
        category = 'adventuring-gear'
        document.querySelector('.gearBtn').style.background = 'rgb(246, 230, 161)'
    } else if (event.target.classList.contains('meleeWeaponsBtn')) {
        category = 'melee-weapons'
        document.querySelector('.meleeWeaponsBtn').style.background = 'rgb(246, 230, 161)'
    } else if (event.target.classList.contains('rangedWeaponsBtn')) {
        category = 'ranged-weapons'
        document.querySelector('.rangedWeaponsBtn').style.background = 'rgb(246, 230, 161)'
    } else if (event.target.classList.contains('selectOther')) {
        if (event.target.value != 'none'){
            category = event.target.value
            document.querySelector(".selectOther").style.background = 'rgb(246, 230, 161)'
        } else {
            return;
        }
    } else if(event.target.classList.contains('magicItemsBtn')){
        base = 'magic-items/'
        category = ''
        document.querySelector(".magicItemsBtn").style.background = 'rgb(246, 230, 161)'
        magic = true
    }

    fetch(apiUrl + base + category)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let con = document.querySelector('.itemsToPullContainer')
            let newEle
            if (!magic) {
                for(let i = 0; i < data.equipment.length; i++) {
                    newEle = document.createElement('div')
                    newEle.innerText = data.equipment[i].name                              
                    newEle.classList.add('itemInMenu')
                    newEle.draggable = true
                    con.append(newEle)
                }
            } else {
                for(let i = 0; i < data.results.length; i++) {
                    newEle = document.createElement('div')
                    newEle.innerText = data.results[i].name                              
                    newEle.classList.add('itemInMenu')
                    newEle.draggable = true
                    con.append(newEle)
                }
            }
            
        }).catch(e => {
            console.log(e) 
        })
    
}

function clearItemsInPullMenu(){
    transferMenuUp = false
    customMenuUp = false
    removeFromMenuPullToggle = false

    container = document.querySelector(".itemsToPullContainer")
    while (container.firstChild) {
        container.removeChild(container.lastChild)
    }
    document.querySelector('.armorBtn').style.background = ''
    document.querySelector('.gearBtn').style.background = ''
    document.querySelector('.meleeWeaponsBtn').style.background = ''
    document.querySelector('.rangedWeaponsBtn').style.background = ''
    document.querySelector(".selectOther").style.background = ''
    document.querySelector('.magicItemsBtn').style.background = ''
}

function getStuff() {
    fetch('https://www.dnd5eapi.co/api/equipment/chain-shirt')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            }
        )
}

// ==================DRAG AND DROP SECTTION==================

var dragged;
let nextElement
let removeFromMenuPullToggle = false

  /* events fired on the draggable target */
  document.addEventListener("drag", function( event ) {
  }, false);

  document.addEventListener("dragstart", function( event ) {
      // store a ref. on the dragged elem
      dragged = event.target;
      draggedText = event.target
      // grab the nextElement to save the dragged elements location
      nextElement = dragged.nextElementSibling
      // make it half transparent
      event.target.style.opacity = .5;
  }, false);

  document.addEventListener("dragend", function( event ) {
      event.target.style.opacity = "";
  }, false);

  /* events fired on the drop targets */
  document.addEventListener("dragover", function( event ) {
      // prevent default to allow drop
      event.preventDefault();
  }, false);

  document.addEventListener("dragenter", function( event ) {
      // highlight potential drop target when the draggable element enters it
      if ( event.target.className == "dropEmpty" ) {
          event.target.style.background = "purple";
      }

  }, false);

  document.addEventListener("dragleave", function( event ) {
      // reset background of potential drop target when the draggable element leaves it
      if ( event.target.className == "dropEmpty" ) {
          event.target.style.background = "";
      }

  }, false);

  document.addEventListener("drop", function( event ) {
      event.preventDefault();
      // dropped element over an empty inventory slot
      if ( event.target.classList.contains("dropEmpty")) {
            event.target.style.background = "";

            let draggedParent = dragged.parentNode
            let fromInventory = false
            //
            partyInventory.slots[event.target.dataset.slotid].fill(dragged.innerHTML)
            console.log(partyInventory)

            // dragged item started in the inventory itself
            if (draggedParent.classList.contains('dropFull')){
                draggedParent.classList.remove('dropFull')
                draggedParent.classList.add('dropEmpty')
                fromInventory = true
                partyInventory.slots[draggedParent.dataset.slotid].clear()

            }
            // clone element if necessary back in Menu
            if (!removeFromMenuPullToggle) {
                let c = dragged.cloneNode(true)
                c.style.opacity = ""
                draggedParent.insertBefore(c, nextElement)
            }


          dragged.parentNode.removeChild( dragged );
          event.target.appendChild( dragged );
          
          dragged.classList.remove('itemInMenu')
          dragged.classList.add('itemInInventory')
          
          event.target.classList.remove('dropEmpty')
          event.target.classList.add('dropFull')

          if(fromInventory){
              draggedParent.removeChild(draggedParent.firstChild)
            }
        }  //IF the transfer menu and the custom menu are NOT up
        if (!transferMenuUp && !customMenuUp){
            if (event.target.classList.contains("dropMenu") || event.target.classList.contains("itemInMenu")){
                let draggedParent = dragged.parentNode
                if (draggedParent.classList.contains('dropFull')){
                    draggedParent.classList.remove('dropFull')
                    draggedParent.classList.add('dropEmpty')
                    fromInventory = true
                    partyInventory.slots[draggedParent.dataset.slotid].clear()
                }
                if(!fromInventory){
                dragged.parentNode.removeChild( dragged )
                    if (!removeFromMenuPullToggle) {
                        let c = dragged.cloneNode(true)
                        c.style.opacity = ""
                        draggedParent.insertBefore(c, nextElement)
                    }
                } 
                if(fromInventory){
                    draggedParent.removeChild(draggedParent.firstChild)
                }
    
            }
        } else if (transferMenuUp || customMenuUp){
            if (event.target.classList.contains("dropMenu") || event.target.classList.contains("itemInMenu") || event.target.classList.contains("pullMenuContainer")){
                let draggedParent = dragged.parentNode
                console.log(dragged)
                console.log(draggedParent)

                partyInventory.slots[draggedParent.dataset.slotid].clear()

                draggedParent.classList.remove('dropFull')
                draggedParent.classList.add('dropEmpty')
                draggedParent.removeChild(draggedParent.firstChild)
                dragged.classList.remove('itemInInventory')
                dragged.classList.add('itemInMenu')
                document.querySelector('.itemsToPullContainer').appendChild(dragged)
            }
        }
        
  }, false);

onLoadCreateInventories()

localStorage.setItem('myDog', 'Luna')
localStorage.setItem('myName', 'Dave')
localStorage.setItem('myNumbers', JSON.stringify([1,2,3,4,5,6,7,8,9,10]))
//console.log(JSON.parse(localStorage.getItem('myNumbers')))
