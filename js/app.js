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

// Display new equation on load
window.onload = function() {
    // Run function
    newEqu();
}

// To get the random number
function randomNum(min, max) {
    // return random number and max included
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

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

// When user submits there anwser
submitAnwserBtn.addEventListener('click', () => {
    // Get user input from input field
    var inputValue = userInput.value;

    // Check input
    if (inputValue.length > 0 && Number(inputValue)) {
        if (Number(inputValue) === currentEquAnwser) {
            answerDisplay.innerHTML = `<span class="correct">Rigtigt</span>`;
        } else {
            answerDisplay.innerHTML = `<span class="incorrect">Det rigtige svar er: <span class="correctAnwser">${currentEquAnwser}</span></span>`;
        }

        // Show container
        answerContainer.style.display = 'block';

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
    answerContainer.style.display = 'none';

    // Run function
    newEqu();
});