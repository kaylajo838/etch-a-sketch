const grid = document.getElementById('grid');
const slider = document.getElementById('sizeSlider');
let gridValue = document.getElementById('slider-value');
let gridSize = document.querySelector('input');
const container = document.getElementById('container');

const toggleBtn = document.getElementById('toggle');
const applyGridSize = document.getElementById('apply');
const resetBtn = document.getElementById('reset');
const etchBtn = document.querySelector('.etch');
const drawBtn = document.querySelector('.draw');

const activeBtn = document.getElementsByClassName('btn');


//function to get slider value
function showValue(x) {
    document.getElementById('slider-value').textContent = `Grid Size: ${x} x ${x}`;
}
gridSize.addEventListener('input', function (e) {
    squareSize = e.target.value;
    gridValue.textContent = `Grid Size: ${squareSize}x${squareSize}`;
});

// function to create grid inside initBox
function createGrid(col, rows) {
    for (let i = 0; i < (col * rows); i++) {
        const div = document.createElement('div');
        grid.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        grid.appendChild(div).classList.add('box');
    }
}

// modify grid size 
function modifyGridSize() {
    let boxes = grid.querySelectorAll(".box");
    boxes.forEach(box => box.remove());
    createGrid(slider.value, slider.value);
}

// make 16x16 grid when window loads
window.onload = createGrid(slider.value, slider.value);

// change grid size with slider and apply button
applyGridSize.addEventListener('click', modifyGridSize);

// reset grid to 16x16 when reset button is clicked
resetBtn.addEventListener('click', function () {
    let boxes = grid.querySelectorAll(".box");
    boxes.forEach(box => box.remove());
    createGrid(16, 16);
    slider.value = 16;
    gridValue.textContent = `Grid Size: 16 x 16`;
})

// function to toggle lines on and off with button
toggleBtn.addEventListener('click', () => {
    let boxes = grid.querySelectorAll('.box');
    boxes.forEach(box => box.classList.toggle('toggle-lines'));
})

// change background color after mouse passes over it
// etchBtn.addEventListener('click', () => {
//     let boxes = grid.querySelectorAll('.box');
//     boxes.forEach(box => box.classList.toggle('.box'));
// });

function draw() {
    let boxes = grid.querySelectorAll('.box');
    boxes.forEach(box => {
        box.removeEventListener('click', changeBackground);
        box.addEventListener('mouseover', changeBackground);
    })
}

function changeBackground() {
    this.style.backgroundColor = 'black';
}

etchBtn.addEventListener('click', draw);

// function changePenType(){
//     if (penType == 1 ){
//         document.getElementById('pen-type').textContent = 'Pen Type: Click' ;
//         gridCell.forEach(cell => {
//             cell.removeEventListener('mouseover',changeBackground);
//             cell.addEventListener('click' , changeBackground);
//          })
//         --penType;
//     }
//     else{
//         document.getElementById('pen-type').textContent = 'Pen Type: Follow' ;
//         gridCell.forEach(cell => {
//             cell.removeEventListener('click',changeBackground);
//             cell.addEventListener('mouseover' , changeBackground);
//          })
//         ++penType;
//     }
// }

// function changeBackground() {
//     this.style.backgroundColor = gridColor;
// }

