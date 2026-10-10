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
p=Image.open("spiker2.png").convert("RGBA")
px=p.load()
for yy in range(p.height):            # o'simlikdan qolgan yashil qoldiqlarni tozalash
    for xx in range(p.width):
        r,g,b,a=px[xx,yy]
        if a and g>r+25 and g>b+20: px[xx,yy]=(r,g,b,0)
p=p.crop((0,CUT_TOP,1125,CUT_BOT))
s=H/p.height; p=p.resize((round(p.width*s),H),Image.LANCZOS)
x0=W-p.width+round(60*s)   # o'ng chetga yaqinroq
bg.paste(p,(x0,0),p)
d=ImageDraw.Draw(bg)
CX=600                       # matn markazi (gorizontal)
maxw=2*(x0+round(260*s)-CX)  # spikerga tegmasin
size=215; font=ImageFont.truetype(FONT,size)
while max(d.textlength(l,font=font) for l in lines)>maxw:
    size-=4; font=ImageFont.truetype(FONT,size)
lh=size*1.1; y=(H-lh*len(lines))/2-size*0.08
for l in lines:
    w=d.textlength(l,font=font); d.text((CX-w/2,y),l,font=font,fill="white"); y+=lh
bg.save(out)
