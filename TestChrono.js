let startChrono = document.getElementById('startChrono');
let stopChrono = document.getElementById('stopChrono');
let chrono = document.getElementById('chrono');
let timeoutId;
let intervalId;

let dec = 0;
let sec = 0;
let min = 0;
chrono.value = min + ' :' + sec + ' . ' + dec;

startChrono.addEventListener('click', timer);
stopChrono.addEventListener('click', stopTimer);


function timer(){
    intervalId = setInterval(function(){
        chrono.value =  min + ' : ' + sec + ' . ' + dec;
        dec += 1;
        if(dec >= 10){dec = 0; sec += 1;}
        if(sec >= 60){sec = 0; min += 1;}
    }, 100)
}
function stopTimer(){
    clearInterval(intervalId);
}
