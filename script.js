document.addEventListener('DOMContentLoaded', () => {
    initIntroAnimation();
    loadVulnerabilities();
    setupEventListeners();
});

// Intro Animation with GSAP
function initIntroAnimation() {
    const tl = gsap.timeline({
        onComplete: () => {
            document.getElementById('intro-overlay').style.display = 'none';
        }
    });

    // Animate 3 brushes
    tl.to("#brush-1", {
        duration: 1.5,
        x: '100vw',
        y: '20vh',
        rotate: 360,
        opacity: 1,
        ease: "power2.inOut"
    })
        .to("#brush-2", {
            duration: 1.5,
            x: '-100vw',
            y: '50vh',
            rotate: -360,
            opacity: 1,
            ease: "power2.inOut"
        }, "-=1.2")
        .to("#brush-3", {
            duration: 1.5,
            x: '100vw',
            y: '80vh',
            rotate: 720,
            opacity: 1,
            ease: "power2.inOut"
        }, "-=1.2")
        .to("#intro-overlay", {
            duration: 0.8,
            opacity: 0,
            ease: "power2.out"
        })
        .to("#main-app", {
            duration: 1,
            opacity: 1,
            ease: "power2.out"
        }, "-=0.5");
}

// Vulnerability Data (Embedded to avoid CORS issues when running locally)
const vulnerabilityData = [
    {
        "id": "dom-xss-01",
        "title": "DOM-Based XSS (Cross-Site Scripting)",
        "pdf": "dom-xss.pdf",
        "description": "Explaining the techniques of DOM XSS and how to mitigate them.",
        "date": "2026-11-1"
    }
];

// Load Vulnerabilities
async function loadVulnerabilities() {
    const grid = document.getElementById('vuln-grid');

    try {
        grid.innerHTML = '';

        vulnerabilityData.forEach(vuln => {
            const card = createVulnCard(vuln);
            grid.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading vulnerabilities:', error);
        grid.innerHTML = '<p style="color: #ef4444;">Failed to load vulnerability data.</p>';
    }
}

function createVulnCard(vuln) {
    const div = document.createElement('div');
    div.className = 'vuln-card';
    div.innerHTML = `
        <div class="vuln-title">${vuln.title}</div>
        <p class="vuln-info">${vuln.description}</p>
        <div class="vuln-footer">
            <span class="date-tag">${vuln.date}</span>
            <button class="btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">View PDF</button>
        </div>
    `;

    div.addEventListener('click', () => openPdf(vuln.pdf));

    return div;
}

// PDF Modal Handling
function openPdf(pdfPath) {
    const modal = document.getElementById('pdf-modal');
    const frame = document.getElementById('pdf-frame');

    // normal size, no zoom parameter
    frame.src = pdfPath;
    modal.style.display = 'flex';

    gsap.to(modal, { duration: 0.4, opacity: 1, ease: "power2.out" });
}

function closePdf() {
    const modal = document.getElementById('pdf-modal');

    gsap.to(modal, {
        duration: 0.3,
        opacity: 0,
        ease: "power2.in",
        onComplete: () => {
            modal.style.display = 'none';
            document.getElementById('pdf-frame').src = '';
        }
    });
}

function setupEventListeners() {
    document.getElementById('close-modal').addEventListener('click', closePdf);

    // Close on background click
    document.getElementById('pdf-modal').addEventListener('click', (e) => {
        if (e.target.id === 'pdf-modal') closePdf();
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePdf();
    });

    // Navigation Logic
    const navVuln = document.getElementById('nav-vuln');
    const navAbout = document.getElementById('nav-about');
    const gridSection = document.getElementById('vuln-grid');
    const aboutSection = document.getElementById('about-section');
    const headerTitle = document.querySelector('header h1');
    const headerSubtitle = document.querySelector('header .subtitle');

    const navContact = document.getElementById('nav-contact');
    const contactSection = document.getElementById('contact-section');

    navVuln.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav(navVuln);
        gridSection.style.display = 'grid';
        aboutSection.style.display = 'none';
        contactSection.style.display = 'none';
        headerTitle.textContent = 'Security Audit Repository';
        headerSubtitle.textContent = 'Dig deeper into Exploitation and how to skip.';

        // Refresh GSAP on grid items if needed
        gsap.from(".vuln-card", {
            y: 20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1
        });
    });

    navAbout.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav(navAbout);
        gridSection.style.display = 'none';
        aboutSection.style.display = 'block';
        contactSection.style.display = 'none';
        headerTitle.textContent = 'Who We Are';
        headerSubtitle.textContent = 'Elite Security Researchers & Penetration Testers.';
    });

    navContact.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav(navContact);
        gridSection.style.display = 'none';
        aboutSection.style.display = 'none';
        contactSection.style.display = 'block';
        headerTitle.textContent = 'Contact Us';
        headerSubtitle.textContent = 'Get in touch for secured audits & inquiries.';
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            const webhookUrl = "https://discord.com/api/webhooks/1459704876379541772/SQlNg6JVApV9iGiHnZS2J1Repa3sF7H42br0gUYfUpOmaR6xDabDvsl3-93gF21kP5_t";

            const payload = {
                embeds: [{
                    title: "📨 New Contact Message",
                    color: 0xffffff,
                    fields: [
                        { name: "Name", value: formData.name, inline: true },
                        { name: "Email", value: formData.email, inline: true },
                        { name: "Phone", value: formData.phone, inline: true },
                        { name: "Subject", value: formData.subject, inline: false },
                        { name: "Message", value: formData.message }
                    ],
                    footer: { text: "NovaSec Contact Form" },
                    timestamp: new Date().toISOString()
                }]
            };

            try {
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    alert('Failed to send message. Please try again.');
                }
            } catch (error) {
                console.error('Error sending webhook:', error);
                alert('An error occurred. Please check your connection.');
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    function setActiveNav(activeElement) {
        document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
        activeElement.classList.add('active');
    }
}
