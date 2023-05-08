
let startTime;
let biker = document.querySelector(".biker-img");
let blocks = document.querySelectorAll(".blocks");
let startButton = document.querySelector(".start-button");
let jumpButton = document.querySelector(".jump-button-container button");
const numOfBlocks = 100;

setUp();
generateFirstBlocks();

let intervalId;




function setUp() {

    //Activate buttons
    startButton.addEventListener("click", runInterval);
    jumpButton.addEventListener("click", jump);


}

// Make the charactor jump
function jump() {


    if (biker.classList != "animate") {

        biker.classList.add("animate");

        // Animate doubleJump only when jump is animated
        jumpButton.addEventListener("click", doubleJump);
    }

    // Wait 0.4 sec and remove jump animation and doubleJump button activation 
    setTimeout(() => {
        biker.classList.remove("animate");
        jumpButton.removeEventListener("click", doubleJump);
    }, 400)

}

// Make the charactor double jump
function doubleJump() {

    const bikerContainsDoubleJump = biker.classList.contains("animateDoubleJump")
    const bikerContainsAnimate = biker.classList.contains("animate");

    //Runs once after a small jump
    if (!bikerContainsDoubleJump && bikerContainsAnimate) {

        // if (biker.classList != "animate") {
        //     biker.classList.remove("animate");
        // }
        biker.classList.add("animateDoubleJump");

    }

    // Wait 0.4 sec and remove doubleJump button activation and its animation 
    setTimeout(() => {
        jumpButton.removeEventListener("click", doubleJump);
        biker.classList.remove("animateDoubleJump");

    }, 400)
}


// Make the charactor fall
function fall() {

    if (biker.classList != "animateFalling") {
        biker.classList.add("animateFalling");
    }

    //Wait for 0.5 sec and remove animateFalling
    setTimeout(() => {
        biker.classList.remove("animateFalling");
    }, 500)

}


// generate 100 blocks on the bottom
function generateFirstBlocks() {

    let blocksDiv = document.querySelector(".blocks");

    for (let i = 0; i <= numOfBlocks; i++) {

        blocksDiv.innerHTML += (`<div class="block block${i}"></div>`);
        const eachBlock = document.querySelector(`.block${i}`);
        eachBlock.style.marginTop = "100px";
    }
}


// Starts after pressing start button
function runInterval() {

    document.querySelector(".jump-button-container").style.display = "flex";
    //gap will get bigger if you increase this
    let gapCount = 3;
    startTime = new Date();

    const upperScreen = document.querySelector(".upper-screen");
    const lowerScreen = document.querySelector(".lower-screen");
    upperScreen.style.display = 'flex';
    lowerScreen.style.display = 'flex';

    const gameTitleContainer = document.querySelector(".game-title-container");
    const startButtonContainer = document.querySelector(".start-button-container");
    gameTitleContainer.style.display = "none";
    startButtonContainer.style.display = "none";


    intervalId = setInterval(() => {

        //Update distance
        const distance = document.querySelector(".distance");
        distance.innerHTML = `${elapsedTime()} m`;


        const blockLast = document.querySelector(`.block100`);
        let blockLastMarginTop = blockLast.style.marginTop;
        // const block100 = document.querySelector(`.block100`);

        // maximum amount that ranNum can change from the previous value
        const maxChange = 10;


        let ranNum = generateRanNum(blockLastMarginTop, maxChange);


        // change last block's margin-top
        blockLast.style.marginTop = `${ranNum}px`;

        // random number to decide to create gap
        let ranNum2 = Math.floor(Math.random() * 30);

        const maxGapLoop = 3


        // generate new gap
        if (ranNum2 === maxGapLoop || gapCount < maxGapLoop) {
            blockLastMarginTop = "800px";
            gapCount--;

            //stop generating gap once gapCount === 0 
            if (gapCount === 0) {
                gapCount = maxGapLoop;
            }
        }



        //generate new blocks
        for (let i = 0; i < numOfBlocks; i++) {

            const block = document.querySelector(`.block${i}`);
            const blockNext = document.querySelector(`.block${i + 1}`);

            //assign the random number to the last block
            if (i === numOfBlocks - 1) {
                block.style.marginTop = blockLastMarginTop;
                break;
            }

            block.style.marginTop = blockNext.style.marginTop;
        }

        let bikerLeftBlock = parseInt(document.querySelector(`.block12`).style.marginTop);
        let bikerOnBlock = parseInt(document.querySelector(`.block13`).style.marginTop);
        let bikerRightBlock = parseInt(document.querySelector(`.block14`).style.marginTop);


        const myElement = document.getElementById("biker");
        const isAnimating = getComputedStyle(myElement).animationName === "jump";
        const isDoubleAnimating = getComputedStyle(myElement).animationName === "doubleJump";

        //check if biker is below the bikerLeftBlock they just passed
        const isBikerBelowLastBlock = bikerLeftBlock + 150 <= parseInt(document.querySelector(`.biker-img`).style.top);


        /* -------------------Judgement-----------------------*/
        if (bikerOnBlock > 700 && isBikerBelowLastBlock && !isAnimating && !isDoubleAnimating)
            //if biker is off the cliff and not animated they're dead
            fallAction();

        /*------------------------------------------------------ */

        // if the charactor is animated, don't proceed
        if (bikerOnBlock > 700) {
            return;
        }

        //move the biker so it is on top of a block
        biker.style.top = `${bikerOnBlock + 150}px`;

        if (bikerOnBlock < bikerRightBlock && biker.classList != "animate" && biker.classList != "animateDoubleJump") {

            document.querySelector(".biker-img").style.transform = `rotate(2deg)`;

        } else if (bikerOnBlock > bikerRightBlock && biker.classList != "animate" && biker.classList != "animateDoubleJump") {

            document.querySelector(".biker-img").style.transform = `rotate(-2deg)`;

        }

        modifyJump(bikerOnBlock);
        modifyDoubleJump(bikerOnBlock);
        modifyFall(bikerOnBlock);

    }, 50);
}


function generateRanNum(blockLastMarginTop, maxChange) {
    // new margin-top differnece value
    let change = Math.floor(Math.random() * (2 * maxChange + 1)) - maxChange;

    // random number to generate a new block
    let ranNum = parseInt(blockLastMarginTop) + change;

    // new block shouldn't be more than +/- 30px from the last block
    // should be 20 <= ranNum < 320 
    while (ranNum < blockLastMarginTop - 30 || ranNum > blockLastMarginTop + 30 || ranNum < 20 || ranNum > 320) {
        change = Math.floor(Math.random() * (2 * maxChange + 1)) - maxChange;
        ranNum = parseInt(blockLastMarginTop) + change;
    }

    return ranNum;
}



function fallAction() {
    biker.style.transform = `rotate(60deg)`;
    fall();
    clearInterval(intervalId);
    biker.style.left = "150px";
    biker.style.top = "675px";

    const distanceTopLeft = document.querySelector(".distance");
    distanceTopLeft.innerHTML = "";

    const distanceResult = document.querySelector(".distance-result");
    distanceResult.innerHTML = `${elapsedTime()} m`;

    const retryButton = document.querySelector(".retry-button");
    const resultContainer = document.querySelector(".result-container");

    retryButton.innerHTML = 'Menu';

    resultContainer.style.display = "grid";


    document.getElementById("retry-button").addEventListener("click", ()=>{
        // Reload the current page
        location.reload();

    });
 
    
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
    keyframesRule.appendRule(`30% { top: ${top - 10}px }`);

    keyframesRule.deleteRule("70%");
    keyframesRule.appendRule(`70% { top: ${top - 10}px }`);

    const landFirst = parseInt(document.querySelector(`.block20`).style.marginTop);
    const landSecond = parseInt(document.querySelector(`.block21`).style.marginTop);
    const landThird = parseInt(document.querySelector(`.block22`).style.marginTop);
    const landForth = parseInt(document.querySelector(`.block23`).style.marginTop);
    const landFifth = parseInt(document.querySelector(`.block24`).style.marginTop);
    const landSixth = parseInt(document.querySelector(`.block25`).style.marginTop);



    // successful jumps
    if (landFirst < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landFirst}px }`);
        return;
    }

    if (landSecond < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landSecond}px }`);
        return;
    }
    if (landThird < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landThird}px }`);
        return;
    }
    if (landForth < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landForth}px }`);
        return;
    }
    if (landFifth < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landFifth}px }`);
        return;
    }

    if (landSixth < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landSixth}px }`);
        return;
    }


    //fail jump
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
    keyframesRule.appendRule(`30% { top: ${top - 120}px }`);

    keyframesRule.deleteRule("70%");
    keyframesRule.appendRule(`70% { top: ${top - 120}px }`);

    const landFirst = parseInt(document.querySelector(`.block26`).style.marginTop);
    const landSecond = parseInt(document.querySelector(`.block27`).style.marginTop);
    const landThird = parseInt(document.querySelector(`.block28`).style.marginTop);
    const landForth = parseInt(document.querySelector(`.block29`).style.marginTop);
    const landFifth = parseInt(document.querySelector(`.block30`).style.marginTop);


    //successful jumps
    if (landFirst < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landFirst}px }`);
        return;
    }

    if (landSecond < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landSecond}px }`);
        return;
    }
    if (landThird < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landThird}px }`);
        return;
    }
    if (landForth < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landForth}px }`);
        return;
    }
    if (landFifth < 700) {
        keyframesRule.deleteRule("100%");
        keyframesRule.appendRule(`100% { top: ${landFifth}px }`);
        return;
    }

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
    // Time difference in milliseconds
    var timeDiff = currentTime - startTime;
    // Convert milliseconds to seconds
    var seconds = Math.floor(timeDiff / 250);
    return seconds;
}