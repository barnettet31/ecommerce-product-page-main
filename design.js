const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const overlay = document.querySelector(".overlay");
const scroller = document.querySelector(".slide-div");
const slideButtons = document.querySelectorAll(".slide-button");


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
  const currentSlide = parseInt(scroller.getAttribute("current-slide"));
  let nextSlide = currentSlide + 1;
  console.log(currentSlide);
  if (currentSlide === 1 && direction === "previous") nextSlide = 4;
  if (currentSlide === 4 && direction === "next") nextSlide = 1;
  document.getElementById(`slide-${nextSlide}`).scrollIntoView(false);
  scroller.setAttribute("current-slide", nextSlide.toString());
}


scroller.addEventListener("click", (e) => {
  if (e.target.classList.contains("slide-button")) {
    const targetId = e.target.getAttribute("id");
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
