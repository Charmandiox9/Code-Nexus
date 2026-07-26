import re
import sys

def fix_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We are looking for:
    # {
    #   title: "...",
    #   order: ...,
    #   lessons: [
    # And we want to replace it with:
    # {
    #   concept: { slug: "slug", title: "...", description: "...", orderIndex: ... },
    #   lessons: [
    
    # Let's find all occurrences of title: "..." followed by order: ... and then lessons:
    pattern = r'\{\s*title:\s*"([^"]+)",\s*(?:order|orderIndex):\s*(\d+),\s*lessons:\s*\['
    
    def repl(m):
        title = m.group(1)
        order = m.group(2)
        # Create a slug from the title
        slug = re.sub(r'[^a-zA-Z0-9]+', '-', title.lower()).strip('-')
        return f'{{\n      concept: {{ slug: "{slug}", title: "{title}", description: "Infiltrate and master this sector.", orderIndex: {order} }},\n      lessons: ['

    new_content, count = re.subn(pattern, repl, content)
    if count > 0:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {count} sections in {filename}")
    else:
        print(f"No match found or already fixed in {filename}")

fix_file('backend/prisma/seeds/cpp.ts')
fix_file('backend/prisma/seeds/rust.ts')
