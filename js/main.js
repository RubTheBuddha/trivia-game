$(document).ready(function() {

function startMusic() {
music.play();
}
startMusic();

function startScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

startScreen();



$("body").on("click", ".start-button", function(event){
	event.preventDefault();  
	clickSound.play();
	createNew();

	timerWrapper();

}); 

$("body").on("click", ".answer", function(event){
	
	
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		

		clearInterval(clock);
		addWin();
	}
	else {
		;
		clearInterval(clock);
		addLoss();
	}
}); 

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); 

});  

function addLossOnTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);
	wrong.play();  
}

function addWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);
	correct.play();  
}

function addLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
	wrong.play(); 
}

function createNew() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	createNew();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	clock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(clock);
			addLossOnTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	createNew();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["You win by destroying the enemy ____", "Who is Garen's sister?", "Who is the youngest champion?", "What champion casts Umbral Tresspass", "What champion is capable of burrowing?", "How long does it take Buffs to respawn?", "Who says 'We fight for a better tomorrow!' ?", "How long is the cooldown on 'Flash'?"];
var answerArray = [["Inhibitor", "Nexus", "Turret", "Swimming Pool"], ["Lux","Morgana","Draven","Orianna"], ["Anivia", "Zac", "Annie", "Yasuo"], ["Kayle","Skarner","Zed","Kayn"], ["Jarvan IV", "Elise", "Fizz", "Rek'Sai"], ["3 Minutes","4 Minutes","5 Minutes","6 Minutes"], ["Maokai", "Jayce", "Darius", "Garen"], ["120 Seconds","600 seconds","10 seconds","300 seconds"]];
var imageArray = ["<img class='center-block img-right' src='img/nexus.jpg'>", "<img class='center-block img-right' src='img/lux.jpg'>", "<img class='center-block img-right' src='img/annie.jpg'>", "<img class='center-block img-right' src='img/kayne.jpg'>", "<img class='center-block img-right' src='img/skarner.jpg'>", "<img class='center-block img-right' src='img/redbuff.png'>", "<img class='center-block img-right' src='img/jayce.jpg'>", "<img class='center-block img-right' src='img/flash.jpg'>"];
var correctAnswers = ["B. Nexus", "A. Lux", "C. Annie", "D. Kayn", "D. Rek'Sai", "C. 5 Minutes", "B. Jayce", "D. 300 Seconds"];
var questionCounter = 0;
var selecterAnswer;
var clock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");
var music = new Audio("sound/backmusic.mp3");
var wrong = new Audio("sound/wrong.wav");
var correct = new Audio("sound/correct.wav");
