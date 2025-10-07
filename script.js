// Removes preload class to body after 1/2 secs

setTimeout(function () {
    document.body.className = "";
}, 500);

// This below removed a class on load, no longer needed

// window.onload = function() {
//     titleText.classList.remove('title-text-mod');
// };

// titleBorder.classList.add('krv-border')

// document.onload = function () {
//     titleText.classList.remove('title-text-mod');
// };


// 1. Get variables

const krv = document.querySelector('.krv');
console.log(krv);

// 2025 remix ---------------------- //
const krvSpans = [...krv.querySelectorAll("span")];
console.log(krvSpans);
const krvTextOfEachSpanArr = Array.from(krvSpans).map(span => span.textContent);
console.log(krvTextOfEachSpanArr);
const krvTextEachWordsLength = krvTextOfEachSpanArr.map(w => w.length);
console.log(krvTextEachWordsLength);
const krvTextOneLongWord = krvTextOfEachSpanArr.join('')
console.log(krvTextOneLongWord);
const krvTextCharArr = [...krvTextOneLongWord]
console.log(krvTextCharArr);
const krvTextTotalLength = krvTextCharArr.length;
console.log(krvTextTotalLength);

const krvWrapper = document.querySelector(".krv-wrapper")
console.log(krvWrapper);

// Grab more elements from page
const title = document.querySelector('.title');
const sec1 = document.querySelector('.sec1');

// Find out how many letters each word is
const krvEachWordLength = krv.innerHTML.split("<br>").map(w => w.length);
console.log(krvEachWordLength);

function switchWord(div, contentArray, interval = 2000) {
    let index = 0;
    return setInterval(() => {
       div.innerHTML = contentArray[index];
       index = (index + 1) % contentArray.length; 
    }, interval);
}

switchWord(krvSpans[0], ["live", "love"])

// intersection observer for ${title} hitting 50% of viewport

const titleObserverOptions = {
    root: null,
    threshold: 0,
    rootMargin: "0px 0px -45% 0px"
};

const titleObserver = new IntersectionObserver(function (entries, titleObserver) {

    entries.forEach(entry => {

        // title.classList.toggle("title-observed", entry.isIntersecting);

        titleSpan.classList.toggle("title-span-stuck", entry.isIntersecting);

        // console.log(entry.target, entry.isIntersecting);

        if (entry.isIntersecting) {

            krv.parentNode.removeChild(krv)

            // Make a div with specific classes for each character
            // Build the letters into .krv
            krvTextCharArr.forEach((character, i) => {
                const lowerCaseChar = character.toLowerCase();

                // Calculate word lengths
                const firstWordLength = krvTextOfEachSpanArr[0].length;
                const lastWordLength = krvTextOfEachSpanArr[krvTextOfEachSpanArr.length - 1].length;
                const middleWordLength = krvTextOfEachSpanArr.length === 3 ? krvTextOfEachSpanArr[1].length : 0;

                // const totalLength = krvTextCharArr.length;
                const startOfMiddleWord = firstWordLength;
                const startOfLastWord = krvTextTotalLength - lastWordLength;

                let nameClass = "";

                if (i < firstWordLength) {
                    nameClass = "firstRow"; // first word
                } else if (krvTextOfEachSpanArr.length === 3 && i >= startOfMiddleWord && i < startOfLastWord) {
                    nameClass = "middleRow"; // middle word
                } else if (i >= startOfLastWord) {
                    nameClass = "lastRow"; // last word
                }

                krvWrapper.innerHTML += `<div class="krv_${i}_${lowerCaseChar} ${nameClass}">${character}</div>`;
            });




            // Get KRV elements
            const krvDivs = krvWrapper.querySelectorAll("div");

            // Add classes for first letter vs rest of word using **index boundaries**
            const firstWordLength = krvTextOfEachSpanArr[0].length;
            const lastWordLength = krvTextOfEachSpanArr[krvTextOfEachSpanArr.length - 1].length;
            const middleWordLength = krvTextOfEachSpanArr.length === 3 ? krvTextOfEachSpanArr[1].length : 0;
            // const totalLength = krvTextCharArr.length;

            const startOfMiddleWord = firstWordLength;
            const startOfLastWord = krvTextTotalLength - lastWordLength;

            krvTextCharArr.forEach((char, i) => {
                let className;

                // ✅ If it's the very first letter of any word (based on index)
                if (i === 0 || i === startOfMiddleWord || i === startOfLastWord) {
                    className = "firstLetter-krv-word";
                } else {
                    className = "restLetter-krv-word";
                }

                krvDivs[i].classList.add(className);
            });



            // Grab newly formed top left KRV
            const newKrvDivs = document.querySelectorAll('.firstLetter-krv-word');
            // console.log(newTopKrv);

            // Add unique class name to each names first character
            function addClassToFirstLetter(divs, extra) {
                divs.forEach((div, i) => {
                    i++;
                    div.classList.add(`${extra}${i}-char1`);
                });
            };

            addClassToFirstLetter(newKrvDivs, "name");

            // Function for adding dots to two first letters
            // function addDotts(divs) {
            //     for (let i = 0; i < divs.length - 1; i++) {
            //         divs[i].innerHTML = divs[i].innerHTML + `<div class="krv__dotts krv__dott${i + 1}">.</div>`;
            //     }
            // }
            // // Call above function after Xs 
            // setTimeout(() => { addDotts(newKrvDivs) }, 500);


            // Grab rest of divs
            const restOfKrvDivs = document.querySelectorAll(".restLetter-krv-word");

            // console.log(restOfKrvDivs);

            // Add unique effect to each of restofKrvDivs
            function addEffectToRestOfKrvDivs(divs) {
                let windowWidth = window.innerWidth;
                // console.log(windowWidth);

                // Unique random number function
                function makeUniqueRandomNumbersArray(min, max, length) {
                    let uniqueRandomNumberArray = [];
                    for (let i = 0; i < length; i++) {
                        let uniqueRandomNumber = Math.round(Math.random() * (max - min));
                        if (!uniqueRandomNumberArray.includes(uniqueRandomNumber)) {
                            uniqueRandomNumberArray.push(uniqueRandomNumber);
                        } else if (uniqueRandomNumberArray.includes(uniqueRandomNumber)) {
                            i--;
                        }
                    }
                    return uniqueRandomNumberArray;
                }

                // Non Unique random number function
                function makeRandomNumber(min, max, length) {
                    let randomNumberArray = [];
                    for (let i = 0; i < length; i++) {
                        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                        randomNumberArray.push(randomNumber);
                    }
                    return randomNumberArray;
                };

                // Set different values depending on window width

                let randomStyleRightNumbers = [];
                // let randomFontSizes = makeRandomNumber(2,14,restOfKrvDivs.length);
                let randomFontSizes = [];
                let topRightLetter = "";
                let topRightLetterTop = "";

                if (windowWidth < 400) {
                    randomStyleRightNumbers = makeUniqueRandomNumbersArray(0, windowWidth * 0.45, restOfKrvDivs.length);
                    randomFontSizes = makeRandomNumber(2, 12, restOfKrvDivs.length);
                    topRightLetter = "16rem";
                    topRightLetterTop = "-80px";
                } else if (windowWidth < 600) {
                    randomStyleRightNumbers = makeUniqueRandomNumbersArray(0, windowWidth * 0.55, restOfKrvDivs.length);
                    randomFontSizes = makeRandomNumber(2, 13, restOfKrvDivs.length);
                    topRightLetter = "17rem";
                    topRightLetterTop = "-100px";
                } else if (windowWidth < 800) {
                    randomStyleRightNumbers = makeUniqueRandomNumbersArray(0, windowWidth * 0.65, restOfKrvDivs.length);
                    randomFontSizes = makeRandomNumber(2, 14, restOfKrvDivs.length);
                    topRightLetter = "18rem";
                    topRightLetterTop = "-110px";
                } else if (windowWidth < 1200) {
                    randomStyleRightNumbers = makeUniqueRandomNumbersArray(0, windowWidth * 0.75, restOfKrvDivs.length);
                    randomFontSizes = makeRandomNumber(2, 18, restOfKrvDivs.length);
                    topRightLetter = "22rem";
                    topRightLetterTop = "-120px";
                } else {
                    randomStyleRightNumbers = makeUniqueRandomNumbersArray(0, windowWidth * 0.8, restOfKrvDivs.length);
                    randomFontSizes = makeRandomNumber(4, 24, restOfKrvDivs.length);
                    topRightLetter = "28rem";
                    topRightLetterTop = "-140px";
                }

                // Make random rotate numbers
                let randomRotateNumber = makeUniqueRandomNumbersArray(0, 360, restOfKrvDivs.length)

                // Make random anim duration numbers
                function makeRandomAnimDuration(length) {
                    let randomAnimDurationArray2 = [];
                    for (let i = 0; i < length; i++) {
                        let animDur = Math.ceil(Math.random() * 5) / 10 + 0.5;
                        randomAnimDurationArray2.push(animDur);
                    }
                    return randomAnimDurationArray2;
                }

                let randomAnimDuration = makeRandomAnimDuration(restOfKrvDivs.length);
                console.log(randomAnimDuration);

                // Add styles to each div
                divs.forEach((div, i) => {

                    // Generate 50-50 chance if rotation gets a -(minus) or not in front of rotation number
                    let plusOrMinus = Math.random() < 0.5;
                    if (plusOrMinus) {
                        div.style.transform = `rotate(${randomRotateNumber[i]}deg)`;
                    } else {
                        div.style.transform = `rotate(-${randomRotateNumber[i]}deg)`;
                    }

                    div.style.right = `${randomStyleRightNumbers[i]}px`;
                    div.style.fontSize = `${randomFontSizes[i]}rem`;
                    div.style.animationDuration = `${randomAnimDuration[i]}s`;

                    switch (div.style.fontSize) {
                        case "24rem":
                        case "23rem":
                        case "22rem":
                            div.style.top = "-140px";
                            break;
                        case "21rem":
                        case "20rem":
                        case "19rem":
                            div.style.top = "-120px";
                            break;
                        case "18rem":
                        case "17rem":
                        case "16rem":
                            div.style.top = "-100px";
                            break;
                        case "15rem":
                        case "14rem":
                        case "13rem":
                            div.style.top = "-80px";
                            break;
                        case "12rem":
                        case "11rem":
                        case "10rem":
                            div.style.top = "-60px";
                            break;
                        case "9rem":
                        case "8rem":
                            div.style.top = "-50px";
                            break;
                        case "7rem":
                        case "6rem":
                            div.style.top = "-40px";
                            break;
                        case "5rem":
                        case "4rem":
                            div.style.top = "-30px";
                            break;
                        case "3rem":
                            div.style.top = "-25px";
                            break;
                        default:
                            break;
                    }
                });

                // Pick random elements from array and style them to go right
                function pickRandomElements(array, amount) {
                    let randomElementsArray = [];
                    for (let i = 0; i < amount; i++) {
                        let randomElement = array[Math.floor(Math.random() * array.length)];
                        if (!randomElementsArray.includes(randomElement)) {
                            randomElementsArray.push(randomElement);
                        } else if (randomElementsArray.includes(randomElement)) {
                            i--;
                        }
                    }
                    return randomElementsArray;
                }

                let halfOfRestOfKrvDivs = restOfKrvDivs.length / 2;
                let pickedElementsToGoRight = pickRandomElements(restOfKrvDivs, halfOfRestOfKrvDivs);
                let moveYElements = makeRandomNumber(0, (window.innerHeight / 3), halfOfRestOfKrvDivs);

                pickedElementsToGoRight.forEach((div, i) => {
                    // console.log(i);

                    if (i == 0) {
                        // console.log(div);
                        div.style.transform = "rotate(240deg)";
                        div.style.right = "10px";
                        div.style.top = topRightLetterTop;
                        div.style.fontSize = topRightLetter;
                        div.style.animationDuration = "1.4s";

                    } else {
                        div.style.right = "0px";
                        div.style.top = `${moveYElements[i]}px`;
                    }
                });
            };

            addEffectToRestOfKrvDivs(restOfKrvDivs);

            // Add animation (changed) class
            // krv.classList.add('krv-changed');
            // title.classList.add('title-observed')

        } else {
            // Remove animation (changed) class
            // krv.classList.remove('krv-changed');
            // title.classList.remove('title-observed')
            krvWrapper.innerHTML = "";

            krvWrapper.appendChild(krv);
        }
    });
}, titleObserverOptions);

titleObserver.observe(title);


// meta balls start here

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const rect = canvas.getBoundingClientRect();
// let grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

// ctx.fillStyle = "rgba(50, 100, 0, .8)";
ctx.fillStyle = "rgba(0, 0, 0, 1)";
ctx.fillStyle = "rgba(126, 225, 205, 1)";
// ctx.strokeStyle = "black";
ctx.lineWidth = 10;


class Ball {
    constructor(effect) {
        this.effect = effect;
        // this.x = this.effect.width * 0.5;
        // this.x = this.effect.width * (0.48 + Math.random() * (0.52 - 0.48));
        // this.x = Math.random() * this.effect.width - this.effect.width * 0.2;
        this.x = Math.random() * this.effect.width;
        // this.y = Math.random() * (this.effect.height - this.effect.height * 0.8) + 0.4;
        this.y = Math.random() * this.effect.height;
        // this.y = this.effect.height * (0.48 + Math.random() * (0.52 - 0.48));
        // this.y = this.effect.height * (Math.random() * 0.01) + 4 ;
        // this.y = this.effect.height * 0.5;

        // this.x = Math.random() * this.effect.width;
        // this.y = Math.random() * this.effect.height;
        // Make different sized balls depending on window width
        console.log(this.effect.width);
        if (this.effect.width < 400 || this.effect.height < 200) {
            this.radius = Math.random() * 800 + 30;
        } else if (this.effect.width < 900 || this.effect.height < 300) {
            this.radius = Math.random() * 700 + 40;
        } else if (this.effect.width < 1000 || this.effect.height < 400) {
            this.radius = Math.random() * 800 + 40;
        } else if (this.effect.width < 1200 || this.effect.height < 500) {
            this.radius = Math.random() * 140 + 40;
        } else {
            this.radius = Math.random() * 1500 + 50;
        }
        // this.radius = Math.random() * 200 + 10;

        this.growSpeed = 1.00;
        this.index = 1;
        this.orgRadius = this.radius;
        this.newRadius = this.radius * 0.1;
        this.radius = this.newRadius;

        // this.radius = Math.random() * 80 + 20;
        // console.log(this.effect.width);
        // console.log(this.orgRadius.toFixed(3), this.newRadius.toFixed(3));
        this.speedX = Math.random() - 0.5;
        this.speedY = Math.random() - 0.5;
    }
    update() {
        // for (let i = this.index; i < 100; i++) {
        //     this.radius = this.radius + .001;
        //     // console.log(this.radius, this.orgRadius);

        // }

        if (this.radius < this.orgRadius) {
            this.radius *= this.growSpeed;
        }


        // if (this.index < 200) {
        //     this.radius = this.radius + 0.25;
        // } 

        // this.index++;



        if (this.x < this.radius || this.x > this.effect.width - this.radius) this.speedX *= -1;
        if (this.y < this.radius || this.y > this.effect.height - this.radius) this.speedY *= -1;
        this.x += this.speedX;
        this.y += this.speedY;


        // this.radius = this.radius * 0.002;


        // console.log(this.index);


    }
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        // context.stroke();
    }
    reset() {
        // this.x = this.effect.width * 0.5;
        // this.y = Math.random() * this.effect.height * 0.6 + this.effect.height * 0.2;
        // this.x = this.effect.width * 0.5;
        // this.x = this.effect.width;
        this.x = Math.random() * this.effect.width;
        // this.y = this.effect.height * 0.5;
        // this.y = this.effect.height;
        this.y = Math.random() * this.effect.height;
        this.speedX = Math.random() - 0.5;
        this.speedY = Math.random() - 0.5;
    }
}

class MetaballsEffect {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.metaballsArray = [];
    }
    init(numberOfBalls) {
        // if (this.width > 1200) numberOfBalls * 1.5;
        for (let i = 0; i < numberOfBalls; i++) {
            this.metaballsArray.push(new Ball(this));
        }
    }
    update() {
        this.metaballsArray.forEach(metaball => metaball.update());
    }
    draw(context) {
        this.metaballsArray.forEach(metaball => metaball.draw(context));
    }
    reset(newWidth, newHeight) {
        this.width = newWidth;
        this.height = newHeight;
        this.metaballsArray.forEach(metaball => metaball.reset());
    }
}

const effect = new MetaballsEffect(canvas.width, canvas.height);
effect.init(30);

function animateMetaballs() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    effect.update();
    effect.draw(ctx);
    requestAnimationFrame(animateMetaballs);
}

function clearMetaballs() {
    // effect.reset(canvas.width, canvas.height);
    cancelAnimationFrame(animateMetaballs)
}


animateMetaballs();

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "rgba(126, 225, 205, 1)";
    effect.reset(canvas.width, canvas.height);
})


// Make a border bottom when sticky element is stuck

const krvBorder = document.querySelector(".krv-border");
// console.log(titleBorder);

const titleSpan = document.querySelector(".title-span");
let titleSpanWidth = titleSpan.offsetWidth;



const krvBorderBottomObserverOptions = {
    root: null,
    threshold: 0,
    rootMargin: `0px 0px -95% 0px`
}

const krvBorderBottomObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // console.log("title2 " + entry.isIntersecting);

        // Add class to title element
        titleSpan.classList.toggle("title-span-stuck", entry.isIntersecting);

        if (entry.isIntersecting) {
            // Add class to title border
            krvBorder.classList.add("krv-border-show");
            // Get new titleSpan width
            let titleSpanStuckWidth = null;
            // Wait .5 secs so transition font size is done
            setTimeout(() => {
                titleSpanStuckWidth = window.getComputedStyle(titleSpan).width;
                // console.log(titleSpanStuckWidth);
                // Add new title span width to title border, again wait .5 secs
                krvBorder.style.width = titleSpanStuckWidth;
            }, 1000);



        } else {
            console.log("CLEAR");
            // clearMetaballs()
            krvBorder.style.width = "0";
        }

    })
}, krvBorderBottomObserverOptions);

krvBorderBottomObserver.observe(title)
