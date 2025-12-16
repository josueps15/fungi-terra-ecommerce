// Load products from Firebase
let products = {
    freshMushrooms: [],
    extracts: [],
    microdosis: [],
    specialProducts: [],
    combos: []
};

// Expose immediately
window.products = products;

let productsLoaded = false;
let loadingPromise = null;

async function loadProductsFromFirebase() {
    if (productsLoaded) {
        return products;
    }

    if (loadingPromise) {
        return loadingPromise;
    }

    loadingPromise = (async () => {
        console.log('🔄 Loading products from Firebase...');

        try {
            if (!window.db) {
                throw new Error('Firestore db not initialized');
            }
            const productsSnapshot = await window.db.collection('products').get();

            // Reset products
            products = {
                freshMushrooms: [],
                extracts: [],
                microdosis: [],
                specialProducts: [],
                combos: []
            };

            productsSnapshot.forEach((doc) => {
                const data = doc.data();

                // Map Firebase product to web format
                const product = {
                    id: data.id || doc.id,
                    name: data.name + (data.variant ? ` ${data.variant}` : ''),
                    category: data.categoryDisplay || 'Productos',
                    description: data.description || '',
                    price: data.price || 0,
                    image: data.image || 'placeholder.png',
                    unit: data.unit || 'unidad',
                    stock: data.stock || 0
                };

                // Categorize product
                if (data.category === 'hongos') {
                    products.freshMushrooms.push(product);
                } else if (data.category === 'extractos') {
                    products.extracts.push(product);
                } else if (data.category === 'microdosis') {
                    products.microdosis.push(product);
                } else if (data.category === 'especiales') {
                    products.specialProducts.push(product);
                }
            });

        } catch (error) {
            console.error('❌ Error loading products from Firebase:', error);
            // Don't return here, continue to load combos
        }

        // Add combos manually (these are not in inventory)
        products.combos = [
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

        productsLoaded = true;

        console.log(`✅ Loaded products from Firebase`);
        console.log(`   - Hongos Frescos: ${products.freshMushrooms.length}`);
        console.log(`   - Extractos: ${products.extracts.length}`);
        console.log(`   - Microdosis: ${products.microdosis.length}`);
        console.log(`   - Productos Especiales: ${products.specialProducts.length}`);
        console.log(`   - Combos: ${products.combos.length}`);

        // Make products available globally
        window.products = products;

        return products;
    })();

    return loadingPromise;
}

// Helper function to find product by ID
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
