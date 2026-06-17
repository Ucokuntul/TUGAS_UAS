lucide.createIcons();
    function refreshIcons() { setTimeout(() => lucide.createIcons(), 100); }

    // ============ LOADING SCREEN ============
    function hideLoadingScreen() {
      const loadingScreen = document.getElementById('loading-screen');
      if (!loadingScreen || loadingScreen.style.display === 'none') return;
      loadingScreen.style.transition = 'opacity 0.5s';
      loadingScreen.style.opacity = '0';
      setTimeout(() => { loadingScreen.style.display = 'none'; }, 500);
    }
    window.addEventListener('load', hideLoadingScreen);
    setTimeout(hideLoadingScreen, 4000);

    // ============ MOBILE MENU ============
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    menuToggle.addEventListener('click', () => {
      isMenuOpen = !isMenuOpen;
      mobileMenu.classList.toggle('hidden', !isMenuOpen);
      menuToggle.innerHTML = isMenuOpen
        ? '<i data-lucide="x" class="w-6 h-6 text-gray-700"></i>'
        : '<i data-lucide="menu" class="w-6 h-6 text-gray-700"></i>';
      refreshIcons();
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.add('hidden');
        menuToggle.innerHTML = '<i data-lucide="menu" class="w-6 h-6 text-gray-700"></i>';
        refreshIcons();
      });
    });

    // ============ TYPING EFFECT ============
    const typingText = document.getElementById('typing-text');
    const roles = [
      'Data Science Student',
      'Problem Solver',
      'ML Enthusiast',
      'Tech Explorer',
      'Django Developer',
      'Aspiring Data Analyst'
    ];
    let roleIndex = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }
      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
        return;
      }
      setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
    typeEffect();

    // ============ STICKY HEADER ============
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        header.querySelector('nav').classList.add('shadow-md', 'shadow-gray-200/80');
      } else {
        header.querySelector('nav').classList.remove('shadow-md', 'shadow-gray-200/80');
      }
      const backToTop = document.getElementById('back-to-top');
      if (currentScroll > 500) {
        backToTop.classList.remove('opacity-0', 'invisible', 'translate-y-4');
      } else {
        backToTop.classList.add('opacity-0', 'invisible', 'translate-y-4');
      }
    });

    // ============ ACTIVE NAV LINK ============
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) current = section.getAttribute('id');
      });
      navLinks.forEach(link => {
        link.classList.remove('nav-active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('nav-active');
      });
    }
    window.addEventListener('scroll', updateActiveNav);

    // ============ SKILL BARS ANIMATION ============
    function animateSkillBars() {
      const skillBars = document.querySelectorAll('.skill-bar');
      const skillsSection = document.getElementById('skills');
      const sectionTop = skillsSection.offsetTop - 200;
      const sectionBottom = sectionTop + skillsSection.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY <= sectionBottom) {
        skillBars.forEach(bar => { bar.style.width = bar.getAttribute('data-width'); });
      }
    }
    window.addEventListener('scroll', animateSkillBars);

    // ============ COUNTER ANIMATION ============
    function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-target'));
      const duration = 1800;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, duration / steps);
    }

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

    // ============ PORTFOLIO FILTER ============
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => {
          btn.classList.remove('active', 'bg-gray-900', 'text-white');
          btn.classList.add('glass');
        });
        button.classList.add('active', 'bg-gray-900', 'text-white');
        button.classList.remove('glass');

        const filter = button.getAttribute('data-filter');
        portfolioItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

    // ============ CONTACT FORM ============
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const button = contactForm.querySelector('button[type="submit"]');
      const originalText = button.innerHTML;
      button.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Mengirim...</span>';
      lucide.createIcons();
      setTimeout(() => {
        button.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i><span>Pesan Terkirim!</span>';
        lucide.createIcons();
        setTimeout(() => {
          button.innerHTML = originalText;
          contactForm.reset();
          lucide.createIcons();
        }, 2000);
      }, 1500);
    });

    // ============ FLOATING PARTICLES (light mode) ============
    const particlesContainer = document.getElementById('particles');
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
      @keyframes particleFall {
        0%   { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(100vh) scale(0); opacity: 0; }
      }
    `;
    document.head.appendChild(particleStyle);

    function createParticle() {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const x = Math.random() * window.innerWidth;
      const duration = Math.random() * 14 + 8;
      const colors = ['#bfdbfe', '#c7d2fe', '#e0e7ff', '#dbeafe'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        left: ${x}px;
        top: -10px;
        opacity: ${Math.random() * 0.4 + 0.1};
        animation: particleFall ${duration}s linear forwards;
      `;
      particlesContainer.appendChild(particle);
      setTimeout(() => particle.remove(), duration * 1000);
    }
    setInterval(createParticle, 500);

    // ============ SCROLL REVEAL ============
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.glass, .card-tilt, .portfolio-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.6s ease-out';
      observer.observe(el);
    });

    console.log('✨ Portofolio Muhammad Rizki siap!');
