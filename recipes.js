const recipes = [
    {
        "id": "hamburguesa",
        "title": "Hamburguesa de Hongos Ostra",
        "icon": "🍔",
        "ingredients": [
            "Hongos Ostra",
            "Apanadura",
            "Dos huevos",
            "Sal, Paprika, Pimienta",
            "Ajo picado y en polvo",
            "Aceite",
            "Pan de Hamburguesa",
            "Lechuga, Tomate, Cebolla",
            "Salsas (tomate, mayonesa, mostaza)"
        ],
        "preparation": [
            "Colocamos en un plato la apanadura con ¼ de: cuchara de paprika, pimienta, ajo en polvo y sal marina, (Mezclamos bien).",
            "En otro plato batimos los dos huevos, colocamos sal, paprika y ajo picado, (Mezclamos bien).",
            "Untamos el Hongo Ostra en el huevo y pasamos por la apanadura.",
            "Freímos con un poco de aceite, de 3 a 5 minutos de cada lado, con un fuego medio.",
            "Luego cortamos el pan de hamburguesa y lo tostamos en una paila sin aceite por 1 minuto.",
            "Procedemos a armar la hamburguesa colocando las salsas sobre el pan, luego los hongos ostra apanados, cubrimos con los vegetales, cubrimos el pan y disfruta."
        ]
    },
    {
        "id": "ceviche",
        "title": "Ceviche de Hongos",
        "icon": "🥣",
        "ingredients": [
            "Cebolla paiteña encurtida",
            "Tomate riñón en cuadritos",
            "Caldo de hongos",
            "Jugo de naranja y limón",
            "Culantro picado",
            "Pimiento encurtido",
            "Mostaza, Salsa de tomate",
            "Hongos ostra cocinados (3-5 min)",
            "Sal, Pimienta",
            "Chifle, canguil y arroz (acompañantes)"
        ],
        "preparation": [
            "Colocamos en un recipiente la cebolla curtida, el tomate picado, culantro picado, el pimiento picado, hongos ostra cocinados, jugos de limón y naranja, y el caldo de los hongos frío.",
            "Colocamos la salsa de tomate, mostaza, pimienta y sal al gusto.",
            "Al final revolvemos todo, colocamos el culantro picado y finalmente servimos.",
            "Podemos añadir chifle, canguil y arroz."
        ]
    },
    {
        "id": "salsa",
        "title": "Salsa de Hongos Ostra",
        "icon": "🍜",
        "ingredients": [
            "Hongos Ostra",
            "1 taza de leche",
            "Mantequilla y aceite",
            "Maicena",
            "Ajo picado",
            "Sal, Pimienta, Paprika"
        ],
        "preparation": [
            "Salsa Béchamel: En sartén derretir mantequilla y agregar maicena hasta hacer grumo, colocamos la leche por partes y mezclamos hasta espesar (10 min aprox), añadimos sal y pimienta.",
            "Limpiamos los hongos con un paño seco y troceamos.",
            "En otro sartén diluimos mantequilla, agregamos ajo, paprika y hongos para saltear (3 min).",
            "Incorporamos la salsa béchamel a fuego lento por 2 minutos. Ideal para pastas, papas, carnes."
        ]
    },
    {
        "id": "estofado",
        "title": "Estofado de Hongos",
        "icon": "🥘",
        "ingredients": [
            "Hongos Ostra",
            "Cebolla paiteña encurtida",
            "Tomates picados",
            "Pimiento picado, Ajo picado",
            "Cebolla larga picada",
            "Cúrcuma/achiote, Paprika",
            "Pimienta, Sal, Aceite",
            "Agua"
        ],
        "preparation": [
            "Hacemos un refrito en aceite con cebolla larga, pimiento, cúrcuma, paprika, pimienta y sal.",
            "Añadimos los hongos ostra, cebolla paiteña y tomates. Mezclamos bien y mantenemos por 5 minutos.",
            "Emplatar acompañado de arroz, papas, lenteja y ensalada."
        ]
    },
    {
        "id": "asado",
        "title": "Asado de Hongos",
        "icon": "🔥",
        "ingredients": [
            "Hongos Ostra",
            "Sazón o chimichurri",
            "1 naranja",
            "Sal, Cúrcuma, Pimienta",
            "Culantro picado finamente"
        ],
        "preparation": [
            "Cortamos las orejitas de los hongos y abrimos los tallos.",
            "En un recipiente: sazón, jugo de naranja, sal, ¼ de cúrcuma, ¼ de pimienta y culantro. Mezclamos.",
            "Pasamos los hongos por esta mezcla para sazonarlos.",
            "Colocamos en parrilla caliente. Asar y dorar 10 min por lado.",
            "Servir con papas, maduro asado y ensalada."
        ]
    },
    {
        "id": "nuggets",
        "title": "Nuggets con Salsa BBQ",
        "icon": "🍗",
        "ingredients": [
            "Hongos Ostra",
            "Apanadura",
            "Huevos",
            "Cúrcuma, Pimienta, Paprika",
            "Sal, Aceite",
            "Salsa BBQ"
        ],
        "preparation": [
            "Plato 1: Apanadura, ¼ cuchara paprika, pimienta, ajo en polvo y sal.",
            "Plato 2: Batir huevos, sal, paprika y ajo picado.",
            "Pasar Hongo Ostra por huevo y luego por apanadura.",
            "Freír en aceite a fuego medio (3-5 min por lado).",
            "Escurrir en servilleta y servir con salsa BBQ."
        ]
    },
    {
        "id": "fritos",
        "title": "Hongos Fritos",
        "icon": "🍳",
        "ingredients": [
            "Hongos Ostra",
            "Cúrcuma, Sal, Pimienta",
            "Aceite"
        ],
        "preparation": [
            "Sazonar los hongos enteros con sal, cúrcuma y pimienta. Dejar reposar.",
            "Calentar aceite en paila a fuego medio.",
            "Colocar hongos suavemente y freír 4-6 min por lado.",
            "Escurrir aceite y servir con arroz, lenteja y ensalada."
        ]
    },
    {
        "id": "horno",
        "title": "Hongos al Horno",
        "icon": "🥧",
        "ingredients": [
            "Hongos Ostra",
            "Sazón o chimichurri",
            "1 naranja",
            "Sal, Cúrcuma, Pimienta",
            "Culantro picado"
        ],
        "preparation": [
            "Preparar los hongos (separar orejas y abrir tallos).",
            "Mezcla de sazón: naranja, sal, cúrcuma, pimienta, culantro.",
            "Sazonar los hongos con la mezcla.",
            "Colocar en lata de horno. Hornear a 180º por 10 min cada lado.",
            "Servir con papas chauchas y guacamole."
        ]
    },
    {
        "id": "sandwich",
        "title": "Sándwich de Hongos",
        "icon": "🥪",
        "ingredients": [
            "Hongos Ostra",
            "Pan (2 rebanadas)",
            "Cebolla encurtida, Tomate, Lechuga",
            "Mayonesa, Sal",
            "Guacamole"
        ],
        "preparation": [
            "Saltear hongos en cuadritos (3-5 min) con sal.",
            "Mezclar hongos con mayonesa.",
            "Tostar levemente el pan.",
            "Armar: Pan, guacamole, hongos con mayonesa, cebolla, tomate, lechuga, pan."
        ]
    },
    {
        "id": "guatita",
        "title": "Guatita Vegetariana",
        "icon": "🍛",
        "ingredients": [
            "Hongos Ostra (cuadritos)",
            "Cebolla paiteña y larga, Ajo",
            "Aceite, Achiote, Comino",
            "Maní en pasta, Leche",
            "Papas cocinadas (cubos)",
            "Culantro, Arroz, Aguacate, Huevo duro"
        ],
        "preparation": [
            "Sofrito: aceite, achiote, cebollas (larga y paiteña), ajo.",
            "Cocinar hongos en otra olla (5-8 min) con sal.",
            "Añadir papas al refrito. Licuar leche con maní y agregar.",
            "Añadir el fondo de los hongos, cilantro, maní en pasta y los hongos cocinados.",
            "Emplatar con arroz, huevo y aguacate."
        ]
    },
    {
        "id": "majado",
        "title": "Majado con Hongos",
        "icon": "🍌",
        "ingredients": [
            "Hongos Ostra (cuadritos)",
            "Plátanos verdes",
            "Mantequilla, Aceite",
            "Cebolla, Ajo, Achiote/Cúrcuma",
            "Culantro, Sal"
        ],
        "preparation": [
            "Hervir verdes hasta que estén suaves.",
            "Hacer refrito con cebolla, ajo y achiote.",
            "Freír hongos (5 min) hasta hacer chicharrones. Secar.",
            "Majar los verdes con el refrito y mantequilla hasta obtener puré suave.",
            "Mezclar con chicharrones de hongos y culantro.",
            "Servir con queso, huevo frito y café."
        ]
    },
    {
        "id": "pizza",
        "title": "Pizza con Hongos",
        "icon": "🍕",
        "ingredients": [
            "Masa de Pizza",
            "Salsa de pizza/tomate",
            "Queso mozzarella",
            "Embutidos (opcional)",
            "Cebolla, Pimiento",
            "Hongos ostra (cuadritos)",
            "Chimichurri, Sal, Cúrcuma, Paprika"
        ],
        "preparation": [
            "Estirar masa en lata engrasada.",
            "Colocar salsa y luego queso mozzarella.",
            "Agregar embutidos, cebolla y pimiento.",
            "Hongos: sazonar con chimichurri, cúrcuma, pimienta, paprika y sal (5 min).",
            "Colocar hongos sobre la pizza.",
            "Hornear a 180º por 20 min. Cortar y servir."
        ]
    },
    {
        "id": "burritos",
        "title": "Burritos de Hongos",
        "icon": "🌯",
        "ingredients": [
            "Hongos Ostra",
            "Tortillas de Burritos",
            "Lechuga, Tomate, Aguacate",
            "Cebollas, Ajo, Cúrcuma",
            "Frejol negro cocinado",
            "Culantro"
        ],
        "preparation": [
            "Refrito: cebollas, ajo, cúrcuma, sal.",
            "Sofreír hongos en el refrito (3 min).",
            "Tostar tortillas (30 seg).",
            "Rellenar: lechuga, aguacate, tomate, frejol, hongos y culantro.",
            "Enrollar y disfrutar."
        ]
    },
    {
        "id": "pasta",
        "title": "Pasta con Hongos y Verduras",
        "icon": "🍝",
        "ingredients": [
            "Pasta/Tallarín",
            "Hongos Ostra",
            "Brócoli, Zanahoria, Alverja",
            "Tomate, Cebolla larga, Ajo",
            "Cúrcuma, Pimienta, Paprika",
            "Salsa de tomate, Mostaza, Culantro"
        ],
        "preparation": [
            "Cocinar pasta (10-15 min). Cocinar verduras.",
            "Refrito: cebolla, ajo, especias, tomate, hongos ostra.",
            "Mezclar pasta con refrito y verduras.",
            "Añadir salsa de tomate, mostaza y culantro. Revolver bien.",
            "Emplatar."
        ]
    },
    {
        "id": "arroz",
        "title": "Arroz Relleno",
        "icon": "🍚",
        "ingredients": [
            "Arroz cocinado",
            "Hongos Ostra (tiras)",
            "Arveja, Zanahoria, Pimiento",
            "Cebollas, Ajo, Especias",
            "Salchichas (rebanadas)",
            "Culantro"
        ],
        "preparation": [
            "Tener listo arroz, arveja y zanahoria cocidas.",
            "Freír salchichas.",
            "Refrito completo con verduras y especias.",
            "Freír hongos en el refrito (3-5 min).",
            "Mezclar todo: arroz, verduras, salchichas, hongos, culantro.",
            "Servir con maduro, aguacate y tomate."
        ]
    },
    {
        "id": "empanadas",
        "title": "Empanadas de Hongos",
        "icon": "🥟",
        "ingredients": [
            "Masa de empanadas",
            "Hongos Ostra (tiras)",
            "Cebollas, Ajo",
            "Alverja, Zanahoria",
            "Especias (cúrcuma, paprika)",
            "Aceite"
        ],
        "preparation": [
            "Preparar masa. Cocinar alverja y zanahoria.",
            "Refrito (Guiso): Aceite, especias, cebollas, ajo (2 min).",
            "Agregar hongos al refrito (3-5 min).",
            "Mezclar con verduras.",
            "Rellenar masa, cerrar bien (repulgue).",
            "Freír (5 min/lado) o hornear (180º por 20 min)."
        ]
    }
];

// Helper to inject recipes into HTML
function renderRecipes() {
    const container = document.getElementById('recipesGrid');
    if (!container) return;

    container.innerHTML = recipes.map(recipe => `
    <div class="recipe-card fade-in" onclick="openRecipeModal('${recipe.id}')">
      <div class="recipe-icon">${recipe.icon}</div>
      <h3 class="recipe-title">${recipe.title}</h3>
      <button class="btn-recipe-view">Ver Receta</button>
    </div>
  `).join('');
}

function openRecipeModal(id) {
    console.log('Opening recipe modal for:', id);
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) {
        console.error('Recipe not found:', id);
        return;
    }

    const modal = document.getElementById('recipeModal');
    const content = document.getElementById('recipeModalContent');

    if (modal && content) {
        content.innerHTML = `
      <div class="recipe-detail-header">
        <div class="recipe-detail-icon">${recipe.icon}</div>
        <h2>${recipe.title}</h2>
      </div>
      
      <div class="recipe-content-wrapper">
        <div class="recipe-detail-section">
          <h3>🍅 Ingredientes</h3>
          <ul class="recipe-list">
            ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
          </ul>
        </div>

        <div class="recipe-detail-section">
          <h3>👨‍🍳 Preparación</h3>
          <ol class="recipe-list-ordered">
            ${recipe.preparation.map(step => `<li>${step}</li>`).join('')}
          </ol>
        </div>
      </div>
    `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeRecipeModal() {
    const modal = document.getElementById('recipeModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Make functions global
window.renderRecipes = renderRecipes;
window.openRecipeModal = openRecipeModal;
window.closeRecipeModal = closeRecipeModal;
