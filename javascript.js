const grid = document.getElementById('grid');
const slider = document.getElementById('sizeSlider');
let gridValue = document.getElementById('slider-value');
let gridSize = document.querySelector('input');
const container = document.getElementById('container');
let colorPicker = document.getElementById('color-picker');

const toggleBtn = document.getElementById('toggle');
const applyGridSize = document.getElementById('apply');
const resetBtn = document.getElementById('reset');
const etchBtn = document.getElementById('etch');
const drawBtn = document.getElementById('draw');
const eraserBtn = document.getElementById('eraser');
const resetGridBtn = document.getElementById('reset-grid');
const blackBtn = document.getElementById('black-btn');
const colorBtn = document.getElementById('color-btn');
const rainbowBtn = document.getElementById('rainbow-btn');

const drawModeBtns = document.querySelectorAll('.draw-mode-btn');
const colorModeBtns = document.querySelectorAll('.color-mode-btn');




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
            box.removeEventListener('mouseover', changeBackground);
            box.addEventListener('click', () => {
                box.style.backgroundColor = color;
            })
        })
    })
}

// random rainbow color background color function
function rainbowColor() {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    this.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
}
function rainbowDraw() {
    let boxes = grid.querySelectorAll('.box');
    boxes.forEach(box => {
        box.removeEventListener('mouseover', changeBackground);
        box.addEventListener('click', rainbowColor);
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

//change background color when color input is selected
colorPicker.addEventListener('click', changeColor);
rainbowBtn.addEventListener('click', rainbowDraw);

etchBtn.addEventListener('click', etchDraw);
drawBtn.addEventListener('click', pixelDraw);
eraserBtn.addEventListener('click', eraser);



// add active class when button is clicked
drawModeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        drawModeBtns.forEach(f => f.classList.remove('active'));
        e.target.classList.toggle('active');
    });
});
colorModeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        colorModeBtns.forEach(f => f.classList.remove('active'));
        e.target.classList.toggle('active');
    });
});


// Array.from(btns).forEach(btn => {
//     btn.addEventListener('click', () => {
//         let selected = document.getElementsByClassName('active');
//         selected[0].className = selected[0].className.replace(' active', '');
//         btn.className += ' active';
//     });
// });

// function activeClass(e) {
//     let el = document.querySelector('.active');
//     // check if element exists
//     if (el) {
//         el.classList.remove('active');
//     }
//     e.target.classList.add('active');
// }


