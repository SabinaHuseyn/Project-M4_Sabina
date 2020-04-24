let currencyLeft = document.querySelector('.currencyLeft');
let currencyRight = document.querySelector('.currencyRight');
let leftSelect = document.getElementById('selectionLeft');
let leftInput = document.getElementById('leftInput');
let rightSelect = document.getElementById('selectionRight');
let rightInput = document.getElementById('rightInput');
let rightResult = document.getElementById('rightResult');
let leftResult = document.getElementById('leftResult');
let buttonChange = document.querySelector('.center');
let currencyButtonLeft = currencyLeft.querySelectorAll('.currencySelection');
let currencyButtonRight = currencyRight.querySelectorAll('.currencySelection');

// this function converts currency via clicking head currency button through exchange function and changes color via handleToggle function
currencyButtonRight.forEach((element) => {
    element.addEventListener('click', handleClick)
    function handleClick() {
        handleToggle(event);
        getConvert()
    }
})
// this function converts currency via clicking head currency button through exchange function and changes color via handleToggle function
currencyButtonLeft.forEach((element) => {
    element.addEventListener('click', handleClick)
    function handleClick() {
        handleToggle(event);
        getConvert();
    }
})
// this function converts currency via clicking head currency button
function exchange(selectRight, selectLeft) {
    document.getElementById("loading").style.display = "block";

    fetch(`https://api.ratesapi.io/api/latest?base=${selectRight}&symbols=${selectLeft}`)
        .then(response => response.json())
        .then(response => {
            document.getElementById("loading").style.display = "none";
            const rate = response.rates[selectLeft];
            rightResult.innerHTML = `1${selectRight} = ${rate.toFixed(2)} ${selectLeft}`;
            leftResult.innerHTML = `1${selectLeft} = ${(1 / rate).toFixed(2)} ${selectRight}`;
            getInputChange(rightInput, leftInput.value, rate);
        })
}
// this function changes color of toggled head currency button
function handleToggle(event) {
    let elements = event.target.parentElement.children;
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('active')) {
            elements[i].classList.remove('active');
        } else {
            event.target.classList.add('active');
        }
    }
};
// these functions changes color and converts of left head currency botton when clicking on select option
function leftColorChangedCurrency(event) {
    let elements = event.target.parentNode.parentNode.children;
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('active')) {
            elements[i].classList.remove('active');
        } else {
            event.target.parentNode.parentNode.children[3].classList.add('active');
        }
    }
    convertLeftSelect();
};
function convertLeftSelect() {
    selectLeft = leftSelect.value;
    selectRight = currencyRight.querySelector('.active').innerHTML;
    exchange(selectRight, selectLeft);
    let changedElementLeft = currencyLeft.children[3];
    changedElementLeft.innerHTML = selectLeft;
}
// these functions changes color and converts of right head currency botton when clicking on select option
function rightColorChangedCurrency(event) {
    let elements = event.target.parentNode.parentNode.children;
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('active')) {
            elements[i].classList.remove('active');
        } else {
            event.target.parentNode.parentNode.children[3].classList.add('active');
        }
    }
    convertRightSelect();
};
function convertRightSelect() {
    selectRight = rightSelect.value;
    selectLeft = currencyLeft.querySelector('.active').innerHTML;
    exchange(selectRight, selectLeft);
    let changedElementRight = currencyRight.children[3];
    changedElementRight.innerHTML = selectRight;
}
leftSelect.addEventListener('change', leftColorChangedCurrency)
leftInput.addEventListener('input', leftHandleInput);
rightSelect.addEventListener('change', rightColorChangedCurrency);
rightInput.addEventListener('input', rightHandleInput);
let rate;
// this function converts input value
function getInputChange(input, changingInput, rate) {
    if (changingInput == "") {
        input.value = 1;
    } else {
        input.value = (changingInput / rate).toFixed(2);
    }
}
// this function reflects on left Inputs event
function leftHandleInput(event) {
    getConvert();
    let input = rightInput.value;
    let changingInput = event.target.value;
    getInputChange(input, changingInput, rate);
}
// this function reflects on right Inputs event
function rightHandleInput(event) {
    getConvert();
    let input = leftInput.value;
    let changingInput = event.target.value;
    getInputChange(input, changingInput, rate);
}
// this function replaces right side with left via clicking on arrows
buttonChange.addEventListener('click', () => {
    const change = currencyLeft.querySelector('.active').innerHTML;
    currencyLeft.querySelector('.active').innerHTML = currencyRight.querySelector('.active').innerHTML;
    currencyRight.querySelector('.active').innerHTML = change;
    getConvert();
})
// this function applies on elements with active classname and changes currency
function getConvert() {
    let selectLeft = currencyLeft.querySelector('.active').innerHTML;
    let selectRight = currencyRight.querySelector('.active').innerHTML;

    document.getElementById("loading").style.display = "block";
    fetch(`https://api.ratesapi.io/api/latest?base=${selectRight}&symbols=${selectLeft}`)
        .then(response => response.json())
        .then(response => {
            document.getElementById("loading").style.display = "none";
            const rate = response.rates[selectLeft];
            rightResult.innerHTML = `1${selectRight} = ${rate.toFixed(2)} ${selectLeft}`;
            leftResult.innerHTML = `1${selectLeft} = ${(1 / rate).toFixed(2)} ${selectRight}`;
            getInputChange(rightInput, leftInput.value, rate);
        })
};
getConvert();
