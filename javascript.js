


function id(id) {
    return document.getElementById(id);
}

let count = 0;
let idCount = 0;

window.onload = () => {
    for (let i = 0; i < 81; i++) {
        // Create tile & give it CSS of the tile then append it
        let tile = document.createElement('p');
        tile.id = idCount;
        idCount++
        tile.classList.add('tile');
        tile.textContent = '';

        id('grid').appendChild(tile);
    }
}