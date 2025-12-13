// Product Detail Page JavaScript

let currentQuantity = 1;
let currentProduct = null;

// Get product ID from URL
function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Load product details
function loadProductDetail() {
  const productId = getProductIdFromURL();

  if (!productId) {
    window.location.href = 'index.html';
    return;
  }

  currentProduct = findProduct(productId);

  if (!currentProduct) {
    window.location.href = 'index.html';
    return;
  }

  // Update page title
  document.title = `${currentProduct.name} - FUNGI TERRA`;

  // Update breadcrumb
  document.getElementById('breadcrumbProduct').textContent = currentProduct.name;

  // Update product info
  document.getElementById('productCategory').textContent = currentProduct.category;
  document.getElementById('productTitle').textContent = currentProduct.name;
  document.getElementById('productPrice').textContent = `$${currentProduct.price.toFixed(2)}`;
  document.getElementById('productUnit').textContent = currentProduct.unit;
  document.getElementById('productDescription').textContent = currentProduct.description;

  // Load gallery
  loadGallery();

  // Load benefits
  loadBenefits();

  // Load usage info
  loadUsageInfo();

  // Load storage info
  loadStorageInfo();
}

// Load gallery images
function loadGallery() {
  const mainImage = document.getElementById('mainImage');
  const thumbnailGrid = document.getElementById('thumbnailGrid');

  // For now, use the same image multiple times (you can add more images later)
  const images = [
    currentProduct.image,
    currentProduct.image,
    currentProduct.image,
    currentProduct.image
  ];

  mainImage.src = images[0];
  mainImage.alt = currentProduct.name;

  thumbnailGrid.innerHTML = images.map((img, index) => `
    <img 
      src="${img}" 
      alt="${currentProduct.name} ${index + 1}" 
      class="thumbnail ${index === 0 ? 'active' : ''}"
      onclick="changeMainImage('${img}', ${index})"
      onerror="this.src='https://via.placeholder.com/400x400/2d5016/ffffff?text=${encodeURIComponent(currentProduct.name)}'"
    >
  `).join('');
}

// Change main image
function changeMainImage(imageSrc, index) {
  document.getElementById('mainImage').src = imageSrc;

  // Update active thumbnail
  document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

// Load benefits based on product type
function loadBenefits() {
  const benefitsGrid = document.getElementById('benefitsGrid');

  let benefits = [];

  // Check if it's a combo product
  if (currentProduct.id.includes('combo')) {
    benefits = [
      {
        icon: '💪',
        title: 'Bienestar Integral',
        description: 'Combinación perfecta de productos para tu salud completa'
      },
      {
        icon: '💰',
        title: 'Ahorro Garantizado',
        description: 'Precio especial al comprar en combo'
      },
      {
        icon: '🎯',
        title: 'Resultados Potenciados',
        description: 'Productos que se complementan entre sí'
      },
      {
        icon: '📦',
        title: 'Todo en Uno',
        description: 'Recibe todo lo que necesitas en un solo paquete'
      }
    ];
  }
  // Fresh mushrooms
  else if (currentProduct.category === 'Hongos Frescos') {
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
  else if (currentProduct.category === 'Extractos Medicinales') {
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
  else if (currentProduct.category === 'Productos Especiales') {
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
  if (currentProduct.category === 'Hongos Frescos') {
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
        <li>Perfectos como sustituto de carne en recetas vegetarianas</li>
      </ul>
    `;
  }
  // Extracts
  else if (currentProduct.category === 'Extractos Medicinales') {
    usageText = `
      <p><strong>💧 Dosificación Recomendada:</strong></p>
      <ul>
        <li>📏 <strong>Dosis Estándar:</strong> 1-2 ml (aproximadamente 1 gotero completo)</li>
        <li>⏰ <strong>Frecuencia:</strong> 1-2 veces al día</li>
        <li>🕐 <strong>Mejor Momento:</strong> Por la mañana y/o antes de dormir</li>
        <li>🍽️ <strong>Con o Sin Comida:</strong> Preferiblemente con el estómago vacío para mejor absorción</li>
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
  else if (currentProduct.category === 'Productos Especiales') {
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
  else if (currentProduct.id.includes('combo')) {
    usageText = `
      <p><strong>📦 Tu Combo Incluye:</strong></p>
      <p>Este combo contiene múltiples productos. Aquí está cómo usar cada uno:</p>
      
      <p><strong>🍄 Hongos Frescos:</strong></p>
      <ul>
        <li>Cocinar y consumir dentro de 5-7 días</li>
        <li>Usar en comidas principales 2-3 veces por semana</li>
      </ul>
      
      <p><strong>💧 Extractos Líquidos:</strong></p>
      <ul>
        <li>1-2 ml (1 gotero) 1-2 veces al día</li>
        <li>Tomar por la mañana para energía o por la noche para relajación</li>
      </ul>
      
      <p><strong>💊 Microdosis (Cápsulas):</strong></p>
      <ul>
        <li>1-2 cápsulas al día con el desayuno</li>
        <li>Seguir protocolo 5-2 (5 días sí, 2 días descanso)</li>
      </ul>
      
      <p><strong>🎯 Rutina Sugerida:</strong></p>
      <ul>
        <li>🌅 <strong>Mañana:</strong> Microdosis con desayuno</li>
        <li>🌞 <strong>Mediodía:</strong> Extracto en agua o té</li>
        <li>🍽️ <strong>Comida:</strong> Hongos frescos en tu platillo favorito</li>
        <li>🌙 <strong>Noche:</strong> Extracto relajante antes de dormir (opcional)</li>
      </ul>
      
      <p><strong>💡 Maximiza tus Resultados:</strong></p>
      <ul>
        <li>Ser consistente - la regularidad es clave</li>
        <li>Combinar con dieta balanceada y ejercicio</li>
        <li>Mantenerse hidratado</li>
        <li>Dormir 7-8 horas por noche</li>
      </ul>
    `;
  }

  usageContent.innerHTML = usageText;
}

// Load storage information
function loadStorageInfo() {
  const storageContent = document.getElementById('storageContent');

  let storageText = '';

  // Fresh mushrooms
  if (currentProduct.category === 'Hongos Frescos') {
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
  else if (currentProduct.category === 'Extractos Medicinales') {
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
  else if (currentProduct.category === 'Productos Especiales') {
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
  else if (currentProduct.id.includes('combo')) {
    storageText = `
      <p><strong>📦 Almacenamiento de tu Combo:</strong></p>
      <p>Tu combo incluye diferentes tipos de productos. Aquí está cómo almacenar cada uno:</p>
      
      <p><strong>🍄 Hongos Frescos:</strong></p>
      <ul>
        <li>❄️ Refrigerar inmediatamente a 2-4°C</li>
        <li>📦 Guardar en bolsa de papel o recipiente ventilado</li>
        <li>⏰ Consumir en 5-7 días</li>
        <li>💡 Si no los usarás pronto, cocina y congela</li>
      </ul>
      
      <p><strong>💧 Extractos Líquidos:</strong></p>
      <ul>
        <li>🌡️ Temperatura ambiente (15-25°C)</li>
        <li>🌙 Lugar fresco y seco, sin luz directa</li>
        <li>🔒 Cerrar bien después de cada uso</li>
        <li>📅 Usar dentro de 6 meses después de abrir</li>
      </ul>
      
      <p><strong>💊 Microdosis (Cápsulas):</strong></p>
      <ul>
        <li>🏠 Lugar fresco y seco</li>
        <li>🚫 No refrigerar</li>
        <li>🔒 Mantener frasco bien cerrado</li>
        <li>📅 Usar dentro de 12 meses después de abrir</li>
      </ul>
      
      <p><strong>📋 Checklist de Almacenamiento:</strong></p>
      <ul>
        <li>✓ Hongos frescos → Refrigerador</li>
        <li>✓ Extractos → Alacena/gabinete</li>
        <li>✓ Microdosis → Alacena/gabinete</li>
        <li>✓ Todos alejados de calor y humedad</li>
      </ul>
      
      <p><strong>💡 Tip Pro:</strong> Organiza tu combo en un área designada de tu cocina para facilitar tu rutina diaria. ¡La consistencia es clave para mejores resultados!</p>
    `;
  }

  storageContent.innerHTML = storageText;
}

// Switch tabs
function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById(`${tabName}Tab`).classList.add('active');
}

// Change quantity
function changeQuantity(change) {
  currentQuantity = Math.max(1, currentQuantity + change);
  document.getElementById('quantityDisplay').textContent = currentQuantity;
}

// Add to cart from detail page
function addToCartFromDetail() {
  if (!currentProduct) return;

  for (let i = 0; i < currentQuantity; i++) {
    addToCart(currentProduct.id);
  }

  // Update cart count display
  updateCartCount();

  showNotification(`${currentQuantity} x ${currentProduct.name} agregado al carrito`);
  currentQuantity = 1;
  document.getElementById('quantityDisplay').textContent = '1';
}

// Buy via WhatsApp from detail page
function buyWhatsAppFromDetail() {
  if (!currentProduct) return;

  const message = `Hola, quiero comprar:\n\n*${currentProduct.name}*\nCantidad: ${currentQuantity}\nPrecio: $${(currentProduct.price * currentQuantity).toFixed(2)}\n\n¿Está disponible?`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Ensure products are loaded before showing details
    if (typeof loadProductsFromFirebase === 'function') {
      await loadProductsFromFirebase();
    }
    loadProductDetail();
  } catch (error) {
    console.error("Error initializing product detail:", error);
  }
});
