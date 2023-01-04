// Removes preload class to body after 1/2 secs

setTimeout(function(){
    document.body.className="";
},500);

// This below removed a class on load, no longer needed

// window.onload = function() {
//     krv.classList.remove('krv-unobserved');
// };

// document.onload = function () {
//     krv.classList.remove('krv-unobserved');
// };


// 1. Get variables

const krv = document.querySelector('.krv');
    console.log(krv);

const krvInnerHTML = krv.innerHTML;
    console.log(krvInnerHTML);

const krvOuterHTML = krv.outerHTML;
console.log(krvOuterHTML);

const krvWords = krvInnerHTML.split("<br>");
    console.log(krvWords);

    const krvString = krvWords.join(" ");
console.log(krvString);

const krvAllCharNoSpaces = krvWords.join("");
    console.log(krvAllCharNoSpaces);

// Make array of krvInnerHTML
let krvArray = [...krvAllCharNoSpaces];
console.log(krvArray);

// Get krv total length
let krvTotalLength = krvArray.length;


const title = document.querySelector('.title');
const myName = document.querySelector('.my-name');
const sec1 = document.querySelector('.sec1');
const krvAmountOfWords = krvWords.length;

// Find out how many letters each word is

const krvEachWordLength = krv.innerHTML.split("<br>").map(w => w.length);



console.log("Below here I try to figure out how to grab specific letters");

// First find out what each words first letter is

const getFirstLetters = function(array) {
    const firstLetters = array.map(word => word[0]);
  
    return firstLetters;
  }
  
console.log(getFirstLetters(krvWords));

// Get index of each words first letter in krvAllCharNoSpaces

const firstWordIndexes = [];

for (let i = 0; i < krvAllCharNoSpaces.length; i++) {
  if (krvAllCharNoSpaces[i] === getFirstLetters(krvWords)[0] || krvAllCharNoSpaces[i] === getFirstLetters(krvWords)[1] || krvAllCharNoSpaces[i] === getFirstLetters(krvWords)[2]) {
    firstWordIndexes.push(i);
  }
}
console.log(firstWordIndexes); 




// intersection observer for ${title} hitting 50% of viewport

const titleOptions = { 
    root: null,
    threshold: 0,
    rootMargin: "0px 0px -50% 0px" 
};

const titleObserver = new IntersectionObserver(function(entries, titleObserver) {
    
    entries.forEach(entry => {
        console.log(entry.target, entry.isIntersecting);
        if (entry.isIntersecting) {
            // Set krv innerHTML string to blank 
            krv.innerHTML = " ";
           
            // Make a div with specific classes for each character
            krvArray.forEach((character, i) => {
                // console.log(character,i);
                let lowerCaseChar = character.toLowerCase();

                if(i >= + krvTotalLength - krvWords[2].length) {
                    let nameClass = "vestin";
                    krv.innerHTML += `<div class="krv_${nameClass}-${lowerCaseChar} krv${i}">${character}</div>`;
                }
                else if (i < krvTotalLength - (krvWords[1].length + krvWords[2].length)) {
                    let nameClass = "karl";
                    krv.innerHTML += `<div class="krv_${nameClass}-${lowerCaseChar} krv${i}">${character}</div>`;
                }
                else {
                    let nameClass = "rickard";
                    krv.innerHTML += `<div class="krv_${nameClass}-${lowerCaseChar} krv${i}">${character}</div>`;
                }
            });


        // Get K R V elements
        const krvDivs = document.querySelectorAll(".krv div");
        console.log(krvDivs[0]);
        krvDivs.forEach((entry, i) => {
            entry.classList.add('hidden')
        });

        const karlK = document.querySelector(".krv0");
        const rickardR = document.querySelector(".krv4");
        const vestinV = document.querySelector(".krv11");

        // Add animation (observed) class
        krv.classList.add('krv-observed')

        karlK.classList.remove('hidden');
        karlK.innerHTML = karlK.innerHTML.toLowerCase()+".";
        rickardR.classList.remove('hidden');
        rickardR.innerHTML = rickardR.innerHTML.toLowerCase()+".";
        vestinV.classList.remove('hidden');
        vestinV.innerHTML = vestinV.innerHTML.toLowerCase();

        // karlK.classList.add('krv-observed');
        
        } else {
            // Remove animation (observed) class
            krv.classList.remove('krv-observed');
            krv.innerHTML = krvInnerHTML;
        }
    });
}, titleOptions);

titleObserver.observe(title);








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