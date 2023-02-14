// Removes preload class to body after 1/2 secs

    setTimeout(function(){
        document.body.className="";
    },500);

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
    // console.log(krv);

    const krvInnerHTML = krv.innerHTML;
    // console.log(krvInnerHTML);

    const krvOuterHTML = krv.outerHTML;
    // console.log(krvOuterHTML);

    const krvWords = krvInnerHTML.split("<br>");
    // console.log(krvWords);

    const krvString = krvWords.join(" ");
    // console.log(krvString);

    const krvAllCharNoSpaces = krvWords.join("");
    // console.log(krvAllCharNoSpaces);

// Make array of krvInnerHTML
    let krvArray = [...krvAllCharNoSpaces];
    // console.log(krvArray);

// Get krv total length
let krvTotalLength = krvArray.length;
    // console.log("krv total lenght is " + krvTotalLength);

// Grab more elements from page
    const title = document.querySelector('.title');
    const sec1 = document.querySelector('.sec1');

// Find out how many letters each word is
    const krvEachWordLength = krv.innerHTML.split("<br>").map(w => w.length);
    // console.log(krvEachWordLength);


// console.log("Below here I try to figure out how to grab specific letters");

// First find out what each words first letter is
    const getFirstLetters = function(array) {
        const firstLetters = array.map(word => word[0]);
  
    return firstLetters;
    }
  
    // console.log(getFirstLetters(krvWords));

// Get index of each words first letter in krvAllCharNoSpaces

    const firstWordIndexes = [];

    for (let i = 0; i < krvAllCharNoSpaces.length; i++) {
    if (krvAllCharNoSpaces[i] === getFirstLetters(krvWords)[0] || krvAllCharNoSpaces[i] === getFirstLetters(krvWords)[1] || krvAllCharNoSpaces[i] === getFirstLetters(krvWords)[2]) {
        firstWordIndexes.push(i);
    }
    }
    // console.log(firstWordIndexes); 

// Make arrays of each word
    let firstWordArray = [...krvWords[0]];
    // console.log(firstWordArray);



// intersection observer for ${title} hitting 50% of viewport

const titleObserverOptions = { 
    root: null,
    threshold: 0,
    rootMargin: "0px 0px -45% 0px" 
};

const titleObserver = new IntersectionObserver(function(entries, titleObserver) {

    entries.forEach(entry => {

        // title.classList.toggle("title-observed", entry.isIntersecting);

        titleSpan.classList.toggle("title-span-stuck", entry.isIntersecting);

        // console.log(entry.target, entry.isIntersecting);

        if (entry.isIntersecting) {
            // Set krv innerHTML string to blank 
            krv.innerHTML = " ";
           
            // Make a div with specific classes for each character
            krvArray.forEach((character, i) => {
                // console.log(character,i);
                // console.log(krvWords[0]);
                let lowerCaseChar = character.toLowerCase();

                //  GOT A STRANGE + SIGN HERE BELOW??? AFTER: i >= (taken out)
                if(i > krvTotalLength - krvWords[2].length) {
                    let nameClass = "lastName";
                    krv.innerHTML += `<div class="krv_${i}_${lowerCaseChar} ${nameClass}">${character}</div>`;
                }
                else if (i < krvTotalLength - (krvWords[1].length + krvWords[2].length)) {
                    let nameClass = "firstName";
                    krv.innerHTML += `<div class="krv_${i}_${lowerCaseChar} ${nameClass}">${character}</div>`;
                }
                else {
                    let nameClass = "middleName";
                    krv.innerHTML += `<div class="krv_${i}_${lowerCaseChar} ${nameClass}">${character}</div>`;
                }
            });

            // firstWordArray.forEach((char, i) => {
            //     console.log(char, i);
            // });


        
            // Get KRV elements
            const krvDivs = document.querySelectorAll(".krv div");
            // console.log(krvDivs);

            // Add one class to first letters of names, and another to the rest
            for (let i = 0; i < krvTotalLength; i++) {
                // console.log(krvDivs[i]);
                // console.log(firstWordIndexes[i]);
                if (krvDivs[i] === krvDivs[firstWordIndexes[0]] || krvDivs[i] === krvDivs[firstWordIndexes[1]] || krvDivs[i] === krvDivs[firstWordIndexes[2]]) {
                    krvDivs[i].innerHTML = krvDivs[i].innerHTML.toLowerCase();
                    krvDivs[i] = krvDivs[i].classList.add('new-krv-divs');
                } else {
                    krvDivs[i] = krvDivs[i].classList.add('restof-krv-divs');
                }
            }
        
            // Grab newly formed top left KRV
            const newKrvDivs = document.querySelectorAll('.new-krv-divs');
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
            function addDotts(what) {
                for (let i = 0; i < what.length -1; i++) {
                    what[i].innerHTML = what[i].innerHTML+`<div class="krv__dotts krv__dott${i+1}">.</div>`;                   
                }
            }
            // Call above function after Xs 
            setTimeout(() => {addDotts(newKrvDivs)}, 0);


            // Grab rest of divs
            const restOfKrvDivs = document.querySelectorAll(".restof-krv-divs");

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
                        let randomNumber = Math.floor(Math.random() * (max - min + 1) ) + min;
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
                    randomFontSizes = makeRandomNumber(2,12,restOfKrvDivs.length); 
                    topRightLetter = "16rem";
                    topRightLetterTop = "-80px";
                }   else if (windowWidth < 600) {
                    randomStyleRightNumbers = makeUniqueRandomNumbersArray(0, windowWidth * 0.55, restOfKrvDivs.length);
                    randomFontSizes = makeRandomNumber(2,13,restOfKrvDivs.length);
                    topRightLetter = "17rem";
                    topRightLetterTop = "-100px";
                }   else if (windowWidth < 800) {
                    randomStyleRightNumbers = makeUniqueRandomNumbersArray(0, windowWidth * 0.65, restOfKrvDivs.length);
                    randomFontSizes = makeRandomNumber(2,14,restOfKrvDivs.length);
                    topRightLetter = "18rem";
                    topRightLetterTop = "-110px";
                }   else if (windowWidth < 1200) {
                    randomStyleRightNumbers = makeUniqueRandomNumbersArray(0, windowWidth * 0.75, restOfKrvDivs.length);
                    randomFontSizes = makeRandomNumber(2,18,restOfKrvDivs.length);
                    topRightLetter = "22rem";
                    topRightLetterTop = "-120px";
                }   else {
                    randomStyleRightNumbers = makeUniqueRandomNumbersArray(0, windowWidth * 0.8, restOfKrvDivs.length);
                    randomFontSizes = makeRandomNumber(4,24,restOfKrvDivs.length);
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
                    if(plusOrMinus){
                        div.style.transform=`rotate(${randomRotateNumber[i]}deg)`;
                    } else {
                        div.style.transform=`rotate(-${randomRotateNumber[i]}deg)`;
                    }

                    div.style.right=`${randomStyleRightNumbers[i]}px`;
                    div.style.fontSize=`${randomFontSizes[i]}rem`;
                    div.style.animationDuration=`${randomAnimDuration[i]}s`;

                    switch (div.style.fontSize) {
                        case "24rem":
                        case "23rem":
                        case "22rem":
                            div.style.top="-140px";
                            break;
                        case "21rem":
                        case "20rem":
                        case "19rem":
                            div.style.top="-120px";
                            break;
                        case "18rem":
                        case "17rem":
                        case "16rem":
                            div.style.top="-100px";
                            break;
                        case "15rem":
                        case "14rem":
                        case "13rem":
                            div.style.top="-80px";
                            break;
                        case "12rem":
                        case "11rem":
                        case "10rem":
                            div.style.top="-60px";
                            break;
                        case "9rem":
                        case "8rem":
                            div.style.top="-50px";
                            break;
                        case "7rem":
                        case "6rem":
                            div.style.top="-40px";
                            break;
                        case "5rem":
                        case "4rem":
                            div.style.top="-30px";
                            break;
                        case "3rem":
                            div.style.top="-25px";
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
                let moveYElements = makeRandomNumber(0,(window.innerHeight / 3), halfOfRestOfKrvDivs);

                pickedElementsToGoRight.forEach((div, i) => {
                    // console.log(i);
                    
                        if (i == 0) {
                            // console.log(div);
                            div.style.transform="rotate(240deg)";
                            div.style.right="10px";
                            div.style.top= topRightLetterTop;
                            div.style.fontSize= topRightLetter;
                            div.style.animationDuration="1.4s";
                            
                        } else {
                            div.style.right="0px";
                            div.style.top=`${moveYElements[i]}px`;
                        }                       
                });
            };

            addEffectToRestOfKrvDivs(restOfKrvDivs);

            // Add animation (changed) class
            krv.classList.add('krv-changed');
            // title.classList.add('title-observed')
     
        } else {
            // Remove animation (changed) class
            krv.classList.remove('krv-changed');
            // title.classList.remove('title-observed')


            krv.innerHTML = krvInnerHTML;
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
// ctx.strokeStyle = "pink";
// ctx.lineWidth = 10;


class Ball {
    constructor(effect) {
        this.effect = effect;
        this.x = this.effect.width * 0.5;
        this.y = Math.random() * this.effect.height * 0.6 + this.effect.height * 0.2;
        // this.y = this.effect.height * 0.5;

        // this.x = Math.random() * this.effect.width;
        // this.y = Math.random() * this.effect.height;
        // Make different sized balls depending on window width
        if (this.effect.width < 400 || this.effect.height < 200) {
            this.radius = Math.random() * 60 + 10;
        } else if (this.effect.width < 600  || this.effect.height < 300) {
            this.radius = Math.random() * 80 + 15;
        } else if (this.effect.width < 800  || this.effect.height < 400) {
            this.radius = Math.random() * 100 + 20;
        } else if (this.effect.width < 1200  || this.effect.height < 500) {
            this.radius = Math.random() * 140 + 20;
        }  else {
            this.radius = Math.random() * 140 + 40;
        }
        this.growSpeed = 1.000002;
        this.index = 1;
        this.orgRadius = this.radius;
        this.newRadius = this.radius * 0.1;
        this.radius = this.newRadius;

        // this.radius = Math.random() * 80 + 20;
        console.log(this.effect.width);
        console.log(this.orgRadius.toFixed(3), this.newRadius.toFixed(3));
        this.speedX = Math.random() - 0.5;
        this.speedY = Math.random() - 0.5; 
    }
    update(){
        // for (let i = this.index; i < 100; i++) {
        //     this.radius = this.radius + .001;
        //     // console.log(this.radius, this.orgRadius);
            
        // }

        if (this.radius < this.orgRadius) {
            this.radius *= 1.004;
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
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        // context.stroke();
    }
    reset(){
        // this.x = this.effect.width * 0.5;
        // this.y = Math.random() * this.effect.height * 0.6 + this.effect.height * 0.2;
        this.x = this.effect.width * 0.5;
        this.y = this.effect.height * 0.5;
    }
}

class MetaballsEffect {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.metaballsArray = [];
    }
    init(numberOfBalls){
        // if (this.width > 1200) numberOfBalls * 1.5;
        for (let i = 0; i < numberOfBalls; i++) {
            this.metaballsArray.push(new Ball(this));   
        }
    }
    update(){
        this.metaballsArray.forEach(metaball => metaball.update());
    }
    draw(context){
        this.metaballsArray.forEach(metaball => metaball.draw(context));
    }
    reset(newWidth, newHeight){
        this.width = newWidth;
        this.height = newHeight;
        this.metaballsArray.forEach(metaball => metaball.reset());
    }
}

const effect = new MetaballsEffect(canvas.width, canvas.height);
effect.init(20);

function animateMetaballs(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    effect.update();
    effect.draw(ctx);
    requestAnimationFrame(animateMetaballs);
}
animateMetaballs();



window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = 'black';
    effect.reset(canvas.width, canvas.height);
} )


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
            }, 500);
            
        } else {
            
            krvBorder.style.width = "0";
        }
    
    })
}, krvBorderBottomObserverOptions);

krvBorderBottomObserver.observe(title)



