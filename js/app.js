let sliderMin = 2;
let sliderMax = 100;
let min = 2;
let max = 10;
let currentEquAnwser = 0;

// HTML elements
const equationDisplay = document.getElementById('equationDisplay');
const answerContainer = document.getElementById('answerContainer');
const answerDisplay = document.getElementById('answerDisplay');
const userInput = document.getElementById('userAnwserInput');
const submitAnwserBtn = document.getElementById('submitUserInputBtn');
const newEquBtn = document.getElementById('nextEquBtn');
const slider = document.getElementById('equRange');
const sliderOutput = document.getElementById('sliderValue');
const sliderOutputInput = document.getElementById('sliderValueInput');

// Display new equation on load
window.onload = () => {
    // Call function
    newEqu();

    // Set slider default values
    slider.min = sliderMin;
    slider.max = sliderMax;
    slider.value = max;
    //sliderOutput.innerHTML = slider.value;
    sliderOutputInput.value = slider.value;
    sliderOutputInput.maxLength = sliderMax.toString().length;
}

// To get the random number
function randomNum(min, max) {
    // return random number and max included
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/* // Old "newEqu" function
// The new one has right side max as 10 at all time
function newEqu() {
    // Left side of the equation
    var leftSide = randomNum(min, max);
    // Right side of the equation
    var rightSide = randomNum(min, max);

    // Display equation for user
    equationDisplay.innerHTML = `${leftSide} ∙ ${rightSide}`;
    // Save anwser
    currentEquAnwser = (leftSide * rightSide);
}
*/

function newEqu() {
    // Left side of the equation
    var leftSide = randomNum(min, max);
    // Right side of the equation
    var rightSide = randomNum(min, 10);

    // Display equation for user
    equationDisplay.innerHTML = `${leftSide} ∙ ${rightSide}`;
    // Save anwser
    currentEquAnwser = (leftSide * rightSide);
}

// When user submits there anwser
submitAnwserBtn.addEventListener('click', () => {
    // Get user input from input field
    var inputValue = userInput.value;

    // Check input
    // If the input field is not empty and is a number
    if (inputValue.length > 0 && Number(inputValue)) {
        // If the input as a number is equal and the same type of the correct anwser
        if (Number(inputValue) === currentEquAnwser) {
            answerDisplay.innerHTML = `<span class="correct">Rigtigt</span>`;
        } else {
            answerDisplay.innerHTML = `<span class="incorrect">Det rigtige svar er: <span class="correctAnwser">${currentEquAnwser}</span></span>`;
        }

        // Show container
        answerContainer.style.visibility = 'visible';

        // AutoFocus on the "OK" button
        newEquBtn.focus();
    }

    if (inputValue.length == 0) {
        // Autofocus on the input field
        userInput.focus();
    }
});

userInput.addEventListener('keyup', (event) => {
    // If user had typed something into the input field, then can the user git ENTER to check anwser
    if (event.keyCode === 13 && userInput.value.length > 0 && Number(userInput.value)) {
        // The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
        event.preventDefault();
        // Click the button
        submitAnwserBtn.click();
    }
});

// Display new equation when "OK" button pressed
newEquBtn.addEventListener('click', () => {
    // Clean the input field
    userInput.value = null;
    // Autofocus on the input field
    userInput.focus();

    // Hide container
    answerContainer.style.visibility = 'hidden';

    // Call function
    newEqu();
});

// When the slider gets draged
slider.addEventListener('input', () => {
    // Change the value to the new value
    //sliderOutput.innerHTML = slider.value;
    sliderOutputInput.value = slider.value;
    max = slider.value;
});

// If the user changes the max value by typing it into the input
sliderOutputInput.addEventListener('input', () => {
    slider.value = sliderOutputInput.value;
    max = slider.value;
});

// If the user leaves the inputs value less then 2 and if its empty
sliderOutputInput.addEventListener('change', () => {
    if (sliderOutputInput.value < 2 || sliderOutputInput.length < 2) {
        sliderOutputInput.value = 2;
        slider.value = 2;
    }

    max = slider.value;
});