const homepage_carousel = document.getElementById("homepage_carousel");
const homepage_carousel_caption = document.getElementById("homepage_carousel_caption");
const politics_course_input = document.getElementById("politics_course_input");
const politics_course_submit = document.getElementById("politics_course_submit");

const hashed_code = "a187766f4a49b104ad75ef7865cba1767fb3e8195a259ba29f9b4a694c67d711";

let slides = [];
let currentIndex = 0;

function generateSHA256(str) {
  return CryptoJS.SHA256(str).toString();
}

function getCookie(cname) {
   let name = cname + "=";
   let decodedCookie = decodeURIComponent(document.cookie);
   let ca = decodedCookie.split(';');
   for(let i = 0; i < ca.length; i++) {
       let c = ca[i];
       while (c.charAt(0) == ' ') {
           c = c.substring(1);
       }
       if (c.indexOf(name) == 0) {
           return c.substring(name.length, c.length);
       }
   }
   return "";
}

// Politics Course
function politics_course() {
  hashed_input = generateSHA256(politics_course_input.value)
  if (hashed_input == hashed_code) {
    console.log("YES!!")
    document.cookie = "code="+hashed_input+";";
    return "Sucess"
  } else {
    console.log("FAIL!!!")
    console.log(hashed_input)
    console.log(politics_course_input.value)
    return;
  }
}

// Homepage Carousel
if (window.location == "http://aaronpi:8000/") {
  fetch('slides.json')
    .then(response => response.json())
    .then(json => {
      slides = json.homepage_carousel;
      rotate_homepage_carousel();
    })
    .catch(err => console.error(err));
}

function rotate_homepage_carousel() {
  if (slides.length === 0) return;

  const slide = slides[currentIndex];

  homepage_carousel.src = slide.url;
  homepage_carousel_caption.textContent = slide.caption;

  currentIndex = (currentIndex + 1) % slides.length;
}

if (getCookie("code") == hashed_code) {
  if (window.location == "http://aaronpi:8000/courses/politics.html") {
    window.location = "politics/overview.html";
  }
}

setInterval(rotate_homepage_carousel, 5000);
politics_course_submit.addEventListener("click", politics_course)