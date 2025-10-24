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

let windowWidth = "";

const welcomeTextContainer = document.querySelector('.welcome-text__text-container');
const welcomeTextContainerWidth = welcomeTextContainer.getBoundingClientRect().width;
console.log(welcomeTextContainerWidth);
welcomeTextContainer.style.width = welcomeTextContainerWidth + "px";
// console.log(welcomeTextContainer);

const welcomeTextBorder = document.querySelector(".welcome-text__border");
// console.log(titleBorder);

// 2025 remix ---------------------- //
let welcomeTextWordContainers = [...welcomeTextContainer.querySelectorAll("div")];
// console.log(welcomeTextSpans);
const welcomeTextContentOfEachSpanArr = Array.from(welcomeTextWordContainers).map(span => span.textContent);
// console.log(welcomeTextContentOfEachSpanArr);
const welcomeTextEachWordsLength = welcomeTextContentOfEachSpanArr.map(w => w.length);
// console.log(welcomeTextEachWordsLength);
const welcomeTextOneLongWord = welcomeTextContentOfEachSpanArr.join('')
// console.log(welcomeTextOneLongWord);
const welcomeTextCharArr = [...welcomeTextOneLongWord]
// console.log(welcomeTextCharArr);
const welcomeTextTotalLength = welcomeTextCharArr.length;
// console.log(welcomeTextTotalLength);

const welcomeTextWrapper = document.querySelector(".welcome-text-wrapper ")
// console.log(welcomeTextWrapper);

// Grab more elements from page
const title = document.querySelector('.title');
const sec1 = document.querySelector('.sec1');

// Grab undersconst
const underConstWrapper = document.querySelector(".underconst-wrapper")
// console.log(underConstWrapper);

// Find out how many letters each word is
// const krvEachWordLength = welcomeTextSpans.map(w => w.getBoundingClientRect().width);
// console.log(krvEachWordLength);

function switchWord(div, contentArray, ownClass, interval = 8000) {
    let index = 0;
    return setInterval(() => {
        // change the word
        div.innerHTML = contentArray[index];
        index = (index + 1) % contentArray.length;

        // trigger the glitch
        div.classList.remove(ownClass); // reset previous glitch
        void div.offsetWidth;               // force reflow so animation restarts
        div.classList.add(ownClass);    // apply glitch

        // remove class after animation finishes
        setTimeout(() => div.classList.remove(ownClass), 2000);
        setTimeout(() => div.classList.add(ownClass), 7000);
    }, interval);
}



// intersection observer for ${title} hitting 50% of viewport

const origWelcomeHtml = welcomeTextContainer.innerHTML;

const viewportObserverOptions = {
    root: null,
    threshold: 0,
    rootMargin: "0px 0px -40% 0px"
};

let letterArr = [];

const viewportObserver = new IntersectionObserver(function (entries, observer) {

    entries.forEach(entry => {

        windowWidth = window.innerWidth;
        // title.classList.toggle("title-observed", entry.isIntersecting);

        titleSpan.classList.toggle("title-span-stuck", entry.isIntersecting);

        // console.log(entry.target, entry.isIntersecting);
        const maxTransitionTime = 1000;



        if (entry.isIntersecting) {
            console.log("ITS INTERSECTING!!!");

            // const welcomeTextContainer = document.getElementById('welcome-text__text-container');
            const originalSpans = Array.from(welcomeTextContainer.querySelectorAll('div')); // static snapshot
            console.log(originalSpans);

            const spansBrokenUpArr = [];

            // Step 1: Wrap letters
            // Step 1: Wrap letters inside words
            originalSpans.forEach(originalSpan => {
                const text = originalSpan.textContent;

                const wordContainer = document.createElement('div');
                wordContainer.classList.add('word');

                for (const char of text) {
                    const letterSpan = document.createElement('span');
                    letterSpan.textContent = char === ' ' ? '\u00A0' : char;
                    letterSpan.classList.add('letter');
                    wordContainer.appendChild(letterSpan);
                }

                spansBrokenUpArr.push(wordContainer);
                console.log(spansBrokenUpArr);
            });



            welcomeTextContainer.innerHTML = "";
            spansBrokenUpArr.forEach(word => {
                welcomeTextContainer.appendChild(word)
            })

            letterArr = welcomeTextContainer.querySelectorAll(".letter");
            console.log(letterArr);
            letterArr.forEach(letter => {

                const letterTop = letter.getBoundingClientRect().top;
                const letterLeft = letter.getBoundingClientRect().left;
                const letterWidth = letter.getBoundingClientRect().width;
                const letterHeight = letter.getBoundingClientRect().height;

                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;

                // Calculate maximum distances
                const maxLeft = letterLeft; // distance to left edge
                const maxRight = windowWidth - letterLeft - letterWidth; // distance to right edge
                const maxTop = letterTop;
                const maxBottom = windowHeight - letterTop - letterHeight;

                // Generate random left value between -maxLeft and maxRight
                const randomX = Math.random() * (maxRight + maxLeft) - maxLeft;
                // Generate random top value
                const randomY = Math.random() * (maxBottom + maxTop) - maxTop;
                // Random duration
                const randomDuration = Math.random() * (maxTransitionTime + 500);
                // Random rotation
                const rotateX = Math.random() * 720;
                // console.log(rotateX);
                // Random scale
                const scale = Math.random() * 5;

                // Apply transform with transition
                letter.style.transition = `transform ${randomDuration}ms cubic-bezier(.09,1.3,.78,.98), opacity 1s ease-out`;

                // trigger transition after layout
                setTimeout(() => {
                                        letter.style.transform = `translateX(${randomX}px) translateY(${randomY}px) rotate(${rotateX}deg) scale(${scale})`;

                }, 250 * 0.8);
                requestAnimationFrame(() => {
                });
            });
            underConstWrapper.classList.add("underconst-wrapper--open")

        } else {
            console.log("NO INTERSECTION");
            letterArr.forEach((letter, i) => {
                letter.style.transform = `translateX(0px)`
                // letter.style.color = "black";
            })
            setTimeout(() => {
                welcomeTextContainer.innerHTML = origWelcomeHtml;
                requestAnimationFrame(() => {
                    welcomeTextWordContainers = [...welcomeTextContainer.querySelectorAll("div")];
                    switchWord(welcomeTextWordContainers[0], ["create", "love"], "glitching")
                    switchWord(welcomeTextWordContainers[2], ["live.", "create."], "glitching2")
                })
            }, maxTransitionTime);

            underConstWrapper.classList.remove("underconst-wrapper--open")


        }
    });
}, viewportObserverOptions);

viewportObserver.observe(underConstWrapper);


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
            welcomeTextBorder.classList.add("krv-border-show");
            // Get new titleSpan width
            let titleSpanStuckWidth = null;
            // Wait .5 secs so transition font size is done
            setTimeout(() => {
                titleSpanStuckWidth = window.getComputedStyle(titleSpan).width;
                // console.log(titleSpanStuckWidth);
                // Add new title span width to title border, again wait .5 secs
                welcomeTextBorder.style.width = titleSpanStuckWidth;
            }, 1000);



        } else {
            console.log("CLEAR");
            // clearMetaballs()
            welcomeTextBorder.style.width = "0";
        }

    })
}, krvBorderBottomObserverOptions);

krvBorderBottomObserver.observe(title)
