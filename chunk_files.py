import math
from pathlib import Path

lines = Path('graphify-out/.graphify_uncached.txt').read_text(encoding="utf-8").splitlines()
docs = [f for f in lines if not f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]
imgs = [f for f in lines if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]

chunks = []

# chunk docs (max 20 per chunk)
for i in range(0, len(docs), 20):
    chunks.append(docs[i:i+20])

# chunk imgs (distribute across remaining up to 20 total chunks)
max_img_chunks = 20 - len(chunks)
if max_img_chunks > 0 and imgs:
    img_per_chunk = math.ceil(len(imgs) / max_img_chunks)
    for i in range(0, len(imgs), img_per_chunk):
        chunks.append(imgs[i:i+img_per_chunk])
elif imgs:
    chunks[-1].extend(imgs) # fallback

for i, chunk in enumerate(chunks):
    Path(f'graphify-out/chunk_{i+1:02d}.txt').write_text('\n'.join(chunk), encoding='utf-8')

print(f"Created {len(chunks)} chunks.")
