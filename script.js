// Product Data - now loaded from Firebase
// Products are loaded dynamically from firebase-products.js
// The `products` variable is defined there and populated from Firestore


// Shopping Cart
let cart = [];

// WhatsApp Configuration
const WHATSAPP_NUMBER = '593960945828'; // Ecuador: +593 960945828

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  // Load products from Firebase first
  await loadProductsFromFirebase();

  // Then initialize the page
  loadProducts();
  loadCart();
  initializeEventListeners();
  initializeScrollEffects();
});



// Load Products
function loadProducts() {
  renderProducts('freshMushroomsGrid', products.freshMushrooms);
  renderProducts('extractsGrid', products.extracts);
  renderProducts('specialProductsGrid', products.specialProducts);
  renderCombos('combosGrid', products.combos);
}

// Render Products
function renderProducts(gridId, productList) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.innerHTML = productList.map(product => `
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

// Navigate to product detail page
function goToProductDetail(productId) {
  window.location.href = `product-detail.html?id=${productId}`;
}

// Navigate to news detail page
function goToNewsDetail(articleId) {
  console.log('Navigating to news detail:', articleId);
  window.location.href = `news-detail.html?id=${articleId}`;
}

// Render Combos (special styling for combo products)
function renderCombos(gridId, comboList) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.innerHTML = comboList.map(combo => `
    <div class="product-card combo-card fade-in" onclick="goToProductDetail('${combo.id}')" style="cursor: pointer;">
      <div class="combo-badge">COMBO ESPECIAL</div>
      <img src="${combo.image}" alt="${combo.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400x300/2d5016/ffffff?text=${encodeURIComponent(combo.name)}'">
      <div class="product-info">
        <div class="product-category">${combo.category}</div>
        <h3 class="product-name">${combo.name}</h3>
        <p class="product-description">${combo.description}</p>
        <div class="combo-includes">
          <strong>Incluye:</strong>
          <ul>
            ${combo.includes.map(item => `<li>✓ ${item}</li>`).join('')}
          </ul>
        </div>
        <div class="product-price">$${combo.price.toFixed(2)} <span style="font-size: var(--font-size-sm); font-weight: 400; color: var(--color-gray);">${combo.unit}</span></div>
        <div class="product-actions" onclick="event.stopPropagation()">
          <button class="btn btn-primary" onclick="addToCart('${combo.id}')">
            Agregar al Carrito
          </button>
          <button class="btn btn-whatsapp" onclick="buyWhatsApp('${combo.id}')">
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Find Product by ID
function findProduct(productId) {
  const allProducts = [
    ...products.freshMushrooms,
    ...products.extracts,
    ...products.specialProducts,
    ...products.combos
  ];
  return allProducts.find(p => p.id === productId);
}

// Add to Cart
function addToCart(productId) {
  const product = findProduct(productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  showNotification(`${product.name} agregado al carrito`);
}

// Remove from Cart
function removeFromCart(productId) {
  const item = cart.find(item => item.id === productId);
  const itemName = item ? item.name : 'Producto';

  cart = cart.filter(item => item.id !== productId);
  saveCart();

  // Force complete UI refresh
  setTimeout(() => {
    updateCartUI();
    showNotification(`${itemName} eliminado del carrito`);
  }, 10);
}

// Update Quantity
function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    // Force complete UI refresh
    setTimeout(() => {
      updateCartUI();
    }, 10);
  }
}

// Save Cart to LocalStorage
function saveCart() {
  localStorage.setItem('biorganixCart', JSON.stringify(cart));
}

// Load Cart from LocalStorage
function loadCart() {
  const savedCart = localStorage.getItem('biorganixCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }
}

// Update Cart UI - FIXED VERSION
function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartFooter = document.getElementById('cartFooter');
  const cartTotal = document.getElementById('cartTotal');

  if (!cartCount || !cartItems) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update cart count badge
  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

  // Clear and rebuild cart items
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    if (cartEmpty) cartEmpty.style.display = 'block';
    if (cartFooter) cartFooter.style.display = 'none';
    cartItems.innerHTML = '<div class="cart-empty"><p>Tu carrito está vacío</p></div>';
  } else {
    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartFooter) cartFooter.style.display = 'block';

    // Rebuild cart items HTML
    const cartHTML = cart.map(item => `
      <div class="cart-item" data-product-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/80x80/2d5016/ffffff?text=Producto'">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)} ${item.unit}</div>
          <div class="cart-item-quantity">
            <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
            <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">Eliminar</button>
        </div>
      </div>
    `).join('');

    cartItems.innerHTML = cartHTML;

    if (cartTotal) {
      cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    }
  }
}

// WhatsApp Functions
function buyWhatsApp(productId) {
  const product = findProduct(productId);
  if (!product) return;

  const message = `Hola, quiero comprar este producto:\n\n*${product.name}*\nPrecio: $${product.price} ${product.unit}\n\n¿Está disponible?`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function checkoutWhatsApp() {
  if (cart.length === 0) {
    showNotification('Tu carrito está vacío');
    return;
  }

  let message = '¡Hola! Quiero hacer un pedido:\n\n';

  cart.forEach(item => {
    message += `• ${item.name}\n  Cantidad: ${item.quantity}\n  Precio: $${(item.price * item.quantity).toFixed(2)}\n\n`;
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  message += `*Total: $${total.toFixed(2)}*`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}


function checkoutInstagram() {
  window.open('https://instagram.com/setas_hongoscomestibles', '_blank');
}

// Notification System
function showNotification(message) {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) {
    existing.remove();
  }

  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Event Listeners
function initializeEventListeners() {
  // Cart Toggle
  const cartBtn = document.getElementById('cartBtn');
  const cartModal = document.getElementById('cartModal');
  const closeCart = document.getElementById('closeCart');

  if (cartBtn && cartModal) {
    cartBtn.addEventListener('click', () => {
      cartModal.classList.add('active');
    });
  }

  if (closeCart && cartModal) {
    closeCart.addEventListener('click', () => {
      cartModal.classList.remove('active');
    });
  }

  // Close cart when clicking outside
  if (cartModal) {
    cartModal.addEventListener('click', (e) => {
      if (e.target === cartModal) {
        cartModal.classList.remove('active');
      }
    });
  }

  // Checkout Buttons
  const checkoutWhatsAppBtn = document.getElementById('checkoutWhatsApp');
  const checkoutPayPhoneBtn = document.getElementById('checkoutPayPhone');
  const checkoutInstagramBtn = document.getElementById('checkoutInstagram');

  if (checkoutWhatsAppBtn) {
    checkoutWhatsAppBtn.addEventListener('click', checkoutWhatsApp);
  }

  if (checkoutPayPhoneBtn) {
    checkoutPayPhoneBtn.addEventListener('click', checkoutPayPhone);
  }

  if (checkoutInstagramBtn) {
    checkoutInstagramBtn.addEventListener('click', checkoutInstagram);
  }

  // Mobile Menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Notification System
  function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  // Registration Form
  const registrationForm = document.getElementById('registrationForm');
  if (registrationForm) {
    registrationForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(registrationForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');

      // Deshabilitar botón mientras se procesa
      const submitButton = registrationForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Registrando...';

      try {
        // Enviar datos al servidor
        const response = await fetch('https://fungi-terra-ecommerce.onrender.com/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, phone })
        });

        const data = await response.json();

        if (data.success) {
          showNotification('¡Gracias por registrarte! Revisa tu email para el mensaje de bienvenida.', 'success');
          registrationForm.reset();
        } else {
          showNotification(data.message || 'Error al registrar. Intenta nuevamente.', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        showNotification('Error de conexión. Asegúrate de que el servidor esté ejecutándose.', 'error');
      } finally {
        // Rehabilitar botón
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });
  }

  // Header Scroll Effect
  const header = document.querySelector('.header');
  let lastScroll = 0;

  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      } else {
        header.style.boxShadow = 'none';
      }

      lastScroll = currentScroll;
    });
  }

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      }
    });
  }
}

// Scroll Effects
function initializeScrollEffects() {
  const observerOptions = {
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optional: Stop observing once visible to save performance
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elements to animate
  const animatedElements = document.querySelectorAll('.section-title, .section-subtitle, .product-card, .news-card, .hero-text, .hero-image');

  animatedElements.forEach((el, index) => {
    el.classList.add('reveal-on-scroll');
    // Add staggered delay for grid items
    if (el.classList.contains('product-card') || el.classList.contains('news-card')) {
      // Reset transition delay based on index in grid (modulo 3 for rows of 3)
      // This is a simple approximation, for better results we'd need to know the row index
      el.style.transitionDelay = `${(index % 3) * 100}ms`;
    }
    observer.observe(el);
  });
}

window.products = products;
window.goToProductDetail = goToProductDetail;
window.addToCart = addToCart;
window.buyWhatsApp = buyWhatsApp;
window.goToNewsDetail = goToNewsDetail;
