const grid = document.getElementById('grid');
const slider = document.getElementById('sizeSlider');
let gridValue = document.getElementById('slider-value');
let gridSize = document.querySelector('input');
const container = document.getElementById('container');
let colorPicker = document.getElementById('color-picker').value;

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

// background color erase function
function eraseBackground() {
    this.style.backgroundColor = 'white';
}
eraserBtn.addEventListener('click', eraseBackground);


// add active class when a draw button is clicked
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


function changeBackground() {
    if (blackBtn.classList.contains('active')) {
        this.style.backgroundColor = 'black'
    } else if (colorBtn.classList.contains('active')) {
        colorPicker.onchange = function () {
            colorPicker = this.value;
            this.style.backgroundColor = colorPicker;
        }
    } else if (rainbowBtn.classList.contains('active')) {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        this.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
}


let activeEtchBtn = false;
let activeDrawBtn = false;

let activeBlackBtn = false;
let activeColorBtn = false;
let activeRainbowBtn = false;

etchBtn.onclick = function () {
    if (activeEtchBtn === false && activeDrawBtn === true) {
        activeEtchBtn = !activeEtchBtn
        activeDrawBtn = !activeDrawBtn
    }
    activeEtchBtn = true;
    console.log(activeEtchBtn);
    color();
}
drawBtn.onclick = function () {
    if (activeDrawBtn === false && activeEtchBtn === true) {
        activeDrawBtn = !activeDrawBtn
        activeEtchBtn = !activeEtchBtn
    }
    activeDrawBtn = true;
    console.log(activeDrawBtn);
    color();
}
blackBtn.onclick = function () {
    if (activeBlackBtn === false && activeColorBtn === true) {
        activeBlackBtn = !activeBlackBtn
        activeColorBtn = !activeColorBtn
    } else if (activeBlackBtn === false && activeRainbowBtn === true) {
        activeBlackBtn = !activeBlackBtn
        activeRainbowBtn = !activeRainbowBtn
    }
    activeBlackBtn = true;
    console.log(activeBlackBtn);
    color();
}
colorBtn.onclick = function () {
    if (activeColorBtn === false && activeBlackBtn === true) {
        activeColorBtn = !activeColorBtn
        activeBlackBtn = !activeBlackBtn
    } else if (activeColorBtn === false && activeRainbowBtn === true) {
        activeColorBtn = !activeColorBtn
        activeRainbowBtn = !activeRainbowBtn
    }
    activeColorBtn = true;
    console.log(activeColorBtn);
    color();
}
rainbowBtn.onclick = function () {
    if (activeRainbowBtn === false && activeBlackBtn === true) {
        activeRainbowBtn = !activeRainbowBtn
        activeBlackBtn = !activeBlackBtn
    } else if (activeRainbowBtn === false && activeColorBtn === true) {
        activeRainbowBtn = !activeRainbowBtn
        activeColorBtn = !activeColorBtn
    }
    activeRainbowBtn = true;
    console.log(activeRainbowBtn);
    color();
}

function color() {
    let boxes = grid.querySelectorAll('.box');
    if (activeEtchBtn === true && activeBlackBtn === true) {
        boxes.forEach(box => {
            box.addEventListener('mouseover', () => {
                box.style.backgroundColor = 'black';
            })
        })
    }

    if (activeEtchBtn === true && activeColorBtn === true) {
        boxes.forEach(box => {
            box.addEventListener('mouseover', () => {
                box.style.backgroundColor = colorPicker;
            })
        })
        document.getElementById('color-picker').onchange = function () {
            colorPicker = this.value
            boxes.forEach(box => {
                box.addEventListener('mouseover', () => {
                    box.style.backgroundColor = colorPicker;
                })
            })
        }
    }

    if (activeEtchBtn === true && activeRainbowBtn === true) {
        boxes.forEach(box => {
            box.addEventListener('mouseover', () => {
                box.style.backgroundColor = rainbowColor();
            })
        })
    }

    if (activeDrawBtn === true && activeBlackBtn === true) {
        boxes.forEach(box => {
            box.addEventListener('click', () => {
                box.style.backgroundColor = 'black';
            })
        })
    }

    if (activeDrawBtn === true && activeColorBtn === true) {
        boxes.forEach(box => {
            box.addEventListener('click', () => {
                box.style.backgroundColor = colorPicker;
            })
        })
        document.getElementById('color-picker').onchange = function () {
            colorPicker = this.value
            boxes.forEach(box => {
                box.addEventListener('click', () => {
                    box.style.backgroundColor = colorPicker;
                })
            })
        }
    }

    if (activeDrawBtn === true && activeRainbowBtn === true) {
        boxes.forEach(box => {
            box.addEventListener('click', () => {
                box.style.backgroundColor = rainbowColor();
            })
        })
    }
}




// random rainbow color background color function
function rainbowColor() {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    // this.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    return `rgb(${randomR}, ${randomG}, ${randomB})`;
}




// // background color change function for box divs in grid
// function blackBackground() {
//     this.style.backgroundColor = 'black';
// }



// // random rainbow color background color function
// function rainbowColor() {
//     const randomR = Math.floor(Math.random() * 256);
//     const randomG = Math.floor(Math.random() * 256);
//     const randomB = Math.floor(Math.random() * 256);
//     this.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
//     // return `rgb(${randomR}, ${randomG}, ${randomB})`;
// }

// // random color background color function 
// function colorBackground() {
//     this.style.backgroundColor = changeColor();
// }
// // function to change background color to color picker input
// function changeColor() {
//     colorPicker.addEventListener('change', (e) => {
//         let color = e.target.value;
//         let boxes = grid.querySelectorAll('.box');
//         boxes.forEach(box => {
//             box.removeEventListener('mouseover', blackBackground);
//             box.addEventListener('click', () => {
//                 box.style.backgroundColor = color;
//             })
//         })
//     })
// }




// function etchDrawBlack() {
//     let boxes = grid.querySelectorAll('.box');
//     boxes.forEach(box => {
//         box.removeEventListener('click', colorBackground)
//         box.removeEventListener('mouseover', colorBackground);
//         box.removeEventListener('click', rainbowColor)
//         box.removeEventListener('mouseover', rainbowColor);
//         box.removeEventListener('click', blackBackground);

//         box.addEventListener('mouseover', blackBackground);
//     })
// }
// function etchDrawColor() {
//     let boxes = grid.querySelectorAll('.box');
//     boxes.forEach(box => {
//         box.removeEventListener('click', blackBackground);
//         box.removeEventListener('mouseover', blackBackground);
//         box.removeEventListener('click', rainbowColor)
//         box.removeEventListener('mouseover', rainbowColor);
//         box.removeEventListener('click', colorBackground);

//         box.addEventListener('mouseover', colorBackground);
//     })
// }
// function etchDrawRainbow() {
//     let boxes = grid.querySelectorAll('.box');
//     boxes.forEach(box => {
//         box.removeEventListener('click', blackBackground);
//         box.removeEventListener('mouseover', blackBackground);
//         box.removeEventListener('click', colorBackground);
//         box.removeEventListener('mouseover', colorBackground);
//         box.removeEventListener('click', rainbowColor);

//         box.addEventListener('mouseover', rainbowColor);
//     })
// }

// function pixelDrawBlack() {
//     let boxes = grid.querySelectorAll('.box');
//     boxes.forEach(box => {
//         box.removeEventListener('click', colorBackground)
//         box.removeEventListener('mouseover', colorBackground);
//         box.removeEventListener('click', rainbowColor)
//         box.removeEventListener('mouseover', rainbowColor);
//         box.removeEventListener('mouseover', blackBackground);

//         box.addEventListener('click', blackBackground);
//     })
// }
// function pixelDrawColor() {
//     let boxes = grid.querySelectorAll('.box');
//     boxes.forEach(box => {
//         box.removeEventListener('click', blackBackground);
//         box.removeEventListener('mouseover', blackBackground);
//         box.removeEventListener('click', rainbowColor)
//         box.removeEventListener('mouseover', rainbowColor);
//         box.removeEventListener('mouseover', colorBackground);

//         box.addEventListener('click', colorBackground);
//     })
// }
// function pixelDrawRainbow() {
//     let boxes = grid.querySelectorAll('.box');
//     boxes.forEach(box => {
//         box.removeEventListener('click', blackBackground);
//         box.removeEventListener('mouseover', blackBackground);
//         box.removeEventListener('click', colorBackground);
//         box.removeEventListener('mouseover', colorBackground);
//         box.removeEventListener('mouseover', rainbowColor);

//         box.addEventListener('click', rainbowColor);
//     })
// }









// function addEvent(el, name, func, bool) {
//     if (el.addEventListener) {
//         el.addEventListener(name, func, bool);
//     }
//     else if (el.attachEvent) {
//         el.attachEvent('on' + name, func);
//     }
//     else {
//         el['on' + name] = func;
//     }
// }

// let clicked = {
//     etchBtn: false,
//     drawBtn: false,
//     blackBtn: false,
//     colorBtn: false,
//     rainbowBtn: false
// }

// function eventFunc(e) {
//     let t = e.target;
//     if (t.hasAttribute('id') && clicked.hasOwnProperty(t.id)) {
//         clicked[t.id] = true;
//     }

//     if (clicked['etchBtn']) {
//         if (clicked['blackBtn']) {
//             etchDrawBlack();
//         }
//         else if (clicked['colorBtn']) {
//             etchDrawColor();
//         }
//         else if (clicked['rainbowBtn']) {
//             etchDrawRainbow();
//         }
//     }
//     else if (clicked['drawBtn']) {
//         if (clicked['blackBtn']) {
//             pixelDrawBlack();
//         }
//         else if (clicked['colorBtn']) {
//             pixelDrawColor();
//         }
//         else if (clicked['rainbowBtn']) {
//             pixelDrawRainbow();
//         }
//     }
// }

// addEvent(etchBtn, 'click', eventFunc, false);
// addEvent(drawBtn, 'click', eventFunc, false);
// addEvent(blackBtn, 'click', eventFunc, false);
// addEvent(colorBtn, 'click', eventFunc, false);
// addEvent(rainbowBtn, 'click', eventFunc, false);
















// function rainbowBackground() {
//     this.style.backgroundColor = rainbowColor();
// }










// !!! NEWEST AND DUPLICATE CODE !!!!
// // random rainbow color background color function
// function rainbowColor() {
//     const randomR = Math.floor(Math.random() * 256);
//     const randomG = Math.floor(Math.random() * 256);
//     const randomB = Math.floor(Math.random() * 256);
//     // this.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
//     return `rgb(${randomR}, ${randomG}, ${randomB})`;
// }


// let penMode = 'color-picker';
// function changeColor(event) {
//     if (event.buttons === 1) {
//         if (penMode === 'rainbow') {
//             this.style.backgroundColor = rainbowColor();
//         }
//         else if (penMode === 'color') {
//             this.style.backgroundColor = colorPicker.value;
//         }
//         else {
//             this.style.backgroundColor = 'black'
//         } 
//     } 
// }











// function rainbowDraw() {
//     let boxes = grid.querySelectorAll('.box');
//     boxes.forEach(box => {
//         box.removeEventListener('mouseover', blackBackground);
//         box.addEventListener('click', rainbowColor);
//     })
// }

// // change background color after mouse passes over it
// function etchDraw() {
//     let boxes = grid.querySelectorAll('.box');
//     boxes.forEach(box => {
//         box.removeEventListener('click', blackBackground);
//         box.addEventListener('mouseover', blackBackground);
//     })
// }

// // change background color when box is clicked
// function pixelDraw() {
//     let boxes = grid.querySelectorAll('.box');
//     boxes.forEach(box => {
//         box.removeEventListener('mouseover', blackBackground);
//         box.addEventListener('click', blackBackground);
//     })
// }

// function eraser() {
//     let boxes = grid.querySelectorAll('.box');
//     boxes.forEach(box => {
//         box.removeEventListener('mouseover', blackBackground);
//         box.addEventListener('click', eraseBackground);
//         // box.addEventListener('mousedown', eraseBackground);
//         // eraser for sketch not click
//         // box.addEventListener('mouseenter', eraseBackground);
//     })
// }

// change background color when color input is selected
// colorPicker.addEventListener('click', changeColor);
// rainbowBtn.addEventListener('click', rainbowDraw);

// etchBtn.addEventListener('click', etchDraw);
// drawBtn.addEventListener('click', pixelDraw);
// eraserBtn.addEventListener('click', eraser);



// // add active class when a draw button is clicked
// drawModeBtns.forEach(btn => {
//     btn.addEventListener('click', (e) => {
//         drawModeBtns.forEach(f => f.classList.remove('active'));
//         e.target.classList.toggle('active');
//     });
// });
// colorModeBtns.forEach(btn => {
//     btn.addEventListener('click', (e) => {
//         colorModeBtns.forEach(f => f.classList.remove('active'));
//         e.target.classList.toggle('active');
//     });
// });
















// function color() {
//     if (etchBtn.classList.contains(active) === true && blackBtn.classList.contains(active) === true) {
//         let boxes = grid.querySelectorAll('.box');
//         boxes.forEach(box => {
//             box.removeEventListener('click', colorBackground)
//             box.removeEventListener('mouseover', colorBackground);
//             box.removeEventListener('click', rainbowColor)
//             box.removeEventListener('mouseover', rainbowColor);
//             box.removeEventListener('click', blackBackground);

//             box.addEventListener('mouseover', blackBackground);
//         })
//     } else if (etchBtn.classList.contains(active) === true && colorBtn.classList.contains(active) === true) {
//         let boxes = grid.querySelectorAll('.box');
//         boxes.forEach(box => {
//             box.removeEventListener('click', blackBackground);
//             box.removeEventListener('mouseover', blackBackground);
//             box.removeEventListener('click', rainbowColor)
//             box.removeEventListener('mouseover', rainbowColor);
//             box.removeEventListener('click', colorBackground);

//             box.addEventListener('mouseover', colorBackground);
//         })
//     } else if (etchBtn.classList.contains(active) === true && rainbowBtn.classList.contains(active) === true) {
//         let boxes = grid.querySelectorAll('.box');
//         boxes.forEach(box => {
//             box.removeEventListener('click', blackBackground);
//             box.removeEventListener('mouseover', blackBackground);
//             box.removeEventListener('click', colorBackground);
//             box.removeEventListener('mouseover', colorBackground);
//             box.removeEventListener('click', rainbowColor);

//             box.addEventListener('mouseover', rainbowColor);
//         })
//     } else if (drawBtn.classList.contains(active) === true && blackBtn.classList.contains(active) === true) {
//         let boxes = grid.querySelectorAll('.box');
//         boxes.forEach(box => {
//             box.removeEventListener('click', colorBackground)
//             box.removeEventListener('mouseover', colorBackground);
//             box.removeEventListener('click', rainbowColor)
//             box.removeEventListener('mouseover', rainbowColor);
//             box.removeEventListener('mouseover', blackBackground);

//             box.addEventListener('click', blackBackground);
//         })
//     } else if (drawBtn.classList.contains(active) === true && colorBtn.classList.contains(active) === true) {
//         let boxes = grid.querySelectorAll('.box');
//         boxes.forEach(box => {
//             box.removeEventListener('click', blackBackground);
//             box.removeEventListener('mouseover', blackBackground);
//             box.removeEventListener('click', rainbowColor)
//             box.removeEventListener('mouseover', rainbowColor);
//             box.removeEventListener('mouseover', colorBackground);

//             box.addEventListener('click', colorBackground);
//         })
//     } else if (drawBtn.classList.contains(active) === true && rainbowBtn.classList.contains(active) === true) {
//         let boxes = grid.querySelectorAll('.box');
//         boxes.forEach(box => {
//             box.removeEventListener('click', blackBackground);
//             box.removeEventListener('mouseover', blackBackground);
//             box.removeEventListener('click', colorBackground);
//             box.removeEventListener('mouseover', colorBackground);
//             box.removeEventListener('mouseover', rainbowColor);

//             box.addEventListener('click', rainbowColor);
//         })
//     }
// }

