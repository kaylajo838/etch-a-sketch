const grid = document.getElementById('grid');
const slider = document.getElementById('sizeSlider');
let gridValue = document.getElementById('slider-value');
let gridSize = document.querySelector('input');
const container = document.getElementById('container');
let colorPicker = document.getElementById('color-picker').value;
const initColorPicker = document.getElementById('color-picker');

const toggleBtn = document.getElementById('toggle');
const applyGridSize = document.getElementById('apply');
const resetBtn = document.getElementById('reset');

let etchBtn = document.getElementById('etch');
let drawBtn = document.getElementById('draw');

const eraserBtn = document.getElementById('eraser');
const resetGridBtn = document.getElementById('reset-grid');

let blackBtn = document.getElementById('black-btn');
let colorBtn = document.getElementById('color-btn');
let rainbowBtn = document.getElementById('rainbow-btn');

const drawModeBtns = document.querySelectorAll('.draw-mode-btn');
const colorModeBtns = document.querySelectorAll('.color-mode-btn');

// new elements after media query in css
const newResetBtn = document.getElementById('new-reset');
const newResetGridBtn = document.getElementById('new-reset-grid');
const newEraserBtn = document.getElementById('new-eraser');
const newToggleBtn = document.getElementById('new-toggle');

// get media size matched for media queries 
let widthMatch = window.matchMedia('(max-width: 680px)');


// function to get slider value
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
    color();
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
    initColorPicker.value = '#ef233c'
    drawModeBtns.forEach(btn => {
        btn.classList.remove('active');
    })
    colorModeBtns.forEach(btn => {
        btn.classList.remove('active2');
    })
})
// AFTER MEDIA QUERY reset and clear grid to 16x16 when reset button is clicked
newResetBtn.addEventListener('click', () => {
    let boxes = grid.querySelectorAll(".box");
    boxes.forEach(box => box.remove());
    createGrid(16, 16);
    slider.value = 16;
    gridValue.textContent = `Grid Size: 16 x 16`;
    initColorPicker.value = '#ef233c'
    drawModeBtns.forEach(btn => {
        btn.classList.remove('active');
    })
    colorModeBtns.forEach(btn => {
        btn.classList.remove('active2');
    })
})

// clear grid only when button is clicked
resetGridBtn.addEventListener('click', () => {
    let boxes = grid.querySelectorAll('.box');
    boxes.forEach(box => box.style.backgroundColor = 'white');
})
// AFTER MEDIA QUERY clear grid only when button is clicked
newResetGridBtn.addEventListener('click', () => {
    let boxes = grid.querySelectorAll('.box');
    boxes.forEach(box => box.style.backgroundColor = 'white');
})

// function to toggle lines on and off with button
toggleBtn.addEventListener('click', () => {
    let boxes = grid.querySelectorAll('.box');
    boxes.forEach(box => box.classList.toggle('toggle-lines'));
})
// AFTER MEDIA QUERY function to toggle lines on and off with button
newToggleBtn.addEventListener('click', () => {
    let boxes = grid.querySelectorAll('.box');
    boxes.forEach(box => box.classList.toggle('toggle-lines'));
})


// add active class when a draw button is clicked
drawModeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        drawModeBtns.forEach(f => f.classList.remove('active'));
        e.target.classList.toggle('active');
    });
});
// add active class when a color button is clicked
colorModeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        colorModeBtns.forEach(f => f.classList.remove('active2'));
        e.target.classList.toggle('active2');
    });
});



let activeEtchBtn = false;
let activeDrawBtn = false;

let activeBlackBtn = false;
let activeColorBtn = false;
let activeRainbowBtn = false;

let activeEraseBtn = false;

// onclick events for draw mode buttons, color mode buttons, and eraser button
etchBtn.onclick = function () {
    if (activeEtchBtn === false && activeDrawBtn === true) {
        activeEtchBtn = !activeEtchBtn
        activeDrawBtn = !activeDrawBtn
    }
    activeEtchBtn = true;
    color();
}
drawBtn.onclick = function () {
    if (activeDrawBtn === false && activeEtchBtn === true) {
        activeDrawBtn = !activeDrawBtn
        activeEtchBtn = !activeEtchBtn
    }
    activeDrawBtn = true;
    color();
}
blackBtn.onclick = function () {
    if (activeBlackBtn === false && activeColorBtn === true) {
        activeBlackBtn = !activeBlackBtn
        activeColorBtn = !activeColorBtn
    } else if (activeBlackBtn === false && activeRainbowBtn === true) {
        activeBlackBtn = !activeBlackBtn
        activeRainbowBtn = !activeRainbowBtn
    } else if (activeBlackBtn === false && activeEraseBtn === true) {
        activeBlackBtn = !activeBlackBtn
        activeEraseBtn = !activeEraseBtn
    }
    activeBlackBtn = true;
    color();
}
colorBtn.onclick = function () {
    if (activeColorBtn === false && activeBlackBtn === true) {
        activeColorBtn = !activeColorBtn
        activeBlackBtn = !activeBlackBtn
    } else if (activeColorBtn === false && activeRainbowBtn === true) {
        activeColorBtn = !activeColorBtn
        activeRainbowBtn = !activeRainbowBtn
    } else if (activeColorBtn === false && activeEraseBtn === true) {
        activeColorBtn = !activeColorBtn
        activeEraseBtn = !activeEraseBtn
    }
    activeColorBtn = true;
    color();
}
rainbowBtn.onclick = function () {
    if (activeRainbowBtn === false && activeBlackBtn === true) {
        activeRainbowBtn = !activeRainbowBtn
        activeBlackBtn = !activeBlackBtn
    } else if (activeRainbowBtn === false && activeColorBtn === true) {
        activeRainbowBtn = !activeRainbowBtn
        activeColorBtn = !activeColorBtn
    } else if (activeRainbowBtn === false && activeEraseBtn === true) {
        activeRainbowBtn = !activeRainbowBtn
        activeEraseBtn = !activeEraseBtn
    }
    activeRainbowBtn = true;
    color();
}
eraserBtn.onclick = function () {
    if (activeEraseBtn === false && activeBlackBtn === true) {
        activeEraseBtn = !activeEraseBtn
        activeBlackBtn = !activeBlackBtn
    } else if (activeEraseBtn === false && activeColorBtn === true) {
        activeEraseBtn = !activeEraseBtn
        activeColorBtn = !activeColorBtn
    } else if (activeEraseBtn === false && activeRainbowBtn === true) {
        activeEraseBtn = !activeEraseBtn
        activeRainbowBtn = !activeRainbowBtn
    }
    activeEraseBtn = true;
    color();
}
// AFTER MEDIA QUERY
newEraserBtn.onclick = function () {
    if (activeEraseBtn === false && activeBlackBtn === true) {
        activeEraseBtn = !activeEraseBtn
        activeBlackBtn = !activeBlackBtn
    } else if (activeEraseBtn === false && activeColorBtn === true) {
        activeEraseBtn = !activeEraseBtn
        activeColorBtn = !activeColorBtn
    } else if (activeEraseBtn === false && activeRainbowBtn === true) {
        activeEraseBtn = !activeEraseBtn
        activeRainbowBtn = !activeRainbowBtn
    }
    activeEraseBtn = true;
    color();
}

// function to change background color to black;
function blackBackground() {
    this.style.backgroundColor = 'black';
}
// function to change background color to colorPicker value
function colorPickerBackground() {
    this.style.backgroundColor = colorPicker;
}
// function to change background color to random rainbow
function rainbowBackground() {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    this.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
}
// background color erase function
function eraseBackground() {
    this.style.backgroundColor = '';
}

// function to test what buttons are active and add proper color classes and event listeners
function color() {
    let isMouseDown = false;
    let boxes = grid.querySelectorAll('.box');
    if (activeEtchBtn === true && activeBlackBtn === true) {
        boxes.forEach(box => {
            box.removeEventListener('click', eraseBackground);
            box.removeEventListener('mouseover', eraseBackground);;

            box.removeEventListener('click', colorPickerBackground);
            box.removeEventListener('mouseover', colorPickerBackground);

            box.removeEventListener('click', rainbowBackground);
            box.removeEventListener('mouseover', rainbowBackground);

            box.removeEventListener('click', blackBackground);

            widthMatch.addEventListener('change', function (mm) {
                if (mm.matches) {
                    box.addEventListener('mouseup', function (event) {
                        isMouseDown = true;
                    })
                    box.addEventListener('mouseup', function (event) {
                        isMouseDown = false;
                    })
                    box.addEventListener('mousedown', function (event) {
                        if (isMouseDown) {
                            blackBackground();
                        }
                    })
                } else {
                    box.addEventListener('mouseover', blackBackground);
                }
            })
        })
    }

    if (activeEtchBtn === true && activeColorBtn === true) {
        boxes.forEach(box => {
            box.removeEventListener('click', eraseBackground);
            box.removeEventListener('mouseover', eraseBackground);

            box.removeEventListener('click', blackBackground);
            box.removeEventListener('mouseover', blackBackground);

            box.removeEventListener('click', rainbowBackground);
            box.removeEventListener('mouseover', rainbowBackground);

            box.removeEventListener('click', colorPickerBackground);

            widthMatch.addEventListener('change', function (mm) {
                if (mm.matches) {
                    box.addEventListener('mouseup', function (event) {
                        isMouseDown = true;
                    })
                    box.addEventListener('mouseup', function (event) {
                        isMouseDown = false;
                    })
                    box.addEventListener('mousedown', function (event) {
                        if (isMouseDown) {
                            colorPickerBackground();
                        }
                    })
                } else {
                    box.addEventListener('mouseover', colorPickerBackground);
                }
            })
        })
        document.getElementById('color-picker').onchange = function () {
            colorPicker = this.value
            boxes.forEach(box => {
                box.removeEventListener('click', eraseBackground);
                box.removeEventListener('mouseover', eraseBackground);

                box.removeEventListener('click', blackBackground);
                box.removeEventListener('mouseover', blackBackground);

                box.removeEventListener('click', rainbowBackground);
                box.removeEventListener('mouseover', rainbowBackground);

                box.removeEventListener('click', colorPickerBackground);

                widthMatch.addEventListener('change', function (mm) {
                    if (mm.matches) {
                        box.addEventListener('mouseup', function (event) {
                            isMouseDown = true;
                        })
                        box.addEventListener('mouseup', function (event) {
                            isMouseDown = false;
                        })
                        box.addEventListener('mousedown', function (event) {
                            if (isMouseDown) {
                                colorPickerBackground();
                            }
                        })
                    } else {
                        box.addEventListener('mouseover', colorPickerBackground);
                    }
                })
            })
        }
    }

    if (activeEtchBtn === true && activeRainbowBtn === true) {
        boxes.forEach(box => {
            box.removeEventListener('click', eraseBackground);
            box.removeEventListener('mouseover', eraseBackground);

            box.removeEventListener('click', blackBackground);
            box.removeEventListener('mouseover', blackBackground);

            box.removeEventListener('click', colorPickerBackground);
            box.removeEventListener('mouseover', colorPickerBackground);

            box.removeEventListener('click', rainbowBackground);

            widthMatch.addEventListener('change', function (mm) {
                if (mm.matches) {
                    box.addEventListener('mouseup', function (event) {
                        isMouseDown = true;
                    })
                    box.addEventListener('mouseup', function (event) {
                        isMouseDown = false;
                    })
                    box.addEventListener('mousedown', function (event) {
                        if (isMouseDown) {
                            rainbowBackground();
                        }
                    })
                } else {
                    box.addEventListener('mouseover', rainbowBackground);
                }
            })
        })
    }

    if (activeDrawBtn === true && activeBlackBtn === true) {
        boxes.forEach(box => {
            box.removeEventListener('click', eraseBackground);
            box.removeEventListener('mouseover', eraseBackground);

            box.removeEventListener('click', colorPickerBackground);
            box.removeEventListener('mouseover', colorPickerBackground);

            box.removeEventListener('click', rainbowBackground);
            box.removeEventListener('mouseover', rainbowBackground);

            box.removeEventListener('mouseover', blackBackground);

            box.addEventListener('click', blackBackground);
        })
    }

    if (activeDrawBtn === true && activeColorBtn === true) {
        boxes.forEach(box => {
            box.removeEventListener('click', eraseBackground);
            box.removeEventListener('mouseover', eraseBackground);

            box.removeEventListener('click', blackBackground);
            box.removeEventListener('mouseover', blackBackground);

            box.removeEventListener('click', rainbowBackground);
            box.removeEventListener('mouseover', rainbowBackground);

            box.removeEventListener('mouseover', colorPickerBackground);

            box.addEventListener('click', colorPickerBackground);
        })
        document.getElementById('color-picker').onchange = function () {
            colorPicker = this.value
            boxes.forEach(box => {
                box.removeEventListener('click', eraseBackground);
                box.removeEventListener('mouseover', eraseBackground);

                box.removeEventListener('click', blackBackground);
                box.removeEventListener('mouseover', blackBackground);

                box.removeEventListener('click', rainbowBackground);
                box.removeEventListener('mouseover', rainbowBackground);

                box.removeEventListener('mouseover', colorPickerBackground);

                box.addEventListener('click', colorPickerBackground);
            })
        }
    }

    if (activeDrawBtn === true && activeRainbowBtn === true) {
        boxes.forEach(box => {
            box.removeEventListener('click', eraseBackground);
            box.removeEventListener('mouseover', eraseBackground);

            box.removeEventListener('click', blackBackground);
            box.removeEventListener('mouseover', blackBackground);

            box.removeEventListener('click', colorPickerBackground);
            box.removeEventListener('mouseover', colorPickerBackground);

            box.removeEventListener('mouseover', rainbowBackground);

            box.addEventListener('click', rainbowBackground);
        })
    }

    if (activeEraseBtn === true && activeEtchBtn === true) {
        boxes.forEach(box => {
            box.removeEventListener('click', blackBackground);
            box.removeEventListener('mouseover', blackBackground);

            box.removeEventListener('click', colorPickerBackground);
            box.removeEventListener('mouseover', colorPickerBackground);

            box.removeEventListener('click', rainbowBackground);
            box.removeEventListener('mouseover', rainbowBackground);

            box.removeEventListener('click', eraseBackground);

            widthMatch.addEventListener('change', function (mm) {
                if (mm.matches) {
                    box.addEventListener('mouseup', function (event) {
                        isMouseDown = true;
                    })
                    box.addEventListener('mouseup', function (event) {
                        isMouseDown = false;
                    })
                    box.addEventListener('mousedown', function (event) {
                        if (isMouseDown) {
                            eraseBackground();
                        }
                    })
                } else {
                    box.addEventListener('mouseover', eraseBackground);
                }
            })
        })
    }
    if (activeEraseBtn === true && activeDrawBtn === true) {
        boxes.forEach(box => {
            box.removeEventListener('click', blackBackground);
            box.removeEventListener('mouseover', blackBackground);

            box.removeEventListener('click', colorPickerBackground);
            box.removeEventListener('mouseover', colorPickerBackground);

            box.removeEventListener('click', rainbowBackground);
            box.removeEventListener('mouseover', rainbowBackground);

            box.removeEventListener('mouseover', eraseBackground);

            box.addEventListener('click', eraseBackground);
        });
    }
}