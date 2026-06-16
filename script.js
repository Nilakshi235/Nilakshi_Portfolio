document.addEventListener('DOMContentLoaded', () => {
    // ── TYPING EFFECT ──
    const words = [
      "AI Engineer",
      "Full Stack Developer",
      "Data Scientist",
      "ML Enthusiast",
      "Agentic AI Builder"
    ];

    let i = 0;
    let j = 0;
    let currentWord = "";
    let isDeleting = false;
    const typingElement = document.getElementById("typing-text");

    function typeEffect(){
        if(!typingElement) return;

        currentWord = words[i];

        if(!isDeleting){
            j++;
        }
        else{
            j--;
        }

        typingElement.textContent = currentWord.substring(0,j);

        if(!isDeleting && j === currentWord.length){
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

        if(isDeleting && j === 0){
            isDeleting = false;
            i++;
            if(i === words.length){
                i = 0;
            }
        }

        setTimeout(typeEffect, isDeleting ? 60 : 120);
    }

    typeEffect();

    // ── SCROLL ANIMATIONS (Intersection Observer) ──
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((e, index) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), index * 80);
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // ── ACTIVE NAV HIGHLIGHT ──
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        document.querySelectorAll('.nav-links a').forEach(a => {
            a.style.color = a.getAttribute('href') === '#' + current ? 'var(--white)' : '';
        });
    });
});

// ── CONTACT FORM MAILER ──
function sendMail() {
    const name    = document.getElementById('c-name').value.trim();
    const email   = document.getElementById('c-email').value.trim();
    const subject = document.getElementById('c-subject').value.trim();
    const msg     = document.getElementById('c-msg').value.trim();
    
    if (!name || !email || !msg) { 
        alert('Please fill in your name, email, and message.'); 
        return; 
    }
    
    const mailto = `mailto:nilakshibaviskar23@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + msg)}`;
    window.location.href = mailto;
}