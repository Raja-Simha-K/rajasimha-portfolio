// Navbar ham menu
// document.addEventListener('DOMContentLoaded', function() {
//     const button = document.querySelector('.nav-bt');

//     function toggleClass() {
//         if (button.classList.contains('open')) {
//         button.classList.remove('open');
//         } else {
//         button.classList.add('open');
//         }
//     }

//     function handleClick(event) {
//         if (event.target.classList.contains('nav-bt')) {
//         toggleClass();
//         } else if (!event.target.closest('.nav-bt')) {
//         button.classList.remove('open');
//         }
//     }

//     button.addEventListener('click', function(event) {
//         toggleClass();
//         event.stopPropagation();
//     });

//     document.addEventListener('click', handleClick);
// });
  
// Star Glitter
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
const stars = document.querySelectorAll('.star');
stars.forEach((star, index) => {
    const top = getRandom(0, 100) + '%';
    const left = getRandom(0, 100) + '%';
    const delay = getRandom(0, 15) + 's';

    star.style.top = top;
    star.style.left = left;
    star.style.animationDelay = delay;
});

// -----------------------------------------------------------------
// GSAP
gsap.registerPlugin(ScrollTrigger);  //initialize scroll trigger

// Lenis scroll trigger using GSAP
const lenis = new Lenis({
    lerp:0.05, //lower the value smoother the scroll(0 - 0.1)
    smooth:true,
})
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)
// -----------------------------------------------------------------

// -----------------------------------------------------------------
// Cursor Animation
let cursorDot = document.querySelector('.cursor-dot');
let cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;
// Get X,Y on mousemove
window.addEventListener('mousemove',(e)=>{
    mouseX = e.clientX;
    mouseY = e.clientY;
});
//Gsap set x,y value to cursor
gsap.to({},0.016,{
    repeat:-1,
    onRepeat: ()=> {
        gsap.set(cursor,{
            css: {
                top: mouseY,
                left: mouseX,
            }
        });
        gsap.set(cursorDot,{
            css: {
                top: mouseY,
                left: mouseX,
            }
        });
        
    }
});
// customize the cursor on element using class.
let cursorLg = document.querySelectorAll('.cursorLg');
cursorLg.forEach((link)=>{
    link.addEventListener('mousemove', ()=>{
        cursor.classList.add('cursorScaleUp');
    });
    link.addEventListener('mouseleave', ()=>{
        cursor.classList.remove('cursorScaleUp');
    });
});
// cursor arrow for link.
let cursorLink = document.querySelectorAll('a[href]');
cursorLink.forEach((link)=>{
    if(!link.classList.contains('cursorTarget')){
        link.addEventListener('mousemove', ()=>{
            cursor.classList.add('cursorScaleUp');
            cursor.classList.add('cursorShowLink');
        });
    }
    else{
        link.addEventListener('mousemove', ()=>{
            cursor.classList.add('cursorScaleUp');
            cursor.classList.add('cursorTargetShow');
        });
    }
    link.addEventListener('mouseleave', ()=>{
        cursor.classList.remove('cursorScaleUp');
        cursor.classList.remove('cursorShowLink');
        cursor.classList.remove('cursorTargetShow');
    });
});
// cursor arrow for link with no transition.
let cursorArrow = document.querySelectorAll('.cursorArrow');
cursorArrow.forEach((link)=>{
    link.addEventListener('mousemove', ()=>{
        cursor.classList.add('cursorScaleUp');
        cursor.classList.add('cursorShowArrow');
    });
    link.addEventListener('mouseleave', ()=>{
        cursor.classList.remove('cursorScaleUp');
        cursor.classList.remove('cursorShowArrow');
    });
});
// -----------------------------------------------------------------

// -----------------------------------------------------------------
// Magnetic Cursor
var cursorMgTxt = document.querySelectorAll('.cursorMgTxt');
let mouseMgX = 0, mouseMgY = 0;
mouseMgMove = (e) => {
    var mouseMgRect = e.currentTarget.getBoundingClientRect();
    mouseMgX = e.clientX - (mouseMgRect.left + mouseMgRect.width / 2);
    mouseMgY = e.clientY - (mouseMgRect.top + mouseMgRect.height / 2);
    gsap.to(cursorMgTxt, {
        x: mouseMgX,
        y: mouseMgY,
        duration:1,
        ease: "elastic.out(1,0.3)",
    });
}
mouseMgLeave = (e) => {
    gsap.to(cursorMgTxt, {
        x: 0,
        y: 0,
        duration:1,
        ease: "elastic.out(1,0.3)",
    });
}
cursorMgTxt.forEach((f)=>{
    f.addEventListener('mousemove', mouseMgMove);
});
cursorMgTxt.forEach((f)=>{
    f.addEventListener('mouseleave', mouseMgLeave);
});
// -----------------------------------------------------------------

// -----------------------------------------------------------------
// Split the text up
function runSplit() {
    document.querySelectorAll(".split-word").forEach(function(section) {
        let typeSplit = new SplitType(section, {
          types: "lines, words"
        });
        section.querySelectorAll(".line > .word").forEach(function(word) {
          word.innerHTML += "<div class='line-mask'></div>";
        });
        createAnimation(section);
    });
}
runSplit();
// Create staggered animation
function createAnimation(section) {
    let allMasks = Array.from(section.querySelectorAll(".word .line-mask"));
    let tl = gsap.timeline({
        scrollTrigger: {
        trigger: section,
        start: "-30% center",
        end: "bottom center",
        scrub: 1,
        }
    });
    tl.to(allMasks, {
        width: "0%",
        duration: 1,
        stagger: 0.5
    });
}
// -----------------------------------------------------------------

// -----------------------------------------------------------------
// moon eclipse on scroll
var moonEclipse = document.querySelectorAll('.moon-eclipse');
moonEclipse.forEach(function(moonBg){
    var moonHide = moonBg.querySelector("span");
    let st = gsap.timeline({
        scrollTrigger:{
            trigger: moonBg,
            start: "top 80%",
            end: "bottom 40%",
            scrub: true,
        }
    });

    
    st.fromTo(moonHide, { top : "0%", left: "0%", ease: "linear" }, { top : "0%", left: "100%", duration: 1, ease: "linear" });
    
});
// -----------------------------------------------------------------

// -----------------------------------------------------------------
// eclipse bg change
let moEcBg = document.querySelectorAll('.mo-ec');
moEcBg.forEach(function(section){
    var moEcBgData = section.getAttribute('data-bg');
    let stBg = gsap.timeline({
        scrollTrigger:{
            trigger:section,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
        }
    });
    stBg.to('.mo-ec', { backgroundColor:moEcBgData, ease: "linear"});
});
// body bg change
let bgCh = document.querySelectorAll('.bg-ch');
bgCh.forEach(function(section){
    let moEcBgData = section.getAttribute('data-bg');
    let stBg = gsap.timeline({
        scrollTrigger:{
            trigger: section,
            start: "top 50%",
            end: "bottom 50%",
            scrub: true,
            onEnter: function() {
                gsap.to('body, .line-mask', { backgroundColor: moEcBgData, ease: "linear"});
            },
            onLeave: function() {
                gsap.to('body, .line-mask', { backgroundColor: '#ffffff', ease: "linear"});
            },
            onEnterBack: function() {
                gsap.to('body, .line-mask', { backgroundColor: moEcBgData, ease: "linear"});
            },
            onLeaveBack: function() {
                gsap.to('body, .line-mask', { backgroundColor: '#ffffff', ease: "linear"});
            }
        }
    });
});
// -----------------------------------------------------------------

// -----------------------------------------------------------------
// Skills Expand
var servExpand = document.querySelectorAll('.servEx');
servExpand.forEach((section) =>{
    var servExText =  section.querySelectorAll('p');
    let stServEx = gsap.timeline({
        scrollTrigger:{
            trigger: servExText,
            start:"top 70%",
            end:'bottom center',
            scrub: 1,
        }
    });
    let servExTextAll = Array.from(section.querySelectorAll("span"));
    stServEx.to(servExTextAll,{
        width:"100px",
        stagger: 5,
    });
})
// -----------------------------------------------------------------

// -----------------------------------------------------------------
// Marquee animation
let mqCon = document.querySelectorAll('.mq-con');
mqCon.forEach((content)=>{
    var mqInData = content.querySelectorAll('.mq-in');
    let currentScroll = 0;
    let stMq = gsap.to(mqInData, {
        xPercent: -100,
        repeat: -1,
        duration: 30,
        ease: "linear",
        stagger: 0.5
    }).totalProgress(0.5);
    window.addEventListener("scroll", function(){
      gsap.to(stMq, {
        timeScale: window.scrollY > currentScroll ? 1 : -1
      });
      currentScroll = window.scrollY;
    ;});
}); 
// -----------------------------------------------------------------


// Works text scale
let wrkTitleCon = document.querySelector('.ea');
let wrkTitleText = document.querySelector('.eb span');
let wrkCard = document.querySelectorAll('.ec-wrap');
gsap.to(wrkTitleText,{
    duration: 1, 
    scaleX: 2,
    scaleY: 2,
    ease: "power2.inOut",
    scrollTrigger:{
        trigger: wrkTitleCon,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
    }
});

// Works Stick animation
const contentElements = [...document.querySelectorAll('.ec-wrap')];
const totalContentElements = contentElements.length;
contentElements.forEach((el, position) => {
    const isLast = position === totalContentElements-1;
    gsap.timeline({
        scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=100%',
            scrub: true
        }
    })
    .to(el, {
        ease: 'none',
        startAt: {filter: 'brightness(100%) contrast(100%)'},
        filter: isLast ? 'none' : 'brightness(60%) contrast(135%)',
        yPercent: isLast ? 0 : -15,
        onUpdate: function() {
            var yearText = el.querySelector('.ec-detail').getAttribute('data-year');
            changeYear(yearText);
        },
    }, 0);

});
// Year update function
function changeYear(yearText){
    document.getElementById('ec-year-id').textContent = yearText;
}

// Image Parallax
gsap.utils.toArray(".ec-image img").forEach((imagePx, i) => {
    const heightDiff = imagePx.offsetHeight - imagePx.parentElement.offsetHeight;
    gsap.fromTo(imagePx,{ 
        y: -heightDiff
    }, {
        scrollTrigger: {
            trigger: imagePx,
            scrub: true
        },
        y: 0,
        ease: "none"
    });
});

// Image Parallax
gsap.utils.toArray(".prlx img").forEach((imagePx, i) => {
    const heightDiff = imagePx.offsetHeight - imagePx.parentElement.offsetHeight;
    gsap.fromTo(imagePx,{ 
        y: -heightDiff
    }, {
        scrollTrigger: {
            trigger: imagePx,
            scrub: true
        },
        y: 0,
        ease: "none"
    });
});

// ---------------------------------------------------
// Smooth scroll
var scBtn = document.getElementById('scrollToButton');
scBtn.addEventListener('click', function(event) {
    event.preventDefault;
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    lenis.scrollTo(scrollToSection);
});