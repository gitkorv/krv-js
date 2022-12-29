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
const title = document.querySelector('.title');
const myName = document.querySelector('.my-name');
const sec1 = document.querySelector('.sec1');
const krvInnerHTML = krv.innerHTML;
const krvWords = krvInnerHTML.split("<br>");
const krvAllCharNoSpaces = krvWords.join("");
const krvAmountOfWords = krvWords.length;

// Find out how many letters each word is

let krvEachWordLength = [];

for (let i = 0; i < krvAmountOfWords; i++) {
    // console.log(krvWords[i].length);
    krvEachWordLength.push(krvWords[i].length);
  }

  console.log(krvEachWordLength);


// clg some stuff to check

// console.log(krvInnerHTML);
console.log(krv);
console.log(krvWords);
console.log(krvAmountOfWords);

console.log(krvAllCharNoSpaces);

// Make array of krvInnerHTML variable
let krvArray = [...krvAllCharNoSpaces];
let krvArrayLength = krvArray.length;
console.log(krvArrayLength);

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
            // Set string to blank string
            krv.innerHTML = " ";
            // Set different nameClass variable for each word
            // let nameClass = " ";

         
            // Make a div for each character
            krvArray.forEach((character, i) => {
                // console.log(character,i);
                let lowerCaseChar = character.toLocaleLowerCase();

                if(i >= + krvAllCharNoSpaces.length - krvWords[2].length) {
                    let nameClass = "vestin";
                    krv.innerHTML += `<div class="krv_${nameClass}-${lowerCaseChar}">${character}</div>`;
                }
                else if (i < krvAllCharNoSpaces.length - (krvWords[1].length + krvWords[2].length)) {
                    let nameClass = "karl";
                    krv.innerHTML += `<div class="krv_${nameClass}-${lowerCaseChar}">${character}</div>`;
                }
                else {
                    let nameClass = "rickard";
                    krv.innerHTML += `<div class="krv_${nameClass}-${lowerCaseChar}">${character}</div>`;
                }
                

            });

            
            
        krv.classList.add('krv-observed');
        // krv.innerHTML = krvArray;
            // console.log(krv);
        } else {
            krv.classList.remove('krv-observed');
            krv.innerHTML = krvInnerHTML;
            // console.log(krv.innerHTML);
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