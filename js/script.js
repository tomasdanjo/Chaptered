function toggleSidebar() {
  const sidebar = document.getElementById("sidebar-container");
  sidebar.classList.toggle("collapsed");
}

function isCollapsed(){
  const sidebar = document.getElementById("sidebar-container");
  return sidebar.classList.contains('collapsed');
}


function toggleActive(element) {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => item.classList.remove("active"));

  element.classList.add("active");
  if(isCollapsed()){
    toggleSidebar();
  }
}

document.addEventListener("click", (event) => {
  const sidebar = document.getElementById("sidebar-container");
  const toggleButton = document.getElementById("toggle-sidfebar-btn");

  if (
    !sidebar.contains(event.target)
  ) {
    if (!isCollapsed()) {
      sidebar.classList.add("collapsed");
    }
  }
});


const carouselStates = new Map();

function moveCarousel(direction, carouselSection) {
    const section = carouselSection.closest('section');
    const sectionId = section.id;
    
    
    if (!carouselStates.has(sectionId)) {
        carouselStates.set(sectionId, {
            currentIndex: 0
        });
    }
    
    const carousel = section.querySelector('.carousel');
    const books = section.querySelectorAll('.book');
    const firstBook = books[0];
    const bookWidth = firstBook.offsetWidth + 40; // 
    
    const state = carouselStates.get(sectionId);
    const maxIndex = books.length - 1;
    
    
    if (direction === 1 && state.currentIndex < maxIndex) {
        state.currentIndex++;
    } else if (direction === -1 && state.currentIndex > 0) {
        state.currentIndex--;
    }
    
    carousel.style.transform = `translateX(-${state.currentIndex * bookWidth}px)`;
}