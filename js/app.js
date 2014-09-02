var luckyNumber;
var guessCount;
var guessPass;
var newGuess;
var bingo;

$(document).ready(function(){
	/*--- Create a new game ---*/
	newGame();
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	$("form").submit(function(e) {
  		e.preventDefault();
		if (!bingo) {
			newGuess = $('#userGuess').val();
	  		$('#userGuess').val('');
	  		guessPass = checkNumber(newGuess);
	  		if(!guessPass) {
	  			guessCount++;
	  			updateCount(guessCount);
	  			$("ul#guessList").append("<li>" +newGuess+ "</li>");
	  			analyzeGuess(Math.abs(luckyNumber-newGuess));
	  		}
  		}
  	});
	
	/*--- Click to start a new game ---*/
	$(".new").click(function(e){
  		e.preventDefault();
  		newGame();
  	});
});


/*--- Start a new game ---*/
function newGame () {
	guessCount = 0;
	bingo = false;
	luckyNumber = getRandomInt(1,100);
	updateCount(guessCount);
	guessUpdate("Make your guess.");
	$("ul#guessList li").remove();
	$('#userGuess').val('');
}

	/*--- Check if user guess meets requirements ---*/
function checkNumber (newGuess) {
	if (isNaN(newGuess)) {
		guessUpdate("That's not a number!");
		return true;
	}
	else if (newGuess < 1 || newGuess > 100) {
		guessUpdate("Please give me a number between 1 and 100.");
		return true;
	}
	else {
		return false;
	}
}

/*--- Analyze user guess and provide feedback ---*/
function analyzeGuess (x) {
	if (x === 0) {
		guessUpdate("Bingo!");
		bingo = true;
		buttonUpdate();
	}
	else if (x > 0 && x <= 10) {
		guessUpdate("Burning up!");
	}
	else if (x > 10 && x <= 20) {
		guessUpdate("Hot.");
	}
	else if (x > 20 && x <= 30) {
		guessUpdate("Warm...");
	}
	else if (x > 30 && x <= 40) {
		guessUpdate("Cold.");
	}
	else if (x > 40 && x <= 50) {
		guessUpdate("Freezing!");
	}
	else {
		guessUpdate("Sub-zero!");
	}
}

/*--- Generate a random number ---*/
function getRandomInt(min, max) {
  	var randomInt = Math.floor(Math.random() * (max - min + 1) + min);
  	return randomInt;
}

/*--- Update the guess count ---*/
function updateCount (count) {
	$('#count').text(guessCount);
}

/*--- Change the temperature ---*/
function guessUpdate (message) {
	$('#feedback').text(message);
}

/*--- Change the button ---*/
function buttonUpdate () {
	$('#userGuess').hide();
	$('#guessButton').on('click', function(e) {
		e.preventDefault();
		newGame();
		$(this).val('Guess').off('click');
		$('#userGuess').show();
	})
	.val('Start a new game!');
}