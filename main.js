var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var Recognition = new SpeechRecognition();
Recognition.lang = 'nl-NL';

var startPosition = "";
var endPosition = "";
var startPosSet = false;
var endPosSet = false;
var whitesTurn = true;

function movePiece(startPos, endPos){

    var el1 = document.getElementById(startPos);
    var piece = el1.getAttribute("src");
    el1.setAttribute("src", "img/empty.png");
    var el2 = document.getElementById(endPos);
    el2.setAttribute("src", piece);
    startPosSet = false;
    endPosSet = false;
    startPosition = "";
    endPosition = "";
}



document.getElementById('startButton').onclick = function() {
    Recognition.start();
    console.log('Ready to receive voice commands.');
}

Recognition.onresult = function(event) {
    var result = event.results[0][0].transcript;
    var h1 = document.getElementById('positionh1');
    h1.innerHTML = result;
    if(!startPosSet){
        startPosition = result.toLowerCase();
        console.log('start position set to '+result.toLowerCase())
        startPosSet = true;
    }else if(!endPosSet){
        endPosition = result.toLowerCase();
        console.log('end position set to '+result.toLowerCase())
        endPosSet = true;
    }
    if(startPosSet && endPosSet){
        movePiece(startPosition, endPosition);
    }
}

Recognition.onspeechend = function() {
    Recognition.stop();
}
  
Recognition.onnomatch = function() {
    console.log("I didn't recognise that position.");
}
  
Recognition.onerror = function(event) {
    console.log('Error occurred in recognition: ' + event.error);
}


        
    
  

