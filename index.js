const buttons = document.querySelectorAll('.color-buttons');
const square = document.querySelector('.grid-container').childNodes;
const clearButton = document.querySelectorAll('button')[4];
const newGridButton = document.querySelectorAll('button')[5];
let colorMode = '';



//Initial grid
for (let i = 0; i < 256; i++) {
    const newDiv = document.createElement('div');
    document.querySelector('.grid-container').appendChild(newDiv);
}

//Event Listeners
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
            newCurrentValue = Number(newCurrentValue); //Get the last bit of the rgba value and turn it into a number
            if (newCurrentValue < 1) {
                this.setAttribute('style', `background-color: rgba(0, 0, 0, ${newCurrentValue + 0.1})`)
            } else if ((newCurrentValue > 1 || isNaN(newCurrentValue)) && currentValue != 'rgb(0, 0, 0)') { //Here we check for a value > 1 or NaN so when we go over
                newCurrentValue = 0;                                                                        //a black or rgb value, it starts from the lightest gray
                this.setAttribute('style', `background-color: rgba(0, 0, 0, ${newCurrentValue + 0.1})`)     //The != 'rgb(0, 0, 0)' works so when we reach black with the 
            } else {                                                                                        //grayscale option it does not start over from the lightest
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
        number = prompt('Enter grid size:', 16);
        if (number == null) return; //We check for a null value, so the prompt does not force an answer and you can go back to the current grid.
        else {
            number = parseInt(number, 10);
        }
    } while (number > 100 || number < 1 || isNaN(number));

    gridContainer.textContent = '';
    gridContainer.setAttribute('style', `grid-template-columns: repeat(${number}, ${480/number}px); grid-template-rows: repeat(${number}, ${480/number}px);`)
    for (let i = 0; i < number*number; i++) {
        const newDiv = document.createElement('div')
        gridContainer.appendChild(newDiv);
    }
    square.forEach((div => {
        div.addEventListener('mouseover', changeColorMode);
    }));
}