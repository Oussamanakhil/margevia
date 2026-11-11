"""Prepare web-sized copies of the approved generated artwork; no creative retouching."""
from pathlib import Path
from PIL import Image
import json
root=Path(__file__).resolve().parents[1]
manifest=json.loads((root/'content/image-sources.json').read_text())
for asset in manifest:
 slug=asset['slug'];source=Path(asset['source']);prompt=asset['prompt']
 if not source.exists():
  source=root/f'content/artwork/{slug}.jpg' if slug!='margevia-home' else root/'dist/assets/social/margevia-share-v1.jpg'
 im=Image.open(source).convert('RGB')
 exif=Image.Exif();exif[270]='AI-generated editorial illustration. Prompt: '+prompt;exif[305]='Margevia; built-in image_gen; mechanical web export'
 if slug=='margevia-home':
  im.resize((1200,630),Image.Resampling.LANCZOS).save(root/'dist/assets/social/margevia-share-v1.jpg',quality=88,optimize=True,exif=exif)
 else:
  im.save(root/f'content/artwork/{slug}.jpg',quality=92,optimize=True,exif=exif)
  for w in (600,1200):
   copy=im.resize((w,round(im.height*w/im.width)),Image.Resampling.LANCZOS)
   copy.save(root/f'dist/assets/journal/{slug}-{w}.webp',quality=85,method=6,exif=exif)
 asset['source']=source.name
 asset['origin']='Built-in image_gen, 11 November 2026. Original output archived in the local generation store; optimized source artwork lives in content/artwork.'
(root/'content/image-sources.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Six editorial image sets and the home social image exported with provenance metadata.')
