'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

console.log(document.documentElement);
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  const scroll = section1.getBoundingClientRect();
  
  window.scrollTo({
      left: scroll.left + window.pageXOffset, 
      top: scroll.top + window.pageYOffset,
      behavior: "smooth"});
});

const h1 = document.querySelector("h1");

// h1.addEventListener("mouseenter", function (e) {
//     alert("addEventListener: Great()");
// });

const randomInt = (min, max) => Math.floor(
    Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)}`;
console.log(randomColor());


document.querySelector(".nav__link").addEventListener("click", function (e) {
    this.style.backgroundColor = randomColor();
    // e.stopPropagation();
    console.log(e.target)
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
    this.style.backgroundColor = randomColor();
    console.log(e.target)
});


document.querySelector(".nav").addEventListener("click", function (e) {
    console.log(e.target);
});


// page navigation

// document.querySelectorAll(".nav__link").forEach(
//     function (el) {
//         el.addEventListener("click", function (e) {
//             e.preventDefault();
//             const id = this.getAttribute("href");
//             document.querySelector(id).scrollIntoView(
//                 {
//                     behavior:"smooth"
//                 }
//             )
//         })
//     }
// )

document.querySelector(".nav__links").addEventListener("click", function (e) {
    if(e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        
        document.querySelector(id).scrollIntoView({
            behavior: "smooth"
        });
    }
});

// Tabbed component

const tabs = document.querySelectorAll(".operations__tab");

const tabsContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".operations__tab");

    if(!clicked) return

    tabs.forEach(t => t.classList.remove("operations__tab--active"));
    tabContent.forEach(c => c.classList.remove("operations__content--active"));
    clicked.classList.add("operations__tab--active");
    console.log(clicked.dataset.tab)
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active")
});

// Menu fade animation

const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


// // Sticky navigation

// const callbackFunc = function (entries, observer) {
//     entries.forEach(entry => {
//         console.log(entry);
//     })
// }
//
// const options = {
//     root: null,
//     threshold: 0.1,
//
// }
//
// const observer = new IntersectionObserver(callbackFunc, options);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
    const [entry] = entries;
    // console.log(entry);

    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);


// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
    const [entry] = entries;
    console.log(entry)
    if (!entry.isIntersecting) return;

    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 1.0,
    // rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

const sliders = document.querySelectorAll(".slide");

const slider = document.querySelector(".slider");

const btnLeft = document.querySelector(".slider__btn--left")
const btnRight = document.querySelector(".slider__btn--right")
let curSlide = 0
const maxSlide = sliders.length;

const dotContainer = document.querySelector(".dots");
sliders.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`);

const createDots = function () {
    sliders.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="dots__dot" data-slide="${i}"></button>`
        );
    });
};
createDots();

const activateDot = function (slide) {
    document
        .querySelectorAll('.dots__dot')
        .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
};
const goToSlide = function (slide) {
    sliders.forEach(
        (s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`
    );
};
goToSlide(0);

const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
        curSlide = 0;
    }
    else {
        curSlide += 1;
    }
    
    goToSlide(curSlide);
    activateDot(curSlide);
}

const prevSlide = function () {
    if (curSlide === 0) {
        curSlide = maxSlide - 1;
    }
    else {
        curSlide -= 1;
    }
    
    goToSlide(curSlide);
    activateDot(curSlide);
}

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
});


dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
        const {slide} = e.target.dataset;
        curSlide = Number(slide); // Update curSlide here
        goToSlide(slide);
        activateDot(curSlide);
    }
});





