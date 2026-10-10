from PIL import Image, ImageDraw, ImageFont, ImageFilter
S=1080
F900="fonts/package/files/montserrat-latin-900-italic.woff"
top,bot=(14,14,18),(14,21,46)
img=Image.new("RGB",(S,S)); d=ImageDraw.Draw(img)
for y in range(S):
    t=y/(S-1); d.line([(0,y),(S,y)],fill=tuple(round(a+(b-a)*t) for a,b in zip(top,bot)))
img=img.convert("RGBA")
# spiker ortidagi yumshoq ko'k nur
glow=Image.new("RGBA",(S,S),(0,0,0,0)); g=ImageDraw.Draw(glow)
g.ellipse((140,120,940,900),fill=(40,90,200,150)); glow=glow.filter(ImageFilter.GaussianBlur(170))
img.alpha_composite(glow)
# orqa fondagi katta matn
bgt=Image.new("RGBA",(S,S),(0,0,0,0)); b=ImageDraw.Draw(bgt)
y=60
for line,size in [("BIZNESNI",210),("PROFESSIONAL",150),("YURITISH",210)]:
    f=ImageFont.truetype(F900,size)
    while b.textlength(line,font=f)>S+40: size-=4; f=ImageFont.truetype(F900,size)
    w=b.textlength(line,font=f)
    b.text(((S-w)/2,y),line,font=f,fill=(255,255,255,38),stroke_width=2,stroke_fill=(150,180,255,80))
    y+=size
img.alpha_composite(bgt)
# spiker
p=Image.open("spiker2.png").convert("RGBA")
px=p.load()
for yy in range(p.height):            # o'simlikdan qolgan yashil qoldiqlarni tozalash
    for xx in range(p.width):
        r,g,b_,a_=px[xx,yy]
        if a_ and g>r+25 and g>b_+20: px[xx,yy]=(r,g,b_,0)
p=p.crop((0,360,1125,1300))
s=1.15; p=p.resize((round(p.width*s),round(p.height*s)),Image.LANCZOS)
cx=round(615*s)                       # spiker markazi (asl rasmda x~615)
img.alpha_composite(p,(S//2-cx,S-p.height))
# pastki qorong'ilashtirish (sarlavha o'qilishi uchun)
sh=Image.new("RGBA",(S,S),(0,0,0,0)); sd=ImageDraw.Draw(sh)
for yy in range(560,S):
    t=(yy-560)/(S-560); sd.line([(0,yy),(S,yy)],fill=(10,16,36,round(200*min(1,t*1.3))))
img.alpha_composite(sh)
d=ImageDraw.Draw(img)
# sarlavha: "TIZIM VA" oq, "SOTUV" ko'k plashka ichida
f=ImageFont.truetype(F900,124)
t1="TIZIM VA"; w1=d.textlength(t1,font=f)
shd=Image.new("RGBA",(S,S),(0,0,0,0)); ImageDraw.Draw(shd).text(((S-w1)/2+4,616),t1,font=f,fill=(5,10,25,230))
img.alpha_composite(shd.filter(ImageFilter.GaussianBlur(14))); img.alpha_composite(shd.filter(ImageFilter.GaussianBlur(4)))
d=ImageDraw.Draw(img); d.text(((S-w1)/2,610),t1,font=f,fill="white")
t2="SOTUV"; w2=d.textlength(t2,font=f)
bx0,by0=(S-w2)/2-36,747; bx1,by1=(S+w2)/2+36,747+142
d.polygon([(bx0+22,by0),(bx1+22,by0),(bx1-22,by1),(bx0-22,by1)],fill=(47,107,255))
d.text(((S-w2)/2,by0+2),t2,font=f,fill="white")
img.convert("RGB").save("/home/user/mening-saytim/dizayn/tizim-va-sotuv-1x1.png")
