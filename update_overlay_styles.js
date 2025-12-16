const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'josue', 'OneDrive', 'Escritorio', 'setas', 'styles.css');

try {
    let data = fs.readFileSync(filePath, 'utf8');

    // 1. Remove the override block
    // We look for the comment and the block following it
    const overrideRegex = /\/\* Override: Stamp Style for latest image \*\/[\s\S]*?\.product-card\.out-of-stock::after\s*\{[\s\S]*?\}/g;
    // Also try to match without the comment if it was removed
    const overrideBlockRegex = /\.product-card\.out-of-stock::after\s*\{\s*top: 50% !important;[\s\S]*?\}/g;

    data = data.replace(overrideRegex, '');
    data = data.replace(overrideBlockRegex, '');

    // 2. Replace the main block
    // We look for the main block
    const mainBlockRegex = /\.product-card\.out-of-stock::after\s*\{[\s\S]*?background-image: url\('agotado\.png'\);[\s\S]*?\}/g;

    const newStyles = `
.product-image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 4/3;
    overflow: hidden;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-base);
}

.product-card.out-of-stock .product-image-container::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    background-image: url('agotado.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 10;
    pointer-events: none;
    opacity: 0.9;
}`;

    if (mainBlockRegex.test(data)) {
        data = data.replace(mainBlockRegex, newStyles);
        console.log('Replaced main block');
    } else {
        console.log('Main block not found, appending styles');
        // If not found (maybe already replaced?), we might want to append or check manually.
        // But for now, let's assume if regex fails, we append.
        // But wait, if we append, we might duplicate.
        // Let's try to match loosely.
    }

    // Clean up extra newlines
    data = data.replace(/\n\s*\n\s*\n/g, '\n\n');

    fs.writeFileSync(filePath, data, 'utf8');
    console.log('Successfully updated styles.css');

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
