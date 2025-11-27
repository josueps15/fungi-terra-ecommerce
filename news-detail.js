// News Detail Page JavaScript

let currentArticle = null;

// Get article ID from URL
function getArticleIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Find article by ID
function findArticle(articleId) {
    return newsArticles.find(article => article.id === articleId);
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
}

// Load article details
function loadArticleDetail() {
    const articleId = getArticleIdFromURL();

    if (!articleId) {
        window.location.href = 'index.html#noticias';
        return;
    }

    currentArticle = findArticle(articleId);

    if (!currentArticle) {
        window.location.href = 'index.html#noticias';
        return;
    }

    // Update page title
    document.title = `${currentArticle.title} - FUNGI TERRA`;

    // Update breadcrumb
    document.getElementById('breadcrumbTitle').textContent = currentArticle.title;

    // Update header
    document.getElementById('articleIcon').textContent = currentArticle.icon;
    document.getElementById('articleTitle').textContent = currentArticle.title;
    document.getElementById('articleDate').textContent = formatDate(currentArticle.date);
    document.getElementById('articleCategory').textContent = currentArticle.category;

    // Update tags
    const tagsContainer = document.getElementById('articleTags');
    tagsContainer.innerHTML = currentArticle.tags.map(tag => `
    <span class="news-tag-item">${tag}</span>
  `).join('');

    // Update content
    document.getElementById('articleContent').innerHTML = currentArticle.fullContent;

    // Load related products
    loadRelatedProducts();

    // Setup share buttons
    setupShareButtons();
}

// Load related products
function loadRelatedProducts() {
    if (!currentArticle.relatedProducts || currentArticle.relatedProducts.length === 0) {
        return;
    }

    const relatedProductsSection = document.getElementById('relatedProductsSection');
    const relatedProductsGrid = document.getElementById('relatedProductsGrid');

    // Find related products from the products object
    const relatedProductsList = [];

    currentArticle.relatedProducts.forEach(productId => {
        // Search in all product categories
        let product = null;

        // Search in fresh mushrooms
        product = products.freshMushrooms.find(p => p.id === productId);
        if (product) {
            relatedProductsList.push(product);
            return;
        }

        // Search in extracts
        product = products.extracts.find(p => p.id === productId);
        if (product) {
            relatedProductsList.push(product);
            return;
        }

        // Search in special products
        product = products.specialProducts.find(p => p.id === productId);
        if (product) {
            relatedProductsList.push(product);
            return;
        }

        // Search in combos
        product = products.combos.find(p => p.id === productId);
        if (product) {
            relatedProductsList.push(product);
        }
    });

    if (relatedProductsList.length > 0) {
        relatedProductsSection.style.display = 'block';

        relatedProductsGrid.innerHTML = relatedProductsList.map(product => `
      <div class="product-card fade-in" onclick="goToProductDetail('${product.id}')" style="cursor: pointer;">
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400x300/2d5016/ffffff?text=${encodeURIComponent(product.name)}'">
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-price">$${product.price.toFixed(2)} <span style="font-size: var(--font-size-sm); font-weight: 400; color: var(--color-gray);">${product.unit}</span></div>
          <div class="product-actions" onclick="event.stopPropagation()">
            <button class="btn btn-primary" onclick="addToCart('${product.id}')">
              Agregar al Carrito
            </button>
            <button class="btn btn-whatsapp" onclick="buyWhatsApp('${product.id}')">
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    `).join('');
    }
}

// Setup share buttons
function setupShareButtons() {
    const currentUrl = window.location.href;
    const title = currentArticle.title;
    const text = currentArticle.shortDescription;

    // WhatsApp
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(title + '\n\n' + text + '\n\n' + currentUrl)}`;
    document.getElementById('shareWhatsApp').href = whatsappUrl;

    // Facebook
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    document.getElementById('shareFacebook').href = facebookUrl;

    // Instagram (Copy Link)
    const instagramBtn = document.getElementById('shareInstagram');
    if (instagramBtn) {
        instagramBtn.onclick = (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(title + ' ' + currentUrl).then(() => {
                alert('¡Enlace copiado! Pégalo en tu historia o post de Instagram.');
            }).catch(err => {
                console.error('Error al copiar:', err);
                // Fallback: open Instagram profile
                window.open('https://instagram.com/setas_hongoscomestibles', '_blank');
            });
        };
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadArticleDetail();
});
