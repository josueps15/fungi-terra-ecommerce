// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

let currentProduct = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Product Detail Script Loaded');
  console.log('URL Search Params:', window.location.search);

  if (productId) {
    console.log('Product ID found:', productId);
    loadProductDetails(productId);
  } else {
    console.error('No product ID in URL');
    // Redirect to home if no product ID
    window.location.href = 'index.html';
  }
});

// Load product details
async function loadProductDetails(id) {
  console.log('📦 Loading details for:', id);
  try {
    // 1. Ensure all products are loaded (including hardcoded combos)
    if (typeof loadProductsFromFirebase === 'function') {
      console.log('Calling loadProductsFromFirebase...');
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout loading products')), 10000)
      );

      try {
        await Promise.race([loadProductsFromFirebase(), timeoutPromise]);
      } catch (e) {
        console.warn('Error or timeout loading firebase products, continuing with available data:', e);
      }
    }

    // 2. Try to find in loaded products (this covers combos and cached firestore data)
    let foundProduct = null;
    if (window.products) {
      const allProducts = [
        ...(window.products.freshMushrooms || []),
        ...(window.products.extracts || []),
        ...(window.products.microdosis || []),
        ...(window.products.specialProducts || []),
        ...(window.products.combos || [])
      ];
      foundProduct = allProducts.find(p => p.id === id);
    }

    // FALLBACK: Hardcoded combos if not found in window.products
    if (!foundProduct && id.includes('combo')) {
      console.log('⚠️ Triggering hardcoded fallback for combo:', id);
      console.log('Combo not found in window.products, using hardcoded fallback');
      const hardcodedCombos = [
        {
          id: 'combo-wellness',
          name: '🌟 Combo Bienestar Total',
          category: 'Combos y Promociones',
          description: '¡OFERTA ESPECIAL! Hongo Ostra (cualquier variedad) + Extracto de Melena de León + Microdosis Melena de León.',
          price: 35.00,
          image: 'lions_mane_extract_1763764190974.png',
          unit: 'combo completo',
          includes: ['1 Hongo Ostra (250g)', '1 Extracto Melena de León (30ml)', '1 Microdosis Melena de León (30 cáps)']
        },
        {
          id: 'combo-energy',
          name: '⚡ Combo Energía y Vitalidad',
          category: 'Combos y Promociones',
          description: '¡PROMOCIÓN! Hongo Ostra Gris + Extracto de Cordyceps + Microdosis Cordyceps.',
          price: 30.00,
          image: 'cordyceps_extract_1763764205645.png',
          unit: 'combo completo',
          includes: ['1 Hongo Ostra Gris (250g)', '1 Extracto Cordyceps (30ml)', '1 Microdosis Cordyceps (30 cáps)']
        },
        {
          id: 'combo-immunity',
          name: '🛡️ Combo Inmunidad Premium',
          category: 'Combos y Promociones',
          description: '¡SUPER OFERTA! Hongo Ostra Blanco + Extracto Cola de Pavo + Microdosis Melena de León.',
          price: 30.00,
          image: 'turkey_tail_extract_1763764175903.png',
          unit: 'combo completo',
          includes: ['1 Hongo Ostra Blanco (250g)', '1 Extracto Cola de Pavo (30ml)', '1 Microdosis Melena de León (30 cáps)']
        }
      ];
      foundProduct = hardcodedCombos.find(p => p.id === id);
    }

    if (foundProduct) {
      currentProduct = foundProduct;
      console.log('Product loaded from local data:', currentProduct);

      updateProductUI();

      // Hide skeleton and show content
      const skeleton = document.getElementById('productSkeleton');
      if (skeleton) skeleton.style.display = 'none';

      const content = document.getElementById('productContent');
      if (content) content.style.display = 'grid';

      const breadcrumb = document.getElementById('breadcrumbContainer');
      if (breadcrumb) breadcrumb.style.display = 'block';
      return;
    }

    // 3. Fallback: Try direct Firestore fetch (only for non-combos that might have been missed)
    console.log('Product not found locally, trying direct Firestore fetch...');

    if (window.db) {
      const docRef = db.collection('products').doc(id);
      const doc = await docRef.get();

      if (doc.exists) {
        currentProduct = doc.data();
        // Ensure ID is included in the object
        currentProduct.id = doc.id;

        console.log('Product loaded from Firestore:', currentProduct);

        updateProductUI();
      } else {
        console.error('No such product!');
        const title = document.getElementById('productTitle');
        if (title) title.textContent = 'Producto no encontrado';

        const breadcrumb = document.getElementById('breadcrumbProduct');
        if (breadcrumb) breadcrumb.textContent = 'No encontrado';

        const content = document.getElementById('productContent');
        if (content) content.style.display = 'grid';
      }
    } else {
      console.error('Firestore db not initialized');
      document.getElementById('productTitle').textContent = 'Error de conexión';
    }
  } catch (error) {
    console.error('Error getting product:', error);
    const content = document.getElementById('productContent');
    if (content) content.style.display = 'grid';
  } finally {
    // ALWAYS hide skeleton and preloader
    const skeleton = document.getElementById('productSkeleton');
    if (skeleton) skeleton.style.display = 'none';

    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }

    const breadcrumb = document.getElementById('breadcrumbContainer');
    if (breadcrumb) breadcrumb.style.display = 'block';
  }
}

// Update UI with product data
function updateProductUI() {
  // Update breadcrumb
  document.getElementById('breadcrumbProduct').textContent = currentProduct.name;

  // Update main image
  const mainImage = document.getElementById('mainImage');
  mainImage.src = currentProduct.image || 'placeholder.jpg';
  mainImage.alt = currentProduct.name;

  // Update product info
  document.getElementById('productCategory').textContent = currentProduct.category;
  document.getElementById('productTitle').textContent = currentProduct.name;
  document.getElementById('productPrice').textContent = `$${currentProduct.price.toFixed(2)}`;
  document.getElementById('productUnit').textContent = currentProduct.unit;
  document.getElementById('productDescription').textContent = currentProduct.description;

  // Load benefits
  loadBenefits();

  // Load usage info
  loadUsageInfo();

  // Load storage info
  loadStorageInfo();

  // Handle Out of Stock
  const mainImageContainer = document.querySelector('.main-image-container');
  const addToCartBtn = document.querySelector('.btn-add-cart-large');
  const quantityBtns = document.querySelectorAll('.quantity-btn');
  const quantityInput = document.getElementById('quantityDisplay');

  // Remove existing overlay if any
  const existingOverlay = mainImageContainer ? mainImageContainer.querySelector('.out-of-stock-overlay') : null;
  if (existingOverlay) existingOverlay.remove();

  if (currentProduct.stock === 0) {
    // 1. Add grayscale class
    if (mainImageContainer) {
      mainImageContainer.classList.add('out-of-stock');

      // 2. Inject CSS Badge
      const overlay = document.createElement('div');
      overlay.className = 'out-of-stock-overlay';
      overlay.innerHTML = '<img src="agotado.png" class="out-of-stock-badge-img" alt="Agotado">';
      mainImageContainer.appendChild(overlay);
    }

    // 3. Disable button
    if (addToCartBtn) {
      addToCartBtn.disabled = true;
      addToCartBtn.innerHTML = '<span>🚫</span> Agotado';
      addToCartBtn.style.backgroundColor = 'var(--color-gray)';
      addToCartBtn.style.cursor = 'not-allowed';
    }

    // 4. Disable quantity
    quantityBtns.forEach(btn => {
      btn.disabled = true;
      btn.style.opacity = '0.5';
      btn.style.cursor = 'not-allowed';
    });

    if (quantityInput) quantityInput.style.opacity = '0.5';

  } else {
    // Reset state
    if (mainImageContainer) mainImageContainer.classList.remove('out-of-stock');

    if (addToCartBtn) {
      addToCartBtn.disabled = false;
      addToCartBtn.innerHTML = '<span>🛒</span> Agregar al Carrito';
      addToCartBtn.style.backgroundColor = '';
      addToCartBtn.style.cursor = '';
    }

    quantityBtns.forEach(btn => {
      btn.disabled = false;
      btn.style.opacity = '';
      btn.style.cursor = '';
    });

    if (quantityInput) quantityInput.style.opacity = '';
  }

  // Hide preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
}

// Load gallery images
function loadGallery() {
  const thumbnailGrid = document.getElementById('thumbnailGrid');

  // Start with main image
  let images = [currentProduct.image || 'https://via.placeholder.com/600x600?text=No+Image'];

  // Ensure 4 slots as requested by user
  // If we don't have enough images, use placeholders with text
  while (images.length < 4) {
    const index = images.length + 1;
    images.push(`https://via.placeholder.com/400x400/f0f0f0/888888?text=Foto+${index}`);
  }

  // Create thumbnails
  thumbnailGrid.innerHTML = images.map((img, index) => `
    <img src="${img}" class="thumbnail ${index === 0 ? 'active' : ''}" 
         onclick="changeMainImage('${img}', this)" alt="Vista ${index + 1}">
  `).join('');
}

// Change main image
function changeMainImage(src, thumbnail) {
  document.getElementById('mainImage').src = src;

  // Update active state
  document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
  thumbnail.classList.add('active');
}

// Quantity handling
let quantity = 1;

function changeQuantity(delta) {
  if (currentProduct.stock === 0) return;

  const newQuantity = quantity + delta;
  if (newQuantity >= 1) {
    quantity = newQuantity;
    document.getElementById('quantityDisplay').textContent = quantity;
  }
}

// Add to Cart
function addToCartFromDetail() {
  if (!currentProduct || currentProduct.stock === 0) return;

  addToCart(currentProduct, quantity);

  const btn = document.querySelector('.btn-add-cart-large');
  const originalContent = btn.innerHTML;

  // 1. Change Text & Style
  btn.textContent = '¡Agregado!';
  btn.classList.add('btn-success');

  // 2. Button Animation (Animate.css)
  btn.classList.add('animate__animated', 'animate__rubberBand');

  // 3. Confetti Explosion (Canvas Confetti)
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#2D5A2D', '#D4A574', '#FFFFFF'], // Brand colors: Green, Gold, White
    disableForReducedMotion: true
  });

  setTimeout(() => {
    // Reset state
    btn.innerHTML = originalContent;
    btn.classList.remove('btn-success', 'animate__animated', 'animate__rubberBand');
  }, 2000);
}



// Tab switching
function switchTab(tabId) {
  // Update buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick').includes(tabId)) {
      btn.classList.add('active');
    }
  });

  // Update content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById(tabId + 'Tab').classList.add('active');
}

// Load benefits based on category
function loadBenefits() {
  const benefitsGrid = document.getElementById('benefitsGrid');
  let benefits = [];

  console.log('Loading benefits for category:', currentProduct.category);
  console.log('Product ID:', currentProduct.id);
  console.log('FULL PRODUCT DATA:', JSON.stringify(currentProduct, null, 2));

  // Fresh mushrooms
  if (currentProduct.category === 'hongos' || currentProduct.category === 'Hongos Frescos' || currentProduct.id.includes('oyster') || currentProduct.id.includes('seta') || currentProduct.id.includes('hongo')) {
    console.log('Matched category: Hongos');
    benefits = [
      {
        icon: '🌱',
        title: 'Frescos y Naturales',
        description: 'Cultivados localmente sin químicos ni pesticidas'
      },
      {
        icon: '💪',
        title: 'Alto en Proteínas',
        description: 'Excelente fuente de proteína vegetal'
      },
      {
        icon: '🧠',
        title: 'Vitaminas del Grupo B',
        description: 'Rico en vitaminas B2, B3 y B5'
      },
      {
        icon: '🛡️',
        title: 'Antioxidantes',
        description: 'Protege tus células del daño oxidativo'
      }
    ];
  }
  // Extracts
  else if (currentProduct.category === 'extractos' || currentProduct.category === 'Extractos Medicinales' || currentProduct.id.includes('extract')) {
    console.log('Matched category: Extractos');
    if (currentProduct.id.includes('lions-mane')) {
      benefits = [
        {
          icon: '🧠',
          title: 'Salud Cognitiva',
          description: 'Mejora memoria, concentración y claridad mental'
        },
        {
          icon: '🌱',
          title: 'Neuroprotección',
          description: 'Estimula el crecimiento de células nerviosas'
        },
        {
          icon: '😌',
          title: 'Reduce Ansiedad',
          description: 'Ayuda a calmar la mente y reducir el estrés'
        },
        {
          icon: '⚡',
          title: 'Energía Mental',
          description: 'Aumenta el enfoque y la productividad'
        }
      ];
    } else if (currentProduct.id.includes('cordyceps')) {
      benefits = [
        {
          icon: '⚡',
          title: 'Aumenta Energía',
          description: 'Mejora la producción de ATP celular'
        },
        {
          icon: '💪',
          title: 'Rendimiento Físico',
          description: 'Optimiza el uso de oxígeno durante el ejercicio'
        },
        {
          icon: '🫁',
          title: 'Salud Respiratoria',
          description: 'Mejora la capacidad pulmonar'
        },
        {
          icon: '❤️',
          title: 'Salud Cardiovascular',
          description: 'Apoya la circulación y salud del corazón'
        }
      ];
    } else {
      benefits = [
        {
          icon: '🛡️',
          title: 'Sistema Inmune',
          description: 'Fortalece las defensas naturales del cuerpo'
        },
        {
          icon: '💊',
          title: 'Extracto Concentrado',
          description: 'Máxima potencia y biodisponibilidad'
        },
        {
          icon: '🌿',
          title: '100% Natural',
          description: 'Sin aditivos ni conservantes artificiales'
        },
        {
          icon: '✨',
          title: 'Fácil Absorción',
          description: 'Formato líquido para mejor asimilación'
        }
      ];
    }
  }
  // Microdoses and Special Products
  else if (currentProduct.category === 'especiales' || currentProduct.category === 'microdosis' || currentProduct.category === 'Productos Especiales' || currentProduct.id.includes('micro') || currentProduct.id.includes('capsula')) {
    console.log('Matched category: Especiales/Microdosis');
    // Special handling for Leche de Sandy
    if (currentProduct.id === 'sandy-milk') {
      benefits = [
        {
          icon: '🌿',
          title: 'Salud Digestiva',
          description: 'Alivia gastritis, reflujo ácido y úlceras estomacales'
        },
        {
          icon: '🦠',
          title: 'Elimina H. Pylori',
          description: 'Combate la bacteria Helicobacter pylori naturalmente'
        },
        {
          icon: '💊',
          title: 'Medicina Amazónica',
          description: 'Producto natural de la selva ecuatoriana'
        },
        {
          icon: '🛡️',
          title: 'Rico en Nutrientes',
          description: 'Vitaminas, minerales y propiedades curativas'
        }
      ];
    }
    // Standard microdosis benefits
    else {
      benefits = [
        {
          icon: '💊',
          title: 'Dosis Precisa',
          description: 'Cápsulas con dosificación exacta y consistente'
        },
        {
          icon: '📅',
          title: 'Uso Diario',
          description: 'Fácil de incorporar en tu rutina diaria'
        },
        {
          icon: '🌿',
          title: 'Extracto Puro',
          description: 'Sin rellenos ni ingredientes innecesarios'
        },
        {
          icon: '✅',
          title: 'Conveniente',
          description: 'Portátil y fácil de tomar en cualquier lugar'
        }
      ];
    }
  } else if (
    (currentProduct.id && currentProduct.id.toLowerCase().includes('combo')) ||
    (currentProduct.category && currentProduct.category.toLowerCase().includes('combo')) ||
    (currentProduct.category && currentProduct.category.toLowerCase().includes('promocion'))
  ) {
    console.log('Matched category: Combos');
    benefits = [
      {
        icon: '✨',
        title: 'Sinergia Total',
        description: 'Combinación potente de hongos para maximizar resultados'
      },
      {
        icon: '💰',
        title: 'Mejor Valor',
        description: 'Ahorra comprando el kit completo en lugar de individualmente'
      },
      {
        icon: '🔄',
        title: 'Rutina Completa',
        description: 'Todo lo que necesitas para tu bienestar diario en un solo pack'
      },
      {
        icon: '🎯',
        title: 'Efecto Potenciado',
        description: 'Los componentes trabajan juntos para mayor eficacia'
      }
    ];

  } else {
    // GENERIC FALLBACK FOR "Productos" OR UNKNOWN CATEGORIES
    console.log('Using generic benefits for category:', currentProduct.category);
    benefits = [
      {
        icon: '🌱',
        title: '100% Natural',
        description: 'Producto elaborado con ingredientes naturales de alta calidad'
      },
      {
        icon: '⭐',
        title: 'Calidad Premium',
        description: 'Seleccionado y procesado bajo estrictos estándares'
      },
      {
        icon: '🤝',
        title: 'Soporte Local',
        description: 'Apoyas a productores locales con tu compra'
      },
      {
        icon: '✅',
        title: 'Garantizado',
        description: 'Satisfacción garantizada en todos nuestros productos'
      }
    ];

    // Remove Debug Overlay if it exists (cleanup)
    const existingDebug = document.querySelector('div[style*="z-index: 9999"]');
    if (existingDebug) existingDebug.remove();
  }

  if (benefits.length === 0) {
    console.warn('Benefits array is empty');
    benefitsGrid.innerHTML = '<p>No hay información de beneficios disponible para este producto.</p>';
    return;
  }

  benefitsGrid.innerHTML = benefits.map(benefit => `
    <div class="benefit-item">
      <div class="benefit-icon">${benefit.icon}</div>
      <div class="benefit-text">
        <h4>${benefit.title}</h4>
        <p>${benefit.description}</p>
      </div>
    </div>
  `).join('');
}

// Load usage information
function loadUsageInfo() {
  const usageContent = document.getElementById('usageContent');

  let usageText = '';

  // Fresh mushrooms
  if (currentProduct.category === 'hongos' || currentProduct.category === 'Hongos Frescos' || currentProduct.id.includes('oyster') || currentProduct.id.includes('seta') || currentProduct.id.includes('hongo')) {
    usageText = `
      <p><strong>🍳 Preparación:</strong></p>
      <ul>
        <li>Limpiar suavemente con un paño húmedo (no lavar bajo el grifo)</li>
        <li>Cortar en trozos del tamaño deseado</li>
        <li>Cocinar siempre antes de consumir</li>
      </ul>
      
      <p><strong>👨‍🍳 Métodos de Cocción:</strong></p>
      <ul>
        <li>🔥 <strong>Salteado:</strong> 5-7 minutos a fuego medio-alto con aceite de oliva</li>
        <li>🍲 <strong>En Sopas:</strong> Agregar en los últimos 10 minutos de cocción</li>
        <li>🥘 <strong>Guisos:</strong> Cocinar junto con otros ingredientes por 15-20 minutos</li>
        <li>🍖 <strong>A la Parrilla:</strong> 3-4 minutos por lado, pincelados con aceite</li>
      </ul>
      
      <p><strong>💡 Tips de Cocina:</strong></p>
      <ul>
        <li>No sobrecargues la sartén - cocina en tandas para mejor dorado</li>
        <li>Sazona al final para evitar que suelten agua</li>
        <li>Combina con ajo, tomillo o romero para realzar el sabor</li>
      </ul>
      
      <p><strong>🥤 Formas de Consumo:</strong></p>
      <ul>
        <li>☕ Directo bajo la lengua (sublingual) - absorción más rápida</li>
        <li>💧 Mezclado en agua, té o jugo</li>
        <li>🍵 Agregado a smoothies o batidos</li>
        <li>☕ En café o bebidas calientes</li>
      </ul>
      
      <p><strong>⚡ Para Mejores Resultados:</strong></p>
      <ul>
        <li>🔄 Usar consistentemente durante al menos 2-4 semanas</li>
        <li>📅 Tomar a la misma hora cada día</li>
        <li>💪 Combinar con estilo de vida saludable</li>
        <li>💧 Agitar bien antes de cada uso</li>
      </ul>
      
      <p><strong>⚠️ Consideraciones:</strong></p>
      <ul>
        <li>Comenzar con dosis baja y aumentar gradualmente</li>
        <li>Consultar con profesional de salud si estás tomando medicamentos</li>
        <li>No exceder la dosis recomendada</li>
      </ul>
    `;
  }
  // Microdoses and Special Products
  else if (currentProduct.category === 'especiales' || currentProduct.category === 'microdosis' || currentProduct.category === 'Productos Especiales' || currentProduct.id.includes('micro') || currentProduct.id.includes('capsula')) {
    // Special handling for Leche de Sandy
    if (currentProduct.id === 'sandy-milk') {
      usageText = `
        <p><strong>💧 Dosificación Recomendada:</strong></p>
        <ul>
          <li>📏 <strong>Dosis Estándar:</strong> 1 cucharada (15ml) 2-3 veces al día</li>
          <li>⏰ <strong>Frecuencia:</strong> Antes de cada comida principal</li>
          <li>🕐 <strong>Mejor Momento:</strong> 15-30 minutos antes de desayuno, almuerzo y cena</li>
          <li>🍽️ <strong>Con o Sin Comida:</strong> Preferiblemente con el estómago vacío</li>
        </ul>
        
        <p><strong>🥤 Formas de Consumo:</strong></p>
        <ul>
          <li>💧 Directo - tomar directamente de la cuchara</li>
          <li>💦 Mezclado en un vaso de agua tibia</li>
          <li>🍵 Agregado a té de hierbas</li>
          <li>🥄 Puro antes de las comidas</li>
        </ul>
        
        <p><strong>⚡ Para Mejores Resultados:</strong></p>
        <ul>
          <li>🔄 Usar consistentemente durante al menos 1-2 meses</li>
          <li>📅 Tomar regularmente sin saltarse dosis</li>
          <li>💪 Combinar con dieta baja en irritantes (picante, alcohol, café)</li>
          <li>💧 Agitar bien antes de cada uso</li>
        </ul>
        
        <p><strong>🎯 Tratamiento de Gastritis y H. Pylori:</strong></p>
        <ul>
          <li>📆 Duración mínima: 30 días continuos</li>
          <li>🔄 Para casos crónicos: 60-90 días</li>
          <li>💊 Puede combinarse con tratamiento médico (consultar doctor)</li>
          <li>📊 Notar mejoría en síntomas después de 1-2 semanas</li>
        </ul>
        
        <p><strong>⚠️ Consideraciones:</strong></p>
        <ul>
          <li>Evitar alimentos irritantes durante el tratamiento</li>
          <li>Consultar con profesional de salud si estás tomando medicamentos</li>
          <li>No exceder la dosis recomendada</li>
          <li>Mantener hidratación adecuada</li>
        </ul>
      `;
    }
    // Standard microdosis usage
    else {
      usageText = `
        <p><strong>💊 Dosificación:</strong></p>
        <ul>
          <li>📏 <strong>Dosis Diaria:</strong> 1-2 cápsulas al día</li>
          <li>⏰ <strong>Horario:</strong> Por la mañana con el desayuno</li>
          <li>💧 <strong>Con Agua:</strong> Tomar con un vaso lleno de agua</li>
          <li>🍽️ <strong>Con Comida:</strong> Preferiblemente con alimentos para mejor absorción</li>
        </ul>
        
        <p><strong>📅 Protocolo Recomendado:</strong></p>
        <ul>
          <li>🔄 <strong>Ciclo 5-2:</strong> 5 días tomando, 2 días de descanso</li>
          <li>📆 <strong>Duración:</strong> Mínimo 1 mes para ver resultados</li>
          <li>⚡ <strong>Inicio:</strong> Comenzar con 1 cápsula y aumentar si es necesario</li>
          <li>📊 <strong>Seguimiento:</strong> Llevar un diario de efectos y beneficios</li>
        </ul>
        
        <p><strong>💡 Consejos de Uso:</strong></p>
        <ul>
          <li>🕐 Tomar siempre a la misma hora para crear rutina</li>
          <li>💪 Combinar con meditación o ejercicio para potenciar efectos</li>
          <li>📝 Anotar cambios en energía, enfoque y bienestar</li>
          <li>🌙 Si causa insomnio, tomar más temprano en el día</li>
        </ul>
        
        <p><strong>⚠️ Importante:</strong></p>
        <ul>
          <li>No sustituye una dieta equilibrada</li>
          <li>Consultar con profesional si estás embarazada o amamantando</li>
          <li>Mantener fuera del alcance de niños</li>
        </ul>
      `;
    }
  }
  // Combos
  else if (
    (currentProduct.id && currentProduct.id.toLowerCase().includes('combo')) ||
    (currentProduct.category && currentProduct.category.toLowerCase().includes('combo')) ||
    (currentProduct.category && currentProduct.category.toLowerCase().includes('promocion'))
  ) {
    usageText = `
      <div class="combo-guide">
        <div class="guide-section">
          <h4>📦 Tu Kit Incluye</h4>
          <p>Una selección completa para tu bienestar. Aquí te explicamos cómo sacar el máximo provecho de cada producto:</p>
        </div>

        <div class="product-type-guide">
          <div class="guide-icon">🍄</div>
          <div class="guide-content">
            <h5>Hongos Frescos</h5>
            <ul>
              <li><strong>Cocina:</strong> Saltea, asar o agrega a sopas.</li>
              <li><strong>Frecuencia:</strong> Disfruta 2-3 veces por semana en tus comidas principales.</li>
              <li><strong>Tip:</strong> Cocina siempre antes de consumir para liberar sus nutrientes.</li>
            </ul>
          </div>
        </div>

        <div class="product-type-guide">
          <div class="guide-icon">💧</div>
          <div class="guide-content">
            <h5>Extractos Líquidos</h5>
            <ul>
              <li><strong>Dosis:</strong> 1 gotero completo (1ml) al día.</li>
              <li><strong>Uso:</strong> Directo bajo la lengua o en tu bebida favorita.</li>
              <li><strong>Momento:</strong> Mañana para energía, noche para relax.</li>
            </ul>
          </div>
        </div>

        <div class="product-type-guide">
          <div class="guide-icon">💊</div>
          <div class="guide-content">
            <h5>Microdosis (Cápsulas)</h5>
            <ul>
              <li><strong>Dosis:</strong> 1-2 cápsulas diarias.</li>
              <li><strong>Protocolo:</strong> 5 días de toma, 2 de descanso.</li>
              <li><strong>Mejor con:</strong> Tu desayuno para empezar el día con enfoque.</li>
            </ul>
          </div>
        </div>

        <div class="routine-box">
          <h4>🎯 Rutina Sugerida</h4>
          <div class="routine-steps">
            <div class="step">
              <span class="time">🌅 Mañana</span>
              <span class="action">Microdosis con el desayuno</span>
            </div>
            <div class="step">
              <span class="time">🌞 Mediodía</span>
              <span class="action">Extracto en tu agua o té</span>
            </div>
            <div class="step">
              <span class="time">🍽️ Comida</span>
              <span class="action">Platillo con Hongos Frescos</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (!usageText) {
    usageContent.innerHTML = '<p>No hay información de uso disponible.</p>';
  } else {
    usageContent.innerHTML = usageText;
  }
}

// Load storage information
function loadStorageInfo() {
  const storageContent = document.getElementById('storageContent');

  let storageText = '';

  // Fresh mushrooms
  if (currentProduct.category === 'hongos' || currentProduct.category === 'Hongos Frescos' || currentProduct.id.includes('oyster') || currentProduct.id.includes('seta') || currentProduct.id.includes('hongo')) {
    storageText = `
      <p><strong>❄️ Almacenamiento Correcto:</strong></p>
      <ul>
        <li>🌡️ Refrigerar inmediatamente a 2-4°C</li>
        <li>📦 Guardar en bolsa de papel o recipiente ventilado (NO plástico sellado)</li>
        <li>🚫 No lavar hasta justo antes de usar</li>
        <li>⏰ Consumir dentro de 5-7 días para máxima frescura</li>
      </ul>
      
      <p><strong>🧊 Congelación (Opcional):</strong></p>
      <ul>
        <li>Cocinar primero (saltear ligeramente)</li>
        <li>Dejar enfriar completamente</li>
        <li>Guardar en bolsas herméticas para congelador</li>
        <li>Duración: hasta 3 meses congelados</li>
        <li>Usar directamente del congelador en sopas y guisos</li>
      </ul>
      
      <p><strong>✅ Señales de Frescura:</strong></p>
      <ul>
        <li>✓ Textura firme y carnosa</li>
        <li>✓ Color uniforme y vibrante</li>
        <li>✓ Aroma fresco y terroso</li>
        <li>✓ Sin manchas oscuras o viscosidad</li>
      </ul>
      
      <p><strong>⚠️ No Consumir Si:</strong></p>
      <ul>
        <li>✗ Tienen olor agrio o amoniacal</li>
        <li>✗ Están viscosos o babosos al tacto</li>
        <li>✗ Presentan moho visible</li>
        <li>✗ Color muy oscuro o manchas negras</li>
      </ul>
      
      <p><strong>💡 Tip Pro:</strong> Para extender la vida útil, envuelve los hongos en una toalla de papel dentro de una bolsa de papel. La toalla absorberá el exceso de humedad.</p>
    `;
  }
  // Extracts
  else if (currentProduct.category === 'extractos' || currentProduct.category === 'Extractos Medicinales' || currentProduct.id.includes('extract')) {
    storageText = `
      <p><strong>🏠 Almacenamiento Ideal:</strong></p>
      <ul>
        <li>🌡️ Guardar en lugar fresco y seco, alejado de luz directa</li>
        <li>🚫 No refrigerar - la temperatura ambiente es ideal</li>
        <li>🔒 Mantener el frasco bien cerrado después de cada uso</li>
        <li>📍 Almacenar en posición vertical para evitar derrames</li>
        <li>🌡️ Temperatura ideal: 15-25°C</li>
      </ul>
      
      <p><strong>⏰ Vida Útil:</strong></p>
      <ul>
        <li>📦 <strong>Sin Abrir:</strong> 2 años desde la fecha de fabricación</li>
        <li>🔓 <strong>Después de Abrir:</strong> 6 meses para máxima potencia</li>
        <li>📅 Revisar fecha de vencimiento en la etiqueta</li>
        <li>✍️ Marcar la fecha de apertura en el frasco</li>
      </ul>
      
      <p><strong>✅ Señales de Calidad Óptima:</strong></p>
      <ul>
        <li>✓ Color consistente (puede variar de ámbar a marrón oscuro)</li>
        <li>✓ Aroma característico del hongo (terroso, ligeramente amargo)</li>
        <li>✓ Textura líquida uniforme (puede haber sedimento natural)</li>
        <li>✓ Sabor fuerte pero no rancio</li>
      </ul>
      
      <p><strong>⚠️ No Usar Si:</strong></p>
      <ul>
        <li>✗ El color ha cambiado drásticamente</li>
        <li>✗ Hay olor a moho o fermentación</li>
        <li>✗ La textura es espesa o gelatinosa</li>
        <li>✗ Ha pasado más de 6 meses desde la apertura</li>
      </ul>
      
      <p><strong>💡 Tip Pro:</strong> Si notas sedimento en el fondo, ¡es normal! Simplemente agita bien el frasco antes de usar. Esto indica que es un extracto natural sin filtración excesiva.</p>
    `;
  }
  // Microdoses and Special Products
  else if (currentProduct.category === 'especiales' || currentProduct.category === 'microdosis' || currentProduct.category === 'Productos Especiales' || currentProduct.id.includes('micro') || currentProduct.id.includes('capsula')) {
    // Special handling for Leche de Sandy
    if (currentProduct.id === 'sandy-milk') {
      storageText = `
        <p><strong>🏠 Almacenamiento Ideal:</strong></p>
        <ul>
          <li>❄️ Refrigerar después de abrir (2-8°C)</li>
          <li>🌙 Mantener alejado de luz solar directa</li>
          <li>🔒 Mantener la botella bien cerrada después de cada uso</li>
          <li>📍 Almacenar en posición vertical</li>
          <li>🚫 No congelar</li>
        </ul>
        
        <p><strong>⏰ Vida Útil:</strong></p>
        <ul>
          <li>📦 <strong>Sin Abrir:</strong> 12 meses en lugar fresco y seco</li>
          <li>🔓 <strong>Después de Abrir:</strong> 30 días refrigerado</li>
          <li>📅 Revisar fecha de vencimiento en la etiqueta</li>
          <li>✍️ Marcar la fecha de apertura en la botella</li>
        </ul>
        
        <p><strong>✅ Señales de Buena Conservación:</strong></p>
        <ul>
          <li>✓ Color blanco uniforme (puede tener ligera separación natural)</li>
          <li>✓ Aroma fresco y suave</li>
          <li>✓ Textura líquida (agitar antes de usar)</li>
          <li>✓ Sabor característico sin amargor excesivo</li>
        </ul>
        
        <p><strong>⚠️ No Consumir Si:</strong></p>
        <ul>
          <li>✗ Tiene olor agrio o fermentado</li>
          <li>✗ El color ha cambiado significativamente</li>
          <li>✗ Presenta grumos o moho visible</li>
          <li>✗ Ha estado más de 30 días abierto</li>
        </ul>
        
        <p><strong>💡 Tip Pro:</strong> Agita bien antes de cada uso ya que es un producto natural que puede separarse. Esto es completamente normal y no afecta la calidad.</p>
      `;
    }
    // Standard microdosis storage
    else {
      storageText = `
        <p><strong>🏠 Almacenamiento Ideal:</strong></p>
        <ul>
          <li>🌡️ Guardar en lugar fresco y seco (15-25°C)</li>
          <li>🌙 Alejado de luz solar directa y humedad</li>
          <li>🔒 Mantener el frasco bien cerrado</li>
          <li>🚫 No refrigerar - puede causar condensación</li>
          <li>👶 Mantener fuera del alcance de niños</li>
        </ul>
        
        <p><strong>⏰ Vida Útil y Potencia:</strong></p>
        <ul>
          <li>📦 <strong>Sin Abrir:</strong> 2 años desde fabricación</li>
          <li>🔓 <strong>Después de Abrir:</strong> 12 meses para máxima potencia</li>
          <li>💊 Las cápsulas mantienen mejor la potencia que polvos sueltos</li>
          <li>📅 Anotar fecha de apertura en el frasco</li>
        </ul>
        
        <p><strong>✅ Señales de Buena Conservación:</strong></p>
        <ul>
          <li>✓ Cápsulas intactas y sin deformaciones</li>
          <li>✓ Color uniforme del contenido</li>
          <li>✓ Sin olor fuerte o rancio</li>
          <li>✓ Frasco seco por dentro (sin humedad)</li>
        </ul>
        
        <p><strong>⚠️ No Consumir Si:</strong></p>
        <ul>
          <li>✗ Las cápsulas están pegajosas o deformadas</li>
          <li>✗ Hay cambio de color significativo</li>
          <li>✗ Presencia de moho o humedad en el frasco</li>
          <li>✗ Olor desagradable al abrir</li>
        </ul>
        
        <p><strong>🧳 Para Viajes:</strong></p>
        <ul>
          <li>✈️ Llevar en el envase original con etiqueta</li>
          <li>🎒 Usar pastillero solo para dosis de 1-2 días</li>
          <li>🌡️ Evitar dejar en auto bajo sol directo</li>
        </ul>
        
        <p><strong>💡 Tip Pro:</strong> Incluye un paquete de sílica gel en el frasco para absorber humedad y mantener las cápsulas en perfectas condiciones por más tiempo.</p>
      `;
    }
  }
  // Combos
  else if (
    (currentProduct.id && currentProduct.id.toLowerCase().includes('combo')) ||
    (currentProduct.category && currentProduct.category.toLowerCase().includes('combo')) ||
    (currentProduct.category && currentProduct.category.toLowerCase().includes('promocion'))
  ) {
    storageText = `
      <div class="combo-guide">
      <div class="guide-section">
        <h4>🏠 Guía de Almacenamiento</h4>
        <p>Para mantener la máxima frescura y potencia de tu kit, sigue estas recomendaciones por producto:</p>
      </div>

      <div class="product-type-guide">
        <div class="guide-icon">❄️</div>
        <div class="guide-content">
          <h5>Hongos Frescos</h5>
          <ul>
            <li><strong>Lugar:</strong> Refrigerador (2-4°C).</li>
            <li><strong>Envase:</strong> Bolsa de papel o recipiente ventilado.</li>
            <li><strong>Vida Útil:</strong> 5-7 días. ¡Cocínalos pronto!</li>
          </ul>
        </div>
      </div>

      <div class="product-type-guide">
        <div class="guide-icon">🌡️</div>
        <div class="guide-content">
          <h5>Extractos y Microdosis</h5>
          <ul>
            <li><strong>Lugar:</strong> Alacena fresca y seca.</li>
            <li><strong>Luz:</strong> Evita la luz solar directa.</li>
            <li><strong>Vida Útil:</strong> Meses (ver etiqueta). No requieren refrigeración.</li>
          </ul>
        </div>
      </div>

      <div class="routine-box">
        <h4>📋 Checklist Rápido</h4>
        <div class="routine-steps">
          <div class="step">
            <span class="time">🍄 Frescos</span>
            <span class="action">Al refri inmediato</span>
          </div>
          <div class="step">
            <span class="time">💧 Extractos</span>
            <span class="action">Alacena cerrada</span>
          </div>
          <div class="step">
            <span class="time">💊 Microdosis</span>
            <span class="action">Lugar seco</span>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  if (!storageText) {
    storageContent.innerHTML = '<p>No hay información de almacenamiento disponible.</p>';
  } else {
    storageContent.innerHTML = storageText;
  }
}
