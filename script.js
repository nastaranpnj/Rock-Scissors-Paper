var playerScore = 0
var computerScore = 0
var choosen = function(event){
    console.log(event.target.innerHTML)
    
    let x = document.getElementsByClassName('player')[0]
    let but = x.getElementsByTagName('button')
    for(let i = 0 ; i< but.length; i++){
        but[i].disabled = true;
    }
    document.getElementById('playerState').innerHTML = event.target.innerHTML
    document.getElementById('computerPlayer').disabled = false
    let pl= document.getElementById('playerState')
    pl.classList.remove('winner')
    pl.classList.remove('loser')
}
var computerChoice = ["Rock", "scissors", "paper"]
var computerChoose = function(){
    document.getElementById('computerPlayer').disabled = true
    let randomElement = computerChoice[Math.floor(Math.random() * computerChoice.length)]
    console.log(randomElement)
    document.getElementById('ComputerState').innerHTML = randomElement
    let x = document.getElementsByClassName('player')[0]
    let but = x.getElementsByTagName('button')
    for(let i = 0 ; i< but.length; i++){
        but[i].disabled = false;
    }
    checkWinner()
}
var checkWinner = function(){
    let pl= document.getElementById('playerState')
    let cm = document.getElementById('ComputerState')
    let plScore = document.getElementById('scorePlayer')
    let cmScore = document.getElementById('scoreComputer')
    let winnerPlayer = false
    if(cm.innerHTML == pl.innerHTML){
        document.getElementById('winner').innerHTML = 'DRAW'
        cm.classList.remove('winner')
        cm.classList.remove('loser')
        pl.classList.remove('winner')
        pl.classList.remove('loser')
    }
    else{
        switch(pl.innerHTML){
            case "Rock":
                if(cm.innerHTML == "scissors")
                    winnerPlayer = true
                else
                    winnerPlayer = false  
                break
            case "scissors":
                if(cm.innerHTML== "Rock")  
                    winnerPlayer = false 
                else
                    winnerPlayer = true
                break
            case "paper" :
                if(cm.innerHTML=="scissors")
                    winnerPlayer = false 
                else
                    winnerPlayer = true
                break      
        }
        if(winnerPlayer == false ){
        document.getElementById('winner').innerHTML = 'Computer'
        computerScore++
        cm.classList.add('winner')
        cm.classList.remove('loser')
        pl.classList.add('loser')
        pl.classList.remove('winner')
        }
        else{
        document.getElementById('winner').innerHTML = 'player'
        playerScore++
        pl.classList.add('winner')
        pl.classList.remove('loser')
        cm.classList.add('loser')
        cm.classList.remove('winner')
        }
    }
    plScore.innerHTML = playerScore
    cmScore.innerHTML = computerScore
    scoreChecker()
}
var scoreChecker = function(){
    let cmScore = document.getElementById('scoreComputer')
    let plScore = document.getElementById('scorePlayer')
    if (playerScore > computerScore){
        plScore.classList.add('winner')
        cmScore.classList.remove('winner')
    }
    else if ( playerScore < computerScore){
        cmScore.classList.add('winner')
        plScore.classList.remove('winner')
    }
    else {
        plScore.classList.remove('winner')
        cmScore.classList.remove('winner')
    }

}


var setNumber = function(e){
	e.preventDefault();
    console.log(e.target)
    var fieldName = e.target.getAttribute("data-field");
    console.log(fieldName);
    var type      = e.target.getAttribute('data-type');
    var x = document.getElementsByName(fieldName);
    console.log(x.length)
    for(var i=0 ; i < x.length ; i++)
    {
        console.log(x[i])
       if(x[i].tagName == 'INPUT'){
            var input = x[i]
       }
    }
    console.log(input.value);
    var currentVal = parseInt(input.value);
    if (!isNaN(currentVal)) {
        if(type == 'minus') {
            
            if(currentVal > input.getAttribute('min')) {
                input.value = currentVal - 1
            } 
            if(parseInt(input.value) == input.getAttribute('min')) {
                e.target.setAttribute('disabled', true);
            }

        } else if(type == 'plus') {
            let minusBut = document.querySelectorAll('[data-type="minus"]')[0];
            console.log(minusBut)
            minusBut.removeAttribute('disabled');
            if(currentVal < input.getAttribute('max')) {
                input.value = currentVal + 1
            }
            if(parseInt(input.value) == input.getAttribute('max')) {
                e.target.setAttribute('disabled', true);
            }

        }
    } else {
        input.value = 0;
    }
}
var focusInputNumber = function(e){
	this.data('oldValue', this.val())
}
var changeInputNumber = function(e){
	var minValue =  parseInt(this.getAttribute('min'));
    var maxValue =  parseInt(this.getAttribute('max'));
    var valueCurrent = parseInt(this.val());
    
    var name = this.getAttribute('name');
    if(valueCurrent >= minValue) {
        (".btn-number[data-type='minus'][data-field='"+name+"']").removeAttribute('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        this.val(this.data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
       (".btn-number[data-type='plus'][data-field='"+name+"']").removeAttribute('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        this.val(this.data('oldValue'));
    }
}
var keydownInputNumber = function(e){
	// Allow: backspace, delete, tab, escape, enter and .
        if (inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
}