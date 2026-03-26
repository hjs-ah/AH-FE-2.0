// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
body.classList.toggle('dark-theme', savedTheme === 'dark');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load content from Notion data
async function loadNotionContent() {
    try {
        console.log('🔄 Attempting to load Notion content...');
        const response = await fetch('/data.json');
        console.log('📡 Response status:', response.status);
        const data = await response.json();
        console.log('📦 Data loaded:', data);
        
        // Load articles
        if (data.articles && data.articles.length > 0) {
            console.log('✅ Loading articles:', data.articles.length);
            loadArticles(data.articles);
        } else {
            console.log('❌ No articles found in data');
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
        console.error('❌ Error loading Notion content:', error);
        // Fallback to hardcoded content if Notion fails
        loadFallbackContent();
    }
}

function loadArticles(articles) {
    const articlesContainer = document.getElementById('medium-articles');
    
    console.log('📝 loadArticles called with:', articles);
    
    articlesContainer.innerHTML = articles.map(article => {
        console.log('🔗 Article URL being used:', article.url);
        
        const date = new Date(article.publishedDate);
        const formattedDate = date.toLocaleDateString('en-US', { 
            month: '2-digit', 
            day: '2-digit', 
            year: 'numeric' 
        });
        
        return `
            <a href="${article.url}" target="_blank" class="article-link">
                <article class="article-item">
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-description">${article.description}</p>
                    <div class="article-meta">
                        <div style="display: flex; align-items: center; gap: 0.25rem;">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M8 2v4"></path>
                                <path d="M16 2v4"></path>
                                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                <path d="M3 10h18"></path>
                            </svg>
                            <span>${formattedDate}</span>
                        </div>
                        <div class="article-read-more" style="display: flex; align-items: center; gap: 0.25rem;">
                            <span>Read Article</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </div>
                    </div>
                </article>
            </a>
        `;
    }).join('');
    
    console.log('✅ Articles HTML generated, container updated');
}

function loadCreations(creations) {
    const creationsContainer = document.querySelector('.section-two-col:nth-of-type(3) .gallery-grid');
    if (!creationsContainer) return;
    
    creationsContainer.innerHTML = creations.map(creation => `
        <div class="gallery-item">
            <img src="${creation.imageUrl}" alt="${creation.name}">
            <div class="gallery-overlay">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
                    <line x1="11" x2="11" y1="8" y2="14"></line>
                    <line x1="8" x2="14" y1="11" y2="11"></line>
                </svg>
            </div>
        </div>
    `).join('');
    
    // Re-attach modal handlers
    attachModalHandlers();
}

function loadBooks(books) {
    const booksContainer = document.querySelector('.section-two-col:nth-of-type(4) .gallery-grid');
    if (!booksContainer) return;
    
    booksContainer.innerHTML = books.map(book => `
        <div class="gallery-item book-item">
            <img src="${book.coverImageUrl}" alt="${book.title}">
            <div class="gallery-overlay book-overlay">
                <p class="book-overlay-title">${book.title}</p>
                <p class="book-overlay-author">${book.author}</p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                </svg>
            </div>
        </div>
    `).join('');
}

function loadSettings(settings) {
    console.log('🎯 Loading settings:', settings);
    
    // Update name (with credentials)
    if (settings.name) {
        const nameElement = document.getElementById('profile-name');
        if (nameElement) {
            nameElement.textContent = settings.name;
            console.log('✅ Name updated to:', settings.name);
        }
        
        // Update page title
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) {
            pageTitle.textContent = `${settings.name} - Portfolio`;
            console.log('✅ Page title updated');
        }
    }
    
    // Update profile image if provided
    if (settings.profileImageUrl) {
        const profileImg = document.querySelector('.profile-image');
        if (profileImg) profileImg.src = settings.profileImageUrl;
    }
    
    // Update tagline if provided
    if (settings.tagline) {
        console.log('✏️ Updating tagline to:', settings.tagline);
        const taglineElement = document.getElementById('profile-tagline');
        if (taglineElement) {
            taglineElement.textContent = settings.tagline;
            console.log('✅ Tagline updated');
        } else {
            console.log('❌ Tagline element not found');
        }
    } else {
        console.log('⚠️ No tagline in settings');
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
            // Only update social links in header/footer, not article content
            document.querySelectorAll(`.social-link[href*="${platform}"], .connect-card[href*="${platform}"]`).forEach(link => {
                link.href = url;
            });
        }
    });
    
    // Update email
    if (settings.email) {
        const emailLink = document.querySelector('a[href^="mailto:"]');
        if (emailLink) emailLink.href = `mailto:${settings.email}`;
    }
}

function loadFallbackContent() {
    // Keep existing hardcoded content as fallback
    const articlesContainer = document.getElementById('medium-articles');
    articlesContainer.innerHTML = `
        <a href="https://medium.com/@antoneh/beyond-individual-achievement-reimagining-education-as-community-liberation-5c593699525f" target="_blank" class="article-link">
            <article class="article-item">
                <h3 class="article-title">Beyond Individual Achievement: Reimagining Education as Community Liberation</h3>
                <p class="article-description">Photo by Muhammad-Taha Ibrahim on Unsplash. Frederick Douglass understood what modern neuroscience now confirms...</p>
                <div class="article-meta">
                    <div style="display: flex; align-items: center; gap: 0.25rem;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M8 2v4"></path>
                            <path d="M16 2v4"></path>
                            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                            <path d="M3 10h18"></path>
                        </svg>
                        <span>2/11/2026</span>
                    </div>
                    <div class="article-read-more" style="display: flex; align-items: center; gap: 0.25rem;">
                        <span>Read Article</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </div>
                </div>
            </article>
        </a>
        <a href="https://medium.com/@antoneh/surviving-the-pain-patience-bond-through-peace-13f45a23b565" target="_blank" class="article-link">
            <article class="article-item">
                <h3 class="article-title">Surviving the Pain-Patience Bond through Peace</h3>
                <p class="article-description">I've come to the realization that pain is the byproduct of patience...</p>
                <div class="article-meta">
                    <div style="display: flex; align-items: center; gap: 0.25rem;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M8 2v4"></path>
                            <path d="M16 2v4"></path>
                            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                            <path d="M3 10h18"></path>
                        </svg>
                        <span>12/29/2024</span>
                    </div>
                    <div class="article-read-more" style="display: flex; align-items: center; gap: 0.25rem;">
                        <span>Read Article</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </div>
                </div>
            </article>
        </a>
        <a href="https://medium.com/transforming-the-mans-mind/4-words-to-traverse-stress-paralysis-31184d7cfbf9" target="_blank" class="article-link">
            <article class="article-item">
                <h3 class="article-title">4 Words to Traverse Stress Paralysis</h3>
                <p class="article-description">Stress — that unwelcome life companion — may be nature's most potent medicine...</p>
                <div class="article-meta">
                    <div style="display: flex; align-items: center; gap: 0.25rem;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M8 2v4"></path>
                            <path d="M16 2v4"></path>
                            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                            <path d="M3 10h18"></path>
                        </svg>
                        <span>12/27/2024</span>
                    </div>
                    <div class="article-read-more" style="display: flex; align-items: center; gap: 0.25rem;">
                        <span>Read Article</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </div>
                </div>
            </article>
        </a>
    `;
}

// Load content immediately when page loads
loadNotionContent();

// Set current year for copyright
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Trigger fade-in animations on page load
window.addEventListener('DOMContentLoaded', () => {
    // Add animate class to all fade-in elements
    document.querySelectorAll('.fade-in-left').forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate');
        }, 50);
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Image Modal functionality for "Recent Creations" section only
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');

function attachModalHandlers() {
    const recentCreationsSection = document.querySelectorAll('.section-two-col')[2];
    const creationItems = recentCreationsSection ? recentCreationsSection.querySelectorAll('.gallery-item') : [];

    creationItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const img = this.querySelector('img');
            if (img) {
                modalImage.src = img.src;
                imageModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

// Initial attachment
attachModalHandlers();

// Close modal when clicking the X button
if (modalClose) {
    modalClose.addEventListener('click', function() {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close modal when clicking outside the image
if (imageModal) {
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && imageModal && imageModal.classList.contains('active')) {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Admin login - opens Notion workspace for content editing
const adminLogin = document.getElementById('admin-login');
if (adminLogin) {
    adminLogin.addEventListener('click', function(e) {
        e.preventDefault();
        // Replace this URL with your actual Notion workspace URL
        // Example: https://notion.so/your-workspace/Portfolio-Content-abc123
        window.open('https://notion.so', '_blank');
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, observerOptions);

// Observe fade-in elements
document.querySelectorAll('.fade-in-left').forEach(element => {
    observer.observe(element);
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
