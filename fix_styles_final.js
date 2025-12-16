const fs = require('fs');
const path = 'c:\\Users\\josue\\OneDrive\\Escritorio\\setas\\styles.css';

try {
    let content = fs.readFileSync(path, 'utf8');

    // Define the start marker (end of .product-card.out-of-stock .product-price block)
    const startMarker = `.product-card.out-of-stock .product-price {
    color: var(--color-gray);
    text-decoration: line-through;
}`;

    // Define the end marker (start of .product-price-section block)
    const endMarker = `.product-price-section {`;

    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker);

    if (startIndex === -1 || endIndex === -1) {
        console.error('Could not find markers');
        console.log('Start marker found:', startIndex !== -1);
        console.log('End marker found:', endIndex !== -1);
        process.exit(1);
    }

    // The replacement content
    const newContent = `
/* Override: Stamp Style for latest image */
.product-card.out-of-stock::after {
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) rotate(-15deg) !important;
    width: 80% !important;
    height: 80% !important;
    background-position: center !important;
}

/* ============================================
   PRODUCT DETAIL PAGE - PREMIUM REDESIGN
   ============================================ */

.product-detail-container {
    max-width: var(--container-max-width);
    margin: 140px auto 80px;
    padding: 0 var(--container-padding);
    position: relative;
    z-index: var(--z-base);
}

.breadcrumb {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-2xl);
    font-size: var(--font-size-sm);
    color: var(--color-gray);
    font-weight: var(--font-medium);
    align-items: center;
}

.breadcrumb a {
    color: var(--color-gray-dark);
    transition: color var(--transition-base);
    position: relative;
}

.breadcrumb a:hover {
    color: var(--color-primary);
}

.breadcrumb span {
    color: var(--color-gray-light);
}

.breadcrumb #breadcrumbProduct {
    color: var(--color-primary);
    font-weight: var(--font-semibold);
}

.product-detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-4xl);
    margin-bottom: var(--spacing-4xl);
    align-items: start;
}

/* Gallery - Premium Look */
.product-gallery {
    position: sticky;
    top: 140px;
    height: fit-content;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.main-image-container {
    position: relative;
    width: 100%;
    border-radius: var(--radius-2xl);
    overflow: hidden;
    box-shadow: var(--shadow-xl);
    background: var(--color-white);
    aspect-ratio: 1;
}

.main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
}

.main-image:hover {
    transform: scale(1.05);
}

.thumbnail-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-md);
}

.thumbnail {
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: var(--radius-lg);
    cursor: pointer;
    border: 2px solid transparent;
    transition: all var(--transition-base);
    background-color: var(--color-white);
    width: 100%;
    box-shadow: var(--shadow-sm);
}

.thumbnail:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.thumbnail.active {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px rgba(45, 90, 45, 0.1);
}

/* Out of Stock - Premium Overlay */
.out-of-stock-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(2px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    pointer-events: none;
}

.out-of-stock-badge {
    background: var(--color-primary-dark);
    color: var(--color-white);
    padding: var(--spacing-md) var(--spacing-xl);
    font-family: var(--font-heading);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-bold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-2xl);
    transform: rotate(-5deg);
    border: 2px solid var(--color-accent-gold);
}

/* Product Info - Clean & Elegant */
.product-info-section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    padding-top: var(--spacing-md);
}

.product-category-badge {
    display: inline-block;
    background: rgba(45, 90, 45, 0.1);
    color: var(--color-primary);
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-full);
    font-size: var(--font-size-sm);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    width: fit-content;
}

.product-title {
    font-family: var(--font-heading);
    font-size: var(--font-size-5xl);
    color: var(--color-primary-dark);
    margin: 0;
    line-height: 1.1;
}

`;

    // Construct the final content
    const finalContent = content.substring(0, startIndex + startMarker.length) +
        newContent +
        content.substring(endIndex);

    fs.writeFileSync(path, finalContent, 'utf8');
    console.log('Successfully fixed styles.css');

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
