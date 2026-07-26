import re

def fix_cpp(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Ensure LessonType is imported
    if "LessonType" not in content[:200]:
        content = "import { LessonType } from '@prisma/client';\n" + content
        
    # 2. Remove order: \d+,
    content = re.sub(r'order:\s*\d+,', '', content)
    
    # 3. Replace type: "..." with type: LessonType.... and add xpReward: 10
    content = re.sub(r'type:\s*"([^"]+)",', r'type: LessonType.\1,\n            xpReward: 10,', content)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed cpp.ts")

fix_cpp('backend/prisma/seeds/cpp.ts')
