
import os

files = ['product-detail.html', 'news-detail.html']
old_font_part = 'family=Montserrat'
new_font_link = '    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">\n'

for file_path in files:
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue

    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    skip = False
    replaced = False
    
    for line in lines:
        if old_font_part in line:
            # Found the old font line. It might be multi-line.
            # We want to replace the whole <link> tag block.
            # The block starts with <link and ends with >
            # But simpler: just replace this line and skip subsequent lines if they are part of the same tag?
            # The view_file showed it spanning lines 12-14.
            # Line 12: <link
            # Line 13: href="..."
            # Line 14: rel="stylesheet">
            
            # Let's just find the block lines 12-14 (0-indexed 11-13) roughly.
            # Actually, let's just rewrite the file content replacing the bad string.
            pass
    
    # Simpler approach: read full content, replace the specific string block
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Construct the exact string to replace based on view_file output
    # product-detail.html lines 12-14
    old_block_product = """    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Playfair+Display:wght@400;600;700&display=swap"
        rel="stylesheet">"""
        
    # news-detail.html lines 12-14 (slightly different href maybe?)
    old_block_news = """    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
        rel="stylesheet">"""

    if old_block_product in content:
        content = content.replace(old_block_product, new_font_link.strip())
        print(f"Replaced in {file_path}")
    elif old_block_news in content:
        content = content.replace(old_block_news, new_font_link.strip())
        print(f"Replaced in {file_path}")
    else:
        # Fallback: try to find the href line and replace the surrounding tag
        print(f"Could not find exact block in {file_path}. Trying fuzzy match.")
        # This is risky without seeing exact content again.
        # Let's try to match just the href line.
        lines = content.splitlines()
        new_content_lines = []
        i = 0
        while i < len(lines):
            line = lines[i]
            if 'family=Montserrat' in line:
                # This is the middle line. The previous line was <link and next is rel=...
                # We assume the structure:
                # <link
                # href=...
                # rel=...>
                # So we replace lines i-1, i, i+1 with new link
                if i > 0 and '<link' in lines[i-1]:
                    # Remove last added line (the <link tag)
                    new_content_lines.pop()
                    new_content_lines.append(new_font_link.strip())
                    i += 2 # Skip current and next
                else:
                     new_content_lines.append(line)
            else:
                new_content_lines.append(line)
            i += 1
        content = '\n'.join(new_content_lines)
        print(f"Fuzzy replaced in {file_path}")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

