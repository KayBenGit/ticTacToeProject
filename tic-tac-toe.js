/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    if ((mark === "X") || (mark === "O")) {
        board[position] = mark
    }
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {

    //For Loop to check if empty replace with key value (Numbers 1 - 9)
    for (let key in board) {
        if (board[key] === " ") {
            board[key] = key;
        }
    }

    //Display Game Board
    console.log(" ------------- ");
    console.log(" | " + board[1] + " | " + board[2] + " | " + board[3] + " | ");
    console.log(" ------------- ");
    console.log(" | " + board[4] + " | " + board[5] + " | " + board[6] + " | ");
    console.log(" ------------- ");
    console.log(" | " + board[7] + " | " + board[8] + " | " + board[9] + " | ");
    console.log(" ------------- ");
    console.log("\n");
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
    //If Statement to check if input is a number or not, input is within 1-9, input is not stacking on X and O's already exist
    if ((isNaN(position)) || (position < 1) || (position > 9) || (board[position] === "X") || (board[position] === "O")) {
        return false;
    }
    else {
        return true;
    }
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {

    //For Loop to loop through the player(X or O) to match with any winning combinations
    for (let comb of winCombinations) {
        if ((board[comb[0]] === player) && (board[comb[1]] === player) && (board[comb[2]] === player)) {
            return true;
        }
    }
    return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {

    //For Loop to check each element in board
    for (let e in board) {

        //IF Statement to check if board element is empty or is a number on the board = (Not Filled yet)
        if ((board[e] === " ") || !(isNaN(Number(board[e])))) {
            return false;
        }
    }
    //IF condition met every element is full return True
    return true;
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************

//New Function Added to Change Player pointer
function chngPlayer(player){
    currentTurnPlayer = currentTurnPlayer === "X" ? "O" : "X";
}

//New Function play again 
function playAgain() {
    chngPlayer(currentTurnPlayer);
    board = {
        1: ' ', 2: ' ', 3: ' ',
        4: ' ', 5: ' ', 6: ' ',
        7: ' ', 8: ' ', 9: ' '
    };
    let playAgainInput;
    //While not Y or N continue loop
    do {
        //To UpperCase incase user enters lower case value for Y and N
        playAgainInput = prompt(
            "Play Again ? | Y/N | Your Answer:  "
        ).toUpperCase();
    } while (playAgainInput !== "Y" && playAgainInput !== "N");
    
    if (playAgainInput === "Y")
    {
        startGame();
    } 
    else 
    {
        console.log("\n------------------------------------------- \n")
        console.log("Thank You for playing !! See you Again !!");
        console.log("\n------------------------------------------- \n")
    }
}

// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let validMove = false;

    //While Loop for if user bad input
    while (!validMove) {
        let inputLocation = Number(prompt(player + " 's Turn, What is your move:  "));

        //If Statement for if bad input else markboard and print and exit loop
        if (!validateMove(inputLocation)) {
            console.log("Invalid Location. Try Again.");
        } else {
            markBoard(inputLocation, player);
            printBoard();
            validMove = true;
        }
    }
}

//variables

//var to check current player
let currentTurnPlayer = 'X'

//Main Game
function startGame(){
    //var to determined While Loop
    let winnerIdentified = false
    // entry point of the whole program
    console.log("\n\nGame started:\n")
    printBoard();

    //While Loop goes until Winner is determined or tie
    while (!winnerIdentified){
        playTurn(currentTurnPlayer);
        // feel free to add logic here if needed, e.g. announcing winner or tie

        //Check Win conditions Exit Loop
        if (checkWin(currentTurnPlayer))
        {
            console.log("\n------------------------------------------- \n")
            console.log(currentTurnPlayer + " has Won. Congratulations");
            console.log("\n------------------------------------------- \n")
            winnerIdentified = true;
            break;
        }
        
        //Check for Tie and Exit Loop
        if (checkFull())
        {
            console.log("\n-------------------------------- \n")
            console.log("The Game Has Ended in A TIE !!!.");
            console.log("\n-------------------------------- \n")
            break;
        }
        
        chngPlayer(currentTurnPlayer);
    }
    
    playAgain();
}

//Call Main game
startGame();



// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
