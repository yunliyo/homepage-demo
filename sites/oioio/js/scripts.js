// Function to scroll to specific section on button click
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  window.scrollTo({
    top: section.offsetTop - 80, // Adjust to avoid header overlap
    behavior: 'smooth'
  });
}

// Update the active navigation item and the indicator
function updateNavigationIndicator() {
  const sections = document.querySelectorAll('section');
  const links = document.querySelectorAll('nav ul li a');
  const indicator = document.querySelector('.indicator');

  let activeLink = null;
  let activeSection = null;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // Offset for fixed header
    const sectionHeight = section.offsetHeight;
    const scrollPosition = window.scrollY;

    // Check if the section is in the viewport
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      activeSection = section;
      activeLink = document.querySelector(`a[href="#${section.id}"]`);
    }
  });

  // Update active link and indicator position
  if (activeLink) {
    links.forEach((link) => {
      link.classList.remove('active'); // Remove active class from all links
    });
    activeLink.classList.add('active'); // Add active class to current link

    // Update the indicator's position and width
    const linkRect = activeLink.getBoundingClientRect();
    indicator.style.width = `${linkRect.width}px`;
    indicator.style.left = `${linkRect.left}px`;
  }
}

// Event listener to update navigation indicator when scrolling
window.addEventListener('scroll', updateNavigationIndicator);

// Event listener for each navigation link to scroll smoothly
document.querySelectorAll('nav ul li a').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    scrollToSection(targetId);
  });
});

// Initial call to set the navigation indicator correctly on page load
document.addEventListener('DOMContentLoaded', updateNavigationIndicator);







/*
let currentPage = 1;
const cardsPerPage = 6;
const totalCards = document.querySelectorAll('.member-card').length;
const totalPages = Math.ceil(totalCards / cardsPerPage);

function showCards() {
    const cards = document.querySelectorAll('.member-card');
    cards.forEach((card, index) => {
        const pageIndex = Math.floor(index / cardsPerPage) + 1;
        if (pageIndex === currentPage) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // 更新指示器
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index + 1 === currentPage) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        showCards();
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showCards();
    }
}

function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        showCards();
    }
}

// 初始化页面
showCards();

*/