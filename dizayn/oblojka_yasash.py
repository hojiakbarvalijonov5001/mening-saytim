import sys
from PIL import Image, ImageDraw, ImageFont
W,H=1920,1080
FONT="fonts/package/files/montserrat-latin-900-italic.woff"
lines=sys.argv[1].split("|"); out=sys.argv[2]
CUT_TOP,CUT_BOT=int(sys.argv[3]) if len(sys.argv)>3 else 300, int(sys.argv[4]) if len(sys.argv)>4 else 1300
top,bot=(14,14,18),(14,21,46)
bg=Image.new("RGB",(W,H)); d=ImageDraw.Draw(bg)
for y in range(H):
    t=y/(H-1); d.line([(0,y),(W,y)],fill=tuple(round(a+(b-a)*t) for a,b in zip(top,bot)))
p=Image.open("spiker2.png").convert("RGBA").crop((0,CUT_TOP,1125,CUT_BOT))
s=H/p.height; p=p.resize((round(p.width*s),H),Image.LANCZOS)
x0=W-p.width+round(60*s)   # o'ng chetga yaqinroq
bg.paste(p,(x0,0),p)
d=ImageDraw.Draw(bg)
area_w=x0+round(200*s)      # chap matn maydoni (spikerning chap chetigacha)
size=165; font=ImageFont.truetype(FONT,size)
while max(d.textlength(l,font=font) for l in lines)>area_w-180:
    size-=4; font=ImageFont.truetype(FONT,size)
lh=size*1.12; y=(H-lh*len(lines))/2
for l in lines:
    w=d.textlength(l,font=font); d.text(((area_w-w)/2,y),l,font=font,fill="white"); y+=lh
bg.save(out)
