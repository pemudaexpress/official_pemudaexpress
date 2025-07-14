// togle class
const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// perintah klik sembarang untuk menghilangkan nav
const menu = document.querySelector("#menu");

document.addEventListener("click", function (e) {
  if (!menu.contains(e.target) && !navbarNav.contains(e.target))
    navbarNav.classList.remove("active");
});

const sliderItems = document.querySelectorAll(".slider-item");
let sliderActive = 1;

// slider
if (sliderItems) {
  sliderItems.forEach((slider, index) => {
    if (index === 0) {
      slider.setAttribute("data-show", "show");
    } else {
      slider.setAttribute("data-show", "hidden");
    }
  });

  setInterval(() => {
    sliderItems.forEach((slider, index) => {
      if (sliderActive === index) {
        slider.setAttribute("data-show", "show");
      } else {
        slider.setAttribute("data-show", "hidden");
      }
    });

    if (sliderActive === sliderItems.length - 1) {
      sliderActive = 0;
    } else {
      sliderActive++;
    }
  }, 5000);
}

// navbar active
const links = document.querySelectorAll(".navbar-nav a");
const currentPage = window.location.pathname.split("/").pop();

links.forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// WA
// document.addEventListener("DOMContentLoaded", function () {
//   const orderTypeSelect = document.getElementById("orderType");
//   const itemDetailGroup = document.getElementById("itemDetailGroup");
//   const itemDetailInput = document.getElementById("itemDetail");

//   orderTypeSelect.addEventListener("change", function () {
//     const selected = this.value;
//     if (selected === "Express Send" || selected === "Express Food") {
//       itemDetailGroup.style.display = "flex";
//     } else {
//       itemDetailGroup.style.display = "none";
//       itemDetailInput.value = ""; // reset isian kalau disembunyikan
//     }
//   });

// Tambahkan ke dalam event submit WA
//   const form = document.getElementById("contactForm");

//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const name = document.getElementById("name").value.trim();
//     const whatsapp = document.getElementById("whatsapp").value.trim();
//     const pickup = document.getElementById("pickup").value.trim();
//     const destination = document.getElementById("destination").value.trim();
//     const orderType = orderTypeSelect.value.trim();
//     const itemDetail = itemDetailInput.value.trim();

//     if (!name || !whatsapp || !pickup || !destination || !orderType) {
//       alert("Semua kolom harus diisi!");
//       return;
//     }

//     let formattedWA = whatsapp.startsWith("0")
//       ? "62" + whatsapp.slice(1)
//       : whatsapp;

//     let message = `Halo, saya ${name}, saya ingin memesan layanan Pemuda Express.

// No WhatsApp: ${formattedWA}
// Titik Penjemputan: ${pickup}
// Tujuan: ${destination}
// Jenis Order: ${orderType}`;

//     if (orderType === "Express Send" || orderType === "Express Food") {
//       message += `\nJenis Barang/Makanan: ${itemDetail || "-"}`;
//     }

//     const waURL = `https://wa.me/6281902017278?text=${encodeURIComponent(
//       message
//     )}`;
//     window.open(waURL, "_blank");
//   });
// });

// LAYANAN PERUSAHAAN
// JavaScript sederhana untuk geser carousel
let index = 0;
const track = document.getElementById("carouselTrack");
const slides = document.querySelectorAll(".carousel-slide");
const dotsContainer = document.getElementById("carouselDots");
const slidesPerView = window.innerWidth < 768 ? 1 : 2;
const maxIndex = Math.ceil(slides.length / slidesPerView) - 1;

function renderDots() {
  dotsContainer.innerHTML = "";
  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement("button");
    if (i === index) dot.classList.add("active");
    dot.addEventListener("click", () => moveTo(i));
    dotsContainer.appendChild(dot);
  }
}

function updateSlide() {
  const slideWidth = slides[0].offsetWidth;
  track.style.transform = `translateX(-${
    index * slideWidth * slidesPerView
  }px)`;
  renderDots();
}

function moveSlide(dir) {
  index += dir;
  if (index < 0) index = 0;
  if (index > maxIndex) index = maxIndex;
  updateSlide();
}

function moveTo(i) {
  index = i;
  updateSlide();
}

// MITRA JAJAN
renderDots();
updateSlide();

// menu
function scrollJajan(direction) {
  const track = document.getElementById("jajanTrack");
  const scrollAmount = 150;
  track.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

// DATA KUNJUNGAN
fetch(
  "https://script.google.com/macros/s/AKfycbz8MC5zm04MXXY55iOCjX3hb9icHCyUeJSnmDBahRUgx3iCT7ExMvRJxhbZcNQppzDZ/exec",
  {
    method: "POST",
    body: JSON.stringify({
      userAgent: navigator.userAgent,
      page: window.location.href,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }
);

// TESTIMONI MITRA SLIDER
function scrollTestimoni(direction) {
  const track = document.getElementById("testimoniTrack");
  const card = track.querySelector(".gam");
  const scrollAmount = card.offsetWidth + 16; // 16px untuk gap antar card

  track.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

// REVIEW KONSUMEN
const slider = document.querySelector(".review-konsumen-slider");
const leftBtn = document.querySelector(".arrow.left");
const rightBtn = document.querySelector(".arrow.right");

let currentIndex = 0;
const cards = document.querySelectorAll(".review-konsumen-card");
const totalSlides = cards.length;

function getCardsPerView() {
  const sliderWidth = slider.offsetWidth;
  const cardWidth = cards[0].offsetWidth;
  return Math.floor(sliderWidth / cardWidth);
}

function updateSlider() {
  const cardsPerView = getCardsPerView();

  // Hitung offset dengan persen berdasarkan jumlah cards per view
  const offset = -(100 / cardsPerView) * currentIndex;
  slider.style.transform = `translateX(${offset}%)`;

  // Disable tombol dengan batasan cardsPerView
  leftBtn.disabled = currentIndex === 0;
  rightBtn.disabled = currentIndex >= totalSlides - cardsPerView;

  leftBtn.classList.toggle("disabled", currentIndex === 0);
  rightBtn.classList.toggle(
    "disabled",
    currentIndex >= totalSlides - cardsPerView
  );
}

leftBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

rightBtn.addEventListener("click", () => {
  const cardsPerView = getCardsPerView();
  if (currentIndex < totalSlides - cardsPerView) {
    currentIndex++;
    updateSlider();
  }
});

// Update juga saat resize supaya tombol dan posisi slider tetap benar
// window.addEventListener("resize", () => {
//   // Pastikan currentIndex masih valid setelah resize
//   const cardsPerView = getCardsPerView();
//   if (currentIndex > totalSlides - cardsPerView) {
//     currentIndex = totalSlides - cardsPerView;
//     if (currentIndex < 0) currentIndex = 0;
//   }
//   updateSlider();
// });

// // Inisialisasi pertama
// updateSlider();
