import re

def fix_xpreward(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We are looking for:
    # {
    #   title: "...",
    #   order: ...,
    #   type: LessonType.INTRO,
    #   content: {
    # And we want to add xpReward: 10, before content:
    
    # Let's match type: LessonType.SOMETHING,
    # and if it doesn't have xpReward: \d+, before content:, we inject it.
    
    # Actually, a simpler regex is just matching `type: [A-Za-z.]+,\s+content:` 
    # and replacing it with `type: \g<1>,\n            xpReward: 10,\n            content:`
    
    pattern = r'(type:\s*LessonType\.[A-Z_]+),(\s+)content:'
    
    new_content, count = re.subn(pattern, r'\1,\n            xpReward: 10,\2content:', content)
    
    if count > 0:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Added {count} xpRewards to {filename}")
    else:
        print(f"No match found or already fixed in {filename}")

fix_xpreward('backend/prisma/seeds/cpp.ts')
