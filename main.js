// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animations
ScrollReveal().reveal('.hero-content', {
    delay: 200,
    distance: '50px',
    origin: 'left',
    duration: 1000,
    easing: 'cubic-bezier(0.5, 0, 0, 1)'
});

ScrollReveal().reveal('.service-card', {
    delay: 200,
    distance: '50px',
    origin: 'bottom',
    duration: 800,
    interval: 200
});

ScrollReveal().reveal('.appointment-img', {
    delay: 300,
    distance: '50px',
    origin: 'left',
    duration: 1000
});

ScrollReveal().reveal('.appointment-form', {
    delay: 300,
    distance: '50px',
    origin: 'right',
    duration: 1000
});

ScrollReveal().reveal('.stat-item', {
    delay: 200,
    scale: 0.8,
    duration: 1000,
    interval: 200
});

ScrollReveal().reveal('.news-item, .staff-card, .contact-card, .notice-board', {
    delay: 200,
    distance: '30px',
    origin: 'bottom',
    duration: 800,
    interval: 150
});

// Active Link Highlighting
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.style.color = 'var(--primary)';
        link.style.fontWeight = '800';
    }
});


// Smooth Scrolling for Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission (WhatsApp Integration)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get Form Values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        
        // WhatsApp Number
        const whatsappNumber = "94771971319";
        
        // Construct Message
        const message = `*New Appointment Request*%0A%0A` +
                        `*Name:* ${name}%0A` +
                        `*Phone:* ${phone}%0A` +
                        `*Service:* ${service}%0A` +
                        `*Date:* ${date}`;
        
        // Redirect to WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
        window.open(whatsappURL, '_blank').focus();
        
        alert('ඔබගේ තොරතුරු WhatsApp මගින් යැවීමට සූදානම්. කරුණාකර WhatsApp විවෘත වූ පසු Send බොත්තම ඔබන්න.');
        e.target.reset();
    });
}

// News Modal Logic
const modal = document.getElementById('newsModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.modal-close');

document.querySelectorAll('.btn-read').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get content from the parent article
        const article = button.closest('.news-item');
        const title = article.querySelector('h2').innerText;
        const meta = article.querySelector('.news-meta').innerHTML;
        const shortDesc = article.querySelector('p').innerText;
        const detailedContent = article.querySelector('.news-details').innerHTML;
        
        // Detailed content
        const detailedText = `
            <h4 style="color: var(--primary); background: rgba(46, 125, 50, 0.1); display: inline-block; padding: 5px 15px; border-radius: 50px; margin-bottom: 15px; letter-spacing: 2px; font-weight: 800; font-size: 0.85rem;">GALLASSAPURA SPECIAL NEWS</h4>
            <div class="news-meta">${meta}</div>
            <h2 style="font-size: 2.2rem; margin-bottom: 15px;">${title}</h2>
            <p><strong>Overview:</strong> ${shortDesc}</p>
            <div class="modal-inner-content">
                ${detailedContent}
            </div>
            <p style="margin-top: 20px; font-size: 0.9rem; color: var(--text-muted); border-top: 1px solid #eee; pt: 15px;">වැඩිදුර තොරතුරු සඳහා කරුණාකර රෝහල් පිළිගැනීමේ කවුන්ටරය අමතන්න. (Contact hospital reception for more details).</p>
        `;
        
        modalBody.innerHTML = detailedText;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
});

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Special Notice Button Logic
const specialNoticeBtn = document.getElementById('specialNoticeBtn');
const thanksMessage = document.getElementById('thanksMessage');

if (specialNoticeBtn) {
    specialNoticeBtn.addEventListener('click', () => {
        thanksMessage.style.display = 'block';
        specialNoticeBtn.style.display = 'none';
    });
}

// Mobile Menu Toggle Logic
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close menu when a link is clicked (for mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });
});

// Hospital Calendar Logic
function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const calendarMonth = document.getElementById('calendarMonth');
    
    if (!calendarGrid) return;
    
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    calendarMonth.innerText = `${monthNames[month]} ${year}`;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    // Add day headers
    dayNames.forEach(day => {
        const dayHead = document.createElement('div');
        dayHead.className = 'calendar-day-head';
        dayHead.innerText = day;
        calendarGrid.appendChild(dayHead);
    });
    
    // Add empty slots for first week
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        calendarGrid.appendChild(empty);
    }
    
    // Add days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        const dayOfWeek = new Date(year, month, day).getDay();
        
        dayElement.className = 'calendar-day';
        dayElement.innerText = day;
        
        // Highlight Saturdays (6) and Sundays (0)
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            dayElement.classList.add('holiday');
        } else {
            dayElement.classList.add('open');
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateCalendar();
});



