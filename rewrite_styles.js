const fs = require('fs');
const path = 'c:\\Users\\josue\\OneDrive\\Escritorio\\setas\\styles.css';

try {
    let content = fs.readFileSync(path, 'utf8');

    // Find cut point 1: Before "/* Specific animation types */"
    const cut1Marker = "/* Specific animation types */";
    const cut1Index = content.indexOf(cut1Marker);

    // Find cut point 2: Start of ".product-unit {"
    const cut2Marker = ".product-unit {";
    const cut2Index = content.indexOf(cut2Marker);

    if (cut1Index === -1 || cut2Index === -1) {
        console.error('Could not find markers');
        console.log('Cut 1 found:', cut1Index !== -1);
        console.log('Cut 2 found:', cut2Index !== -1);
        process.exit(1);
    }

    // The new middle content
    const newContent = `/* Specific animation types */
.fade-in-left {
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.8s ease-out;
}

.fade-in-left.is-visible {
    opacity: 1;
    transform: translateX(0);
}

.fade-in-right {
    opacity: 0;
    transform: translateX(30px);
    transition: all 0.8s ease-out;
}

.fade-in-right.is-visible {
    opacity: 1;
    transform: translateX(0);
}

.scale-up {
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.8s ease-out;
}

.scale-up.is-visible {
    opacity: 1;
    transform: scale(1);
}

/* ============================================
   SKELETON LOADING - MAGIC UI STYLE
   ============================================ */

.skeleton {
    background: #f0f0f0;
    background: linear-gradient(110deg,
            #ececec 8%,
            #f5f5f5 18%,
            #ececec 33%);
    border-radius: var(--radius-md);
    background-size: 200% 100%;
    animation: shimmer 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes shimmer {
    to {
        background-position-x: -200%;
    }
}

.product-card-skeleton {
    background: var(--color-white);
    border-radius: var(--radius-2xl);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.05);
    height: 100%;
}

.skeleton-image {
    width: 100%;
    height: 280px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

.skeleton-content {
    padding: var(--spacing-xl);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    flex: 1;
}

.skeleton-category {
    width: 30%;
    height: 24px;
    border-radius: var(--radius-full);
}

.skeleton-title {
    width: 80%;
    height: 32px;
}

.skeleton-text {
    width: 100%;
    height: 16px;
}

.skeleton-text-short {
    width: 60%;
    height: 16px;
}

.skeleton-price {
    width: 40%;
    height: 28px;
    margin-top: auto;
}

.skeleton-actions {
    display: flex;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-md);
}

.skeleton-btn {
    flex: 1;
    height: 48px;
    border-radius: var(--radius-lg);
}


/* Product Detail Skeleton */
.product-detail-skeleton {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-3xl);
    margin-bottom: var(--spacing-3xl);
}

.skeleton-detail-image {
    width: 100%;
    aspect-ratio: 1;
    border-radius: var(--radius-xl);
}

.skeleton-detail-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.skeleton-title-large {
    width: 70%;
    height: 48px;
    border-radius: var(--radius-md);
}

.skeleton-price-large {
    width: 30%;
    height: 40px;
    border-radius: var(--radius-md);
}

@media (max-width: 768px) {
    .product-detail-skeleton {
        grid-template-columns: 1fr;
        gap: var(--spacing-xl);
    }
}

/* Out of Stock Styles */
.product-card.out-of-stock .product-image {
    filter: grayscale(100%);
    opacity: 0.8;
}

.product-card.out-of-stock::after {
    content: '';
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 70%;
    background-image: url('agotado.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: top center;
    pointer-events: none;
    z-index: 10;
}

.product-card.out-of-stock .btn-primary,
.product-card.out-of-stock .btn-whatsapp {
    background-color: var(--color-gray);
    pointer-events: none;
    opacity: 0.6;
}

.product-card.out-of-stock .product-price {
    color: var(--color-gray);
    text-decoration: line-through;
}

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

.product-price-section {
    display: flex;
    align-items: baseline;
    gap: var(--spacing-md);
    padding: var(--spacing-lg) 0;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.product-price-large {
    font-size: var(--font-size-4xl);
    font-weight: 700;
    color: var(--color-primary);
    font-family: var(--font-heading);
}

`;

    // Construct the final content
    const finalContent = content.substring(0, cut1Index) +
        newContent +
        content.substring(cut2Index);

    fs.writeFileSync(path, finalContent, 'utf8');
    console.log('Successfully rewrote styles.css');

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
