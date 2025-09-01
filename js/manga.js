// manga.js
document.addEventListener("DOMContentLoaded", function () {
  const mangaItems = document.querySelectorAll(".comic-card");

  mangaItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
      // 移除所有的 active
      mangaItems.forEach(i => i.classList.remove("active"));
      // 只有當前這個加上 active
      item.classList.add("active");
    });

    item.addEventListener("mouseleave", () => {
      // 如果希望移開就隱藏，打開這行
      // item.classList.remove("active");
    });
  });
});