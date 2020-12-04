const list = document.querySelector(".gallery-carousel__img-container--list");
const imgs = Array.from(list.children);
const nextButton = document.querySelector(".gallery-carousel__btn--right");
const prevButton = document.querySelector(".gallery-carousel__btn--left");
const carouselNav = document.querySelector(".gallery-carousel__nav");
const dots = Array.from(carouselNav.children);
const imageWidth = imgs[0].getBoundingClientRect().width;

const setImgPosition = (img, index) => {
  img.style.left = imageWidth * index + "px";
};
imgs.forEach(setImgPosition);

const moveToImg = (list, currentImg, targetImg) => {
  list.style.transform = "translateX(-" + targetImg.style.left + ")";
  currentImg.classList.remove("current-img");
  targetImg.classList.add("current-img");
};

const updateDots = (current, target) => {
  current.classList.remove("current-img");
  target.classList.add("current-img");
};

const hideShowArrows = (imgs, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("hidden");
    nextButton.classList.remove("hidden");
  } else if (targetIndex === imgs.length - 1) {
    prevButton.classList.remove("hidden");
    nextButton.classList.add("hidden");
  } else {
    prevButton.classList.remove("hidden");
    nextButton.classList.remove("hidden");
  }
};

nextButton.addEventListener("click", (e) => {
  const currentImg = list.querySelector(".current-img");
  const nextImg = currentImg.nextElementSibling;
  const currentDot = carouselNav.querySelector(".current-img");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = imgs.findIndex((img) => img === nextImg);
  moveToImg(list, currentImg, nextImg);
  updateDots(currentDot, nextDot);
  hideShowArrows(imgs, prevButton, nextButton, nextIndex);
});

prevButton.addEventListener("click", (e) => {
  const currentImg = list.querySelector(".current-img");
  const prevImg = currentImg.previousElementSibling;
  const currentDot = carouselNav.querySelector(".current-img");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = imgs.findIndex((img) => img === prevImg);
  moveToImg(list, currentImg, prevImg);
  updateDots(currentDot, prevDot);
  hideShowArrows(imgs, prevButton, nextButton, prevIndex);
});

carouselNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");
  if (!targetDot) return;

  const currentImg = list.querySelector(".current-img");
  const currentDot = carouselNav.querySelector(".current-img");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetImg = imgs[targetIndex];
  moveToImg(list, currentImg, targetImg);
  updateDots(currentDot, targetDot);
  hideShowArrows(imgs, prevButton, nextButton, targetIndex);
});
