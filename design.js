const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const overlay = document.querySelector(".overlay");
const scroller = document.querySelector(".slide-div");
const slideButtons = document.querySelectorAll(".slide-button");
const slideOverlay = document.querySelector('.slide-overlay');
const mainPictureContainer = document.querySelector('.slide-container');
const slideOverLayClose = document.querySelector('.slide-overlay-close');
const overlayButtonContainer = document.querySelector('.slide-overlay-button-container');
///////////////////////////MENU HANDLER ////////////////////////////////////////
function toggleMenu() {
  nav.classList.toggle("nav--shown");
  overlay.classList.toggle("overlay--shown");
}

header.addEventListener("click", (event) => {
  const targetClass = event.target.classList;
  if (targetClass.contains("menu-button") || targetClass.contains("close-menu"))
    return toggleMenu();
});

/////////////////////////////////////////////////////////////////////////////////


///////////////////////////SLIDER HANDLER ////////////////////////////////////////

function handleSlide(direction) {
  const currentSlide = parseInt(scroller.getAttribute("data-current-slide"));
  let nextSlide = currentSlide + 1;
  if (currentSlide === 1 && direction === "previous") nextSlide = 4;
  if (currentSlide === 4 && direction === "next") nextSlide = 1;
  document.getElementById(`slide-${nextSlide}`).scrollIntoView(false);
  scroller.setAttribute("data-current-slide", nextSlide.toString());
}


scroller.addEventListener("click", ({target}) => {

  if (target.classList.contains("slide-button")) {
    const targetId = target.getAttribute("id");
    handleSlide(targetId);
  }
});



document.querySelector('.thumb__container').addEventListener('click', ({target})=>{
  if(!target.classList.contains('thumb_image')) return 
  document.querySelector('.current__thumb').classList.remove('current__thumb');
  target.classList.add('current__thumb');
  const targetData = target.getAttribute('data-image-number');
  document.getElementById(`slide-${targetData}`).scrollIntoView(false);
  
})

/////////OverLay SlidLogic /////////////////////////
const showSlideOverlay = ()=>{
  slideOverlay.classList.toggle('slide-overlay--shown');
}
mainPictureContainer.addEventListener('click', showSlideOverlay);
slideOverLayClose.addEventListener('click', showSlideOverlay);

const overLayNextPhoto = (number)=>{
  numberToGo = number ==4? 1 : number + 1;
  slideOverlay.setAttribute('data-current-photo-count', numberToGo.toString());
  document.querySelector('.overlay-carousel-thumb--active').classList.remove('overlay-carousel-thumb--active');
  document.querySelector(`#overlay-thumb-${numberToGo}`).classList.add('overlay-carousel-thumb--active');
  document.querySelector(`#overlay-slide-${numberToGo}`).scrollIntoView(false);
  //update active thumb
  //scroll to image

}
const overlayPreviousPhoto = (number)=>{
  numberToGo = number ==1?4 : number - 1;
  slideOverlay.setAttribute('data-current-photo-count', numberToGo.toString());
  document.querySelector('.overlay-carousel-thumb--active').classList.remove('overlay-carousel-thumb--active');
  document.querySelector(`#overlay-thumb-${numberToGo}`).classList.add('overlay-carousel-thumb--active');
  document.querySelector(`#overlay-slide-${numberToGo}`).scrollIntoView(false);

}
overlayButtonContainer.addEventListener('click', ({target})=>{
  const currentPhotoNumber = Number(slideOverlay.getAttribute('data-current-photo-count'));
  if(target.classList.contains('overlay-next-slide') || target.classList.contains('overlay-next-icon')) return overLayNextPhoto(currentPhotoNumber);
  if(target.classList.contains('overlay-previous-slide'|| target.classList.contains('overlay-previous-icon'))) return overlayPreviousPhoto(currentPhotoNumber);
});

const overLayThumbsContainer = document.querySelector('.slide-overlay-thumb-container');

const handleThumbClick =({target})=>{
  if(!target.classList.contains('overlay-carousel-thumb')) return;
  const newNumber = Number(target.getAttribute('data-thumb-number'));
  document.querySelector('.overlay-carousel-thumb--active').classList.remove('overlay-carousel-thumb--active');
  target.classList.add("overlay-carousel-thumb--active");
  slideOverlay.setAttribute('data-current-photo-count', newNumber.toString());
  document.querySelector(`#overlay-slide-${newNumber}`).scrollIntoView(false);
}
overLayThumbsContainer.addEventListener('click', handleThumbClick);
