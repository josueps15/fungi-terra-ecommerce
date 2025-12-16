
# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Define ranges to keep (1-based line numbers converted to 0-based indices)
# Keep 1-290 -> indices 0-290 (slice 0:290)
# Keep 487-630 -> indices 486-630 (slice 486:630)
# Keep 827-866 -> indices 826-end (slice 826:)

part1 = lines[0:290]
part2 = lines[486:630]
part3 = lines[826:]

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.writelines(part1 + part2 + part3)

print("Fixed index.html")
