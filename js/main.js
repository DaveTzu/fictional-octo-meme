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

document.querySelector('.armorBtn').addEventListener('click', loadMenuData)
document.querySelector('.gearBtn').addEventListener('click', loadMenuData)
document.querySelector('.meleeWeaponsBtn').addEventListener('click', loadMenuData)
document.querySelector('.rangedWeaponsBtn').addEventListener('click', loadMenuData)
document.querySelector('.selectOther').addEventListener('change', loadMenuData)
document.querySelector('.magicItemsBtn').addEventListener('click', loadMenuData)
document.querySelector('.transferBtn').addEventListener('click', loadTransferMenu)

let transferMenuUp = false
let customMenuUp = false

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

            if (draggedParent.classList.contains('dropFull')){
                draggedParent.classList.remove('dropFull')
                draggedParent.classList.add('dropEmpty')
                fromInventory = true
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
        }
        if (!transferMenuUp && !customMenuUp){
            if (event.target.classList.contains("dropMenu") || event.target.classList.contains("itemInMenu")){
                let draggedParent = dragged.parentNode
                if (draggedParent.classList.contains('dropFull')){
                    draggedParent.classList.remove('dropFull')
                    draggedParent.classList.add('dropEmpty')
                    fromInventory = true
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

                draggedParent.classList.remove('dropFull')
                draggedParent.classList.add('dropEmpty')
                draggedParent.removeChild(draggedParent.firstChild)
                dragged.classList.remove('itemInInventory')
                dragged.classList.add('itemInMenu')
                document.querySelector('.itemsToPullContainer').appendChild(dragged)
            }
        }
        
  }, false);