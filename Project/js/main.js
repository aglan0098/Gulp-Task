// ========================== SLIDER ======================
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

//============================== SHOW MENU =======================
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    // Validate that variables exist
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle', 'nav-menu');


// =================================== FILTER PRODUCTS ================================
function filterRoducts(e) {
  const products = document.querySelectorAll(".menu__content");
  let filter = e.target.dataset.filter;
  if (filter === 'all') {
    products.forEach(product => product.classList.remove('hidden'));
  }  else {
    products.forEach(product => {
      product.classList.contains(filter) ? 
      product.classList.remove('hidden') : 
      product.classList.add('hidden');
    });
  };
};

// Add active class to the clickedbutton
var btns = document.getElementsByClassName("filter-btn");
for (var i = 0; i < btns.length; i++)
{
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("filter-btn-active");
    current[0].classList.remove("filter-btn-active");
    this.classList.add("filter-btn-active");
  });
}

// ============================ Increase Cart Number =====================================
var buy = document.getElementsByClassName("menu__button");
var cartNum = document.getElementById("cartNum");
var total = 0;

for(var i = 0; i < buy.length; i++)
{
  buy[i].addEventListener("click", function(e){
    e.preventDefault();
    total++;
    cartNum.innerHTML = total;
  })
}