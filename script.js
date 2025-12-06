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
let welcomeTextContainerWidth = welcomeTextContainer.getBoundingClientRect().width;
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

// Grab title elements from page
const titleWrapper = document.querySelector('.title-wrapper');
const titleSpanContainer = document.querySelector(".title-span-container")


// Grab undersconst
const sec2TextWrapper = document.querySelector(".sec2__text-wrapper")
// console.log(underConstWrapper);

// Grab svg anim elements
window.addEventListener("DOMContentLoaded", () => {
    // All animations
    const anims = [
        document.getElementById("welcomeAnim1"),
        document.getElementById("welcomeAnimScale1"),
        document.getElementById("welcomeAnim2"),
        document.getElementById("welcomeAnimScale2")
    ];

    // Filter primitives (to reset)
    const turb1 = document.getElementById("turb1");
    const disp1 = document.getElementById("disp1");
    const turb2 = document.getElementById("turb2");
    const disp2 = document.getElementById("disp2");

    // --- START animations ---
    window.startWelcome = () => {
        turb1.setAttribute("baseFrequency", "0.2 0");
        turb2.setAttribute("baseFrequency", "0.2 0");
        disp1.setAttribute("scale", "30");
        disp2.setAttribute("scale", "30");

        anims.forEach(a => a.beginElement());
    };

    // --- STOP animations + RESET filter values ---
    window.stopWelcome = () => {
        anims.forEach(a => a.endElement()); // stop immediately

        // reset turb values
        turb1.setAttribute("baseFrequency", "0 0");
        turb2.setAttribute("baseFrequency", "0 0");

        // reset scale values
        disp1.setAttribute("scale", "0");
        disp2.setAttribute("scale", "0");
    };
    requestAnimationFrame(() => {
        stopWelcome()
        setTimeout(() => {
            startWelcome()
            switchIntervals.push(
                switchWord(welcomeTextWordContainers[welcomeTextWordContainers.length - 3], ["create", "love"]),
                switchWord(welcomeTextWordContainers[welcomeTextWordContainers.length - 1], ["live.", "create."])
            );
        }, 1000);
    })



});





function switchWord(div, contentArray, interval = 8000) {
    let index = 0;
    return setInterval(() => {
        // change the word
        div.innerHTML = contentArray[index];
        index = (index + 1) % contentArray.length;

        void div.offsetWidth;

    }, interval);
}

const switchIntervals = [];

welcomeTextWordContainers = [...welcomeTextContainer.querySelectorAll("span")];


// intersection observer for ${title} hitting 50% of viewport

let origWelcomeHtml = welcomeTextContainer.innerHTML;
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
            stopWelcome()

            origWelcomeHtml = welcomeTextContainer.innerHTML;

            switchIntervals.forEach(id => clearInterval(id));

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
                    `transform ${randomDuration}ms cubic-bezier(.09,1.3,.78,.98)`,
                    `color .5s ease-out`
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
            setFormOpen(false)
            // openForm()

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
                        startWelcome()


                        welcomeTextWordContainers = [...welcomeTextContainer.querySelectorAll("span")];
                        switchIntervals.push(
                            switchWord(welcomeTextWordContainers[welcomeTextWordContainers.length - 3], ["create", "love"]),
                            switchWord(welcomeTextWordContainers[welcomeTextWordContainers.length - 1], ["live.", "create."])
                        );
                        console.log(switchIntervals);
                    })
                }, maxTransitionTime);
                sec2TextWrapper.classList.remove("sec2__text-wrapper--open")
            }

        }
    });
}, viewportObserverOptions);

viewportObserver.observe(sec2TextWrapper);


// Form logic
// CONTACT FORM

let formOpen = false;

const openFormBtn = document.getElementById("openFormBtn");
const formWrapper = document.querySelector(".contact-form-wrapper");
const closeFormBtn = document.getElementById("closeFormBtn");
console.log(formWrapper);

openFormBtn.addEventListener("click", () => setFormOpen(true));

closeFormBtn.addEventListener('click', () => setFormOpen(false));

function setFormOpen(isOpen) {
    formOpen = isOpen;
    formWrapper.classList.toggle("contact-form-wrapper--open", isOpen);

    welcomeTextContainer
        .querySelectorAll(".letter")
        .forEach(l => l.classList.toggle("dim-letter", isOpen));
}



document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const subjectContainer = document.getElementById("subjectContainer");
  const response = document.getElementById("formResponse");
  const closeBtn = document.getElementById("closeFormBtn");

  // Handle form submit
  form.addEventListener("submit", () => {
    const nameInput = form.querySelector('input[name="name"]').value.trim();

    // Remove previous subject input (if any)
    subjectContainer.innerHTML = "";

    // Create hidden subject input for Netlify
    const hiddenSubject = document.createElement("input");
    hiddenSubject.type = "hidden";
    hiddenSubject.name = "subject";
    hiddenSubject.value = `${nameInput} (via karlrickard.se)`;
    subjectContainer.appendChild(hiddenSubject);

    // Show sending message immediately
    response.hidden = false;
    response.textContent = "Sending… 💌";
  });

  // Close button resets form
  closeBtn.addEventListener("click", () => {
    form.reset();
    response.hidden = true;
    subjectContainer.innerHTML = "";
  });

  // Optional: detect Netlify redirect for success
  if (window.location.hash === "#success") {
    response.hidden = false;
    response.textContent = "Thank you! Your message was sent 💌";
  }
});






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
