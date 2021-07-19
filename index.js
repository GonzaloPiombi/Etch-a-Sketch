const buttons = document.querySelectorAll('.color-buttons');
const square = document.querySelector('.grid-container').childNodes;
const clearButton = document.querySelectorAll('button')[4];
const newGridButton = document.querySelectorAll('button')[5];
let colorMode = '';

for (let i = 0; i < 256; i++) {
    const newDiv = document.createElement('div');
    document.querySelector('.grid-container').appendChild(newDiv);
}

clearButton.addEventListener('click', clearGrid);
newGridButton.addEventListener('click', newGrid);

buttons.forEach((button => {
    button.addEventListener('click', changeColor);
}));

function changeColor() {
    colorMode = this.id;
    square.forEach((div => {
        div.addEventListener('mouseover', changeColorMode);
    }));
}

function changeColorMode() {
    switch (colorMode) {
        case 'black':
            this.setAttribute('style', 'background-color: black;');
            break;

        case 'rgb':
            this.setAttribute('style', `background-color: rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)});`);
            break;

        case 'gray':
            let currentValue = this.style.backgroundColor;
            let newCurrentValue = currentValue.slice(-5, -1);
            newCurrentValue = Number(newCurrentValue);
            if (newCurrentValue < 1) {
                this.setAttribute('style', `background-color: rgba(0, 0, 0, ${newCurrentValue + 0.1})`)
            } else if ((newCurrentValue > 1 || isNaN(newCurrentValue)) && currentValue != 'rgb(0, 0, 0)') {
                newCurrentValue = 0;
                this.setAttribute('style', `background-color: rgba(0, 0, 0, ${newCurrentValue + 0.1})`)
            } else {
                this.setAttribute('style', `background-color: rgba(0, 0, 0, 1);`)

            };
            break;

        case 'eraser':
            this.setAttribute('style', 'background-color: ;')
            break;
    }
}

function clearGrid() {
    square.forEach((div => {
        div.setAttribute('style', 'background-color: white;');
    }));
}

function newGrid() {
    const gridContainer = document.querySelector('.grid-container');

    do {
        number = parseInt(prompt('Enter grid size:', 16), 10);
    } while (number > 100 || number < 1 || isNaN(number));

    gridContainer.textContent = '';
    gridContainer.setAttribute('style', `grid-template-columns: repeat(${number}, ${480/number}px); grid-template-rows: repeat(${number}, ${480/number}px);`)
    for (let i = 0; i < number*number; i++) {
        const newDiv = document.createElement('div')
        gridContainer.appendChild(newDiv);
    }
}