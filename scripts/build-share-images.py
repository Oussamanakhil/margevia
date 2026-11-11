"""Compose exact-size social cards with the site's type and reviewed editorial artwork."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
import json,base64
R=Path(__file__).resolve().parents[1];O=R/'content/social';O.mkdir(exist_ok=True)
f=TTFont(R/'dist/assets/dm-sans-400.ttf');g=f.getGlyphSet();cm=f.getBestCmap();upm=f['head'].unitsPerEm

def width(s,size):return sum(g[cm[ord(c)]].width for c in s)*size/upm

def text(s,x,y,size,color):
 shapes=[];offset=0
 for c in s:
  gl=g[cm[ord(c)]];p=SVGPathPen(g);gl.draw(p);shapes.append(f'<path transform="translate({offset} 0)" d="{p.getCommands()}"/>');offset+=gl.width
 return f'<g fill="{color}" transform="translate({x} {y}) scale({size/upm} {-size/upm})">'+''.join(shapes)+'</g>'

def wrap(s,size,maxwidth):
 rows=[];row=''
 for word in s.split():
  test=(row+' '+word).strip()
  if width(test,size)>maxwidth and row: rows.append(row);row=word
  else:row=test
 if row:rows.append(row)
 return rows
articles=json.loads((R/'content/articles.json').read_text())
items=articles+[{'slug':'journal','title':'Notes from the purchasing desk.','category':'Guides & building stories','art':'why-we-are-building-margevia'}]
for a in items:
 title=a['title'];slug=a['slug'];image=base64.b64encode((R/f'content/artwork/{a.get("art",slug)}.jpg').read_bytes()).decode()
 body='<rect width="1200" height="630" fill="#f3f2ef"/><defs><clipPath id="art"><rect x="746" width="454" height="630"/></clipPath></defs>'
 body+=f'<image href="data:image/jpeg;base64,{image}" x="746" y="0" width="454" height="630" preserveAspectRatio="xMidYMid slice" clip-path="url(#art)"/>'
 body+='<path d="M3 25V8l8 9 5-10 5 10 8-9v17M3 25h8l5-9 5 9h8" transform="translate(50 44) scale(1.6)" fill="none" stroke="#6264ef" stroke-width="2" stroke-linejoin="round"/>'
 body+=text('Margevia',116,84,40,'#191b1d')
 rows=wrap(title,54,630);y=220 if len(rows)<4 else 185
 for line in rows:body+=text(line,56,y,54,'#191b1d');y+=66
 body+=text(a['category'],56,500,22,'#5758db')
 body+='<path d="M56 542H690" stroke="#cececf"/>'
 body+=text('margevia.vercel.app',56,585,20,'#62666b')
 body+='<path d="M660 578h25m-8-8 8 8-8 8" fill="none" stroke="#5758db" stroke-width="2"/>'
 (O/f'{slug}-share-v1.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">'+body+'</svg>')
print('Seven editable social card masters composed with outlined DM Sans typography.')
