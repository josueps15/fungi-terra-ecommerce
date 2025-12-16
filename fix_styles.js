const fs = require('fs');

const filePath = 'styles.css';
const transitionStyles = `
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

if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Fix tab-buttons
    // Look for the block
    const oldBlock = `    overflow-x: auto;
    padding-bottom: 0;`;

    const newBlock = `    overflow-x: visible;
    flex-wrap: wrap;
    padding-bottom: var(--spacing-sm);`;

    if (content.includes(oldBlock)) {
        content = content.replace(oldBlock, newBlock);
        console.log('Replaced overflow-x: auto');
    } else {
        // Try fuzzy match or just replace the whole block if possible
        // Let's try to find .tab-buttons and replace content inside
        const regex = /\.tab-buttons\s*{[^}]*overflow-x:\s*auto;[^}]*}/s;
        const match = content.match(regex);
        if (match) {
            let block = match[0];
            block = block.replace('overflow-x: auto;', 'overflow-x: visible;\n    flex-wrap: wrap;');
            block = block.replace('padding-bottom: 0;', 'padding-bottom: var(--spacing-sm);');
            content = content.replace(match[0], block);
            console.log('Replaced via regex');
        } else {
            console.log('Could not find .tab-buttons block to replace');
        }
    }

    // Add transition styles if not present
    if (!content.includes('body.loaded')) {
        content += transitionStyles;
        console.log('Added transition styles');
    }

    fs.writeFileSync(filePath, content, 'utf-8');
} else {
    console.log('styles.css not found');
}
