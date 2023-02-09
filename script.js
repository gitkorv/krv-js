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
    rootMargin: "0px 0px -50% 0px" 
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

            // console.log(firstNameFirstChar, middleNameFirstChar, lastNameFirstChar);

        

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
            function addEffectToRestofKrvDivs(divs) {
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

                // Set different values depending on window width

                let randomStyleRightNumbers = [];

                if (windowWidth < 400) {
                    randomStyleRightNumbers = makeUniqueRandomNumbersArray(0, windowWidth * 0.4, restOfKrvDivs.length);
                }   else if (windowWidth < 500) {
                    randomStyleRightNumbers = makeUniqueRandomNumbersArray(0, windowWidth * 0.55, restOfKrvDivs.length);
                }   else if (windowWidth < 750) {
                    randomStyleRightNumbers = makeUniqueRandomNumbersArray(0, windowWidth * 0.65, restOfKrvDivs.length);
                }   else {
                    randomStyleRightNumbers = makeUniqueRandomNumbersArray(0, windowWidth * 0.75, restOfKrvDivs.length);
                }
                
                console.log(windowWidth);
                // console.log("right " + randomStyleRightNumbers);

                let randomRotateNumber = makeUniqueRandomNumbersArray(0, 360, restOfKrvDivs.length)

                // console.log("rotate " + randomRotateNumber);

                // Non Unique random number function
                function makeRandomNumber(min, max, length) {
                    let randomNumberArray = [];
                    for (let i = 0; i < length; i++) {
                        let randomNumber = Math.floor(Math.random() * (max - min + 1) ) + min;
                        randomNumberArray.push(randomNumber);
                    }
                    return randomNumberArray;
                };

                let randomFontSizes = makeRandomNumber(2,14,restOfKrvDivs.length);

                console.log("fontSizes " + randomFontSizes);

                function makeRandomAnimDuration(length) {
                    let randomAnimDurationArray2 = [];
                    for (let i = 0; i < length; i++) {
                        let animDur = Math.floor(Math.random() * 20) / 10;
                        randomAnimDurationArray2.push(animDur);
                    }
                    return randomAnimDurationArray2;
                }

                console.log("this " +makeRandomAnimDuration(restOfKrvDivs.length));


                let randomAnimDuration = makeRandomAnimDuration(restOfKrvDivs.length);
                // console.log(randomAnimDuration);

                // Add styles to each div

                divs.forEach((div, i) => {

                    // console.log(`.${randomAnimDuration}`);
                    // console.log(randomAnimDuration2);
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

                    

                    // console.log(div.style.fontSize);
                    switch (div.style.fontSize) {
                        case "14rem":
                            div.style.top="-80px";
                            break;
                        case "13rem":
                        case "12rem":
                            div.style.top="-70px";
                            break;
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
                            div.style.top="-25px";
                            break;
                        case "3rem":
                            div.style.top="-20px";
                            break;
                        default:
                            break;
                    }
                });  
                

                // Pick random elements from array and style them right

                function pickRandomElements(array, amount) {
                    let randomElementsArray = [];
                    for (let i = 0; i < amount; i++) {
                       let randomElement = array[Math.floor(Math.random()*array.length)];
                        if (!randomElementsArray.includes(randomElement)) {
                            randomElementsArray.push(randomElement);
                        } else if (randomElementsArray.includes(randomElement)) {
                            i--;
                        }
                    }
                    return randomElementsArray;
                }

                let half = restOfKrvDivs.length / 2;
                // console.log(Math.floor(half));

                let pickedElementsToGoRight = pickRandomElements(restOfKrvDivs, half);
                // console.log(pickedElementsToGoRight);

                let windowHeight = window.innerHeight;
                // console.log(windowHeight);

                let moveYElements = makeRandomNumber(0,(windowHeight/3), half);
                // console.log(moveYElements);

                pickedElementsToGoRight.forEach((div, i) => {
                    // console.log(i);
                    
                        if (i == 0) {
                            // console.log(div);
                            div.style.transform="rotate(240deg)";
                            div.style.right="10px";
                            div.style.top="-120px";
                            div.style.fontSize="20rem";
                            div.style.animationDuration="1.4s";
                            
                        } else {
                            div.style.right="0px";
                            div.style.top=`${moveYElements[i]}px`;
                            // div.style.animationDuration=`.3s`;
                        }                       
                });
  
            };

            addEffectToRestofKrvDivs(restOfKrvDivs);

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
ctx.fillStyle = "black";
// ctx.strokeStyle = "black";
// ctx.lineWidth = 5;


class Ball {
    constructor(effect) {
        this.effect = effect;
        this.x = this.effect.width * 0.5;
        this.y = this.effect.height * 0.6;
        // this.x = Math.random() * this.effect.width;
        // this.y = Math.random() * this.effect.height;
        this.radius = Math.random() * 80 + 20;
        console.log(this.radius);
        this.speedX = Math.random() - 0.5;
        this.speedY = Math.random() - 0.5;
        // this.flex = Math.random()- 0.5 ; 
        // this.flex = .5;
        // this.index = 0;
        // console.log(this.flex * 0.5);
    }
    update(){
        if (this.x < this.radius || this.x > this.effect.width - this.radius) this.speedX *= -1;
        if (this.y < this.radius || this.y > this.effect.height - this.radius) this.speedY *= -1;
        this.x += this.speedX;
        this.y += this.speedY;
        // this.index++
        // console.log(this.index);

        // for (let i = 0; i < 200; i++) {
        //     this.radius += this.flex * 0.5;
        //     // console.log(i);
        // }


        // One in x generator
        // this.lottoRadius = Math.random() * 500;

        // if (this.index <= 200) {
        //     this.radius = this.radius;
        // } else {
        //     this.radius += this.flex;
        // }
            

        
    }
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        // context.stroke();
    }
    reset(){
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
            
            krvBorder.style.width = "0"
        }
    
    })
}, krvBorderBottomObserverOptions);

krvBorderBottomObserver.observe(title)



