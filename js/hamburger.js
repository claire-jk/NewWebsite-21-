// 等待整個網頁 DOM 載入完成
document.addEventListener("DOMContentLoaded", () => {
    // 漢堡選單切換
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });

    // 子選單滑動切換
    document.querySelectorAll('.submenu-toggle').forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const parentLi = this.parentElement;
        const submenu = this.nextElementSibling;
        if (submenu.style.display === 'block') {
          submenu.style.maxHeight = '0';
          submenu.style.display = 'none';
          parentLi.classList.remove('active');
        } else {
          submenu.style.display = 'block';
          submenu.style.maxHeight = submenu.scrollHeight + 'px';
          parentLi.classList.add('active');
        }
      });
    });
  // === 第二頁淡入效果 ===
  const page2 = document.getElementById("page2");

  if (page2) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          page2.classList.add("visible"); // 觸發淡入動畫
        }
      });
    }, { threshold: 0.3 });

    observer.observe(page2);
  }
});