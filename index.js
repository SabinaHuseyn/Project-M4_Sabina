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

rightInput.value = 1;
// this function converts currency via clicking head currency button through exchange function and changes color via handleToggle function
currencyButtonRight.forEach((element) => {
    element.addEventListener('click', handleClick)
    function handleClick(event) {
        selectRight = event.target.innerHTML;
        selectLeft = leftSelect.value;
        handleToggle(event);
        exchange(selectRight, selectLeft);
    }
})
// this function converts currency via clicking head currency button through exchange function and changes color via handleToggle function
currencyButtonLeft.forEach((element) => {
    element.addEventListener('click', handleClick)
    function handleClick(event) {
        selectLeft = event.target.innerHTML;
        selectRight = rightSelect.value;
        handleToggle(event);
        exchange(selectRight, selectLeft);
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
            leftInput.value = (rightInput.value * rate).toFixed(2);

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
// this function changes color of head currency botton when clicking on select option
function colorChangedCurrency(event) {
    let elements = event.target.parentNode.parentNode.children;
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('active')) {
            elements[i].classList.remove('active');
        } else {
            event.target.parentNode.parentNode.children[3].classList.add('active');
        }
    }
    getConvert()
};

leftSelect.addEventListener('change', colorChangedCurrency)
leftInput.addEventListener('input', getConvert);
rightSelect.addEventListener('change', colorChangedCurrency);
rightInput.addEventListener('input', getConvert);
leftInput.addEventListener('input', exchange);
rightInput.addEventListener('input', exchange);

// this function replaces right side with left via clicking on arrows
buttonChange.addEventListener('click', () => {
    replacingClassCurrency();
    const change = leftSelect.value;
    leftSelect.value = rightSelect.value;
    rightSelect.value = change;
    getConvert();
})
// this function replaces colors (via class) of right side with left side 
function replacingClassCurrency() {
    let leftElements = currencyLeft.querySelectorAll('.currencySelection');
    let rightlements = currencyRight.querySelectorAll('.currencySelection');

    for (let i = 0; i < leftElements.length; i++) {
        let firstElementClass = leftElements[i].className;
        let secondElementClass = rightlements[[i]].className;

        leftElements[i].className = '';
        rightlements[i].className = '';

        leftElements[i].className = secondElementClass;
        rightlements[i].className = firstElementClass;
    }
}
// this function applies on select option and changes currency
function getConvert() {
    let selectLeft = leftSelect.value;
    let selectRight = rightSelect.value;

    fetch(`https://api.ratesapi.io/api/latest?base=${selectRight}&symbols=${selectLeft}`)
        .then(response => response.json())
        .then(response => {
            document.getElementById("loading").style.display = "none";
            const rate = response.rates[selectLeft];
            rightResult.innerHTML = `1${selectRight} = ${rate.toFixed(2)} ${selectLeft}`;
            leftResult.innerHTML = `1${selectLeft} = ${(1 / rate).toFixed(2)} ${selectRight}`;
            leftInput.value = (rightInput.value * rate).toFixed(2);

        })
    document.getElementById("loading").style.display = "block";
    let changedElementLeft = currencyLeft.children[3];
    let changedElementRight = currencyRight.children[3];
    changedElementLeft.innerHTML = selectLeft;
    changedElementRight.innerHTML = selectRight;
};

getConvert();
