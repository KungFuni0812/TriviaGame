// have a list of questions-Done

// each question have 4 possible answers, only 1 is correct-Done
var Question1 = {
    question: "Mario made his debut in Donkey Kong. What was his name in that game??" ,
    a1: "Super Plumber" ,
    a2: "Mario" ,
    a3: "Jumpman" ,
    a4: "Monkey Trainer" ,
    correctA: function() {
        return this.a3
    },
}

// each question have 4 possible answers, only 1 is correct-Done
var Question2 = {
    question: "Which of the following is not part of the three golden triangle pieces that make up the Triforce?" ,
    a1: "The Triforce of Power" ,
    a2: "The Triforce of Strength" ,
    a3: "The Triforce of Wisdom" ,
    a4: "The Triforce of Courage." ,
    correctA: function() {
        return this.a2
    }
}

// each question have 4 possible answers, only 1 is correct-Done
var Question3 = {
    question: "Which of the following Donkey Kong Characters was the Original Donkey Kong in the Arcade Game?" ,
    a1: "Funky Kong" ,
    a2: "Donkey Kong" ,
    a3: "Diddy Kong" ,
    a4: "Cranky Kong" ,
    correctA: function() {
        return this.a4
    }
}

// each question have 4 possible answers, only 1 is correct-Done
var Question4 = {
    question: "Who is the final boss in the first Metroid game?" ,
    a1: "Emperor Ing" ,
    a2: "Ridley" ,
    a3: "Mother Brain" ,
    a4: "Metroid" ,
    correctA: function() {
        return this.a3
    }
}

// each question have 4 possible answers, only 1 is correct-Done
var Question5 = {
    question: "Which of the following isn't a Yoshi color??" ,
    a1: "Gold" ,
    a2: "Yellow" ,
    a3: "Black" ,
    a4: "Orange" ,
    correctA: function() {
        return this.a1
    }
}

// each question have 4 possible answers, only 1 is correct-Done
var Question6 = {
    question: "What was Kirby name after?" ,
    a1: "A Vacuum" ,
    a2: "A Ball" ,
    a3: "A Painter" ,
    a4: "A Lawyer" ,
    correctA: function() {
        return this.a4
    }
}

// each question have 4 possible answers, only 1 is correct-Done
var Question7 = {
    question: "Which of the following is not a member of the Star Fox Team?" ,
    a1: "Falco Lombardi" ,
    a2: "Wolf O'Donnell" ,
    a3: "Slippy Toad" ,
    a4: "Peppy Hare" ,
    correctA: function() {
        return this.a2
    }
}

// each question have 4 possible answers, only 1 is correct-Done
var Question8 = {
    question: "What type of Pokémon is Pikachu not effective against??" ,
    a1: "Flying Type" ,
    a2: "Bug Type" ,
    a3: "Normal Type" ,
    a4: "Ground Type" ,
    correctA: function() {
        return this.a4
    }
}

var questionArray = [Question1 , Question2 , Question3 , Question4 , Question5 , Question6 , Question7 , Question8]

var timer = 30;

var correct = 0;

var incorrect = 0;

var timeouts = 0;

var intervalId;

var currentQuestion;

function decrement() {

    timer--;

    $("#Timer").html("<h2 id='timer-h2'>" + "Time Remaining: " + timer + "</h2>");
    // if they run out of time, say "you didn't answer", show the right answer-Done
    if(timer === 0) {
        timeouts++;
        clearInterval(intervalId);
        $("#Question").text('');
        $(".possibleAns").remove()
        $(".Answers").html('<p class="mx-4 timeOutMessage">' + "Out of Time!" + '</p>'+ '<p class="mx-4 loseMessage">' + " The Correct Answer was: " + currentQuestion.correctA()+ '</p>')
        setTimeout(nextQ, 3000);
    }

}

//click the start button to start
$("#start-button").on("click" , function() {
    askQuestion(Question1);
})

// ask the question from the list of questions-Done
function askQuestion(object) {
    timer = 30;
    $("#Timer").html("<h2 id='timer-h2'>" + "Time Remaining: " + timer + "</h2>");
    currentQuestion = object;
    var questionAsk = object.question;
    $("#Question").text(questionAsk);
    var a1 = object.a1;
    var a2 = object.a2;
    var a3 = object.a3;
    var a4 = object.a4;
    // the player is given 30 seconds to answer-Done
    intervalId = setInterval(decrement, 1000);
    // provide the list of answers-Done
    $(".Answers").html('<p class="mx-2 possibleAns">'+a1+'</p><p class="mx-2 possibleAns">'+a2+'</p><p class="mx-2 possibleAns">'+a3+'</p><p class="mx-2 possibleAns">'+a4+'</p>')
}

// the player chooses one of the 4 possible answers-Done
$(document).on("click", ".possibleAns", function() {
    clearInterval(intervalId);
    var answerSelected = $(this).text();
    $("#Question").text('');
    $(".possibleAns").remove();
    if(answerSelected === currentQuestion.correctA()) {
        // if they are right, say "you're right"-Done
        $(".Answers").html('<p class="mx-2 winMessage">' + "Correct!" + '</p>')
        correct++;
        setTimeout(nextQ, 3000);
    }else {
        // if they choose the wrong answer, show the right answer and tell them they are wrong-Done
        $(".Answers").html('<p class="mx-2 loseMessage">' + "Nope!" + '</p>'+ '<p class="mx-2 loseMessage">' + " The Correct Answer was: " + currentQuestion.correctA()+ '</p>');
        incorrect++;
        setTimeout(nextQ, 3000);
    }
})

// go to the next question

function nextQ() {
    var indexOfCurrentQuestion = questionArray.indexOf(currentQuestion);
    var nextQuestion = questionArray[indexOfCurrentQuestion+1];
    if (nextQuestion != undefined) {
        askQuestion(nextQuestion);
    } else {
        $("#timer-h2").remove()
        // do your jquery shit to show the end of game results.
        $(".Answers").html(
            `<div class="col">
                <div class="row justify-content-center">
                    <p id="correctP"></p>
                </div>
                <div class="row justify-content-center">
                    <p id="incorrectP"></p>
                </div>
                <div class="row justify-content-center">
                    <p id="timeoutsP"></p>
                </div>
                <div class="row justify-content-center">
                    <button class="btn btn-primary" id="restartBtn">Restart?</button>
                </div>
            </div>`)
            // display correct
        $("#correctP").text("Correct: " + correct);
            // display incorrect
        $("#incorrectP").text("Incorrect: " + incorrect);
            // display timeouts
        $("#timeoutsP").text("Timeouts: " + timeouts);
            // display a restart button
    }
}
    
// click the "restart" button to restart the game without reloading the page
$(document).on("click", "#restartBtn", function() {
    // remove the restart button and clear all text
    // reset counters
    correct = 0;
    incorrect = 0;
    timeouts = 0;
    askQuestion(Question1);
})