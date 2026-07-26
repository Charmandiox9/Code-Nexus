import sys, json
from graphify.build import build_from_json
from graphify.cluster import score_all
from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.report import generate
from pathlib import Path

extraction = json.loads(Path('graphify-out/.graphify_extract.json').read_text(encoding="utf-8"))
detection  = json.loads(Path('graphify-out/.graphify_detect.json').read_text(encoding="utf-8"))
analysis   = json.loads(Path('graphify-out/.graphify_analysis.json').read_text(encoding="utf-8"))

G = build_from_json(extraction, root='C:\\Users\\Charm\\Documents\\GitHub\\CodeNexus', directed=False)
communities = {int(k): v for k, v in analysis['communities'].items()}
cohesion = {int(k): v for k, v in analysis['cohesion'].items()}
tokens = {'input': extraction.get('input_tokens', 0), 'output': extraction.get('output_tokens', 0)}

# auto-generate labels by finding common prefixes
labels = {}
for cid, nodes in communities.items():
    if not nodes:
        labels[cid] = f'Community {cid}'
        continue
    # Simple heuristic: use the first node's name, split by underscore, take first 2-3 words
    first_node = str(nodes[0])
    parts = first_node.split('_')
    if len(parts) >= 2:
        name = ' '.join(parts[:3]).title()
    else:
        name = first_node.title()
    labels[cid] = name

questions = suggest_questions(G, communities, labels)

report = generate(G, communities, cohesion, labels, analysis['gods'], analysis['surprises'], detection, tokens, 'C:\\Users\\Charm\\Documents\\GitHub\\CodeNexus', suggested_questions=questions)
Path('graphify-out/GRAPH_REPORT.md').write_text(report, encoding="utf-8")
Path('graphify-out/.graphify_labels.json').write_text(json.dumps({str(k): v for k, v in labels.items()}, ensure_ascii=False), encoding="utf-8")
print('Report updated with community labels')
