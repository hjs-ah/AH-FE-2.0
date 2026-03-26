// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'dark') {
    html.classList.add('dark-theme');
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark-theme');
    const theme = html.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// View Navigation
const views = document.querySelectorAll('.view');
const navCards = document.querySelectorAll('.nav-card');
const backButtons = document.querySelectorAll('.back-button');

function showView(viewId) {
    // Hide all views
    views.forEach(view => {
        view.classList.remove('active');
    });
    
    // Show target view
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) {
        targetView.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Handle nav card clicks
navCards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const viewId = card.dataset.view;
        showView(viewId);
        window.location.hash = viewId;
    });
});

// Handle back button clicks
backButtons.forEach(button => {
    button.addEventListener('click', () => {
        showView('landing');
        window.location.hash = '';
    });
});

// Handle URL hash on page load
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['case-studies', 'resume', 'community'].includes(hash)) {
        showView(hash);
    } else {
        showView('landing');
    }
});

// Handle browser back/forward
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['case-studies', 'resume', 'community'].includes(hash)) {
        showView(hash);
    } else {
        showView('landing');
    }
});

// Load Notion Content
async function loadNotionContent() {
    try {
        const response = await fetch('/data.json');
        const data = await response.json();
        
        if (data.settings) {
            loadSettings(data.settings);
        }
        
    } catch (error) {
        console.error('Error loading Notion content:', error);
    }
}

function loadSettings(settings) {
    // Update name (with credentials)
    if (settings.name) {
        const nameElement = document.getElementById('profile-name');
        if (nameElement) nameElement.textContent = settings.name;
        
        // Update page title
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) pageTitle.textContent = `${settings.name} - Portfolio`;
    }
    
    // Update profile photo
    if (settings.profileImageUrl) {
        const profilePhoto = document.getElementById('profile-photo');
        if (profilePhoto) profilePhoto.src = settings.profileImageUrl;
    }
    
    // Update tagline
    if (settings.tagline) {
        const taglineElement = document.getElementById('profile-tagline');
        if (taglineElement) taglineElement.textContent = settings.tagline;
    }
    
    // Update card 1 (Case Studies)
    if (settings.card1Title) {
        document.getElementById('card-title-1').textContent = settings.card1Title;
    }
    if (settings.card1Description) {
        document.getElementById('card-desc-1').textContent = settings.card1Description;
    }
    if (settings.card1Image) {
        document.getElementById('card-img-1').src = settings.card1Image;
    }
    
    // Update card 2 (Resume)
    if (settings.card2Title) {
        document.getElementById('card-title-2').textContent = settings.card2Title;
    }
    if (settings.card2Description) {
        document.getElementById('card-desc-2').textContent = settings.card2Description;
    }
    if (settings.card2Image) {
        document.getElementById('card-img-2').src = settings.card2Image;
    }
    
    // Update card 3 (Community)
    if (settings.card3Title) {
        document.getElementById('card-title-3').textContent = settings.card3Title;
    }
    if (settings.card3Description) {
        document.getElementById('card-desc-3').textContent = settings.card3Description;
    }
    if (settings.card3Image) {
        document.getElementById('card-img-3').src = settings.card3Image;
    }
    
    // Update social links
    const socialLinks = {
        medium: settings.mediumUrl,
        linkedin: settings.linkedinUrl,
        behance: settings.behanceUrl,
        figma: settings.figmaUrl,
    };
    
    Object.entries(socialLinks).forEach(([platform, url]) => {
        if (url) {
            document.querySelectorAll(`.social-link[href*="${platform}"]`).forEach(link => {
                link.href = url;
            });
        }
    });
}

// Set current year
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Load content on page load
loadNotionContent();
