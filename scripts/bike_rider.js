let biker = document.querySelector(".biker-img");
let blocks = document.querySelectorAll(".blocks");
let distanceTook=0;

document.querySelector(".start-button").addEventListener("click",runInterval);
var startTime;

document.querySelector(".jump-button-container button").addEventListener("click", jump);



function jump() {
    if (biker.classList != "animate") {
        
        biker.classList.add("animate");
        document.querySelector(".jump-button-container button").addEventListener("click", doubleJump);
    }

    setTimeout(() => {
        biker.classList.remove("animate");
        document.querySelector(".jump-button-container button").removeEventListener("click", doubleJump);
    }, 400)

}


function doubleJump() {
    if (biker.classList != "animateDoubleJump" && biker.classList.contains("animate")) {
        if (biker.classList != "animate") {
            biker.classList.remove("animate");
        }
        biker.classList.add("animateDoubleJump");
    }

    setTimeout(() => {
        
        document.querySelector(".jump-button-container button").removeEventListener("click", doubleJump);
        biker.classList.remove("animateDoubleJump");
        
    }, 400)
}

function fall() {
    if (biker.classList != "animateFalling") {
        biker.classList.add("animateFalling");
    }
    setTimeout(() => {
        biker.classList.remove("animateFalling");
    }, 500)

}

function generateFirstBlocks() {

    for (let i = 0; i < 101; i++) {
        document.querySelector(".blocks").innerHTML += (`<div class="block block${i}"></div>`);
        document.querySelector(`.block${i}`).style.marginTop = "100px";
    }
}

generateFirstBlocks();




// document.querySelector(`.block100`).style.marginTop=`${Math.round(Math.random()*295)}px`;
document.querySelector(`.block100`).style.marginTop = `100px`;
document.querySelector(".biker-img").style.top = document.querySelector(`.block13`).style.marginTop;
var myBiker = document.getElementById("biker");
myBiker.style.top = "250px";
let isTimeoutRunning = false;
let intervalId;
let count = 3;

function runInterval() {
    
    startTime = new Date();
    document.querySelector(".upper-screen").style.display = 'flex';
    document.querySelector(".lower-screen").style.display = 'flex';
    document.querySelector(".game-title-container").style.display = "none";
    document.querySelector(".start-button-container").style.display = "none";

    intervalId = setInterval(() => {
        
        document.querySelector(".distance").innerHTML = `${elapsedTime()} m`;
        let temp = document.querySelector(`.block100`).style.marginTop;
        const block100 = document.querySelector(`.block100`);
        // console.log(temp);
        let ranNum = 0;

        let maxChange = 10; // maximum amount that ranNum can change from the previous value

        let change = Math.floor(Math.random() * (2 * maxChange + 1)) - maxChange;

        ranNum = parseInt(temp) + change;
        while (ranNum < temp - 30 || ranNum > temp + 30 || ranNum < 20 || ranNum > 320) {
            change = Math.floor(Math.random() * (2 * maxChange + 1)) - maxChange;
            ranNum = parseInt(temp) + change;
        }

        block100.style.marginTop = `${ranNum}px`;

        let ranNum2 = Math.floor(Math.random() * 30);

        if (ranNum2 === 3 || count < 3) {
            temp = "800px";
            count--;
            if (count === 0) {
                count = 3;
            }
        }




        for (let i = 0; i < 100; i++) {
            const block = document.querySelector(`.block${i}`);
            const blockNext = document.querySelector(`.block${i + 1}`);




            if (i === 99) {
                block.style.marginTop = temp;
                break;
            }
            block.style.marginTop = blockNext.style.marginTop;
        }

        let block12 = parseInt(document.querySelector(`.block12`).style.marginTop);
        let block13 = parseInt(document.querySelector(`.block13`).style.marginTop);
        let block16 = parseInt(document.querySelector(`.block16`).style.marginTop);
   

        const myElement = document.getElementById("biker");
        const isAnimating = getComputedStyle(myElement).animationName === "jump";
        const isDoubleAnimating = getComputedStyle(myElement).animationName === "doubleJump";

        
        if (block13 > 700 && block12 + 150 <= parseInt(document.querySelector(`.biker-img`).style.top) && !isAnimating && !isDoubleAnimating) {

            document.querySelector(".biker-img").style.transform = `rotate(60deg)`;
            fall();
            clearInterval(intervalId);
            distanceTook = elapsedTime();
            document.querySelector(".biker-img").style.left = "150px";
            document.querySelector(".biker-img").style.top = "675px";
            document.querySelector(".distance-result").innerHTML = `${elapsedTime()} m`;
            document.querySelector(".retry-button").innerHTML = 'Retry';
            document.querySelector(".result-container").style.display = "grid";
            document.querySelector(".distance").innerHTML = "";
            document.querySelector(".retry-button").addEventListener("click",()=>{
                // Reload the current page
                location.reload();

            })

        }
        if (block13 > 700) {
            return;
        }

        document.querySelector(".biker-img").style.top = `${block13 + 150}px`;


        if (block13 < block16 && biker.classList != "animate" && biker.classList != "animateDoubleJump") {
            document.querySelector(".biker-img").style.transform = `rotate(2deg)`;
        } else if (block13 > block16 && biker.classList != "animate" && biker.classList != "animateDoubleJump") {
            document.querySelector(".biker-img").style.transform = `rotate(-2deg)`;
        }


        modifyJump(block13);
        modifyDoubleJump(block13);
        modifyFall(block13);
        //modifyFall(block13);
    }, 50);
}





function modifyJump(top) {
    

    const styleSheet = [...document.styleSheets].find(
        (sheet) => sheet.href.endsWith("style_general.css")
    );

    const keyframesRule = [...styleSheet.cssRules].find(
        (rule) => rule.type === CSSRule.KEYFRAMES_RULE && rule.name === "jump"
    );

    keyframesRule.deleteRule("0%");
    keyframesRule.appendRule(`0% { top: ${top}px }`);
    
    keyframesRule.deleteRule("30%");
    keyframesRule.appendRule(`30% { top: ${top-10}px }`);

    keyframesRule.deleteRule("70%");
    keyframesRule.appendRule(`70% { top: ${top-10}px }`);

    const landBlock4 = parseInt(document.querySelector(`.block20`).style.marginTop);
    const landBlock5 = parseInt(document.querySelector(`.block21`).style.marginTop);
    const landBlock6 = parseInt(document.querySelector(`.block22`).style.marginTop);
    const landBlock7 = parseInt(document.querySelector(`.block23`).style.marginTop);
    const landBlock8 = parseInt(document.querySelector(`.block24`).style.marginTop);
    const landBlock9 = parseInt(document.querySelector(`.block25`).style.marginTop);


    if (landBlock4 < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landBlock4}px }`);
        return;
    }

    if (landBlock5 < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landBlock5}px }`);
        return;
    }
    if (landBlock6 < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landBlock6}px }`);
        return;
    }
    if (landBlock7 < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landBlock7}px }`);
        return;
    }
    if (landBlock8 < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landBlock8}px }`);
        return;
    }

    if (landBlock9 < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landBlock9}px }`);
        return;
    }


    keyframesRule.deleteRule("100%");
    keyframesRule.appendRule(`100% { top: ${top + 200}px }`);

}

function modifyDoubleJump(top) {
    

    const styleSheet = [...document.styleSheets].find(
        (sheet) => sheet.href.endsWith("style_general.css")
    );

    const keyframesRule = [...styleSheet.cssRules].find(
        (rule) => rule.type === CSSRule.KEYFRAMES_RULE && rule.name === "doubleJump"
    );

    keyframesRule.deleteRule("0%");
    keyframesRule.appendRule(`0% { top: ${top}px }`);

    keyframesRule.deleteRule("30%");
    keyframesRule.appendRule(`30% { top: ${top-120}px }`);

    keyframesRule.deleteRule("70%");
    keyframesRule.appendRule(`70% { top: ${top-120}px }`);

    const landBlock4 = parseInt(document.querySelector(`.block26`).style.marginTop);
    const landBlock5 = parseInt(document.querySelector(`.block27`).style.marginTop);
    const landBlock6 = parseInt(document.querySelector(`.block28`).style.marginTop);
    const landBlock7 = parseInt(document.querySelector(`.block29`).style.marginTop);
    const landBlock8 = parseInt(document.querySelector(`.block30`).style.marginTop);
    // const landBlock9 = parseInt(document.querySelector(`.block25`).style.marginTop);



    if (landBlock4 < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landBlock4}px }`);
        return;
    }

    if (landBlock5 < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landBlock5}px }`);
        return;
    }
    if (landBlock6 < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landBlock6}px }`);
        return;
    }
    if (landBlock7 < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landBlock7}px }`);
        return;
    }
    if (landBlock8 < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landBlock8}px }`);
        return;
    }

    // if (landBlock9 < 700) {
    //     keyframesRule.deleteRule("100%");
    //     keyframesRule.appendRule(`100% { top: ${landBlock9}px }`);
    //     return;
    // }


    // keyframesRule.deleteRule("100%");
    // keyframesRule.appendRule(`100% { top: ${top + 200}px }`);

}



function modifyFall() {
    const styleSheet = [...document.styleSheets].find(
        (sheet) => sheet.href.endsWith("style_general.css")
    );

    const keyframesRule = [...styleSheet.cssRules].find(
        (rule) => rule.type === CSSRule.KEYFRAMES_RULE && rule.name === "fall"
    );

    let bikerTop = parseInt(document.querySelector('.biker-img').style.top);
    keyframesRule.deleteRule("0%");
    keyframesRule.appendRule(`0% { top: ${bikerTop}px }`);

    keyframesRule.deleteRule("100%");
    keyframesRule.appendRule(`100% { top: ${bikerTop + 320}px }`);
}



// Calculate the elapsed time since the page was loaded
function elapsedTime() {
  var currentTime = new Date();
  var timeDiff = currentTime - startTime; // Time difference in milliseconds
  var seconds = Math.floor(timeDiff / 250); // Convert milliseconds to seconds
  return seconds;
}

// Call the elapsedTime function to get the time elapsed since the page was loaded
