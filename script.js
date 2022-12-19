const krv = document.querySelector('.krv')
const title = document.querySelector('.title')

console.log(krv);

const titleOptions = { 
    root: null,
    threshold: 0,
    rootMargin: "0PX 0px -50% 0px" 
};

const titleObserver = new IntersectionObserver(function(entries, titleObserver) {
    console.log(entries);
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            krv.classList.add('krv-observed');
        } else {
            krv.classList.remove('krv-observed');
        }
    });
    
    
}, titleOptions);

titleObserver.observe(title);