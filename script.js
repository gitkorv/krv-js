setTimeout(function(){
    document.body.className="";
},500);



const krv = document.querySelector('.krv')
const title = document.querySelector('.title')
const myName = document.querySelector('.my-name')
const sec1 = document.querySelector('.sec1')

console.log(sec1);

console.log(krv);

const titleOptions = { 
    root: null,
    threshold: 0,
    rootMargin: "0px 0px -50% 0px" 
};

const titleObserver = new IntersectionObserver(function(entries, titleObserver) {
    
    entries.forEach(entry => {
        console.log(entries[0]);
        if (entry.isIntersecting) {
            krv.classList.add('krv-observed');
            krv.classList.remove('krv-unobserved');
        } else {
            krv.classList.remove('krv-observed');
            krv.classList.add('krv-unobserved');
        }
    });
}, titleOptions);

titleObserver.observe(title);

window.onload = function() {
    krv.classList.remove('krv-unobserved');
};

document.onload = function () {
    krv.classList.remove('krv-unobserved');
};

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