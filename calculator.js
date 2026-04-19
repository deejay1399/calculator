let display = document.getElementById('display');

function append(value){
    display.value += value;
}

function clearDisplay(){
    display.value = '';
}

function calculate(){
    try{
        display.value = eval(display.value);
    }catch(e){
        display.value = 'Error';
    }
}

document.addEventListener('keydown', function(event){
    const allowedKeys = '0123456789+-*/.';
    if(allowedKeys.includes(event.key)){
        append(event.key);
    }else if(event.key === 'Enter'){
        calculate();
    }else if(event.key === 'Backspace'){
        display.value = display.value.slice(0, -1);
    }
    else if(event.key === 'Escape'){
        clearDisplay();
    }
});

document.addEventListener('keydown', (e) =>{
    const btn = document.querySelector(`button[data-key="${e.key}"]`);
    if(btn){
        btn.classList.add('active');
        setTimeout(() => {btn.classList.remove('active')}, 100);
    }});