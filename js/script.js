function toggleSidebar() {
  const sidebar = document.getElementById("sidebar-container");
  sidebar.classList.toggle("collapsed"); 
}

function isCollapsed(){
  const sidebar = document.getElementById("sidebar-container");
  return sidebar.classList.contains('collapsed'); //return true if the sidebar container has "collapsed" class
}


function toggleActive(element) {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => item.classList.remove("active"));  // removes "active" class in all navigation items

  element.classList.add("active"); // adds the "active" class to the current element
  if(isCollapsed()){
    toggleSidebar();  //is sidebar is collapsed, toggle it.
  }
}

document.addEventListener("click", (event) => {
  const sidebar = document.getElementById("sidebar-container");
  const toggleButton = document.getElementById("toggle-sidebar-btn");

  if (
    !sidebar.contains(event.target) //if user clicks outside the sidebar container
  ) {
    if (!isCollapsed()) {
      sidebar.classList.add("collapsed"); // add collapsed class to sidebar container if there's none yet
    }
  }
});


const carouselStates = new Map(); // tracks the state of the carousels

/*
  direction parameter: 1 if right, -1 if left
  carouselSection parameter: the carousel section 
*/

function moveCarousel(direction, carouselSection) {
    //get the parent section of the carousel
    const section = carouselSection.closest('section');
    const sectionId = section.id;
    
    // initialize state of the carousel if it doesnt exist 
    if (!carouselStates.has(sectionId)) {
        carouselStates.set(sectionId, {
            currentIndex: 0
        });
    }
    
    //get carousel elements
    const carousel = section.querySelector('.carousel');
    const books = section.querySelectorAll('.book');
    const firstBook = books[0];
    const bookWidth = firstBook.offsetWidth + 40; // width + gap between books
    
    // get the current state
    const state = carouselStates.get(sectionId);
    const maxIndex = books.length - 1;  // maximum index
    
    // update index, make sure to not go out of bounds
    if (direction === 1 && state.currentIndex < maxIndex) {
        state.currentIndex++; // move right if not at the end
    } else if (direction === -1 && state.currentIndex > 0) {
        state.currentIndex--; // move left if not at start
    }
    
    // apply transformation
    // multiply the currentIndex with the bookwidth
    carousel.style.transform = `translateX(-${state.currentIndex * bookWidth}px)`;
}