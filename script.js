document.addEventListener('DOMContentLoaded', function() {
  // Hämta viktiga delar från sidan (element)
  const hamburger = document.getElementById('hamburger'); // Menyknappen (hamburgaren)
  const menu = document.getElementById('menu'); // Själva menyn som ska visas/döljas
  const menuLinks = document.querySelectorAll('.off-screen-menu a'); // Alla länkar inne i menyn
  const skillBars = document.querySelectorAll('.skill-progress'); // Alla färdighetsstaplar som visar nivåer
  
  // Funktion som öppnar eller stänger menyn när man klickar på hamburgaren
  function toggleMenu() {
    hamburger.classList.toggle('active'); // Byt mellan aktiv och inaktiv status på hamburgaren (för t.ex. animation)
    menu.classList.toggle('active'); // Visa eller göm menyn
    
    // Sätter en liten fördröjning på varje menyobjekt, så att de kan animera snyggt efter varandra
    document.querySelectorAll('.off-screen-menu li').forEach((item, index) => {
      item.style.setProperty('--item-index', index); // Skapar en variabel med numret på objektet (för animation)
    });
    
    // När menyn är öppen vill vi inte kunna scrolla sidan under, så vi låser scrollningen
    if (menu.classList.contains('active')) {
      document.body.style.overflow = 'hidden'; // Stäng av scrollning på hela sidan
    } else {
      document.body.style.overflow = 'auto'; // Tillåt scrollning igen när menyn är stängd
    }
  }
  
  // När du klickar på hamburgaren, kör funktionen som öppnar/stänger menyn
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }
  
  // När du klickar på en länk i menyn, stäng menyn automatiskt
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu();
    });
  });
  
  // Stäng menyn om du klickar någonstans utanför menyn eller hamburgaren
  document.addEventListener('click', (event) => {
    if (menu && hamburger) {
      // Kolla att menyn är öppen och att klicket inte är på menyn eller hamburgaren
      if (menu.classList.contains('active') && 
          !menu.contains(event.target) && 
          !hamburger.contains(event.target)) {
        toggleMenu(); // Stäng menyn
      }
    }
  });
  
  // Funktion som gör att färdighetsstaplarna fylls med rätt bredd (nivå)
  function animateSkillBars() {
    if (skillBars.length > 0) {
      skillBars.forEach(bar => {
        const skillValue = bar.getAttribute('data-skill'); // Hämtar nivån från data-attributet
        bar.style.width = skillValue; // Sätter bredden på stapeln till den nivån (t.ex. 75%)
      });
    }
  }
  
  // Kolla när färdighetsdelen kommer in i skärmen, för att starta animationen då
  if (skillBars.length > 0) {
    const skillsSection = document.querySelector('.skills-container'); // Hela sektionen med färdigheter
    
    if (skillsSection) {
      // Skapar en "observer" som kan se när sektionen syns på skärmen
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { // När sektionen syns
            setTimeout(animateSkillBars, 300); // Vänta lite och starta animationen
            observer.unobserve(entry.target); // Sluta observera efter att ha visat animationen en gång
          }
        });
      }, { threshold: 0.2 }); // Starta när 20% av sektionen är synlig
      
      observer.observe(skillsSection); // Börja observera sektionen
    } else {
      // Om sektionen alltid syns direkt (ingen scrollning behövs)
      window.addEventListener('load', () => {
        setTimeout(animateSkillBars, 300); // Kör animationen efter att sidan laddats klart
      });
    }
  }
});
