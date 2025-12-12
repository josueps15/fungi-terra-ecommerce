// News Detail Page JavaScript

let currentArticle = null;

// Get article ID from URL
function getArticleIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log('Article ID from URL:', id);
    return id ? id.trim() : null;
}

// Find article by ID
function findArticle(articleId) {
    console.log('Searching for article with ID:', articleId);
    const article = newsArticles.find(article => article.id === articleId);
    console.log('Found article:', article);
    return article;
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
        console.error('No article ID provided in URL');
        document.getElementById('articleContent').innerHTML = '<p class="error-message">No se especificó un artículo para mostrar.</p>';
        document.getElementById('articleTitle').textContent = 'Artículo no encontrado';
        return;
    }

    currentArticle = findArticle(articleId);

    if (!currentArticle) {
        console.error('Article not found for ID:', articleId);
        document.getElementById('articleContent').innerHTML = '<p class="error-message">El artículo que buscas no existe o ha sido movido.</p>';
        document.getElementById('articleTitle').textContent = 'Artículo no encontrado';
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
    console.log('Starting loadRelatedProducts...');
    const relatedProductsSection = document.getElementById('relatedProductsSection');
    const relatedProductsGrid = document.getElementById('relatedProductsGrid');

    if (!relatedProductsSection || !relatedProductsGrid) {
        console.error('Critical Error: Related products DOM elements not found');
        return;
    }

    // Force display immediately for debugging
    relatedProductsSection.style.display = 'block';
    relatedProductsGrid.innerHTML = '<div style="padding: 20px; text-align: center;">Cargando productos relacionados...</div>';

    try {
        if (!currentArticle) {
            throw new Error("currentArticle is null or undefined");
        }

        console.log('Current Article:', currentArticle);

        if (!currentArticle.relatedProducts || currentArticle.relatedProducts.length === 0) {
            console.warn('Article has no relatedProducts array');
            relatedProductsGrid.innerHTML = '<p>No hay productos relacionados definidos para este artículo.</p>';
            return;
        }

        // Verificar si 'products' existe
        if (typeof products === 'undefined') {
            throw new Error("La variable 'products' no está definida. Revisa si script.js se cargó correctamente.");
        }

        console.log('Products variable found:', products);

        // Find related products from the products object
        const relatedProductsList = [];

        currentArticle.relatedProducts.forEach(productId => {
            console.log(`Searching for product ID: ${productId}`);
            // Search in all product categories
            let product = null;

            // Search in fresh mushrooms
            if (products.freshMushrooms) {
                const found = products.freshMushrooms.find(p => p.id === productId);
                if (found) {
                    console.log(`Found in freshMushrooms: ${productId}`);
                    product = found;
                }
            }

            // Search in extracts
            if (!product && products.extracts) {
                const found = products.extracts.find(p => p.id === productId);
                if (found) {
                    console.log(`Found in extracts: ${productId}`);
                    product = found;
                }
            }

            // Search in special products
            if (!product && products.specialProducts) {
                const found = products.specialProducts.find(p => p.id === productId);
                if (found) {
                    console.log(`Found in specialProducts: ${productId}`);
                    product = found;
                }
            }

            // Search in combos
            if (!product && products.combos) {
                const found = products.combos.find(p => p.id === productId);
                if (found) {
                    console.log(`Found in combos: ${productId}`);
                    product = found;
                }
            }

            if (product) {
                relatedProductsList.push(product);
            } else {
                console.warn(`Product ID not found in any category: ${productId}`);
            }
        });

        console.log('Related Products List:', relatedProductsList);

        if (relatedProductsList.length > 0) {
            relatedProductsGrid.innerHTML = relatedProductsList.map(product => `
          <div class="product-card is-visible" onclick="goToProductDetail('${product.id}')" style="cursor: pointer;">
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
        } else {
            // Debugging: Show why it failed
            relatedProductsGrid.innerHTML = `
                <div style="grid-column: 1/-1; padding: 20px; background: #fff3cd; border: 1px solid #ffeeba; border-radius: 8px; color: #856404;">
                    <h4>Información de Depuración</h4>
                    <p>No se encontraron productos relacionados.</p>
                    <p><strong>IDs buscados:</strong> ${currentArticle.relatedProducts.join(', ')}</p>
                    <p><strong>Estado de 'products':</strong> Definido</p>
                    <p><strong>Categorías disponibles:</strong> ${Object.keys(products).join(', ')}</p>
                </div>
            `;
            console.warn('No se encontraron productos relacionados:', currentArticle.relatedProducts);
        }
    } catch (error) {
        console.error("Error crítico en loadRelatedProducts:", error);
        if (relatedProductsSection && relatedProductsGrid) {
            relatedProductsGrid.innerHTML = `
                <div style="grid-column: 1/-1; padding: 20px; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 8px;">
                    <h4>Error del Sistema</h4>
                    <p>${error.message}</p>
                    <pre style="font-size: 0.8em; margin-top: 10px;">${error.stack}</pre>
                </div>
            `;
        }
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
