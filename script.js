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

const stickyHeadingsSectionsArr = Array.from(document.querySelectorAll(".sticky-headings-section"));
console.log(stickyHeadingsSectionsArr);

const stickyHeadingsContentArr = document.querySelectorAll(".sticky-headings-content");
// const stickyHeadContentWidth = stickyHeadingsContent.getBoundingClientRect().width;

const maxWidth = Math.max(...Array.from(stickyHeadingsContentArr).map(el => el.offsetWidth));
console.log("Widest width:", maxWidth);

// console.log(widest);

stickyHeadingsContentArr.forEach(content => {
    content.style.width = maxWidth + "px";
})

// stickyHeadingsContent.style.width = stickyHeadContainerWidth + "px";
// console.log(welcomeTextContainer);


// Grab title elements from page
const titleWrapper = document.querySelector('.title-wrapper');
const titleSpanContainer = document.querySelector(".title-span-container")

stickyHeadingsSectionsArr.forEach(section => {
    const stickyTextSpans = section.querySelectorAll(".sticky-text-span");
    stickyTextSpans.forEach(span => {
        const spanTextContent = span.textContent;
        // console.log(spanTextContent);
        span.innerHTML = "";


        for (const char of spanTextContent) {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = char === ' ' ? '\u00A0' : char;
            letterSpan.classList.add('sticky-text__letter');
            span.appendChild(letterSpan);
        }

    })
})


function switchWord(div, contentArray, ownClass, interval = 8000) {
    let index = 0;
    return setInterval(() => {
        // change the word
        div.innerHTML = contentArray[index];
        index = (index + 1) % contentArray.length;

        void div.offsetWidth;

    }, interval);
}

const viewportObsOptions = {
    root: null,
    threshold: 0,
    rootMargin: "-50% 0px -50% 0px" // triggers when the section's middle crosses the viewport center
}

const viewportObs = new IntersectionObserver(function (entries, viewportObs) {
    entries.forEach(entry => {
        const index = entry.target.dataset.index;

        if (entry.isIntersecting) {
            if (index > 0) {
                stickyHeadingsSectionsArr[index - 1].style.color = "teal";

                const sectionStickyLettersArr = stickyHeadingsContentArr[index - 1].querySelectorAll(".sticky-text__letter")
                console.log(sectionStickyLettersArr);

                sectionStickyLettersArr.forEach(letter => {
                    const letterTop = letter.getBoundingClientRect().top;
                    const letterLeft = letter.getBoundingClientRect().left;
                    const letterWidth = letter.getBoundingClientRect().width;
                    const letterHeight = letter.getBoundingClientRect().height;

                    const windowWidth = window.innerWidth;
                    const windowHeight = window.innerHeight;

                    

                })

            }
            console.log(`Section ${index} is intersecting`, entry.target);

        } else {
            if (index > 0) {
                stickyHeadingsSectionsArr[index - 1].style.color = "";
            }
            console.log(`Section ${index} is NOT intersecting`, entry.target);
        }
    });
}, viewportObsOptions);

stickyHeadingsSectionsArr.forEach((section, i) => {
    section.dataset.index = i; // store index in a data attribute
    viewportObs.observe(section);
});

// intersection observer for ${title} hitting 50% of viewport

// let origWelcomeHtml = welcomeTextContainer.innerHTML;
let moreThanOneObservation = false;

const viewportObserverOptions = {
    root: null,
    threshold: 0,
    rootMargin: "0px 0px -20% 0px"
};

let letterArr = [];

const viewportObserver = new IntersectionObserver(function (entries, viewportObserver) {

    entries.forEach(entry => {

        windowWidth = window.innerWidth;
        // title.classList.toggle("title-observed", entry.isIntersecting);

        // titleSpanContainer.classList.toggle("title-span-container--small", entry.isIntersecting);

        // console.log(entry.target, entry.isIntersecting);
        const sec2textWrapperTransDur = parseFloat(getComputedStyle(sec2TextWrapper).transitionDuration) * 1000;
        console.log(sec2textWrapperTransDur);
        const maxTransitionTime = sec2textWrapperTransDur * 10;


        if (entry.isIntersecting) {
            console.log("ITS INTERSECTING!!!");
            origWelcomeHtml = welcomeTextContainer.innerHTML;

            // const welcomeTextContainer = document.getElementById('welcome-text__text-container');
            const originalSpans = Array.from(welcomeTextContainer.querySelectorAll('span')); // static snapshot
            // console.log(originalSpans);

            const spansBrokenUpArr = [];

            // Step 1: Wrap letters
            // Step 1: Wrap letters inside words
            originalSpans.forEach(originalSpan => {
                const text = originalSpan.textContent;

                const wordContainer = document.createElement('span');
                wordContainer.classList.add('word');

                for (const char of text) {
                    const letterSpan = document.createElement('span');
                    letterSpan.textContent = char === ' ' ? '\u00A0' : char;
                    letterSpan.classList.add('letter');
                    wordContainer.appendChild(letterSpan);
                }

                spansBrokenUpArr.push(wordContainer);
                // console.log(spansBrokenUpArr);
            });



            welcomeTextContainer.innerHTML = "";
            spansBrokenUpArr.forEach(word => {
                welcomeTextContainer.appendChild(word)
            })

            letterArr = welcomeTextContainer.querySelectorAll(".letter");
            // console.log(letterArr);
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
                const randomY = Math.random() * (maxBottom + maxTop) - maxTop;
                const randomDuration = Math.random() * (maxTransitionTime);
                // const randomDuration = 3000;
                const rotateX = Math.random() * 720;
                const scale = Math.random() * 3;
                const rotateY = Math.random() * 740;



                // Apply transform with transition
                letter.style.transition = [
                    `transform ${randomDuration}ms cubic-bezier(.09,1.3,.78,.98)`
                ].join(", ");

                switch (letter.textContent) {
                    case "v":
                        letter.style.margin = "0px -1px";
                        break;
                    case "r":
                        letter.style.marginRight = "-2px";
                        break;
                    case "a":
                        letter.style.marginRight = "-1px";
                        break;
                    case "c":
                        letter.style.marginRight = ".4px";
                        break;
                    case "i":
                        letter.style.margin = "0px 1px";
                        break;

                    default:
                        break;
                }

                // trigger transition after layout
                setTimeout(() => {
                    // letter.style.transform = `translate3d(${randomX}px, ${randomY}px, 100px) rotate(${rotateX}deg) scale(${scale})`;
                    letter.style.transform = `translate3d(${randomX}px, ${randomY}px, 500px) rotate(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
                    // letter.style.textShadow = `5px 5px 5px rgba(0, 0, 0, 0.2)`;
                    // letter.style.color = 'black';
                    letter.classList.add("rotate");
                }, sec2textWrapperTransDur * 0.8);

            });
            sec2TextWrapper.classList.add("sec2__text-wrapper--open")
            moreThanOneObservation = true;
        } else {

            if (moreThanOneObservation) {
                console.log("NO INTERSECTION");
                // welcomeTextContainer.innerHTML = origWelcomeHtml;

                // origWelcomeHtml = welcomeTextContainer.innerHTML;

                letterArr.forEach((letter, i) => {
                    letter.classList.remove("rotate")
                    letter.style.transform = `translate3d(-1px, 0px, 0px) rotate(0deg) rotateY(0deg) scale(1)`;
                    // letter.style.textShadow = `0px 0px 0px black`;
                    // letter.style.marginLeft = "20px";
                    // letter.style.color = "black";
                })
                viewportObserver.unobserve(sec2TextWrapper);
                setTimeout(() => {
                    welcomeTextContainer.innerHTML = origWelcomeHtml;
                    if (moreThanOneObservation) viewportObserver.observe(sec2TextWrapper);
                    moreThanOneObservation = false;
                    requestAnimationFrame(() => {


                        welcomeTextWordContainers = [...welcomeTextContainer.querySelectorAll("span")];
                        switchWord(welcomeTextWordContainers[welcomeTextWordContainers.length - 3], ["create", "love"], "glitch-word")
                        switchWord(welcomeTextWordContainers[welcomeTextWordContainers.length - 1], ["live.", "create."], "glitch-word2");
                    })
                }, maxTransitionTime);
                sec2TextWrapper.classList.remove("sec2__text-wrapper--open")
            }

        }
    });
}, viewportObserverOptions);

// viewportObserver.observe(sec2TextWrapper);


// meta balls start here

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const rect = canvas.getBoundingClientRect();
// let grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

// ctx.fillStyle = "rgba(50, 100, 0, .8)";
ctx.fillStyle = "rgba(52, 30, 30, 1)";
ctx.fillStyle = "rgba(165, 147, 128, 1)";
// ctx.fillStyle = "white";
// ctx.fillStyle = "black";
// ctx.strokeStyle = "black";
// ctx.lineWidth = 10;


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

