// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'dark') {
    html.classList.add('dark-theme');
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark-theme');
    const theme = html.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// SPA Navigation
const navLinks = document.querySelectorAll('.nav-link');
const views = document.querySelectorAll('.view-content');

function switchView(viewId) {
    // Hide all views
    views.forEach(view => {
        view.classList.remove('active');
    });
    
    // Show selected view
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) {
        targetView.classList.add('active');
    }
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.view === viewId) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle nav link clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const viewId = link.dataset.view;
        switchView(viewId);
        
        // Update URL hash
        window.location.hash = viewId;
    });
});

// Handle URL hash on page load
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'resume', 'creations'].includes(hash)) {
        switchView(hash);
    } else {
        switchView('home');
    }
});

// Handle browser back/forward
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'resume', 'creations'].includes(hash)) {
        switchView(hash);
    }
});

// Load content from Notion data
async function loadNotionContent() {
    try {
        const response = await fetch('/data.json');
        const data = await response.json();
        
        // Load articles
        if (data.articles && data.articles.length > 0) {
            loadArticles(data.articles);
        }
        
        // Load creations
        if (data.creations && data.creations.length > 0) {
            loadCreations(data.creations);
        }
        
        // Load books
        if (data.books && data.books.length > 0) {
            loadBooks(data.books);
        }
        
        // Load settings (profile image, social links)
        if (data.settings) {
            loadSettings(data.settings);
        }
        
    } catch (error) {
        console.error('Error loading Notion content:', error);
        loadFallbackContent();
    }
}

function loadArticles(articles) {
    const articlesContainer = document.getElementById('medium-articles');
    
    articlesContainer.innerHTML = articles.map(article => {
        const date = new Date(article.publishedDate);
        const formattedDate = date.toLocaleDateString('en-US', { 
            month: '2-digit', 
            day: '2-digit', 
            year: 'numeric' 
        });
        
        return `
            <a href="${article.url}" target="_blank" class="article-card">
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <div class="article-meta">
                    <span>${formattedDate}</span>
                    <span class="read-more">Read Article →</span>
                </div>
            </a>
        `;
    }).join('');
}

function loadCreations(creations) {
    const galleryContainer = document.getElementById('gallery-grid');
    
    galleryContainer.innerHTML = creations.map((creation, index) => `
        <div class="gallery-item" onclick="openModal('${creation.imageUrl}')">
            <img src="${creation.imageUrl}" alt="${creation.name}" loading="lazy">
        </div>
    `).join('');
}

function loadBooks(books) {
    const booksContainer = document.getElementById('books-grid');
    
    booksContainer.innerHTML = books.map(book => `
        <a href="${book.amazonLink}" target="_blank" class="book-item">
            <img src="${book.coverImageUrl}" alt="${book.title}" loading="lazy">
            <div class="book-overlay">
                <h4>${book.title}</h4>
                <p>${book.author}</p>
            </div>
        </a>
    `).join('');
}

function loadSettings(settings) {
    // Update profile image if provided
    if (settings.profileImageUrl) {
        const profileImg = document.querySelector('.profile-image');
        if (profileImg) profileImg.src = settings.profileImageUrl;
    }
    
    // Update tagline if provided
    if (settings.tagline) {
        const taglineElement = document.getElementById('profile-tagline');
        if (taglineElement) taglineElement.textContent = settings.tagline;
    }
    
    // Update social links if provided - ONLY in header, not article links
    const socialLinks = {
        medium: settings.mediumUrl,
        linkedin: settings.linkedinUrl,
        behance: settings.behanceUrl,
        figma: settings.figmaUrl,
    };
    
    Object.entries(socialLinks).forEach(([platform, url]) => {
        if (url) {
            // Only update social links in header, not article content
            document.querySelectorAll(`.social-link[href*="${platform}"]`).forEach(link => {
                link.href = url;
            });
        }
    });
}

function loadFallbackContent() {
    // Keep existing hardcoded content as fallback
    const articlesContainer = document.getElementById('medium-articles');
    articlesContainer.innerHTML = `
        <a href="https://medium.com/@antoneh/beyond-individual-achievement-reimagining-education-as-community-liberation-5c593699525f" target="_blank" class="article-card">
            <h3>Beyond Individual Achievement: Reimagining Education as Community Liberation</h3>
            <p>Frederick Douglass understood what modern neuroscience now confirms: the mind under duress cannot fully embrace learning.</p>
            <div class="article-meta">
                <span>02/11/2026</span>
                <span class="read-more">Read Article →</span>
            </div>
        </a>
        <a href="https://medium.com/transforming-the-mans-mind/transformation-an-underrated-path-to-fulfillment-8f8af0d15d70" target="_blank" class="article-card">
            <h3>Transformation: An Underrated Path to Fulfillment</h3>
            <p>Feeling stuck is inevitable, but no one celebrates it.</p>
            <div class="article-meta">
                <span>11/03/2023</span>
                <span class="read-more">Read Article →</span>
            </div>
        </a>
        <a href="https://medium.com/@antoneh/surviving-the-pain-patience-bond-through-peace-13f45a23b565" target="_blank" class="article-card">
            <h3>Surviving the Pain-Patient Bond through Peace</h3>
            <p>I've come to the realization that patience is a bond with pain.</p>
            <div class="article-meta">
                <span>12/29/2024</span>
                <span class="read-more">Read Article →</span>
            </div>
        </a>
    `;
}

// Image Modal
function openModal(imageUrl) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.classList.add('active');
    modalImg.src = imageUrl;
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
}

// Close modal on click outside image
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this || e.target.classList.contains('modal-close')) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Admin login - opens Notion workspace
const adminLogin = document.getElementById('admin-login');
if (adminLogin) {
    adminLogin.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://notion.so', '_blank');
    });
}

// Set current year for copyright
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Load content immediately when page loads
loadNotionContent();
