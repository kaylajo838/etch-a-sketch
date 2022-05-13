const grid = document.getElementById('grid');
const slider = document.getElementById('sizeSlider');
let gridValue = document.getElementById('slider-value');
let gridSize = document.querySelector('input');
const container = document.getElementById('container');
let colorPicker = document.getElementById('color-picker');

const toggleBtn = document.getElementById('toggle');
const applyGridSize = document.getElementById('apply');
const resetBtn = document.getElementById('reset');
const etchBtn = document.querySelector('.etch');
const drawBtn = document.querySelector('.draw');
const eraserBtn = document.getElementById('eraser');
const resetGridBtn = document.getElementById('reset-grid');
const blackBtn = document.getElementById('black-btn');
const colorBtn = document.getElementById('color-btn');

const activeBtn = document.getElementsByClassName('btn');




//function to get slider value
function showValue(x) {
    document.getElementById('slider-value').textContent = `Grid Size: ${x} x ${x}`;
}
gridSize.addEventListener('input', function (e) {
    squareSize = e.target.value;
    gridValue.textContent = `Grid Size: ${squareSize}x${squareSize}`;
});

// function to create grid
function createGrid(col, rows) {
    for (let i = 0; i < (col * rows); i++) {
        const div = document.createElement('div');
        grid.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        grid.appendChild(div).classList.add('box');
    }
}

// make 16x16 grid when window loads
window.onload = createGrid(slider.value, slider.value);

// modify grid size 
function modifyGridSize() {
    let boxes = grid.querySelectorAll(".box");
    boxes.forEach(box => box.remove());
    createGrid(slider.value, slider.value);
}




// change grid size with slider and apply button
applyGridSize.addEventListener('click', modifyGridSize);

// reset and clear grid to 16x16 when reset button is clicked
resetBtn.addEventListener('click', () => {
    let boxes = grid.querySelectorAll(".box");
    boxes.forEach(box => box.remove());
    createGrid(16, 16);
    slider.value = 16;
    gridValue.textContent = `Grid Size: 16 x 16`;
})

// clear grid only when button is clicked
resetGridBtn.addEventListener('click', () => {
    let boxes = grid.querySelectorAll('.box');
    boxes.forEach(box => box.style.backgroundColor = 'white');
})

// function to toggle lines on and off with button
toggleBtn.addEventListener('click', () => {
    let boxes = grid.querySelectorAll('.box');
    boxes.forEach(box => box.classList.toggle('toggle-lines'));
})




// background color change function for box divs in grid
function changeBackground() {
    this.style.backgroundColor = 'black';
}
// background color erase function
function eraseBackground() {
    this.style.backgroundColor = 'white';
}
// function to change background color to color picker input
function changeColor() {
    colorPicker.addEventListener('change', (e) => {
        let color = e.target.value;
        let boxes = grid.querySelectorAll('.box');
        boxes.forEach(box => {
            // box.style.backgroundColor = color;
            box.removeEventListener('mouseover', changeBackground);
            box.addEventListener('click', () => {
                box.style.backgroundColor = color;
            })
        })
    })
}

// change background color after mouse passes over it
function etchDraw() {
    let boxes = grid.querySelectorAll('.box');
    boxes.forEach(box => {
        box.removeEventListener('click', changeBackground);
        box.addEventListener('mouseover', changeBackground);
    })
}

// change background color when box is clicked
function pixelDraw() {
    let boxes = grid.querySelectorAll('.box');
    boxes.forEach(box => {
        box.removeEventListener('mouseover', changeBackground);
        box.addEventListener('click', changeBackground);
    })
}

function eraser() {
    let boxes = grid.querySelectorAll('.box');
    boxes.forEach(box => {
        box.removeEventListener('mouseover', changeBackground);
        box.addEventListener('click', eraseBackground);
        // box.addEventListener('mousedown', eraseBackground);
        // eraser for sketch not click
        // box.addEventListener('mouseenter', eraseBackground);
    })
}

// change background color when color input is selected 
colorPicker.addEventListener('click', changeColor);

etchBtn.addEventListener('click', etchDraw);
drawBtn.addEventListener('click', pixelDraw);
eraserBtn.addEventListener('click', eraser);



