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


        for (let i = 0; i < krvTotalLength; i++) {
            // console.log(krvDivs[i]);
            if (krvDivs[i] !== krvDivs[firstWordIndexes[0]] && krvDivs[i] !== krvDivs[firstWordIndexes[1]] && krvDivs[i] !== krvDivs[firstWordIndexes[2]]) {
                krvDivs[i] = krvDivs[i].classList.add('old-krv-divs');
            } else {
                krvDivs[i].innerHTML = krvDivs[i].innerHTML.toLowerCase();
                krvDivs[i] = krvDivs[i].classList.add('new-krv-divs');
            }
        }
        

        // Add class name to each names first character
        const firstNameFirstChar = document.querySelector(".firstName");
        firstNameFirstChar.classList.add("name1-char1");
        const middleNameFirstChar = document.querySelector(".middleName");
        middleNameFirstChar.classList.add("name2-char1");
        const lastNameFirstChar = document.querySelector(".lastName");
        lastNameFirstChar.classList.add("name3-char1");

        // console.log(firstNameFirstChar, middleNameFirstChar, lastNameFirstChar);

        // Grab newly formed top left KRV
        const newTopKrv = document.querySelectorAll('.new-krv-divs');
        // console.log(newTopKrv);

        // Function for adding dots to two first letters
        function addDotts(what) {
            for (let i = 0; i < what.length -1; i++) {
                what[i].innerHTML = what[i].innerHTML+".";
                
            }
        }
        // Call above function after Xs 
        setTimeout(() => {addDotts(newTopKrv)}, 1400);


        // Add animation (changed) class
        krv.classList.remove('krv-changed-back');
        krv.classList.toggle('krv-changed');

        
        } else {
            // Remove animation (changed) class
            krv.classList.remove('krv-changed');
            krv.classList.add('krv-changed-back');

            krv.innerHTML = krvInnerHTML;
        }
    });
}, titleOptions);

titleObserver.observe(title);

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
        // if(!entry.isIntersecting) {
        //     title.classList.remove("title-observed");
        // }
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