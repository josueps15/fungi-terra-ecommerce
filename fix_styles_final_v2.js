const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'josue', 'OneDrive', 'Escritorio', 'setas', 'styles.css');

try {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');

    // Find the line where .btn-add-cart-large ends
    // In Step 2136, it ends at line 2112: "}"
    // We will look for the block and truncate after it.

    let truncateIndex = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('.btn-add-cart-large')) {
            // Found the start, look for the closing brace
            for (let j = i; j < lines.length; j++) {
                if (lines[j].trim() === '}') {
                    truncateIndex = j + 1;
                    break;
                }
            }
            break;
        }
    }

    if (truncateIndex === -1) {
        console.error('Could not find .btn-add-cart-large block');
        process.exit(1);
    }

    console.log(`Truncating at line ${truncateIndex}`);

    const newContent = lines.slice(0, truncateIndex).join('\n') + '\n\n' + `/* Product Gallery */
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

/* Tabs - Elegant Design */
.product-tabs {
    margin-top: var(--spacing-5xl);
    width: 100%;
    position: relative;
    z-index: 2;
    background: var(--color-white);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-lg);
    padding: var(--spacing-2xl);
    border: 1px solid rgba(255, 255, 255, 0.5);
}

.tab-buttons {
    display: flex;
    gap: var(--spacing-xl);
    border-bottom: 2px solid var(--color-gray-light);
    margin-bottom: var(--spacing-2xl);
    overflow-x: visible;
    flex-wrap: wrap;
    padding-bottom: var(--spacing-sm);
}

.tab-btn {
    padding: var(--spacing-md) 0;
    background: none;
    border: none;
    font-family: var(--font-heading);
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--color-gray);
    cursor: pointer;
    position: relative;
    transition: all var(--transition-base);
    white-space: nowrap;
    margin-bottom: -2px;
}

.tab-btn:hover {
    color: var(--color-primary);
}

.tab-btn.active {
    color: var(--color-primary-dark);
}

.tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--color-primary);
    border-radius: var(--radius-full);
}

.tab-content {
    display: none;
    animation: fadeIn 0.4s ease-out;
}

.tab-content.active {
    display: block;
}

.tab-content h3 {
    margin-bottom: var(--spacing-xl);
    color: var(--color-primary-dark);
    position: relative;
    padding-left: var(--spacing-lg);
    border-left: 4px solid var(--color-accent-gold);
}

/* Benefits Grid */
.benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-xl);
    margin-top: var(--spacing-xl);
}

.benefit-item {
    display: flex;
    gap: var(--spacing-lg);
    padding: var(--spacing-xl);
    background: var(--color-cream);
    border-radius: var(--radius-xl);
    align-items: flex-start;
    transition: transform var(--transition-base);
    border: 1px solid rgba(0, 0, 0, 0.03);
}

.benefit-item:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
    background: var(--color-white);
}

.benefit-icon {
    font-size: var(--font-size-3xl);
    line-height: 1;
    background: var(--color-white);
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-sm);
}

.benefit-text h4 {
    margin: 0 0 var(--spacing-xs) 0;
    color: var(--color-primary-dark);
    font-size: var(--font-size-lg);
    font-weight: 700;
}

.benefit-text p {
    margin: 0;
    color: var(--color-dark-gray);
    font-size: var(--font-size-base);
    line-height: 1.6;
}

/* Usage & Storage Content */
#usageContent,
#storageContent {
    font-size: var(--font-size-lg);
    line-height: 1.8;
    color: var(--color-dark-gray);
    max-width: 800px;
}

#usageContent ul,
#storageContent ul {
    list-style: none;
    padding: 0;
    margin: var(--spacing-lg) 0;
}

#usageContent li,
#storageContent li {
    position: relative;
    padding-left: var(--spacing-xl);
    margin-bottom: var(--spacing-sm);
}

#usageContent li::before,
#storageContent li::before {
    content: '•';
    color: var(--color-primary);
    font-weight: bold;
    position: absolute;
    left: 0;
    font-size: 1.2em;
}

/* Responsive */
@media (max-width: 900px) {
    .product-detail-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-2xl);
    }

    .product-gallery {
        position: static;
        margin-bottom: var(--spacing-xl);
    }

    .product-title {
        font-size: var(--font-size-3xl);
    }

    .product-price-large {
        font-size: var(--font-size-3xl);
    }

    .product-actions-detail {
        flex-direction: column;
    }

    .btn-add-cart-large {
        width: 100%;
    }

    .quantity-selector {
        justify-content: center;
    }
}

/* Page Transitions */
body {
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
}

body.loaded {
    opacity: 1;
}

body.fading-out {
    opacity: 0;
}
`;

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Successfully rewrote styles.css');

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
