"use strict";


let data = {
    player: {
        money: 0,
        moneyPerSecond: 0,
        inventory: {}
    },
    market: {
        dropper1: {
            name: "dropper 1",
            unlocked: false,
            price: 0,
            gains: 5
        },
        dropper2: {
            name: "dropper 2",
            unlocked: false,
            price: 50,
            gains: 10
        },
        dropper3: {
            name: "dropper 3",
            unlocked: false,
            price: 150,
            gains: 15
        },
        dropper4: {
            name: "dropper 4",
            unlocked: false,
            price: 1000,
            gains: 30
        },
        dropper5: {
            name: "dropper 5",
            unlocked: false,
            price: 5000,
            gains: 50
        }
    }
}


const onglets = document.querySelectorAll('.onglets');
const contenu = document.querySelectorAll('.contenu');
let index = 0;

onglets.forEach(onglet => {
    onglet.addEventListener('click', () => {
        if (onglet.classList.contains('active-onglet')) {
            return;
        } else {
            onglet.classList.add('active-onglet');
        }
        index = onglet.getAttribute('data-anim');
        for (let i=0; i<onglets.length; i++) {

            if (onglets[i].getAttribute('data-anim') != index) {
                onglets[i].classList.remove('active-onglet');
            }
        }
        for (let j=0; j<contenu.length; j++) {
            if (contenu[j].getAttribute('data-anim') == index) {
                    contenu[j].classList.add('active-contenu')
            } else {
                contenu[j].classList.remove('active-contenu');
            }
        }
    });
});

const market = document.getElementById('market');
function updateShop() {
    while (market.lastChild) {
        market.removeChild(market.lastChild);
    }
    Object.values(data.market).forEach(e => {
        let item = document.createElement('p');
        if (!e.unlocked) {
            item.innerHTML = `
                <p>${e.name} - ${e.gains} $/s</p>
                <span>${e.price} $</span>
            `;
            let button = document.createElement('button');
            button.textContent = 'Acheter';
            button.classList.add('buyItemButton');
            button.addEventListener('click', () => {
                if ((data.player.money - e.price) >= 0) {
                    let el = e.name;
                    data.player.inventory[el] = e;
                    e.unlocked = true;
                    data.player.money -= e.price;

                    updateInventory();
                    updateData();
                    updateShop();
                } else {
                    console.log("pas assez d'argent");
                }
                
            });
            item.appendChild(button);
        } else {
            item.innerHTML = `
                <p>${e.name} - ${e.gains} $/s</p>
                <span>Acheté</span>
            `;
        }
        item.classList.add('market-item');
        market.appendChild(item);
    });
}

const inventory = document.getElementById('inventory');
function updateInventory() {
    while (inventory.lastChild) {
        inventory.removeChild(inventory.lastChild);
    }
    Object.values(data.player.inventory).forEach(e => {
        let div = document.createElement('div');
        div.innerHTML = `
            <p>${e.name} - <span>${e.gains} $/s</span></p>
        `;
        inventory.appendChild(div);
    });
    if (inventory.children.length === 0){
        inventory.innerHTML = `
            <p style="text-align: center;">Achetez un dropper dans le <a href='#market'>Market</a> pour commencer le jeu</p>
        `;
    }
}

function updateData() {

    data.player.moneyPerSecond = 0;
    Object.values(data.player.inventory).forEach(e => {
        data.player.moneyPerSecond += e.gains;
    });

    data.player.money += data.player.moneyPerSecond;
    document.getElementById('money-value').textContent = data.player.money.toString() + ' $';
    document.getElementById('mps-value').textContent = data.player.moneyPerSecond.toString() + ' $';

}


updateData();
updateInventory();
updateShop();

setInterval(updateData, 1000);