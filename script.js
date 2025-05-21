document.addEventListener('DOMContentLoaded', function() {
  // DOM-element
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  const menuLinks = document.querySelectorAll('.off-screen-menu a');
  const skillBars = document.querySelectorAll('.skill-progress');
  
  // Växla menyfunktion
  function toggleMenu() {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
    
    // Ställ in animationsfördröjning för menyobjekt
    document.querySelectorAll('.off-screen-menu li').forEach((item, index) => {
      item.style.setProperty('--item-index', index);
    });
    
    // Växla kroppsrullning
    if (menu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
  
  // Hantera hamburgerklick
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }
  
  // Hantera menyobjektklick
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu();
    });
  });
  
  // Stäng menyn när du klickar utanför
  document.addEventListener('click', (event) => {
    if (menu && hamburger) {
      if (menu.classList.contains('active') && 
          !menu.contains(event.target) && 
          !hamburger.contains(event.target)) {
        toggleMenu();
      }
    }
  });
  
  // Animera färdighetsbalkar vid rullning
  function animateSkillBars() {
    if (skillBars.length > 0) {
      skillBars.forEach(bar => {
        const skillValue = bar.getAttribute('data-skill');
        bar.style.width = skillValue;
      });
    }
  }
  
  // Observera när färdighetssektionen kommer in i vyn
  if (skillBars.length > 0) {
    const skillsSection = document.querySelector('.skills-container');
    
    if (skillsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(animateSkillBars, 300);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      observer.observe(skillsSection);
    } else {
      // Om färdighetssektionen visas direkt (utan rullning)
      window.addEventListener('load', () => {
        setTimeout(animateSkillBars, 300);
      });
    }
  }
});