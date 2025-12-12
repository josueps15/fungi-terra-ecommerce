// Product Data
const products = {
  freshMushrooms: [
    {
      id: 'oyster-white',
      name: 'Hongo Ostra Blanco',
      category: 'Hongos Frescos',
      description: 'Hongos ostra blancos frescos, perfectos para saltear, sopas y guisos. Textura suave y sabor delicado.',
      price: 3.00,
      image: 'oyster_white_mushroom_1763764129658.png',
      unit: 'por 250g'
    },
    {
      id: 'oyster-gray',
      name: 'Hongo Ostra Gris',
      category: 'Hongos Frescos',
      description: 'Hongos ostra grises frescos con sabor intenso. Ideales para platillos gourmet y recetas asiáticas.',
      price: 3.00,
      image: 'oyster_gray_mushroom_1763764144529.png',
      unit: 'por 250g'
    },
    {
      id: 'oyster-pink',
      name: 'Hongo Ostra Rosado',
      category: 'Hongos Frescos',
      description: 'Hongos ostra rosados frescos, variedad exótica con hermoso color. Sabor suave y textura firme.',
      price: 3.00,
      image: 'oyster_pink_mushroom_1763764160547.png',
      unit: 'por 250g'
    },
    {
      id: 'oyster-mix',
      name: 'Mix de Hongos Ostra',
      category: 'Hongos Frescos',
      description: '¡Variedad completa! Mix de hongos ostra blanco, gris y rosado. Perfectos para experimentar con diferentes sabores y texturas en tus platillos.',
      price: 3.00,
      image: 'oyster_white_mushroom_1763764129658.png',
      unit: 'por 250g'
    },
    {
      id: 'oyster-king',
      name: 'Hongo Ostra Rey',
      category: 'Hongos Frescos',
      description: 'Hongo Ostra Rey (King Oyster), variedad premium de gran tamaño. Textura carnosa y sabor umami intenso, perfecto para asar o saltear.',
      price: 3.00,
      image: 'oyster_white_mushroom_1763764129658.png',
      unit: 'por 250g'
    }
  ],
  extracts: [
    {
      id: 'turkey-tail',
      name: 'Extracto de Cola de Pavo',
      category: 'Extractos Medicinales',
      description: 'Extracto concentrado de Trametes versicolor. Apoya el sistema inmunológico y la salud digestiva.',
      price: 15.00,
      image: 'turkey_tail_extract_1763764175903.png',
      unit: 'frasco 30ml'
    },
    {
      id: 'lions-mane',
      name: 'Extracto de Melena de León',
      category: 'Extractos Medicinales',
      description: 'Extracto de Hericium erinaceus. Promueve la salud cognitiva, memoria y concentración.',
      price: 20.00,
      image: 'lions_mane_extract_1763764190974.png',
      unit: 'frasco 30ml'
    },
    {
      id: 'cordyceps',
      name: 'Extracto de Cordyceps',
      category: 'Extractos Medicinales',
      description: 'Extracto de Cordyceps militaris. Aumenta energía, resistencia y vitalidad natural.',
      price: 15.00,
      image: 'cordyceps_extract_1763764205645.png',
      unit: 'frasco 30ml'
    },
    {
      id: 'reishi',
      name: 'Extracto de Ganoderma (Reishi)',
      category: 'Extractos Medicinales',
      description: 'Extracto de Ganoderma lucidum (Reishi). Reduce el estrés, mejora el sueño y fortalece el sistema inmunológico.',
      price: 15.00,
      image: 'turkey_tail_extract_1763764175903.png',
      unit: 'frasco 30ml'
    }
  ],
  specialProducts: [
    {
      id: 'microdose-lions-mane',
      name: 'Microdosis Melena de León',
      category: 'Productos Especiales',
      description: 'Cápsulas de microdosis de melena de león. Mejora el enfoque y la claridad mental diariamente.',
      price: 15.00,
      image: 'microdose_capsules_1763764221475.png',
      unit: '30 cápsulas'
    },
    {
      id: 'microdose-cordyceps',
      name: 'Microdosis Cordyceps',
      category: 'Productos Especiales',
      description: 'Cápsulas de microdosis de cordyceps. Aumenta tu energía y rendimiento físico de forma natural.',
      price: 15.00,
      image: 'microdose_capsules_1763764221475.png',
      unit: '30 cápsulas'
    },
    {
      id: 'microdose-turkey-tail',
      name: 'Microdosis Cola de Pavo',
      category: 'Productos Especiales',
      description: 'Cápsulas de microdosis de cola de pavo. Fortalece el sistema inmunológico y apoya la salud digestiva.',
      price: 15.00,
      image: 'microdose_capsules_1763764221475.png',
      unit: '30 cápsulas'
    },
    {
      id: 'microdose-reishi',
      name: 'Microdosis Ganoderma (Reishi)',
      category: 'Productos Especiales',
      description: 'Cápsulas de microdosis de ganoderma (reishi). Reduce el estrés, mejora el sueño y fortalece la inmunidad.',
      price: 15.00,
      image: 'microdose_capsules_1763764221475.png',
      unit: '30 cápsulas'
    },
    {
      id: 'sandy-milk',
      name: 'Leche de Sandy',
      category: 'Productos Especiales',
      description: 'Leche vegetal natural de sandy, rica en nutrientes. Perfecta para batidos y bebidas saludables.',
      price: 10.00,
      image: 'oyster_white_mushroom_1763764129658.png',
      unit: 'botella 300ml'
    }
  ],
  combos: [
    {
      id: 'combo-wellness',
      name: '🌟 Combo Bienestar Total',
      category: 'Combos y Promociones',
      description: '¡OFERTA ESPECIAL! Hongo Ostra (cualquier variedad) + Extracto de Melena de León + Microdosis Melena de León. Todo lo que necesitas para potenciar tu salud mental y física.',
      price: 35.00,
      image: 'lions_mane_extract_1763764190974.png',
      unit: 'combo completo',
      includes: ['1 Hongo Ostra (250g)', '1 Extracto Melena de León (30ml)', '1 Microdosis Melena de León (30 cáps)']
    },
    {
      id: 'combo-energy',
      name: '⚡ Combo Energía y Vitalidad',
      category: 'Combos y Promociones',
      description: '¡PROMOCIÓN! Hongo Ostra Gris + Extracto de Cordyceps + Microdosis Cordyceps. La combinación perfecta para aumentar tu energía y rendimiento diario.',
      price: 30.00,
      image: 'cordyceps_extract_1763764205645.png',
      unit: 'combo completo',
      includes: ['1 Hongo Ostra Gris (250g)', '1 Extracto Cordyceps (30ml)', '1 Microdosis Cordyceps (30 cáps)']
    },
    {
      id: 'combo-immunity',
      name: '🛡️ Combo Inmunidad Premium',
      category: 'Combos y Promociones',
      description: '¡SUPER OFERTA! Hongo Ostra Blanco + Extracto Cola de Pavo + Microdosis Melena de León. Fortalece tu sistema inmunológico con esta poderosa combinación.',
      price: 30.00,
      image: 'turkey_tail_extract_1763764175903.png',
      unit: 'combo completo',
      includes: ['1 Hongo Ostra Blanco (250g)', '1 Extracto Cola de Pavo (30ml)', '1 Microdosis Melena de León (30 cáps)']
    },
    {
      id: 'combo-complete',
      name: '💎 Combo Completo Deluxe',
      category: 'Combos y Promociones',
      description: '¡OFERTA EXCLUSIVA! 2 Hongos Ostra (variedades a elegir) + 2 Extractos (a elegir) + 2 Microdosis (a elegir). El paquete más completo para tu bienestar integral.',
      price: 60.00,
      image: 'oyster_white_mushroom_1763764129658.png',
      unit: 'combo deluxe',
      includes: ['2 Hongos Ostra (500g total)', '2 Extractos (60ml total)', '2 Microdosis (60 cáps total)']
    }
  ]
};

// Shopping Cart
let cart = [];

// WhatsApp Configuration
const WHATSAPP_NUMBER = '593960945828'; // Ecuador: +593 960945828

// Initialize
document.addEventListener('DOMContentLoaded', () => {
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

  // Header Scroll Effect
  const header = document.querySelector('.header');
  let lastScroll = 0;

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
