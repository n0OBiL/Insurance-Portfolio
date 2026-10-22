/**
 * Syed Shujat Shah - State Life Plans Portfolio Website
 * Interactivity: Plan Filtering, Sticky Nav, Smooth Scroll, Reveal Animations, and Contact Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !expanded);
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Sticky Header elevation on scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Plan Category Filtering (Tabs)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const planCards = document.querySelectorAll('.plan-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Manage active button state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      // Filter cards with smooth fade/scale
      planCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          // brief timeout to trigger CSS transition
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.96)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 300);
        }
      });
    });
  });

  // 4. "Ask about this plan" auto-selection in form
  const planLinks = document.querySelectorAll('.plan-link');
  const planSelect = document.getElementById('planCategory');

  planLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const selectedPlan = link.getAttribute('data-plan');
      if (planSelect && selectedPlan) {
        for (let i = 0; i < planSelect.options.length; i++) {
          if (planSelect.options[i].value === selectedPlan) {
            planSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });

  // 5. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // 6. Active Navigation Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (correspondingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // 7. Contact Form Submission & Validation Handling
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const nameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('emailAddress');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const planError = document.getElementById('planError');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.classList.add('visible');
        isValid = false;
      } else {
        nameError.classList.remove('visible');
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailError.classList.add('visible');
        isValid = false;
      } else {
        emailError.classList.remove('visible');
      }

      // Validate Plan selection
      if (!planSelect.value) {
        planError.classList.add('visible');
        isValid = false;
      } else {
        planError.classList.remove('visible');
      }

      if (isValid) {
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

        // Simulate form sending
        setTimeout(() => {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `
            <strong><i class="fa-solid fa-circle-check"></i> Thank you, ${nameInput.value.trim()}!</strong>
            <p>Your consultation inquiry for <em>${planSelect.value}</em> has been received. Syed Shujat Shah will get back to you promptly.</p>
          `;
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Consultation Request</span> <i class="fa-solid fa-paper-plane"></i>';
        }, 900);
      }
    });
  }
});

