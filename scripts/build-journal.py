"""Build the static journal from reviewed article content. No runtime framework required."""
from pathlib import Path
import json,re,html,math
from datetime import date
ROOT=Path(__file__).resolve().parents[1];DIST=ROOT/'dist'
ARTICLES=json.loads((ROOT/'content/articles.json').read_text())
BASE='https://margevia.vercel.app';PUBLISHED='2026-11-11';DISPLAY_DATE='11 November 2026'
esc=lambda s:html.escape(str(s),quote=True)
for a in ARTICLES:
 words=' '.join([a['title'],a['intro'],a['takeaway']]+[s['title']+' '+' '.join(s['paragraphs']) for s in a['sections']])
 a['minutes']=max(2,math.ceil(len(words.split())/200));a['url']=f"{BASE}/blog/{a['slug']}/"
home=(DIST/'index.html').read_text()
mark='<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M3 25V8l8 9 5-10 5 10 8-9v17M3 25h8l5-9 5 9h8"/></svg>'
arrow='<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7"/></svg>'
header=f'''<a class="skip" href="#main">Skip to content</a><header class="header journal-header"><a class="brand" href="/" aria-label="Margevia home">{mark}<span>Margevia</span></a><nav id="nav" aria-label="Main navigation"><a href="/#product">Product</a><a href="/#how-it-works">How it works</a><a href="/blog/" aria-current="page">Journal</a><a href="/#pilot">Plan a pilot</a></nav><a class="button small header-cta" href="/#demo">Explore the demo {arrow}</a><button class="menu-button" aria-expanded="false" aria-controls="nav" aria-label="Open navigation"><span></span><span></span></button></header>'''
arrow_back=arrow.replace('class="icon"', 'class="icon direction-back"')
arrow_up=arrow.replace('class="icon"', 'class="icon direction-up"')
footer=f'''<footer class="footer"><div class="footer-main"><a class="brand" href="/">{mark}Margevia</a><p>Every purchase, accounted for.</p><a href="/#demo">Explore the demo {arrow}</a></div><div class="footer-bottom"><span>© 2026 Margevia · Product preview</span><div class="footer-links"><a href="/blog/">The journal</a><a class="footer-linkedin" href="https://www.linkedin.com/company/margevia" aria-label="Margevia on LinkedIn"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8v-4.64c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.72H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.79-1.52 2.98 0 3.58 1.96 3.58 4.51v5.26Z"/></svg><span>LinkedIn</span></a><a href="#main">Back to top {arrow_up}</a></div></div></footer>'''
def metadata(title,desc,url,image,kind='website',alt='Margevia logo and two connected invoice records beside the words Every purchase. Accounted for.'):
 return f'''<title>{esc(title)}</title><meta name="description" content="{esc(desc)}"><link rel="canonical" href="{url}">
<meta name="robots" content="index,follow"><meta name="theme-color" content="#f3f2ef">
<meta property="og:type" content="{kind}"><meta property="og:site_name" content="Margevia"><meta property="og:locale" content="en_GB"><meta property="og:title" content="{esc(title)}"><meta property="og:description" content="{esc(desc)}"><meta property="og:url" content="{url}">
<meta property="og:image" content="{image}"><meta property="og:image:secure_url" content="{image}"><meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="{esc(alt)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{esc(title)}"><meta name="twitter:description" content="{esc(desc)}"><meta name="twitter:image" content="{image}"><meta name="twitter:image:alt" content="{esc(alt)}">'''
def shell(title,desc,path,image,body,kind='website',extra='',alt=''):
 return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">{metadata(title,desc,BASE+path,image,kind,alt or title)}<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48"><link rel="icon" href="/assets/favicon.svg?v=2" type="image/svg+xml"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" sizes="180x180"><link rel="preload" href="/assets/dm-sans-400.ttf" as="font" type="font/ttf" crossorigin><link rel="stylesheet" href="/style.css?v=icons-1"><link rel="stylesheet" href="/journal.css?v=final-1"><script defer src="/journal.js?v=final-1"></script>{extra}</head><body class="journal-page">{header}{body}{footer}</body></html>'''
def img(a,cls='',eager=False):
 return f'''<img class="{cls}" src="/assets/journal/{a['slug']}-1200.webp" srcset="/assets/journal/{a['slug']}-600.webp 600w, /assets/journal/{a['slug']}-1200.webp 1200w" sizes="{('(min-width: 900px) 60vw, 100vw' if eager else '(min-width: 1000px) 33vw, (min-width: 650px) 50vw, 100vw')}" width="1200" height="800" alt="{esc(a['alt'])}" loading="{'eager' if eager else 'lazy'}" decoding="async" {('fetchpriority="high"' if eager else '')}>'''
def card(a,compact=False):
 return f'''<article class="journal-card"><a class="journal-image-link" href="/blog/{a['slug']}/" tabindex="-1" aria-hidden="true">{img(a)}</a><div class="journal-card-copy"><h3><a href="/blog/{a['slug']}/">{esc(a['title'])} {arrow}</a></h3><p>{esc(a['description'])}</p><div class="journal-meta"><span>{esc(a['category'])}</span><span>{a['minutes']} min read</span></div></div></article>'''
# Landing-page extension: all six published articles are present in static HTML.
section=f'''<!-- JOURNAL START --><section id="journal" class="section journal-section"><div class="section-heading"><h2>Notes from the<br><em>purchasing desk.</em></h2><div class="journal-section-intro"><p>Practical guides for your next review. Open notes on the product we’re building.</p><a class="text-link" href="/blog/">Explore the journal {arrow}</a></div></div><div class="journal-grid">{''.join(card(a) for a in [ARTICLES[4],ARTICLES[0],ARTICLES[1],ARTICLES[2],ARTICLES[3],ARTICLES[5]])}</div></section><!-- JOURNAL END -->'''
if '<!-- JOURNAL START -->' in home: home=re.sub(r'<!-- JOURNAL START -->.*?<!-- JOURNAL END -->',lambda _:section,home,flags=re.S)
else: home=home.replace('  <section id="questions"',section+'\n  <section id="questions"')
if 'href="/journal.css"' not in home:home=home.replace('<link rel="stylesheet" href="style.css">','<link rel="stylesheet" href="style.css"><link rel="stylesheet" href="/journal.css">')
if '<a href="/blog/">Journal</a>' not in home:home=home.replace('<a href="#questions">Questions</a>','<a href="#questions">Questions</a><a href="/blog/">Journal</a>')
home=re.sub(r'<link rel="(?:icon|apple-touch-icon)"[^>]*>', '', home)
home=home.replace('</head>', '<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48"><link rel="icon" href="/assets/favicon.svg?v=2" type="image/svg+xml"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" sizes="180x180">'+'\n</head>')
# One deterministic set of sharing metadata, rendered server-side for crawlers.
home=re.sub(r'<title>.*?</title>','',home,flags=re.S)
home=re.sub(r'<meta\s+(?:name="(?:description|robots|theme-color|twitter:[^"]+)"|property="og:[^"]+")[^>]*>','',home)
home=re.sub(r'<link rel="canonical"[^>]*>','',home)
home=home.replace('</head>',metadata('Margevia | Every purchase, accounted for.','Compare supplier invoices, review the evidence and keep credits in sight. Explore the Margevia product preview.',BASE+'/',BASE+'/assets/social/margevia-share-v1.jpg')+'\n</head>')
home='\n'.join(line.rstrip() for line in home.splitlines())+'\n'
home=re.sub(r'\n{3,}', '\n\n', home)
(DIST/'index.html').write_text(home)
# Journal index.
featured=ARTICLES[4]
feature=f'''<a class="journal-feature" href="/blog/{featured['slug']}/"><div class="journal-feature-image">{img(featured,eager=True)}</div><div class="journal-feature-copy"><h2>{esc(featured['title'])}</h2><p>{esc(featured['description'])}</p><div class="journal-meta"><span>Building Margevia</span><span>{featured['minutes']} min read</span></div><span class="text-link">Read the story {arrow}</span></div></a>'''
body=f'''<main id="main" class="page-frame journal-main"><div class="journal-index-intro"><h1>The purchasing desk.</h1><p>Clearer checks. Better questions.<br>Practical guides and the thinking behind Margevia.</p></div>{feature}<section class="journal-collection" aria-labelledby="all-notes"><div class="journal-collection-heading"><h2 id="all-notes">More from the desk</h2><span>Five more reads</span></div><div class="journal-list">{''.join(card(a) for a in ARTICLES if a!=featured)}</div></section><div class="journal-close"><h2>See the thinking in action.</h2><p>Explore three fictional invoices in the Margevia preview.</p><a class="button" href="/#demo">Open the sample dashboard {arrow}</a></div></main>'''
(DIST/'blog').mkdir(exist_ok=True)
(DIST/'blog/index.html').write_text(shell('The purchasing desk | Margevia journal','Practical guides on supplier invoices, deliveries and credits, plus open notes on building Margevia.','/blog/',BASE+'/assets/social/journal-share-v1.jpg',body,alt='Margevia journal: Notes from the purchasing desk, beside a violet bridge connecting two stacks of paper.'))
# Each article gets its own URL, cover, metadata and crawlable reading content.
for i,a in enumerate(ARTICLES):
 sections=[]
 for s in a['sections']:
  c=f'''<section id="{s['id']}"><h2>{esc(s['title'])}</h2>'''+''.join('<p>'+esc(p)+'</p>' for p in s['paragraphs'])
  if 'table' in s:
   t=s['table'];c+='<p id="'+esc(s['id'])+'-table-hint" class="article-table-hint">Swipe sideways to see the full table.</p><div class="article-table" tabindex="0" role="region" aria-describedby="'+esc(s['id'])+'-table-hint" aria-label="'+esc(s['title'])+', comparison table"><table><thead><tr>'+''.join('<th scope="col">'+esc(v)+'</th>' for v in t['headers'])+'</tr></thead><tbody>'+''.join('<tr>'+''.join(('<th scope="row">' if j==0 else '<td>')+esc(v)+('</th>' if j==0 else '</td>') for j,v in enumerate(row))+'</tr>' for row in t['rows'])+'</tbody></table></div>'
  if 'callout' in s:c+='<aside class="article-callout"><strong>'+esc(s['callout']['label'])+'</strong><p>'+esc(s['callout']['text'])+'</p></aside>'
  sections.append(c+'</section>')
 related=[ARTICLES[(i+1)%6],ARTICLES[(i+4)%6]]
 toc='<ol>'+''.join(f'<li><a href="#{s["id"]}">{esc(s["title"])}</a></li>' for s in a['sections'])+'</ol>'
 article=f'''<main id="main" class="page-frame article-main"><article><header class="article-heading"><a class="journal-back" href="/blog/">{arrow_back} Back to the journal</a><h1>{esc(a['title'])}</h1><p class="article-deck">{esc(a['description'])}</p><div class="article-byline"><span>{esc(a['category'])}</span><span>By Margevia</span><time datetime="{PUBLISHED}">{DISPLAY_DATE}</time><span>{a['minutes']} min read</span></div></header><figure class="article-hero">{img(a,eager=True)}<figcaption>Editorial illustration · Margevia journal</figcaption></figure><div class="article-layout"><aside class="article-aside"><details open><summary>In this article</summary>{toc}</details><div class="article-share"><button type="button" class="text-link" id="copy-article">Copy article link {arrow}</button><p id="copy-feedback" role="status" aria-live="polite"></p><input id="copy-fallback" type="url" readonly aria-label="Article link to copy" value="{a['url']}" hidden></div></aside><div class="article-prose"><p class="article-opening">{esc(a['intro'])}</p><div class="article-takeaway"><strong>The useful takeaway</strong><p>{esc(a['takeaway'])}</p></div>{''.join(sections)}<div class="article-demo"><h2>Try the idea with a sample invoice.</h2><p>Explore the Margevia preview with fictional records and visible source evidence.</p><a class="button" href="/#demo">Explore the demo {arrow}</a></div></div></div></article><section class="article-related" aria-labelledby="keep-reading"><div class="journal-collection-heading"><h2 id="keep-reading">Keep reading.</h2><a class="text-link" href="/blog/">All articles {arrow}</a></div><div class="journal-grid">{''.join(card(r) for r in related)}</div></section></main>'''
 structured={'@context':'https://schema.org','@type':'BlogPosting','headline':a['title'],'description':a['description'],'datePublished':PUBLISHED,'dateModified':PUBLISHED,'inLanguage':'en','author':{'@type':'Organization','name':'Margevia','url':BASE+'/'},'publisher':{'@type':'Organization','name':'Margevia','url':BASE+'/'},'mainEntityOfPage':a['url'],'image':BASE+f"/assets/social/{a['slug']}-share-v1.jpg"}
 extra=f'<meta property="article:published_time" content="{PUBLISHED}"><meta property="article:section" content="{esc(a["category"])}"><script type="application/ld+json">{json.dumps(structured,ensure_ascii=False).replace("<","&lt;")}</script>'
 folder=DIST/'blog'/a['slug'];folder.mkdir(exist_ok=True)
 (folder/'index.html').write_text(shell(a['title']+' | Margevia',a['description'],f"/blog/{a['slug']}/",BASE+f"/assets/social/{a['slug']}-share-v1.jpg",article,'article',extra,alt=a['title']+' '+a['alt']))
urls=[BASE+'/',BASE+'/blog/']+[a['url'] for a in ARTICLES]
(DIST/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join('<url><loc>'+u+'</loc><lastmod>'+PUBLISHED+'</lastmod></url>' for u in urls)+'</urlset>\n')
(DIST/'robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: '+BASE+'/sitemap.xml\n')
print('Built six complete articles, the journal index, homepage section and sharing metadata.')
