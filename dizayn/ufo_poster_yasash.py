import sys, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
FD="fonts/package/files/"
F_HEAD=FD+"montserrat-latin-600-normal.woff"; F_TILE=FD+"montserrat-latin-700-normal.woff"
orig=Image.open("../images/24.jpg").convert("RGB")
a=np.asarray(orig).astype(float)
def fill_rows(x0,y0,x1,y1):          # qatorlarni chap va o'ng chetdan chiziqli to'ldirish
    L=a[y0:y1,x0-4:x0-1].mean(1); R=a[y0:y1,x1+1:x1+4].mean(1)
    t=np.linspace(0,1,x1-x0)[None,:,None]
    a[y0:y1,x0:x1]=L[:,None,:]*(1-t)+R[:,None,:]*t
boxes=[(18,22,140,95),(90,105,478,200),(185,398,360,600)]
for b in boxes: fill_rows(*b)
# eski (qiyshiq) yorug'lik dog'ini o'chirib, polni qayta bo'yash
FY=596
row=a[FY-4:FY].mean(0)
for y in range(FY,a.shape[0]):
    k=1-0.12*(y-FY)/(a.shape[0]-FY); a[y]=row*k
filled=Image.fromarray(np.clip(a,0,255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2.5))
mask=Image.new("L",orig.size,0); md=ImageDraw.Draw(mask)
for x0,y0,x1,y1 in boxes: md.rectangle((x0+4,y0+4,x1-4,y1-4),fill=255)
md.rectangle((0,FY+3,orig.width,orig.height),fill=255)
mask=mask.filter(ImageFilter.GaussianBlur(5))
im=Image.composite(filled,orig,mask)
a2=np.asarray(im).copy(); a2[:3]=a2[3]; im=Image.fromarray(a2)

S=3
im=im.resize((im.width*S,im.height*S),Image.LANCZOS).filter(ImageFilter.UnsharpMask(2,80,2)).convert("RGBA")
W,H=im.size; CX=W//2
SAUCER_TOP=203*S
# --- sarlavha (o'qishga qulay, qalinroq) ---
d=ImageDraw.Draw(im)
lines=sys.argv[1].split("|"); size=92
f=ImageFont.truetype(F_HEAD,size)
while max(d.textlength(l,font=f) for l in lines)>W-240: size-=2; f=ImageFont.truetype(F_HEAD,size)
lh=size*1.28
asc=d.textbbox((0,0),"B",font=f)       # bosh harf balandligi
cap_top,cap_bot=asc[1],asc[3]
block_h=(len(lines)-1)*lh+(cap_bot-cap_top)
head_bottom=SAUCER_TOP-150                # likopchadan ko'proq masofa
head_top=head_bottom-block_h
txt=Image.new("RGBA",(W,H),(0,0,0,0)); td=ImageDraw.Draw(txt)
y=head_top-cap_top
for l in lines:
    w=td.textlength(l,font=f); td.text((CX-w/2,y),l,font=f,fill=(255,255,255,255)); y+=lh
grad=Image.new("RGBA",(W,H)); gd=ImageDraw.Draw(grad)
for yy in range(H):
    t=min(1,max(0,(yy-head_top)/max(1,block_h))); gd.line([(0,yy),(W,yy)],fill=(255,round(226-26*t),round(200-36*t),255))
glow=Image.new("RGBA",(W,H),(255,190,140,0)); glow.putalpha(txt.getchannel("A").filter(ImageFilter.GaussianBlur(12)).point(lambda v:v*0.35))
im.alpha_composite(glow); im.paste(grad,(0,0),txt.getchannel("A"))
margin=head_top                            # tepadagi bo'shliq
# --- markazdagi yorug'lik dog'i (pastdagi bo'shliq tepadagiga teng) ---
spot_ry=95; spot_rx=430
spot_bottom=H-margin; spot_cy=spot_bottom-spot_ry
sp=Image.new("RGBA",(W,H),(0,0,0,0)); s=ImageDraw.Draw(sp)
s.ellipse((CX-spot_rx*1.25,spot_cy-spot_ry*1.6,CX+spot_rx*1.25,spot_cy+spot_ry*1.6),fill=(255,190,90,70))
im.alpha_composite(sp.filter(ImageFilter.GaussianBlur(60)))
sp=Image.new("RGBA",(W,H),(0,0,0,0)); s=ImageDraw.Draw(sp)
s.ellipse((CX-spot_rx,spot_cy-spot_ry,CX+spot_rx,spot_cy+spot_ry),fill=(250,200,100,235))
im.alpha_composite(sp.filter(ImageFilter.GaussianBlur(22)))
# --- tortish nuri: likopchadan dog'gacha, ichida yuqoriga oqayotgan yorug'lik ---
TOP_Y=385*S; TOP_W=150
cone=Image.new("RGBA",(W,H),(0,0,0,0)); c=ImageDraw.Draw(cone)
c.polygon([(CX-TOP_W,TOP_Y),(CX+TOP_W,TOP_Y),(CX+spot_rx*0.9,spot_cy),(CX-spot_rx*0.9,spot_cy)],fill=(255,205,140,85))
im.alpha_composite(cone.filter(ImageFilter.GaussianBlur(45)))
core=Image.new("RGBA",(W,H),(0,0,0,0)); c=ImageDraw.Draw(core)
c.polygon([(CX-TOP_W*0.55,TOP_Y),(CX+TOP_W*0.55,TOP_Y),(CX+spot_rx*0.45,spot_cy),(CX-spot_rx*0.45,spot_cy)],fill=(255,225,170,60))
im.alpha_composite(core.filter(ImageFilter.GaussianBlur(35)))
rng=np.random.default_rng(7)
streak=Image.new("RGBA",(W,H),(0,0,0,0)); sd=ImageDraw.Draw(streak)
for _ in range(70):                       # nur ichidagi yuqoriga oqayotgan ingichka chiziqlar
    u=rng.uniform(-1,1); y_a=rng.uniform(TOP_Y,spot_cy-80); ln=rng.uniform(90,320)
    def xat(y): k=(y-TOP_Y)/(spot_cy-TOP_Y); return CX+u*(TOP_W+(spot_rx*0.85-TOP_W)*k)
    y_b=min(spot_cy,y_a+ln)
    for j in range(12):
        y=y_a+(y_b-y_a)*j/12; y2=y_a+(y_b-y_a)*(j+1)/12
        al=int(70*(1-j/12)*rng.uniform(0.5,1))
        sd.line([(xat(y),y),(xat(y2),y2)],fill=(255,230,180,al),width=int(rng.integers(2,5)))
im.alpha_composite(streak.filter(ImageFilter.GaussianBlur(2)))
dust=Image.new("RGBA",(W,H),(0,0,0,0)); dd=ImageDraw.Draw(dust)
for _ in range(160):                      # nurda ko'tarilayotgan chang zarralari
    y=rng.uniform(TOP_Y,spot_cy); k=(y-TOP_Y)/(spot_cy-TOP_Y)
    x=CX+rng.uniform(-1,1)*(TOP_W+(spot_rx*0.85-TOP_W)*k); r=rng.uniform(2,6)
    dd.ellipse((x-r,y-r,x+r,y+r),fill=(255,236,200,int(rng.uniform(60,200))))
im.alpha_composite(dust.filter(ImageFilter.GaussianBlur(1.2)))
# --- og'riqlar plashkalari ---
pains=sys.argv[2].split("|"); n=len(pains)
cols=[((24,22,26),"w"),((30,42,64),"w"),((236,214,172),"d"),((214,92,44),"w"),((168,34,30),"w"),((28,36,56),"w"),((24,22,26),"w"),((200,72,40),"w")]
angs=[-16,12,-13,10,-8,-9,6,-3]
y0=405*S; y1=spot_cy-40
for i,p in enumerate(pains):
    sc=0.60+0.36*(i/(n-1))**1.1
    cy=y0+(y1-y0)*i/(n-1)
    amp=(20+32*i/(n-1))*S
    cx=CX+(amp if i%2==0 else -amp)
    tw,th=int(114*S*sc),int(37*S*sc)
    col,tc=cols[i%len(cols)]
    words=p.upper().split(); fsz=int(36*sc)
    fnt=ImageFont.truetype(F_TILE,fsz); tmp=ImageDraw.Draw(Image.new("L",(1,1)))
    while len(words)==1 and tmp.textlength(p.upper(),font=fnt)>tw-40: fsz-=1; fnt=ImageFont.truetype(F_TILE,fsz)
    if tmp.textlength(p.upper(),font=fnt)<=tw-40: tl=[p.upper()]
    else:
        tl=min(([" ".join(words[:k])," ".join(words[k:])] for k in range(1,len(words))),
               key=lambda L:max(tmp.textlength(x,font=fnt) for x in L))
    pad=40; tile=Image.new("RGBA",(tw+2*pad,th+2*pad),(0,0,0,0)); t=ImageDraw.Draw(tile)
    t.rounded_rectangle((pad,pad,pad+tw,pad+th),radius=int(14*sc),fill=col+(255,),outline=(255,255,255,40),width=2)
    fc=(255,255,255) if tc=="w" else (40,30,28)
    lhh=fsz*1.15; ty=pad+th/2-lhh*len(tl)/2
    for l in tl:
        w=t.textlength(l,font=fnt); t.text((pad+tw/2-w/2,ty),l,font=fnt,fill=fc); ty+=lhh
    tile=tile.rotate(angs[i%len(angs)],resample=Image.BICUBIC)
    sh=Image.new("RGBA",tile.size,(0,0,0,0)); sh.putalpha(tile.getchannel("A").point(lambda v:v*0.55))
    sh=sh.filter(ImageFilter.GaussianBlur(14))
    x=int(cx-tile.width/2); y=int(cy-tile.height/2)
    # yuqoriga tortilayotgandek harakat izi (plashka ostida xiralashgan nusxalar)
    trail=Image.new("RGBA",tile.size,(0,0,0,0))
    ghost=Image.new("RGBA",tile.size,col+(0,)); ghost.putalpha(tile.getchannel("A"))   # yozuvsiz, faqat rang
    ghost=ghost.filter(ImageFilter.GaussianBlur(6))
    steps=7; gap=int(10+18*(1-i/(n-1)))
    big=Image.new("RGBA",(tile.width,tile.height+steps*gap),(0,0,0,0))
    for k in range(steps,0,-1):
        g=ghost.copy(); g.putalpha(g.getchannel("A").point(lambda v,k=k:int(v*0.22*(1-k/(steps+1)))))
        big.alpha_composite(g,(0,k*gap))
    im.alpha_composite(sh,(x+10,y+18)); im.alpha_composite(big,(x,y))
    if i<3:                                # eng tepadagilar nurda yorishib, biroz shaffof
        tile.putalpha(tile.getchannel("A").point(lambda v:int(v*(0.82+0.06*i))))
    im.alpha_composite(tile,(x,y))
print("margin top",margin,"bottom",H-spot_bottom)
im.convert("RGB").save(sys.argv[3],quality=95)
