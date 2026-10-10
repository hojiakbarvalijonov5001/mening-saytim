from PIL import Image, ImageDraw, ImageFont, ImageFilter
W,H=1080,1920
F900="fonts/package/files/montserrat-latin-900-italic.woff"
top,bot=(14,14,18),(14,21,46)
img=Image.new("RGB",(W,H)); d=ImageDraw.Draw(img)
for y in range(H):
    t=y/(H-1); d.line([(0,y),(W,y)],fill=tuple(round(a+(b-a)*t) for a,b in zip(top,bot)))
img=img.convert("RGBA")
glow=Image.new("RGBA",(W,H),(0,0,0,0)); g=ImageDraw.Draw(glow)
g.ellipse((100,250,980,1250),fill=(40,90,200,150)); glow=glow.filter(ImageFilter.GaussianBlur(190))
img.alpha_composite(glow)
# orqa fondagi katta matn
bgt=Image.new("RGBA",(W,H),(0,0,0,0)); b=ImageDraw.Draw(bgt)
y=230
for line in ["BOSHQARUV","TIZIMI","BOSHQARUV"]:
    size=260; f=ImageFont.truetype(F900,size)
    while b.textlength(line,font=f)>W+40: size-=4; f=ImageFont.truetype(F900,size)
    w=b.textlength(line,font=f)
    b.text(((W-w)/2,y),line,font=f,fill=(255,255,255,34),stroke_width=2,stroke_fill=(150,180,255,75))
    y+=size*1.02
img.alpha_composite(bgt)
# spiker (kulrang kostyum)
p=Image.open("spiker2.png").convert("RGBA")
px=p.load()
for yy in range(p.height):
    for xx in range(p.width):
        r,g_,b_,a_=px[xx,yy]
        if a_ and g_>r+25 and g_>b_+20: px[xx,yy]=(r,g_,b_,0)
p=p.crop((0,360,1125,1650))
s=1.12; p=p.resize((round(p.width*s),round(p.height*s)),Image.LANCZOS)
img.alpha_composite(p,(W//2-round(615*s),190))
# pastki qorong'ilashtirish
sh=Image.new("RGBA",(W,H),(0,0,0,0)); sd=ImageDraw.Draw(sh)
for yy in range(950,H):
    t=(yy-950)/(H-950); sd.line([(0,yy),(W,yy)],fill=(10,16,36,round(250*min(1,t*1.8))))
img.alpha_composite(sh)
# sarlavha
def shadow_text(xy,txt,f):
    sh=Image.new("RGBA",(W,H),(0,0,0,0)); ImageDraw.Draw(sh).text((xy[0]+4,xy[1]+6),txt,font=f,fill=(5,10,25,230))
    img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(14)))
    ImageDraw.Draw(img).text(xy,txt,font=f,fill="white")
f=ImageFont.truetype(F900,96)
y=1130
for txt in ["BIZNESNI PROFESSIONAL","YURITISH UCHUN"]:
    size=96; ff=f
    while ImageDraw.Draw(img).textlength(txt,font=ff)>W-110: size-=2; ff=ImageFont.truetype(F900,size)
    w=ImageDraw.Draw(img).textlength(txt,font=ff); shadow_text(((W-w)/2,y),txt,ff); y+=size*1.12
f=ImageFont.truetype(F900,118); d=ImageDraw.Draw(img)
y+=18
for txt in ["BOSHQARUV","TIZIMI"]:
    w=d.textlength(txt,font=f)
    x0,x1=(W-w)/2-38,(W+w)/2+38; y0,y1=y,y+138
    d.polygon([(x0+22,y0),(x1+22,y0),(x1-22,y1),(x0-22,y1)],fill=(47,107,255))
    d.text(((W-w)/2,y0+1),txt,font=f,fill="white"); y+=150
img.convert("RGB").save("/home/user/mening-saytim/dizayn/boshqaruv-tizimi-9x16.png")
