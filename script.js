let button = document.querySelector("#startBtn");
let best = document.querySelector("#best");
let box = document.querySelector("#box");
let time = document.querySelector("#time");

let sound = new Audio("sound.wav");

let BestTime = null;
let savedBest = localStorage.getItem("bestTime");
let start;

if (savedBest !== null) {
    BestTime = Number(savedBest);
    best.textContent = BestTime;
}


button.addEventListener("click", function () {
    button.style.opacity = "0";
    button.style.pointerEvents = "none";
    let RandomTime = Math.floor((Math.random() * 3000) + 1000)
    let randomX = Math.floor((Math.random() * 250) + 1);
    let randomY = Math.floor((Math.random() * 150) + 1);
    

    

    setTimeout(() => {
        box.style.left = randomX + "px";
        box.style.top = randomY + "px";
        box.style.display = "block";
        start = Date.now();
    }, RandomTime);
    });

box.addEventListener("click", function () {
        sound.currentTime = 0;
        sound.play();

        let end = Date.now();
        let reactionTime = end - start;
        


    time.textContent = reactionTime;

    if (BestTime === null || reactionTime < BestTime) {
        BestTime = reactionTime;
        best.textContent = BestTime;
        localStorage.setItem("bestTime", BestTime);
    };

    box.style.display = "none";
    button.style.opacity = "1";
    button.style.pointerEvents = "auto";
});