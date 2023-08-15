// Put your application javascript here
document.addEventListener('DOMContentLoaded', function() {
    // Menu Nav Dropdown
    const dropdownButtons = document.querySelectorAll('.dropdown-button');
    const dropdownContents = document.querySelectorAll('.dropdown-content');
  
    dropdownButtons.forEach((button) => {
      button.addEventListener('mouseenter', () => {
        const dropdownId = button.getAttribute('data-dropdown-button-id');
        const dropdownContent = document.querySelector(`[data-dropdown-id="${dropdownId}"]`);
        dropdownContents.forEach((content) => {
          if (content !== dropdownContent) {
            content.classList.add('hidden');
          }
        });
  
          dropdownContent.classList.toggle('hidden');
      });
  
      button.addEventListener('click', () => {
        const dropdownId = button.getAttribute('data-dropdown-button-id');
        const dropdownContent = document.querySelector(`[data-dropdown-id="${dropdownId}"]`);
        dropdownContents.forEach((content) => {
          if (content !== dropdownContent) {
            content.classList.add('hidden');
          }
        });
  
          dropdownContent.classList.toggle('hidden');
      });
    });
  
    dropdownContents.forEach((content) => {
      content.addEventListener('mouseleave', () => {
        content.classList.add('hidden');
      });
    });
  
    document.addEventListener('click', (event) => {
      if (!event.target.classList.contains('dropdown-button')) {
        dropdownContents.forEach((content) => {
          if (!content.contains(event.target)) {
            content.classList.add('hidden');
          }
        });
      }
    });

    // Mobile Nav Bar
    const navMobileMenuButton = document.getElementById('navMobileMenuButton');
    const navMobileMenu = document.getElementById('navMobileMenu');
    const navMobileMenuButtonClose = document.getElementById('navMobileMenuButtonClose')

    navMobileMenuButton.addEventListener('click', () => {
        navMobileMenu.classList.remove('hidden');
    });
    navMobileMenuButtonClose.addEventListener('click', () => {
        navMobileMenu.classList.add('hidden');
    });

    document.addEventListener('click', (event) => {
        if (!navMobileMenuButton.contains(event.target) 
        && !navMobileMenu.contains(event.target)
        && !navMobileMenuButtonClose.contains(event.target)
        ) {
            navMobileMenu.classList.add('hidden');
        }
    });

    // Menu Nav Dropdown
    const dropdownButtonsMobile = document.querySelectorAll('.dropdown-button-mobile');
    const dropdownContentsMobile = document.querySelectorAll('.dropdown-content-mobile');
     
    dropdownButtonsMobile.forEach((button) => { 
      button.addEventListener('click', () => {
        const dropdownId = button.getAttribute('data-dropdown-mobile-button-id');
        const dropdownContentMobile = document.querySelector(`[data-dropdown-mobile-id="${dropdownId}"]`);
        dropdownContentsMobile.forEach((content) => {
          // console.log(dropdownId)
          if (content !== dropdownContentMobile) {
            console.log(dropdownContentMobile)
            content.classList.add('hidden');
          }
        });
          dropdownContentMobile.classList.toggle('hidden');
      });
    });
      
});