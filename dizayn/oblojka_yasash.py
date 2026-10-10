import sys
from PIL import Image, ImageDraw, ImageFont, ImageChops, ImageFilter
W,H=1920,1080
IMG="/tmp/claude-0/-home-user-mening-saytim/7e44ecaa-e6df-557b-884f-fde262691fce/images/"
FONT="fonts/package/files/montserrat-latin-900-italic.woff"
lines=sys.argv[1].split("|"); out=sys.argv[2]
top,bot=(14,14,18),(14,21,46)
bg=Image.new("RGB",(W,H))
d=ImageDraw.Draw(bg)
for y in range(H):
    t=y/(H-1); d.line([(0,y),(W,y)],fill=tuple(round(a+(b-a)*t) for a,b in zip(top,bot)))
p=Image.open(IMG+"14.jpg").convert("RGB").crop((200,330,1336,2000))
s=H/p.height; p=p.resize((round(p.width*s),H),Image.LANCZOS)
x0=W-p.width
region=bg.crop((x0,0,W,H))
blended=ImageChops.lighter(region,p)          # qora fon o'rniga gradient ko'rinadi
mask=Image.new("L",p.size,255); md=ImageDraw.Draw(mask)
f=180
for i in range(f): md.line([(i,0),(i,H)],fill=round(255*i/f))
bg.paste(blended,(x0,0),mask)
d=ImageDraw.Draw(bg)
size=165
font=ImageFont.truetype(FONT,size)
area_w=x0+60
while max(d.textlength(l,font=font) for l in lines)>area_w-180:
    size-=4; font=ImageFont.truetype(FONT,size)
lh=size*1.12; total=lh*len(lines)
y=(H-total)/2
for l in lines:
    w=d.textlength(l,font=font)
    d.text(((area_w-w)/2,y),l,font=font,fill="white"); y+=lh
bg.save(out)
