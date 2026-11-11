"""Export the existing Margevia mark at browser and home-screen sizes."""
from pathlib import Path
from PIL import Image, ImageDraw
R=Path(__file__).resolve().parents[1]; A=R/'dist/assets'
# Match the site's 32-unit brand mark exactly, with four units of safe inset.
paths=[[(3,25),(3,8),(11,17),(16,7),(21,17),(29,8),(29,25)],[(3,25),(11,25),(16,16),(21,25),(29,25)]]
svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="#6264ef"/><g transform="translate(4 4)" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 25V8l8 9 5-10 5 10 8-9v17M3 25h8l5-9 5 9h8"/></g></svg>\n'
(A/'favicon.svg').write_text(svg)
def raster(size,rounded=True):
 scale=size*4/40; im=Image.new('RGBA',(size*4,size*4));d=ImageDraw.Draw(im)
 d.rounded_rectangle((0,0,size*4-1,size*4-1),radius=8*scale if rounded else 0,fill='#6264ef')
 for p in paths:
  pts=[((x+4)*scale,(y+4)*scale) for x,y in p];w=round(2*scale)
  d.line(pts,fill='white',width=w,joint='curve')
  for x,y in pts:d.ellipse((x-w/2,y-w/2,x+w/2,y+w/2),fill='white')
 return im.resize((size,size),Image.Resampling.LANCZOS)
raster(48).save(R/'dist/favicon.ico',sizes=[(16,16),(32,32),(48,48)])
raster(32).save(A/'favicon-32.png')
raster(180,False).convert('RGB').save(A/'apple-touch-icon.png')
print('Exported matching SVG, ICO, PNG and Apple touch icons.')
