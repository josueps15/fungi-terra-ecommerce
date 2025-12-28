// Product Data - now loaded from Firebase
// Products are loaded dynamically from firebase-products.js
// The `products` variable is defined there and populated from Firestore


// Shopping Cart
let cart = [];

// WhatsApp Configuration
const WHATSAPP_NUMBER = '593995807684'; // Ecuador: +593 995807684

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  // Page Transition: Fade In
  document.body.classList.add('loaded');

  // Page Transition: Fade Out on Link Click
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');

      // Only intercept internal links that are not anchors on the same page
      if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && link.target !== '_blank') {
        e.preventDefault();
        document.body.classList.remove('loaded');
        document.body.classList.add('fading-out');

        setTimeout(() => {
          window.location.href = href;
        }, 400); // Match CSS transition duration
      }
    });
  });

  // Show skeletons immediately
  showAllSkeletons();

  // Load products from Firebase first
  await loadProductsFromFirebase();

  // Then initialize the page
  loadProducts();
  loadCart();
  loadCart();
  initializeEventListeners();
  addScrollHints();
  injectFloatingWidgets();
  initializeScrollEffects();
});



// Load Products
function loadProducts() {
  renderProducts('freshMushroomsGrid', products.freshMushrooms);
  renderProducts('extractsGrid', products.extracts);
  renderProducts('microdosisGrid', products.microdosis);
  renderProducts('specialProductsGrid', products.specialProducts);
  renderCombos('combosGrid', products.combos);
}

function showAllSkeletons() {
  renderSkeletons('freshMushroomsGrid', 3);
  renderSkeletons('extractsGrid', 3);
  renderSkeletons('microdosisGrid', 3);
  renderSkeletons('specialProductsGrid', 3);
  renderSkeletons('combosGrid', 3);
}

// Render Skeleton Loaders (Magic UI Style)
function renderSkeletons(gridId, count) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.innerHTML = Array(count).fill(0).map(() => `
    <div class="product-card-skeleton">
      <div class="skeleton skeleton-image"></div>
      <div class="skeleton-content">
        <div class="skeleton skeleton-category"></div>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text-short"></div>
        <div class="skeleton skeleton-price"></div>
        <div class="skeleton-actions">
          <div class="skeleton skeleton-btn"></div>
          <div class="skeleton skeleton-btn"></div>
        </div>
      </div>
    </div>
  `).join('');
}

// Render Products
function renderProducts(gridId, productList) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.innerHTML = productList.map(product => {
    const isOutOfStock = product.stock === 0;
    const stockClass = isOutOfStock ? 'out-of-stock' : '';
    const buttonDisabled = isOutOfStock ? 'disabled' : '';
    const buttonText = isOutOfStock ? 'Agotado' : 'Agregar al Carrito';
    const whatsappText = isOutOfStock ? 'Agotado' : 'WhatsApp';
    const badgeHTML = isOutOfStock ? '<div class="out-of-stock-overlay"><img src="agotado.png" class="out-of-stock-badge-img" alt="Agotado"></div>' : '';

    return `
    <div class="product-card fade-in ${stockClass}" onclick="goToProductDetail('${product.id}')" style="cursor: pointer;">
      <div class="product-image-container" style="position: relative;">
        ${badgeHTML}
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400x300/2d5016/ffffff?text=${encodeURIComponent(product.name)}'">
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-price">$${product.price.toFixed(2)} <span style="font-size: var(--font-size-sm); font-weight: 400; color: var(--color-gray);">${product.unit}</span></div>
        <div class="product-actions" onclick="event.stopPropagation()">
          <button class="btn btn-primary" onclick="addToCart('${product.id}')" ${buttonDisabled}>
            ${buttonText}
          </button>
          <button class="btn btn-whatsapp" onclick="buyWhatsApp('${product.id}')" ${buttonDisabled}>
            ${whatsappText}
          </button>
        </div>
      </div>
    </div>
  `}).join('');
}

// Navigate to product detail page
function goToProductDetail(productId) {
  console.log('Navigating to product detail:', productId);
  if (!productId) {
    console.error('Error: productId is undefined');
    return;
  }
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

  grid.innerHTML = comboList.map(combo => {
    const isOutOfStock = combo.stock === 0;
    const stockClass = isOutOfStock ? 'out-of-stock' : '';
    const buttonDisabled = isOutOfStock ? 'disabled' : '';
    const buttonText = isOutOfStock ? 'Agotado' : 'Agregar al Carrito';
    const whatsappText = isOutOfStock ? 'Agotado' : 'WhatsApp';

    return `
    <div class="product-card combo-card fade-in ${stockClass}" onclick="goToProductDetail('${combo.id}')" style="cursor: pointer;">
      <div class="combo-badge">COMBO ESPECIAL</div>
      <div class="product-image-container">
        <img src="${combo.image}" alt="${combo.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400x300/2d5016/ffffff?text=${encodeURIComponent(combo.name)}'">
      </div>
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
          <button class="btn btn-primary" onclick="addToCart('${combo.id}')" ${buttonDisabled}>
            ${buttonText}
          </button>
          <button class="btn btn-whatsapp" onclick="buyWhatsApp('${combo.id}')" ${buttonDisabled}>
            ${whatsappText}
          </button>
        </div>
      </div>
    </div>
  `}).join('');
}

// Find Product by ID
function findProduct(productId) {
  const allProducts = [
    ...products.freshMushrooms,
    ...products.extracts,
    ...products.microdosis,
    ...products.specialProducts,
    ...products.combos
  ];
  return allProducts.find(p => p.id === productId);
}

// Add to Cart
function addToCart(productOrId, qty = 1) {
  let product;
  if (typeof productOrId === 'string') {
    product = findProduct(productOrId);
  } else {
    product = productOrId;
  }

  if (!product) {
    console.error('Product not found for cart:', productOrId);
    return;
  }

  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    cart.push({
      ...product,
      quantity: qty
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
  window.open('https://instagram.com/biorganix_ec', '_blank');
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

// Mobile Scroll Hints
function addScrollHints() {
  // Only process on mobile screens
  if (window.innerWidth > 768) return;

  const grids = [
    'freshMushroomsGrid',
    'extractsGrid',
    'microdosisGrid',
    'specialProductsGrid',
    'combosGrid'
  ];

  grids.forEach(gridId => {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    // Create hint wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'scroll-hint-wrapper';
    wrapper.innerHTML = `<div class="scroll-hint-arrow">→</div>`;

    // Append to the grid's parent to position relative to the section
    // We need to ensure the parent is relative positioned
    if (grid.parentElement) {
      grid.parentElement.style.position = 'relative';
      grid.parentElement.appendChild(wrapper);

      // Check if actually scrollable
      // We use a small timeout to ensure rendering is complete
      setTimeout(() => {
        if (grid.scrollWidth > grid.clientWidth) {
          // Show hint immediately
          // wrapper style is handled by CSS (display: block on mobile)

          // Add scroll listener to hide
          const hideHint = () => {
            wrapper.classList.add('hint-hidden');
            // Remove listener after first scroll
            grid.removeEventListener('scroll', hideHint);
            // Optional: Remove element after transition
            setTimeout(() => wrapper.remove(), 500);
          };

          grid.addEventListener('scroll', hideHint, { passive: true });
        } else {
          wrapper.style.display = 'none';
        }
      }, 500);
    }
  });
}

// ============================================
// FLOATING ASSISTANT WIDGETS
// ============================================

function injectFloatingWidgets() {
  const container = document.createElement('div');
  container.innerHTML = `
    <!-- Left: WhatsApp Widget -->
    <div class="floating-widget-container floating-widget-left">
      <div id="waPopup" class="chat-popup wa-bubble">
        <div class="wa-header">
          <span>Soporte BIORGANIX</span>
          <button class="close-chat" style="color: #999; font-size: 1rem;" onclick="toggleWhatsApp(event)">×</button>
        </div>
        <div>👋 ¡Hola! Somos el equipo de BIORGANIX.<br>¿En qué podemos ayudarte hoy?</div>
      </div>
      <button class="float-btn btn-whatsapp-float" onclick="toggleWhatsApp(event)">
        <svg viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.967.592 1.971.913 3.033.913h.001c3.181.002 5.77-2.586 5.771-5.767.001-3.182-2.585-5.77-5.766-5.77zm0 10.457c-.966 0-1.915-.295-2.735-.86l-.196-.135-1.928.505.516-1.878-.127-.203c-.628-1-1.011-2.126-1.01-3.328.001-2.656 2.162-4.815 4.818-4.816 2.657 0 4.818 2.161 4.818 4.818 0 2.656-2.161 4.816-4.818 4.817zm2.844-3.608c-.156-.078-.922-.455-1.064-.508-.142-.052-.247-.078-.351.078-.104.156-.403.508-.494.61-.091.104-.182.117-.338.039-.156-.078-.657-.242-1.252-.771-.462-.41-.774-.916-.865-1.072-.091-.156-.01-.24.068-.318.071-.071.156-.182.234-.273.078-.091.104-.156.156-.26.052-.104.026-.195-.013-.273-.039-.078-.351-.845-.481-1.157-.126-.303-.254-.262-.351-.266l-.299-.005c-.104 0-.273.039-.416.195-.143.156-.546.533-.546 1.3s.559 1.508.637 1.611c.078.104 2.197 3.356 5.323 4.706 2.067.892 2.87.859 3.376.792.569-.075 1.259-.516 1.438-1.013.179-.498.179-.924.126-1.013-.053-.09-.195-.144-.351-.222z"/></svg>
      </button>
    </div>

    <!-- Right: FungiBot Widget (Menu Mode) -->
    <div class="floating-widget-container floating-widget-right">
      <div id="botPopup" class="chat-popup bot-window">
        <div class="bot-header">
          <h4>🤖 FungiBot Guía</h4>
          <button class="close-chat" onclick="toggleBot(event)">×</button>
        </div>
        <div class="bot-messages" id="botMessages">
          <div class="message bot">
            ¡Hola! Soy FungiBot 🍄.<br>Elige una opción para ayudarte mejor:
          </div>
        </div>
        <!-- Dynamic Options Container -->
        <div class="bot-options" id="botOptions">
           <!-- Options injected by JS -->
        </div>
      </div>
      <button class="float-btn btn-bot-float" onclick="toggleBot(event)">
        <span class="bot-badge">MENU</span>
        <span style="font-size: 24px;">🍄</span>
      </button>
    </div>
  `;

  document.body.appendChild(container);

  // Initialize behaviors
  initWhatsAppWidget();
  renderBotOptions('main'); // Start with Main Menu
}

// WhatsApp Widget Logic
function initWhatsAppWidget() {
  // Show popup automatically after 3 seconds if not closed before
  setTimeout(() => {
    const popup = document.getElementById('waPopup');
    if (popup && !localStorage.getItem('waPopupClosed')) {
      popup.classList.add('active');
    }
  }, 3000);
}

function toggleWhatsApp(e) {
  e.stopPropagation();
  const popup = document.getElementById('waPopup');
  const isButton = e.currentTarget.classList.contains('float-btn');

  // If clicking button
  if (isButton) {
    if (popup.classList.contains('active')) {
      // If open, go to whatsapp
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola BIORGANIX, tengo una consulta.')}`;
      window.open(url, '_blank');
    } else {
      // If closed, open popup
      popup.classList.add('active');
    }
  } else {
    // Logic for close button or bubble click
    if (e.currentTarget.classList.contains('close-chat')) {
      popup.classList.remove('active');
      localStorage.setItem('waPopupClosed', 'true'); // Don't auto-show again
    } else if (e.currentTarget.classList.contains('wa-bubble')) {
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola BIORGANIX, tengo una consulta.')}`;
      window.open(url, '_blank');
    }
  }
}

// FungiBot Menu Logic
function toggleBot(e) {
  e.stopPropagation();
  const popup = document.getElementById('botPopup');
  popup.classList.toggle('active');
  if (popup.classList.contains('active')) {
    renderBotOptions('main'); // Reset to main menu on open
  }
}

// DECISION TREE DATA
const botMenus = {
  main: {
    text: "¿Qué te gustaría explorar hoy?",
    options: [
      { label: "🍄 Ver Productos", action: "menu:productos" },
      { label: "🌿 Salud y Beneficios", action: "menu:salud" },
      { label: "🚚 Envíos y Pagos", action: "msg:envios" },
      { label: "💬 Hablar con Humano", action: "link:whatsapp" }
    ]
  },
  productos: {
    text: "Tenemos hongos transformadores. ¿Cuál prefieres?",
    options: [
      { label: "🧠 Melena de León (Mente)", action: "msg:product_melena" },
      { label: "⚡ Cordyceps (Energía)", action: "msg:product_cordyceps" },
      { label: "🌙 Reishi (Relax/Sueño)", action: "msg:product_reishi" },
      { label: "🛡️ Cola de Pavo (Inmune)", action: "msg:product_cola" },
      { label: "🔙 Volver al Menú", action: "menu:main" }
    ]
  },
  salud: {
    text: "Cuéntame, ¿qué necesitas mejorar?",
    options: [
      { label: "😴 Dormir mejor / Estrés", action: "msg:benefit_sleep" },
      { label: "📚 Concentración / Memoria", action: "msg:benefit_focus" },
      { label: "🔋 Energía / Deporte", action: "msg:benefit_energy" },
      { label: "🩺 Subir Defensas", action: "msg:benefit_immune" },
      { label: "🔙 Volver al Menú", action: "menu:main" }
    ]
  }
};

function renderBotOptions(menuId) {
  const container = document.getElementById('botOptions');
  const messages = document.getElementById('botMessages');
  if (!container || !messages) return;

  // Clear previous options
  container.innerHTML = '';

  const menu = botMenus[menuId];
  if (!menu) return;

  // Add Bot Question
  addMessage(menu.text, 'bot');

  // Create Options
  menu.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = opt.label;
    btn.onclick = () => handleBotAction(opt.action, opt.label);
    container.appendChild(btn);
  });
}

function handleBotAction(action, label) {
  // Show User Choice
  addMessage(label, 'user');

  const [type, value] = action.split(':');

  if (type === 'menu') {
    // Navigate to submenu
    setTimeout(() => renderBotOptions(value), 500);
  }
  else if (type === 'msg') {
    // Show predefined response from KnowledgeBase logic (reused)
    const response = getPredefinedResponse(value);
    setTimeout(() => {
      addMessage(response, 'bot');
      // Show "Back to Menu" option after answer
      const container = document.getElementById('botOptions');
      container.innerHTML = `<button class="option-btn" onclick="renderBotOptions('main')">🔙 Volver al Menú Principal</button>`;
    }, 600);
  }
  else if (type === 'link') {
    if (value === 'whatsapp') {
      setTimeout(() => {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, quiero hablar con un asesor.')}`;
        window.open(url, '_blank');
        renderBotOptions('main');
      }, 500);
    }
  }
}

// Helper to fetch text from our existing KnowledgeBase or Catalog
function getPredefinedResponse(key) {
  // Reuse the rich content we already wrote!
  if (key === 'envios') return findBestBotAnswer("envios");

  if (key === 'product_melena') return findProductResponse('melena');
  if (key === 'product_cordyceps') return findProductResponse('cordyceps');
  if (key === 'product_reishi') return findProductResponse('reishi');
  if (key === 'product_cola') return findProductResponse('cola');

  if (key === 'benefit_sleep') return botKnowledgeBase.find(i => i.topic === 'protocolo_sueno').response;
  if (key === 'benefit_focus') return botKnowledgeBase.find(i => i.topic === 'memoria_focus').response;
  if (key === 'benefit_energy') return botKnowledgeBase.find(i => i.topic === 'energia_libido').response;
  if (key === 'benefit_immune') return botKnowledgeBase.find(i => i.topic === 'inmune_cancer').response;

  return "Opción no encontrada.";
}

function findProductResponse(query) {
  const p = findProductInCatalog(query);
  if (p) return `**${p.name}**<br>${p.description.substring(0, 80)}...<br>💰 **$${p.price}**<br>¿Te gustaría pedirlo?`;
  return "Producto no encontrado.";
}

function addMessage(text, sender, id = null) {
  const container = document.getElementById('botMessages');
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  if (id) div.id = id;
  div.innerHTML = text; // Allow minimal HTML
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return div.id; // Return ID for updates
}

// GEMINI API INTEGRATION
async function callGeminiAPI(userPrompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  // 1. Build Context from Window Data
  const contextData = {
    products: window.products || {},
    knowledge: botKnowledgeBase || [],
    business: {
      location: "Tumbaco, Quito",
      shipping_cost: 5,
      whatsapp: WHATSAPP_NUMBER
    }
  };

  // 2. System Prompt
  const systemInstruction = `
    ACT AS: FungiBot, the expert AI assistant of BIORGANIX (mushroom supplement store).
    TONE: Warm, professional, enthusiastic, helpful.
    CONTEXT_DATA: ${JSON.stringify(contextData)}
    INSTRUCTIONS:
    - Answer ONLY based on the CONTEXT_DATA. Do not hallucinate products we don't have.
    - If asked for prices, use the EXACT price from the JSON.
    - If asked for recipes/protocols, use the 'knowledge' section or general wisdom but keep it safe.
    - Be concise. The chat window is small. Use emojis.
    - If unsure, suggest WhatsApp contact.
  `;

  const payload = {
    contents: [{
      parts: [
        { text: systemInstruction },
        { text: `User Question: ${userPrompt}` }
      ]
    }]
  };

  try {
    const req = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await req.json();
    if (data.error) throw new Error(data.error.message);

    // Extract text
    return data.candidates[0].content.parts[0].text;

  } catch (err) {
    console.error("Gemini Error:", err);
    return "Lo siento, mi conexión con el micelio digital (Google API) falló. 🔌 Usaré mi base de datos interna. <br>" + getBotResponse(userPrompt);
  }
}

// Helper: Search Product in global catalog
function findProductInCatalog(query) {
  if (!window.products) return null;
  const lowerQuery = query.toLowerCase();

  // Combine all categories
  const allProducts = [
    ...window.products.freshMushrooms,
    ...window.products.extracts,
    ...window.products.microdosis,
    ...window.products.specialProducts,
    ...window.products.combos
  ];

  // Fuzzy search by name or id
  return allProducts.find(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.id.toLowerCase().includes(lowerQuery)
  );
}

// ============================================
// FUNGIBOT INTELLIGENCE CORE (KNOWLEDGE BASE)
// ============================================

const botKnowledgeBase = [
  // ===================================
  // 1. CULINARY ARTS (RECIPES)
  // ===================================
  {
    topic: "receta_risotto",
    keywords: ["receta", "risotto", "arroz", "cremoso", "cocinar"],
    response: `👨‍🍳 **Risotto Cremoso de Hongos**
    <br><b>Ingredientes:</b>
    <ul style="margin:5px 0 10px 15px; font-size:0.85rem;">
      <li>200g Ostras frescas (picadas)</li>
      <li>1 taza arroz Arborio</li>
      <li>1/2 taza vino blanco</li>
      <li>1 Litro caldo vegetales</li>
      <li>Ajo, cebolla, mantequilla, parmesano</li>
    </ul>
    <b>Pasos:</b><br>
    Sofreír hongos con ajo y reservar. En la misma olla, nacarar el arroz, agregar vino hasta evaporar. Incorporar caldo poco a poco moviendo siempre (20min). Al final, mezclar hongos, mantequilla y queso. ¡Servir caliente! 🍛`
  },
  {
    topic: "receta_ceviche",
    keywords: ["receta", "ceviche", "limon", "frio", "entrada"],
    response: `👨‍🍳 **Ceviche Vegano de Ostras**
    <br><b>Ingredientes:</b>
    <ul style="margin:5px 0 10px 15px; font-size:0.85rem;">
      <li>250g Ostras frescas (blanqueadas 30s)</li>
      <li>Jugo de 5 limones, cebolla morada</li>
      <li>Cilantro, tomate picado, aguacate</li>
      <li>Salsa de tomate, mostaza, aceite</li>
    </ul>
    <b>Pasos:</b><br>
    Cortar los hongos en tiras (simulando pescado). Mezclar con limón y sal (marinar 10 min). Agregar cebolla y tomate. Finalizar con cilantro y aguacate. ¡Acompañar con chifles! 🍋`
  },
  {
    topic: "receta_ajillo",
    keywords: ["receta", "ajillo", "ajo", "sarten", "rapido"],
    response: `👨‍🍳 **Hongos al Ajillo Express**
    <br><b>Ingredientes:</b>
    <ul style="margin:5px 0 10px 15px; font-size:0.85rem;">
      <li>250g Ostras enteras o troceadas</li>
      <li>5 dientes de ajo laminados</li>
      <li>Aceite de oliva, guindilla (opcional)</li>
      <li>Perejil fresco, vino blanco</li>
    </ul>
    <b>Pasos:</b><br>
    Dorar ajos en aceite. Subir fuego al máximo y echar los hongos (tienen que chillar 🔊). Saltear 3 min. Desglasar con un chorrito de vino. Espolvorear perejil y servir con pan tostado. 🥖`
  },
  {
    topic: "receta_milanesa",
    keywords: ["receta", "milanesa", "apanada", "frito", "crujiente", "nuggets"],
    response: `👨‍🍳 **Milanesas/Nuggets de Ostras**
    <br><b>Ingredientes:</b>
    <ul style="margin:5px 0 10px 15px; font-size:0.85rem;">
      <li>Ostras rosadas o grises (enteras)</li>
      <li>Harina, Huevo (o leche vegetal), Pan rallado</li>
      <li>Sal, pimienta, comino, ajo en polvo</li>
    </ul>
    <b>Pasos:</b><br>
    Aplanar los sombreros grandes con cuidado. Pasar por harina condimentada -> huevo batido -> pan rallado. Freír en aceite medio-alto hasta dorar. ¡Súper crujientes y carnosos! 🍗`
  },
  {
    topic: "menu_recetas",
    keywords: ["recetas", "cocinar", "preparar", "menu", "comer", "ideas"],
    response: "👨‍🍳 **Menú del Chef Fungi:**<br>¿Qué se te antoja preparar hoy?<br>1. **Risotto** de Hongos 🍛<br>2. **Ceviche** de Ostras 🍋<br>3. Al **Ajillo** (Tapeo) 🥖<br>4. **Milanesas** Apanadas 🍗<br><i>Escribe el nombre del plato y te paso la receta completa.</i>"
  },

  // ===================================
  // 2. HEALTH & PROTOCOLS (DR. FUNGI)
  // ===================================
  {
    topic: "protocolo_stamets",
    keywords: ["stamets", "protocolo", "neurogenesis", "psilocibina", "microdosis", "niacina"],
    response: "🧠 **Protocolo Stamets (Neurogénesis):**<br>Famosa combinación para potenciar el cerebro:<br><b>1. Melena de León</b> (Neuronas)<br><b>2. Psilocibina</b> (Microdosis - *Legalidad varía*)<br><b>3. Niacina (B3)</b> (Vasodilatador)<br><i>Ideal para neuroplasticidad y reparar daño nervioso.</i>"
  },
  {
    topic: "protocolo_sueno",
    keywords: ["dormir", "insomnio", "noche", "descanso", "sueño"],
    response: "🌙 **Protocolo Sueño Profundo:**<br>Combinación para apagar la mente:<br>- **Reishi** (1 gotero, 1h antes de dormir).<br>- **Magnesio** (Citrato o Glicinato).<br>- Dejar pantallas 30 min antes.<br><i>El Reishi regula el ciclo circadiano y reduce el cortisol nocturno.</i>"
  },
  {
    topic: "ansiedad_estres",
    keywords: ["ansiedad", "estres", "nervios", "calma", "panico"],
    response: "Para **estrés y ansiedad**, la ciencia apunta al **Reishi**. Modula el eje HPA (adrenal), reduciendo la respuesta de 'lucha o huida'. <br><b>Dosis:</b> 1ml sublingual cuando sientas el pico de estrés o antes de dormir."
  },
  {
    topic: "memoria_focus",
    keywords: ["memoria", "estudio", "concentracion", "deficit", "tdah", "enfoque"],
    response: "🧠 **Protocolo Enfoque (TDAH/Estudio):**<br>- **Melena de León** en ayunas (para NGF).<br>- **Cordyceps** antes de la tarea (para energía mental).<br>- Evitar azúcar en el desayuno.<br><i>Potencia la concentración sostenida sin los nervios del café.</i>"
  },
  {
    topic: "inmune_cancer",
    keywords: ["cancer", "quimio", "tumor", "defensas", "inmune", "oncologico"],
    response: "🛡️ **Apoyo Oncológico & Inmune:**<br>La **Cola de Pavo (Turkey Tail)** es rica en PSK/PSP, usados en Japón como coadyuvantes en quimioterapia para proteger el sistema inmune. <br><i>Consulta siempre a tu oncólogo. No reemplaza tratamiento médico.</i>"
  },
  {
    topic: "energia_libido",
    keywords: ["energia", "libido", "sexo", "potencia", "vigor", "cansancio", "fatiga"],
    response: "⚡ **Protocolo Vigor:**<br>El **Cordyceps** aumenta la oxigenación y el ATP. Históricamente usado por emperadores chinos para la virilidad y resistencia física. <br><b>Dosis:</b> 1-2 cápsulas/goteros 30 min antes de la actividad física."
  },

  // ===================================
  // 3. BIOLOGY & GENERAL KNOWLEDGE (WIKIPEDIA)
  // ===================================
  {
    topic: "que_es_hongo",
    keywords: ["que es", "hongo", "planta", "animal", "reino", "fungi"],
    response: "🍄 **¿Qué es un hongo?**<br>No son plantas ni animales, ¡tienen su propio reino (Fungi)!<br>Compartimos más ADN con los hongos (30-50%) que con las plantas. Ellos 'respiran' oxígeno y digieren su comida externamente."
  },
  {
    topic: "micelio_vs_cuerpo",
    keywords: ["micelio", "fruto", "diferencia", "cuerpo", "fructifero"],
    response: "🌱 **Micelio vs Cuerpo Fructífero:**<br>- **Micelio:** Es como la 'raíz' o internet del bosque (red blanca subterránea).<br>- **Cuerpo Fructífero:** Es la 'seta' que vemos y comemos (el órgano reproductor).<br><i>Nuestros extractos usan AMBOS para espectro completo (Full Spectrum).</i>"
  },
  {
    topic: "historia_reishi",
    keywords: ["historia", "reishi", "lingzhi", "antiguedad"],
    response: "📜 **Historia:** El Reishi ('Lingzhi') se usa en China hace más de 2000 años. Se le llamaba el 'Hongo de la Inmortalidad' y estaba reservado exclusivamente para la realeza bajo pena de muerte si un plebeyo lo consumía."
  },
  {
    topic: "adaptogenos",
    keywords: ["adaptogeno", "adaptogenos", "que significa", "definicion"],
    response: "⚖️ **¿Qué es un Adaptógeno?**<br>sustancias naturales que ayudan al cuerpo a *adaptarse* al estrés (físico, químico o biológico). No bloquean funciones, sino que las **regulan** (si estás bajo te suben, si estás alto te bajan)."
  },

  // ===================================
  // 4. LOGISTICS, USAGE & SAFETY
  // ===================================
  {
    topic: "dosis_general",
    keywords: ["dosis", "tomar", "gotas", "cuanto", "uso"],
    response: "📋 **Guía de Uso Rápida:**<br>- **Gotas:** 1 gotero (1ml) diario. Sublingual = efecto rápido.<br>- **Cápsulas:** 1-2 diarias.<br>- **Polvo:** 1 cucharadita en batidos.<br><i>La constancia es clave. Los hongos trabajan por acumulación.</i>"
  },
  {
    topic: "almacenamiento",
    keywords: ["guardar", "conservar", "refrigerar", "duran", "caducidad"],
    response: "❄️ **Conservación:**<br>- **Frescos:** SIEMPRE en refri, en bolsa de papel (respiran), duran 7-10 días.<br>- **Extractos/Secos:** Lugar fresco y oscuro, no necesitan refri. Duran 1-2 años."
  },
  {
    topic: "envios_pagos",
    keywords: ["envio", "costo", "pago", "precio", "donde", "ubicacion"],
    response: "🚚 **Logística Biorganix:**<br>- **Envíos:** Todo Ecuador ($5, Servientrega, 24-48h).<br>- **Pagos:** Transferencia, Depósito o Tarjeta (PayPhone).<br>- **Ubicación:** Tumbaco, Quito."
  },
  {
    topic: "seguridad",
    keywords: ["seguro", "embarazo", "ninos", "contraindicaciones"],
    response: "⚠️ **Seguridad:**<br>Son suplementos seguros, pero:<br>- **Embarazo/Lactancia:** Consultar médico.<br>- **Niños:** Dosis reducidas, consultar pediatra.<br>- **Interacciones:** Reishi puede tener efecto anticoagulante leve."
  }
];

// Engine: Find Best Answer (Fuzzy Scoring)
function findBestBotAnswer(input) {
  const lowerInput = input.toLowerCase();
  let bestMatch = null;
  let maxScore = 0;

  botKnowledgeBase.forEach(entry => {
    let score = 0;
    entry.keywords.forEach(kw => {
      if (lowerInput.includes(kw)) {
        // Boost score for exact word matches vs partial matches if needed
        score += lowerInput.match(new RegExp(`\\b${kw}\\b`)) ? 3 : 1;
      }
    });

    if (score > maxScore) {
      maxScore = score;
      bestMatch = entry;
    }
  });

  // Threshold: needs at least a solid match to trigger
  return (maxScore >= 1) ? bestMatch.response : null;
}

// Main Handler
function getBotResponse(input) {
  const lower = input.toLowerCase();

  // 1. Greet Warmly
  if (lower.match(/^(hola|buenos|buenas|saludos|hey|hi)/)) {
    return "¡Hola! Es un gusto saludarte 👋. Soy FungiBot, tu experto en hongos. Pregúntame sobre salud, dosis, recetas o precios. ¿En qué te ayudo?";
  }

  // 2. High Priority: Dynamic Product Pricing (Specific Queries)
  if (lower.match(/precio|costo|vale|cuesta/)) {
    if (lower.includes('melena') || lower.includes('leon')) {
      const p = findProductInCatalog('melena');
      return p ? `La **${p.name}** vale **$${p.price}**. Ideal para potenciar tu mente 🧠.` : null;
    }
    if (lower.includes('cordyceps')) {
      const p = findProductInCatalog('cordyceps');
      return p ? `El **${p.name}** vale **$${p.price}**. Energía física inmediata ⚡.` : null;
    }
    if (lower.includes('reishi')) {
      const p = findProductInCatalog('reishi');
      return p ? `El **${p.name}** vale **$${p.price}**. Relajación profunda 🌙.` : null;
    }
    if (lower.includes('pavo')) {
      const p = findProductInCatalog('cola');
      return p ? `La **${p.name}** vale **$${p.price}**. Escudo inmunológico 🛡️.` : null;
    }
    if (lower.includes('ostra') || lower.includes('fresco')) {
      return "Los **Hongos Frescos (Ostras)** cuestan **$5.00** la bandeja de 250g. ¡Deliciosos para cocinar! 🍳";
    }
  }

  // 3. Knowledge Base Search (The Engine)
  const kbResponse = findBestBotAnswer(input);
  if (kbResponse) return kbResponse;

  // 4. Product Fallback (If text matches a product name loosely)
  const productMatch = findProductInCatalog(input);
  if (productMatch) {
    return `Veo que te interesa **${productMatch.name}**.<br>${productMatch.description.substring(0, 100)}...<br>💰 Precio: **$${productMatch.price}**.<br>¿Quieres saber cómo se toma?`;
  }

  // 5. Ultimate Fallback
  return "Qué pregunta tan interesante 🤔. Mi enciclopedia de hongos aún está aprendiendo eso. ¿Te gustaría chatear con un humano por WhatsApp para resolverlo?";
}

// Expose functions globally for HTML onclick events
window.toggleWhatsApp = toggleWhatsApp;
window.toggleBot = toggleBot;
window.handleBotKey = handleBotKey;
window.sendBotMessage = sendBotMessage;
window.injectFloatingWidgets = injectFloatingWidgets;
