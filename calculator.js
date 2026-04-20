let display = document.getElementById('display');

function append(value){
    display.value += value;
}

function clearDisplay(){
    display.value = '';
}

function calculate(){
    try{
        const expression = display.value;
        const result = eval(expression);

        display.value = result;

        addtoHistory(expression, result);

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
    }
});

const toggleBtn = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  localStorage.setItem("theme", isDark ? "dark" : "light");

  toggleBtn.textContent = isDark ? "☀️" : "🌙";
});

let history = [];

function addtoHistory(expression, result){
    const entry = `${expression} = ${result}`;
    history.unshift(entry);

    renderHistory();
}

function renderHistory(){
    const list = document.getElementById("historylist");
    list.innerHTML = ""; 

    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;

        li.onclick = () => {
            display.value = item.split("=")[1];  
        }

        list.appendChild(li);
    });
}