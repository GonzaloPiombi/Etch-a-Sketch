const buttons = document.querySelectorAll('.color-buttons');
const square = document.querySelector('.grid-container').childNodes;
let colorMode = '';

for (let i = 0; i < 256; i++) {
    const newDiv = document.createElement('div');
    document.querySelector('.grid-container').appendChild(newDiv);
}


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
            currentValue = currentValue.slice(-5, -1);
            currentValue = Number(currentValue);
            if (currentValue <= 1) {
                this.setAttribute('style', `background-color: rgba(0, 0, 0, ${currentValue + 0.1})`)
            } else if (currentValue > 1.1 || isNaN(currentValue)) {
                currentValue = 0;
                this.setAttribute('style', `background-color: rgba(0, 0, 0, ${currentValue + 0.1})`)
            } else {
                this.setAttribute('style', `background-color: rgba(0, 0, 0, 1);`)

            };
            break;

        case 'eraser':
            this.setAttribute('style', 'background-color: ;')
            break;
    }
}