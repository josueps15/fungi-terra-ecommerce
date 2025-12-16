const fs = require('fs');

const files = ['product-detail.html', 'news-detail.html'];
const newFontLink = '    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">';

// Exact strings to replace based on view_file output
const oldBlockProduct = `    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Playfair+Display:wght@400;600;700&display=swap"
        rel="stylesheet">`;

const oldBlockNews = `    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
        rel="stylesheet">`;

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf-8');
        let originalContent = content;

        if (file === 'product-detail.html') {
            // Normalize line endings for matching if needed, but try exact first
            if (content.includes(oldBlockProduct)) {
                content = content.replace(oldBlockProduct, newFontLink);
                console.log(`Replaced in ${file}`);
            } else {
                // Try normalizing CRLF to LF for matching
                const contentLF = content.replace(/\r\n/g, '\n');
                const oldBlockProductLF = oldBlockProduct.replace(/\r\n/g, '\n');
                if (contentLF.includes(oldBlockProductLF)) {
                    content = contentLF.replace(oldBlockProductLF, newFontLink);
                    console.log(`Replaced in ${file} (normalized LF)`);
                } else {
                    console.log(`Could not find exact block in ${file}`);
                }
            }
        } else if (file === 'news-detail.html') {
            if (content.includes(oldBlockNews)) {
                content = content.replace(oldBlockNews, newFontLink);
                console.log(`Replaced in ${file}`);
            } else {
                const contentLF = content.replace(/\r\n/g, '\n');
                const oldBlockNewsLF = oldBlockNews.replace(/\r\n/g, '\n');
                if (contentLF.includes(oldBlockNewsLF)) {
                    content = contentLF.replace(oldBlockNewsLF, newFontLink);
                    console.log(`Replaced in ${file} (normalized LF)`);
                } else {
                    console.log(`Could not find exact block in ${file}`);
                }
            }
        }

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf-8');
        }
    } else {
        console.log(`File not found: ${file}`);
    }
});
