let button = document.querySelector("#startBtn");
let best = document.querySelector("#best");
let box = document.querySelector("#box");
let area = document.querySelector("#gameArea");
let time = document.querySelector("#time");

let canClick = false;
let boxTimeout;

let sound = new Audio("sound.wav");

let BestTime = null;
let savedBest = localStorage.getItem("bestTime");
let start;

if (savedBest !== null) {
    BestTime = Number(savedBest);
    best.textContent = BestTime;
}

area.addEventListener("click", function () {
    if (!canClick && button.style.pointerEvents === "none") {
        clearTimeout(boxTimeout);
        alert("Too early! Wait for the box to appear.");
        button.style.opacity = "1";
        button.style.pointerEvents = "auto";
        box.style.display = "none";
    }
});


button.addEventListener("click", function () {
    button.style.opacity = "0";
    button.style.pointerEvents = "none";
    let RandomTime = Math.floor((Math.random() * 3000) + 1000)
    let randomX = Math.floor((Math.random() * 250) + 1);
    let randomY = Math.floor((Math.random() * 150) + 1);
    

    

    boxTimeout = setTimeout(() => {
        box.style.left = randomX + "px";
        box.style.top = randomY + "px";
        box.style.display = "block";
        start = Date.now();
        canClick = true;
    }, RandomTime);
});


box.addEventListener("click", function (e) {
        e.stopPropagation();
        sound.currentTime = 0;
        sound.play();

        let end = Date.now();
        let reactionTime = end - start;
        
    if (navigator.vibrate) {
        navigator.vibrate([20]);
    }

    time.textContent = reactionTime;

    if (BestTime === null || reactionTime < BestTime) {
        BestTime = reactionTime;
        best.textContent = BestTime;
        localStorage.setItem("bestTime", BestTime);
    };

    box.style.display = "none";
    button.style.opacity = "1";
    button.style.pointerEvents = "auto";
    canClick = false;
});
