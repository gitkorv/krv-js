// Removes preload class to body after 1/2 secs

    setTimeout(function(){
        document.body.className="";
    },500);

// This below removed a class on load, no longer needed

    // window.onload = function() {
    //     titleBorder.classList.remove('title-border');
    // };

    // titleBorder.classList.add('title-border')

    // document.onload = function () {
    //     krv.classList.remove('krv-unobserved');
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
    const myName = document.querySelector('.my-name');
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

const titleOptions = { 
    root: null,
    threshold: 0,
    rootMargin: "0px 0px -50% 0px" 
};

const titleObserver = new IntersectionObserver(function(entries, titleObserver) {

    entries.forEach(entry => {

        // title.classList.toggle("title-observed", entry.isIntersecting);


        // console.log(entry.target, entry.isIntersecting);
        if (entry.isIntersecting) {
            // Set krv innerHTML string to blank 
            krv.innerHTML = " ";
           
            // Make a div with specific classes for each character
            krvArray.forEach((character, i) => {
                // console.log(character,i);
                // console.log(krvWords[0]);
                let lowerCaseChar = character.toLowerCase();

                if(i >= + krvTotalLength - krvWords[2].length) {
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
                    what[i].innerHTML = what[i].innerHTML+".";
                    
                }
            }
            // Call above function after Xs 
            setTimeout(() => {addDotts(newKrvDivs)}, 1400);


            // Grab rest of divs
            const restOfKrvDivs = document.querySelectorAll(".restof-krv-divs");

            // console.log(restOfKrvDivs);

            // Add unique effect to each of restofKrvDivs
            function addEffectToRestofKrvDivs(divs) {
            let windowWidth = window.innerWidth;
            console.log(windowWidth);

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

                let randomStyleRightNumbers = makeUniqueRandomNumbersArray(0, windowWidth * 0.5, restOfKrvDivs.length);
                
                console.log("right " + randomStyleRightNumbers);

                let randomRotateNumber = makeUniqueRandomNumbersArray(0, 360, restOfKrvDivs.length)

                console.log("rotate " + randomRotateNumber);

                // Non Unique random number function
                function makeRandomNumber(min, max, length) {
                    let randomNumberArray = [];
                    for (let i = 0; i < length; i++) {
                        let randomNumber = Math.floor(Math.random() * (max - min + 1) ) + min;
                        randomNumberArray.push(randomNumber);
                    }
                    return randomNumberArray;
                };

                let randomFontSizes = makeRandomNumber(1,14,restOfKrvDivs.length);

                console.log("fontSizes" + randomFontSizes);

                // Add styles to each div

                divs.forEach((div, i) => {
                    console.log(div.innerHTML);
                    // 50-50 if rotation gets a -(minus) or not infront of rotation number
                    let plusOrMinus = Math.random() < 0.5;
                    if(plusOrMinus){
                        div.style.transform=`rotate(${randomRotateNumber[i]}deg)`;
                    } else {
                        div.style.transform=`rotate(-${randomRotateNumber[i]}deg)`;
                    }
                    div.style.right=`${randomStyleRightNumbers[i]}px`;
                    div.style.fontSize=`${randomFontSizes[i]}rem`;

                    console.log(div.style.fontSize);
                    switch (div.style.fontSize) {
                        case "10rem":
                            div.style.top="-50px";
                            break;
                        case "9rem":
                        case "8rem":
                            div.style.top="-40px";
                            break;
                        case "7rem":
                        case "6rem":
                            div.style.top="-30px";
                            break;
                        case "5rem":
                        case "4rem":
                            div.style.top="-20px";
                            break;
                        case "3rem":
                            div.style.top="-15px";
                            break;
                        default:
                            break;
                    }
                });  
                

                // Pick 3 random elements from array and make them align right

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

                let pickedElementsToGoRight = pickRandomElements(restOfKrvDivs, 7);

                console.log(pickedElementsToGoRight);

                let moveYElements = makeRandomNumber(0,200, 3);
                console.log(moveYElements);

                let windowHeight = window.innerHeight;
                console.log(windowHeight);

                pickedElementsToGoRight.forEach((div, i) => {
                    div.style.right="0px";
                    div.style.animationDuration=".5s";
                    div.style.top=`${moveYElements[i]}px`
                });

                
            };

            addEffectToRestofKrvDivs(restOfKrvDivs);

            // Add animation (changed) class
            krv.classList.add('krv-changed');
            title.classList.add('title-observed')
     
        } else {
            // Remove animation (changed) class
            krv.classList.remove('krv-changed');
            title.classList.remove('title-observed')


            krv.innerHTML = krvInnerHTML;
        }
    });
}, titleOptions);

titleObserver.observe(title);

const newKrvDivs = document.querySelectorAll('.new-krv-divs');

console.log(newKrvDivs);
// Second try to make a border bottom when sticky element is stuck

const titleBorder = document.querySelector(".line");
console.log(titleBorder);

const titleBorderBottomObsOptions = {
    root: null,
    threshold: 0,
    rootMargin: `0px 0px -95% 0px` 
}

const titleBorderBottomObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log(entry);
        titleBorder.classList.toggle("line-show", entry.isIntersecting);
        
    })
}, titleBorderBottomObsOptions);

titleBorderBottomObs.observe(title)








// Observe section 1, and when in view, underline sticky title element

    // Grab all sections
    // const allSections = document.querySelectorAll('.section');
    // console.log(allSections);

    // const sectionsObserverOptions = { 
    // root: null,
    // threshold: .5,
    // rootMargin: "20px" 
    // };

    // const sectionsObserver = new IntersectionObserver(function(entries, secOneObserver) {

    //     entries.forEach(entry => {
    //         console.log(entry.target, entry.isIntersecting);
    //         if (entry.isIntersecting) {
    //             title.style.borderBottom= "1px solid black";
    //         } else {
    //             title.style.borderBottom="none"
    //         }
    //     })

        

    // }, sectionsObserverOptions);

    // allSections.forEach(section => {
    //     sectionsObserver.observe(section);
    // })

    






// Old stuff below

// OBSERVER FOR SECTIONS AND STICKY HEADER BORDER BOTTOM CLASS

// const sections = document.querySelectorAll('section');

// console.log(sections);

// const sectionOptions = { 
//     root: null,
//     threshold: 0,
//     rootMargin: "0px 0px -90% 0px" 
// };

// const sectionObserver = new IntersectionObserver(function(entries, sectionObserver) {
//     console.log(entries, entries.isIntersecting);

//         if(entry[0].isIntersecting || entry[1].isIntersecting || entry[2].isIntersecting) {
//             title.classList.add('title-underline');
            
//         } else {
//             title.classList.remove('title-underline');
            

//         }


// }, sectionOptions);

// sections.forEach(section => {
//     sectionObserver.observe(section);
// });


// let titleRect = title.getBoundingClientRect().top;

// console.log(titleRect);